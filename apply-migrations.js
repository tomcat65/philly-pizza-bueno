const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function applyMigrations() {
  try {
    console.log('Checking for migrations to apply...');
    
    // Create migrations table if it doesn't exist
    await supabase.rpc('list_tables').then(async ({ data, error }) => {
      if (error) throw error;
      
      const hasMigrationsTable = data.some(table => table.name === 'schema_migrations');
      
      if (!hasMigrationsTable) {
        console.log('Creating schema_migrations table...');
        await supabase.rpc('execute_sql', {
          sql_query: `
            CREATE TABLE IF NOT EXISTS schema_migrations (
              id SERIAL PRIMARY KEY,
              name TEXT NOT NULL,
              applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
          `
        });
        console.log('Created schema_migrations table.');
      }
    });

    // Get already applied migrations
    const { data: appliedMigrations, error: fetchError } = await supabase
      .from('schema_migrations')
      .select('name');
    
    if (fetchError) throw fetchError;
    
    const appliedMigrationNames = (appliedMigrations || []).map(m => m.name);
    console.log('Already applied migrations:', appliedMigrationNames);

    // Read migrations from directory
    const migrationsDir = path.join(process.cwd(), 'migrations');
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort(); // Sort to ensure order
    
    console.log('Available migrations:', files);
    
    // Apply migrations that haven't been applied yet
    for (const file of files) {
      const migrationName = path.parse(file).name;
      
      if (appliedMigrationNames.includes(migrationName)) {
        console.log(`Migration ${migrationName} already applied, skipping.`);
        continue;
      }
      
      console.log(`Applying migration: ${migrationName}`);
      
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      
      // Execute the SQL migration
      const { error: executionError } = await supabase.rpc('execute_sql', {
        sql_query: sql
      });
      
      if (executionError) {
        console.error(`Error applying migration ${migrationName}:`, executionError);
        throw executionError;
      }
      
      // Record the migration as applied
      const { error: recordError } = await supabase
        .from('schema_migrations')
        .insert({ name: migrationName });
      
      if (recordError) {
        console.error(`Error recording migration ${migrationName}:`, recordError);
        throw recordError;
      }
      
      console.log(`Successfully applied migration: ${migrationName}`);
    }
    
    console.log('All migrations applied successfully.');
  } catch (error) {
    console.error('Error applying migrations:', error);
    process.exit(1);
  }
}

applyMigrations(); 