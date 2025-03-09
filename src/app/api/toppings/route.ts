import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productType = searchParams.get('type')

  console.log('1. Starting topping fetch for product type:', productType)

  if (!productType) {
    console.error('No product type provided')
    return NextResponse.json(
      { error: 'Product type is required' },
      { status: 400 }
    )
  }

  const supabase = createClient()

  try {
    // First update the style option from 'roasted' to 'grilled'
    const updateResult = await supabase
      .from('topping_options')
      .update({ value: 'grilled' })
      .eq('type', 'style')
      .eq('value', 'roasted')
    
    console.log('Update result:', updateResult)

    // Then proceed with the regular queries
    console.log('2. Testing individual queries...')
    
    const categoriesResult = await supabase.from('topping_categories').select('id, name')
    console.log('Categories query:', {
      data: categoriesResult.data,
      error: categoriesResult.error
    })
    
    const toppingsResult = await supabase.from('toppings').select('id, name, category_id')
    console.log('Toppings query:', {
      data: toppingsResult.data,
      error: toppingsResult.error
    })
    
    const availabilityResult = await supabase
      .from('product_topping_availability')
      .select('topping_id, is_default')
      .eq('product_type', productType)
    console.log('Availability query:', {
      data: availabilityResult.data,
      error: availabilityResult.error
    })
    
    const optionsResult = await supabase.from('topping_options').select('type, value')
    console.log('Options query:', {
      data: optionsResult.data,
      error: optionsResult.error
    })

    // If any query failed, throw an error
    if (categoriesResult.error) throw new Error(`Categories query failed: ${categoriesResult.error.message}`)
    if (toppingsResult.error) throw new Error(`Toppings query failed: ${toppingsResult.error.message}`)
    if (availabilityResult.error) throw new Error(`Availability query failed: ${availabilityResult.error.message}`)
    if (optionsResult.error) throw new Error(`Options query failed: ${optionsResult.error.message}`)

    const categories = categoriesResult.data
    const toppings = toppingsResult.data
    const availability = availabilityResult.data
    const options = optionsResult.data

    // Initialize response structure
    const organizedToppings = {
      cheese: [] as string[],
      meat: [] as string[],
      veggies: [] as string[]
    }

    // Create a map of category IDs to names
    const categoryMap = new Map(categories?.map(cat => [cat.id, cat.name.toLowerCase()]) || [])

    // Get available toppings for this product type
    const availableToppingIds = availability?.map(a => a.topping_id) || []
    const availableToppings = toppings?.filter(t => availableToppingIds.includes(t.id)) || []

    // Process toppings
    availableToppings.forEach(topping => {
      const categoryName = categoryMap.get(topping.category_id)
      if (categoryName && categoryName in organizedToppings) {
        organizedToppings[categoryName as keyof typeof organizedToppings].push(topping.name)
      }
    })

    // Organize options by type
    const organizedOptions = {
      amount: [] as string[],
      style: [] as string[]
    }

    options?.forEach(option => {
      if (option.type in organizedOptions) {
        organizedOptions[option.type as keyof typeof organizedOptions].push(option.value)
      }
    })

    // Get default toppings
    const defaultToppingIds = availability
      ?.filter(a => a.is_default)
      .map(a => a.topping_id) || []
    const defaultToppings = toppings
      ?.filter(t => defaultToppingIds.includes(t.id))
      .map(t => t.name) || []

    const response = {
      toppings: organizedToppings,
      options: organizedOptions,
      defaults: defaultToppings
    }

    console.log('3. Final Response:', JSON.stringify(response, null, 2))
    return NextResponse.json(response)

  } catch (error) {
    console.error('Error in toppings API:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch toppings' },
      { status: 500 }
    )
  }
} 