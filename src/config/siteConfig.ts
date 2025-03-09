export const siteConfig = {
  name: "PhillyPizzaBueno",
  contact: {
    phone: "(215) 610-0873",
    address: {
      mall: "Philadelphia Mills Mall",
      street: "1455 Franklin Mills Circle",
      city: "Philadelphia",
      state: "PA",
      zip: "19154",
      location: "Food Court"
    },
    hours: "10AM - 8PM",
    daysOpen: "Monday - Sunday",
    social: {
      instagram: "#",
      facebook: "#"
    }
  },
  pizzas: [
    {
      name: "Classic Cheese Pizza",
      description: "Our signature Philly crust topped with Don Peppino pizza sauce and premium Supremo Italiano Mozzarella cheese",
      prices: {
        personal: 12.99,
        regular: 15.99,
        family: 19.99
      },
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80"
    },
    {
      name: "3-Cheese Blend Pizza",
      description: "Our signature Philly crust topped with Don Peppino pizza sauce and Supremo Italiano 3-cheese blend",
      prices: {
        personal: 13.99,
        regular: 16.99,
        family: 20.99
      },
      image: "https://images.unsplash.com/photo-1548369937-47519962c11a?auto=format&fit=crop&q=80"
    }
  ],
  sizes: {
    personal: { size: 10, name: "Personal" },
    regular: { size: 12, name: "Regular" },
    family: { size: 17, name: "Family" }
  },
  toppings: {
    cheese: [
      "Supremo Italiano Mozzarella",
      "Supremo Italiano 3-Cheese Blend",
      "Parmesan",
      "Provolone"
    ],
    meat: [
      "Pepperoni",
      "Chicken Breast Strips",
      "Philly Chicken",
      "Philly Beef",
      "Bacon"
    ],
    veggies: [
      "Green Peppers",
      "Banana Peppers",
      "Mushrooms",
      "Jalapeños",
      "Onions",
      "Roma Tomatoes"
    ]
  },
  toppingOptions: {
    amount: ["light", "normal", "xtra"],
    style: ["fresh", "grilled"]
  },
  hero: {
    title: "Authentic Philly-Style Pizza",
    subtitle: "Experience the perfect blend of Philadelphia tradition and Italian flavor at Philadelphia Mills Mall.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80"
  }
};