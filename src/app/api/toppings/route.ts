import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createClient()

    // Fetch toppings with their categories
    const { data: toppings, error: toppingsError } = await supabase
      .from('toppings')
      .select(`
        id,
        name,
        category_id,
        topping_categories (
          name
        )
      `)
      .order('name')

    if (toppingsError) {
      return NextResponse.json({ error: toppingsError.message }, { status: 500 })
    }

    // Fetch topping options
    const { data: options, error: optionsError } = await supabase
      .from('topping_options')
      .select('*')
      .order('value')

    if (optionsError) {
      return NextResponse.json({ error: optionsError.message }, { status: 500 })
    }

    // Organize toppings by category
    const organizedToppings = toppings.reduce((acc: Record<string, string[]>, topping) => {
      const category = topping.topping_categories.name
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(topping.name)
      return acc
    }, {})

    // Organize options by type
    const organizedOptions = options.reduce((acc: Record<string, string[]>, option) => {
      if (!acc[option.type]) {
        acc[option.type] = []
      }
      acc[option.type].push(option.value)
      return acc
    }, {})

    return NextResponse.json({
      toppings: organizedToppings,
      options: organizedOptions
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 