-- Create topping_categories table
CREATE TABLE topping_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create toppings table
CREATE TABLE toppings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category_id UUID REFERENCES topping_categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(name, category_id)
);

-- Create topping_options table
CREATE TABLE topping_options (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL, -- 'amount' or 'style'
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(type, value)
);

-- Insert initial data
INSERT INTO topping_categories (name) VALUES
  ('cheese'),
  ('meat'),
  ('veggies');

INSERT INTO toppings (name, category_id) VALUES
  ('Supremo Italiano Mozzarella', (SELECT id FROM topping_categories WHERE name = 'cheese')),
  ('Supremo Italiano 3-Cheese Blend', (SELECT id FROM topping_categories WHERE name = 'cheese')),
  ('Parmesan', (SELECT id FROM topping_categories WHERE name = 'cheese')),
  ('Provolone', (SELECT id FROM topping_categories WHERE name = 'cheese')),
  ('Pepperoni', (SELECT id FROM topping_categories WHERE name = 'meat')),
  ('Chicken Breast Strips', (SELECT id FROM topping_categories WHERE name = 'meat')),
  ('Philly Chicken', (SELECT id FROM topping_categories WHERE name = 'meat')),
  ('Philly Beef', (SELECT id FROM topping_categories WHERE name = 'meat')),
  ('Bacon', (SELECT id FROM topping_categories WHERE name = 'meat')),
  ('Green Peppers', (SELECT id FROM topping_categories WHERE name = 'veggies')),
  ('Banana Peppers', (SELECT id FROM topping_categories WHERE name = 'veggies')),
  ('Mushrooms', (SELECT id FROM topping_categories WHERE name = 'veggies')),
  ('Jalapeños', (SELECT id FROM topping_categories WHERE name = 'veggies')),
  ('Onions', (SELECT id FROM topping_categories WHERE name = 'veggies')),
  ('Roma Tomatoes', (SELECT id FROM topping_categories WHERE name = 'veggies'));

INSERT INTO topping_options (type, value) VALUES
  ('amount', 'light'),
  ('amount', 'normal'),
  ('amount', 'xtra'),
  ('style', 'fresh'),
  ('style', 'grilled'); 