import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// @mcp-tool add-project


async function setupSupabase() {
    try {
      // Initialize your Supabase project
      const { data, error } = await supabase
        .from('topping_categories')
        .select('*')
  
      console.log('Successfully connected to Supabase:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  setupSupabase();