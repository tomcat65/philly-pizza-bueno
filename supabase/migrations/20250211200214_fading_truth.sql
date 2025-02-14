/*
  # Seed initial pizza data

  1. Data
    - Add initial pizzas from the configuration
*/

INSERT INTO pizzas (name, description, image_url, prices)
VALUES
  (
    'Classic Cheese Pizza',
    'Our signature Philly crust topped with Don Peppino pizza sauce and premium Supremo Italiano Mozzarella cheese',
    'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80',
    '{"personal": 12.99, "regular": 15.99, "family": 19.99}'
  ),
  (
    '3-Cheese Blend Pizza',
    'Our signature Philly crust topped with Don Peppino pizza sauce and Supremo Italiano 3-cheese blend',
    'https://images.unsplash.com/photo-1548369937-47519962c11a?auto=format&fit=crop&q=80',
    '{"personal": 13.99, "regular": 16.99, "family": 20.99}'
  );