-- Enable RLS on all tables
ALTER TABLE topping_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE toppings ENABLE ROW LEVEL SECURITY;
ALTER TABLE topping_options ENABLE ROW LEVEL SECURITY;

-- Create an is_admin() function to check if the user is an admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- You can customize this based on your needs, e.g., checking a role or a specific field
  RETURN EXISTS (
    SELECT 1
    FROM auth.users
    WHERE id = auth.uid()
    AND email LIKE '%@phillypizzabueno.com'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policies for topping_categories
CREATE POLICY "Allow public read access to topping categories"
  ON topping_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin write access to topping categories"
  ON topping_categories
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Policies for toppings
CREATE POLICY "Allow public read access to toppings"
  ON toppings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin write access to toppings"
  ON toppings
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Policies for topping_options
CREATE POLICY "Allow public read access to topping options"
  ON topping_options
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin write access to topping options"
  ON topping_options
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin()); 