'use server'

import { z } from 'zod'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { AuthError, ValidationError, DatabaseError, PaymentError, handleError } from '@/lib/errors'

const checkoutSchema = z.object({
  items: z.array(z.object({
    name: z.string(),
    description: z.string(),
    amount: z.number(),
    quantity: z.number()
  }))
})

export async function createCheckoutSession(formData: FormData) {
  try {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      throw new AuthError('Not authenticated')
    }

    const rawItems = formData.get('items')
    if (!rawItems) {
      throw new ValidationError('No items provided')
    }

    let items
    try {
      items = JSON.parse(rawItems as string)
    } catch {
      throw new ValidationError('Invalid items format')
    }

    try {
      const validatedItems = checkoutSchema.parse({ items }).items
      
      // Create order in Supabase
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total: validatedItems.reduce((sum, item) => sum + (item.amount * item.quantity), 0),
          status: 'pending'
        })
        .select()
        .single()

      if (orderError) {
        throw new DatabaseError('Failed to create order')
      }

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        customer_email: user.email,
        line_items: validatedItems.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              description: item.description,
            },
            unit_amount: item.amount,
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/canceled`,
        metadata: {
          orderId: order.id
        }
      })

      if (!session.url) {
        throw new PaymentError('Failed to create checkout session')
      }

      redirect(session.url)
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError('Invalid items data')
      }
      throw error
    }
  } catch (error) {
    throw handleError(error)
  }
} 