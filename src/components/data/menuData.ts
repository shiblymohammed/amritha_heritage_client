export interface MenuItem {
  id?: string;
  name: string;
  price: number | string;
  description?: string;
  image?: string;
  variants?: {
    name: string;
    price: number;
  }[];
}

export interface MenuCategory {
  category: string;
  image: string;
  items: MenuItem[];
}

export interface MenuCollection {
  collection: string;
  description: string;
  icon: string;
  categories: MenuCategory[];
}

export const menuData: MenuCollection[] = [
  {
    collection: "Opening Chapter",
    description:
      "Begin your culinary journey with our refreshing soups, vibrant salads, and tantalizing appetizers",
    icon: "🌟",
    categories: [
      {
        category: "SOUP & SALAD",
        image: "/images/Dining/menu/soup-salad.jpg",
        items: [
          {
            name: "Creamy Corn & Spinach Soup",
            price: "₹200/240/170",
            description:
              "Healthy and creamy soup made with fresh spinach, sweet corn and flavored spices.",
            variants: [
              { name: "Chicken", price: 200 },
              { name: "Prawn", price: 240 },
              { name: "Veg", price: 170 },
            ],
          },
          {
            name: "Chemmeen Thengapaal Soup",
            price: 240,
            description: "Finished with coconut milk and curry leaves.",
          },
          {
            name: "Lemon Coriander Chicken Soup",
            price: 240,
            description:
              "Made of tender chicken bites, lime juice and lots of fresh coriander leaves.",
          },
          {
            name: "Tom Kha Gai Soup",
            price: 240,
            description:
              "Thai chicken soup with galangal, lemongrass & red chilli.",
          },
          {
            name: "Cream of Tomato Soup",
            price: 200,
            description: "Made of tomato puree and fresh cream.",
          },
          {
            name: "Broccoli Almond Soup",
            price: 200,
            description: "Protein-rich broccoli and almond nourishing soup.",
          },
          {
            name: "Hot 'n' Sour",
            price: "₹200/240",
            description: "Popular Chinese soup; tangy flavour and spicy kick.",
            variants: [
              { name: "Veg", price: 200 },
              { name: "Chicken", price: 240 },
            ],
          },
          {
            name: "Sweet Corn",
            price: "₹200/240",
            description: "Soup made with sweet corn kernels.",
            variants: [
              { name: "Veg", price: 200 },
              { name: "Chicken", price: 240 },
            ],
          },
          {
            name: "Kohinoor Special Salad",
            price: 320,
            description:
              "Strips of beef, chicken, salami and boiled egg on bed of lettuce in ranch dressing.",
          },
          {
            name: "Niçoise Salad",
            price: 280,
            description:
              "Tuna, boiled egg, potato, tomato and beans in herb French dressing.",
          },
          {
            name: "Tempered Beansprout & Chickpeas Salad",
            price: 250,
            description: "With grated coconut in lemon dressing.",
          },
          {
            name: "Healthy Microgreen & Sprout Salad",
            price: 250,
            description: "In cilantro-ginger-honey dressing.",
          },
          {
            name: "Tossed Salad",
            price: 200,
            description:
              "Dices of cucumber, tomato, onion, carrot, tomato in vinaigrette dressing.",
          },
        ],
      },
      {
        category: "APPETIZERS",
        image: "/images/Dining/menu/appetizers.webp",
        items: [
          {
            name: "Prawns Pepper Fry",
            price: 600,
            description: "Prawns tossed with Kerala spices and served.",
          },
          {
            name: "Kuttanadan Fish Pops",
            price: 580,
            description:
              "Marinated king fish chunks coated with panko crumbs & corn flakes; deep-fried; served with tomato-onion relish.",
          },
          {
            name: "Talay Krok",
            price: 400,
            description:
              "Seafood hoppers in tempura batter; sweet chilli sauce.",
          },
          {
            name: "Fish Tikka",
            price: 540,
            description:
              "Marinated, char-grilled king fish; mint relish & salad.",
          },
          {
            name: "Squid Rings Tempura",
            price: 340,
            description: "With sweet chilli sauce.",
          },
          {
            name: "Nigara Chicken",
            price: 350,
            description:
              "In-house grilled chicken chunks tossed with triple pepper, peanut and chilli-tomato sauce.",
          },
          {
            name: "Murg Kalimirch Tikka",
            price: 350,
            description:
              "Boneless chicken marinated with black pepper, char-grilled; mint relish & salad.",
          },
          {
            name: "Beef Coconut Fry",
            price: 380,
            description:
              "Tender, juicy boneless beef stir-fried with coconut cuts.",
          },
          {
            name: "Golden Fried Baby Corn",
            price: 240,
            description: "Batter-fried baby corn; tomato-garlic sauce.",
          },
          {
            name: "Kung Pao Cauliflower",
            price: 240,
            description:
              "Batter-fried cauliflower tossed with peanut and green pepper.",
          },
          {
            name: "Achari Malai Paneer Tikka",
            price: 320,
            description:
              "Cottage cheese in pickle-yogurt marination; char-grilled; mint relish & salad.",
          },
          {
            name: "Mushroom 65",
            price: 240,
            description: "Mushrooms in spicy batter, served crispy.",
          },
          {
            name: "Paneer Finger",
            price: 320,
            description: "Served crispy.",
          },
          {
            name: "Crumb Fried Babycorn",
            price: 240,
            description: "Crispy and spicy babycorn.",
          },
        ],
      },
    ],
  },
  {
    collection: "The Heart of The Meal",
    description:
      "Experience the soul of our cuisine with authentic main courses from various culinary traditions",
    icon: "🍽️",
    categories: [
      {
        category: "MAIN COURSE — From the Land of Kathakali",
        image: "/images/Dining/menu/kerala-main-course.jpg",
        items: [
          {
            name: "Koonthal Perattu",
            price: 340,
            description: "Squid stir-fried with shallots.",
          },
          {
            name: "Meen Pollichathu",
            price: 580,
            description:
              "King fish cooked with herbs & spices, wrapped in banana leaves and grilled.",
          },
          {
            name: "Chef's Special Fish Curry",
            price: 600,
            description: "Chunks of king fish in Amritha special gravy.",
          },
          {
            name: "Kozhi Koonu Varutharachathu",
            price: 380,
            description:
              "Chicken and mushroom cooked in roasted & ground gravy.",
          },
          {
            name: "Kerala Kozhi Roast",
            price: 400,
            description:
              "Pot-roasted tender chicken finished with country spices & coconut milk.",
          },
          {
            name: "Murgh Kali Mirchi",
            price: 380,
            description:
              "Boneless chicken chunks in black pepper masala, cooked tender.",
          },
          {
            name: "Beef Roast",
            price: 380,
            description: "Pot-roasted tender loin beef with spices & herbs.",
          },
          {
            name: "Malabari Mutton Curry",
            price: 550,
            description: "Traditional North Kerala preparation.",
          },
          {
            name: "South Indian Veg. Thali (Lunch only)",
            price: 199,
            description:
              "Kerala vegetarian specials with steamed rice and chapatti.",
          },
          {
            name: "South Indian Fish Thali (Lunch only)",
            price: 249,
            description:
              "Fresh fish curry & fish fry with steamed rice and chapatti.",
          },
        ],
      },
      {
        category: "NOSTALGIA — Amritha Heritage Dishes",
        image: "/images/Dining/menu/heritage-dishes.avif",
        items: [
          {
            name: "Fish Malabari",
            price: 600,
            description:
              "Sea-fresh seer fish tempered and simmered in coconut milk gravy.",
          },
          {
            name: "Garlic Fish",
            price: 600,
            description:
              "Crispy fried fish in garlic-flavoured tomato-chilli sauce.",
          },
          {
            name: "Amritha Spl. Roast Chicken (Half)",
            price: 450,
            description:
              "Old-hotel Amritha-style roast; served with potato lyonnaise and glazed vegetables.",
          },
          {
            name: "Amritha Chilli Chicken",
            price: 380,
            description: "Chef's special home preparation.",
          },
          {
            name: "Kadai Murgh",
            price: 400,
            description: "Spring chicken pieces cooked North-Indian style.",
          },
          {
            name: "Chicken with Diced Vegetables",
            price: 380,
            description: "Chicken with broccoli, carrot, beans.",
          },
          {
            name: "Chicken Steak Sizzler",
            price: 380,
            description: "With potato wedges, glazed veggies.",
          },
          {
            name: "Beef Steak Sizzler",
            price: 450,
            description: "With potato wedges & glazed veggies.",
          },
          {
            name: "Beef with Onion",
            price: 420,
            description: "Tenderloin cuts stir-fried; semi-gravy.",
          },
          {
            name: "Beef with Capsicum",
            price: 420,
            description:
              "Tenderloin cuts stir-fried with green pepper; semi-gravy.",
          },
          {
            name: "Beef with Red Chilli",
            price: 420,
            description:
              "Tenderloin cuts stir-fried with Thai red chilli; semi-gravy.",
          },
          {
            name: "Choice of Fried Rice",
            price: "₹280/320/360/390",
            description: "Stir-fried basmati rice, soya-flavoured.",
            variants: [
              { name: "Veg", price: 280 },
              { name: "Egg", price: 320 },
              { name: "Chicken", price: 360 },
              { name: "Mix Meat", price: 390 },
            ],
          },
          {
            name: "Choice of Noodles",
            price: "₹280/320/360/400",
            description: "Stir-fried noodles, soya-flavoured.",
            variants: [
              { name: "Veg", price: 280 },
              { name: "Egg", price: 320 },
              { name: "Chicken", price: 360 },
              { name: "Mix Meat", price: 400 },
            ],
          },
        ],
      },
      {
        category: "ORIENTAL (Authentic Oriental Cuisine)",
        image: "/images/Dining/menu/oriental-cuisine.jpg",
        items: [
          {
            name: "Fish in Chilli Oyster / Chilli Garlic / Chilli Soya",
            price: 600,
            description: "Amritha special Chinese delicacy.",
          },
          {
            name: "Chicken in Red Curry / Green Curry",
            price: 380,
            description:
              "Boneless chicken dice in Thai red or green curry with coconut milk.",
          },
          {
            name: "Nasi Goreng",
            price: 350,
            description: "Indonesian fried rice with chicken, egg and prawn.",
          },
          {
            name: "Bami Goreng",
            price: 370,
            description: "Noodles with chicken, egg and prawns.",
          },
          {
            name: "Pad Thai",
            price: 390,
            description:
              "Flat noodles with prawns tossed in Pad Thai sauce, flavoured with basil.",
          },
          {
            name: "Mix Veg with Nuts",
            price: 260,
            description: 'Hong Kong street food of the "City of Darkness."',
          },
          {
            name: "Cauliflower Manchurian",
            price: 240,
            description: "Amritha's Chinese delicacy.",
          },
          {
            name: "Chicken (Schezwan/Hunan/Manchurian)",
            price: 380,
            description: "Amritha's Chinese attraction.",
          },
        ],
      },
      {
        category: "CONTINENTAL",
        image: "/images/categories/continental.jpg",
        items: [
          {
            name: "Fisherman's Catch",
            price: 450,
            description:
              "Chunks of fish with prawns & squid in creamy tomato sauce; served with parsley rice.",
          },
          {
            name: "Fish n' Chips",
            price: 600,
            description:
              "Panko-crumb fried fish with French fries & tartare sauce.",
          },
          {
            name: "Grilled Mackerel Roll with Kariveppila Rice",
            price: 380,
            description:
              "Amritha Heritage signature dish: marinated & grilled mackerel; curry-leaf rice.",
          },
          {
            name: "Cheesy Crunchy Fried Chicken",
            price: 380,
            description:
              "Cheese-stuffed chicken breast, panko-crumb fried; potato salad & rossa tartare.",
          },
          {
            name: "Beef Steak in Mushroom Sauce / Steak au Poivre",
            price: 400,
            description: "With potato wedges & glazed veggies.",
          },
        ],
      },
      {
        category: "INDIAN & TANDOOR",
        image: "/images/Dining/menu/indian-tandoor.webp",
        items: [
          {
            name: "Tandoori Murg (Half)",
            price: 450,
            description:
              "Char-grilled chicken served with naan or roti, dal and mint relish.",
          },
          {
            name: "Murg Makhani",
            price: 380,
            description:
              "Tandoori-roasted spring chicken in tomato-cashew gravy.",
          },
          {
            name: "Murg Mutter Masala",
            price: 380,
            description: "Combination of green peas and chicken.",
          },
          {
            name: "Kadai Mutton",
            price: 550,
            description: "North-Indian delicacy.",
          },
          {
            name: "Mutton Saagwala",
            price: 550,
            description: "Pureed spinach with tender chunks of meat.",
          },
        ],
      },
      {
        category: "PASTA",
        image: "/images/Dining/menu/pasta.jpg",
        items: [
          {
            name: "Choice of Pasta (Penne/Fusilli/Farfalle)",
            price: "₹380/₹320",
            variants: [
              { name: "Regular", price: 320 },
              { name: "Premium", price: 380 },
            ],
          },
          {
            name: "Alfredo",
            price: 380,
            description: "Cream sauce with mushroom.",
            variants: [
              { name: "Chicken", price: 380 },
              { name: "Veg", price: 380 },
            ],
          },
          {
            name: "Marinara",
            price: 380,
            description: "Fresh red-chilli tomato with seafood.",
          },
          {
            name: "Chicken in Creamy Tomato Sauce",
            price: 380,
            description: "Pan-fried chicken in creamy tomato sauce.",
          },
        ],
      },
      {
        category: "VEGETARIAN DELICACIES",
        image: "/images/Dining/menu/vegetarian.jpg",
        items: [
          {
            name: "Aloo Mutter / Gobi / Tamatar",
            price: 280,
            description: "Potato & cauliflower in creamy gravy.",
          },
          {
            name: "Vegetable Korma",
            price: 260,
            description: "Mix vegetables in coconut gravy.",
          },
          {
            name: "Palcutty Ulli Thiyal",
            price: 320,
            description: "Paneer and shallots in coconut-roast gravy.",
          },
          {
            name: "Navarathan Kurma",
            price: 320,
            description:
              "Seasonal vegetables in rich creamy gravy, garnished with fruits & nuts.",
          },
          {
            name: "Mushroom Masala / Mushroom Pepper Fry",
            price: 280,
            description: "Mushroom delicacy.",
          },
          {
            name: "Veg Chettinadu",
            price: 280,
            description: "Seasoned vegetables in roasted Chettinadu gravy.",
          },
          {
            name: "Palak Paneer",
            price: 320,
            description: "Paneer cooked with pureed spinach.",
          },
          {
            name: "Paneer Makhani / Jalfraizi",
            price: 320,
            description:
              "Stir-fried cottage cheese, North-Indian style preparation.",
          },
        ],
      },
      {
        category: "REGIONAL CUISINE",
        image: "/images/Dining/menu/regional.webp",
        items: [
          {
            name: "Biryani",
            price: "₹360/420/300",
            description:
              "Persian-inspired full meal with flavoured rice and meat.",
            variants: [
              { name: "Chicken", price: 360 },
              { name: "Mutton", price: 420 },
              { name: "Veg", price: 300 },
            ],
          },
          {
            name: "Kohinoor Special Prawns Biryani",
            price: 650,
            description: "Amritha's homely delicacy.",
          },
          {
            name: "Mutton Masala",
            price: 550,
            description: "Made with blend of spices.",
          },
          {
            name: "Mutton Chettinadu",
            price: 550,
            description: "Tender chunks of meat in Chettinadu spices.",
          },
          {
            name: "Mutton Mappas",
            price: 550,
            description: "Cooked in coconut milk.",
          },
          {
            name: "Duck Mappas",
            price: 600,
            description: "Duck cooked in coconut milk with spices & herbs.",
          },
          {
            name: "Duck Pepper Masala",
            price: 600,
            description: "Spring duck cooked in herbs & spices.",
          },
          {
            name: "Fish Moilee",
            price: 600,
            description: "Mildly spiced fish stew made with coconut milk.",
          },
          {
            name: "Fish Nirvana",
            price: 600,
            description: "Fish in ginger-coconut-milk sauce.",
          },
          {
            name: "Beef Pepper Fry",
            price: 380,
            description: "With crushed herbs and spices.",
          },
          {
            name: "Beef Dry Fry",
            price: 380,
            description: "In spicy aromatic masala.",
          },
          {
            name: "Egg Roast / Egg Masala / Scrambled Egg",
            price: 280,
            description: "Egg with spices and herbs.",
          },
          {
            name: "Chilly Egg / Egg Schezwan / Egg Manchurian",
            price: 280,
            description: "Chef-special egg in Chinese style.",
          },
        ],
      },
    ],
  },
  {
    collection: "Perfect Pairings",
    description:
      "Complete your meal with our selection of aromatic rice dishes and fresh-baked breads",
    icon: "🍞",
    categories: [
      {
        category: "RICE & BREAD",
        image: "/images/Dining/menu/riceandbread.jpg",
        items: [
          {
            name: "Steamed Rice",
            price: 160,
            description: "Fluffy, perfectly cooked plain rice.",
          },
          {
            name: "Pulao",
            price: "₹280/300/300",
            variants: [
              { name: "Veg", price: 280 },
              { name: "Kashmiri", price: 300 },
              { name: "Paneer", price: 300 },
            ],
          },
          {
            name: "Jeera Rice",
            price: 280,
            description: "Rice cooked with cumin seeds for a fragrant base.",
          },
          {
            name: "Kerala Parotta / Nool Parotta (1 no.)",
            price: 40,
            description: "Thin, flaky bread layered with butter.",
          },
          {
            name: "Chapathi / Phulka",
            price: 30,
            description: "Thin, crispy flatbread.",
          },
          {
            name: "Wheat Coin Parotta",
            price: 40,
            description: "Thin, crispy flatbread made with wheat flour.",
          },
          {
            name: "Appam / Egg Appam",
            price: "₹40/50",
            variants: [
              { name: "Regular", price: 40 },
              { name: "Egg", price: 50 },
            ],
          },
          {
            name: "Naan / Butter Naan",
            price: "₹40/50",
            variants: [
              { name: "Regular", price: 40 },
              { name: "Butter", price: 50 },
            ],
          },
          {
            name: "Kulcha",
            price: 50,
            description: "Soft, pillowy bread.",
          },
          {
            name: "Roti / Butter Roti",
            price: "₹40/50",
            variants: [
              { name: "Regular", price: 40 },
              { name: "Butter", price: 50 },
            ],
          },
          {
            name: "Naan — Peshwari / Kashmiri / Rogini",
            price: 60,
            description: "Traditional Indian flatbreads.",
          },
        ],
      },
      {
        category: "COMBO MEALS — Amritha Heritage Special",
        image: "/images/Dining/menu/combo.jpg",
        items: [
          {
            name: "Chilli Oyster Fish",
            price: 750,
            description:
              "With choice of veg. noodle or veg. fried rice & one scoop of ice cream.",
          },
          {
            name: "Schezwan Chicken",
            price: 650,
            description:
              "With choice of veg. noodle or veg. fried rice & one scoop of vanilla ice cream.",
          },
          {
            name: "Murg Makhani",
            price: 650,
            description:
              "With choice of veg. pulao or one butter naan with gulab jamun.",
          },
          {
            name: "Chicken Varutharachathu",
            price: 650,
            description:
              "Choice of 2 Kerala parotta or 3 chapathi with gulab jamun.",
          },
          {
            name: "Paneer Jalfraizi",
            price: 450,
            description:
              "With choice of veg. pulao or one butter naan and phulka with gulab jamun.",
          },
          {
            name: "Vegetable with Nuts",
            price: 450,
            description:
              "With choice of veg. noodle or veg. fried rice & one scoop of ice cream.",
          },
          {
            name: "Pal Cutty Ulli Thiyal",
            price: 450,
            description: "Choice of 3 appam or 2 chapathi with gulab jamun.",
          },
        ],
      },
    ],
  },
  {
    collection: "Sweet Ending",
    description:
      "End your dining experience on a delightful note with our exquisite desserts and refreshing beverages",
    icon: "🍰",
    categories: [
      {
        category: "DESSERTS",
        image: "/images/Dining/menu/desserts.jpg",
        items: [
          {
            name: "Vancho Pudding",
            price: 300,
            description: "Duets of white and dark chocolate.",
          },
          {
            name: "Caramel Bread Butter Pudding",
            price: 320,
            description: "Bread pudding with caramel sauce and butter.",
          },
          {
            name: "Coconut & Date Pie",
            price: 320,
            description: "Pie with coconut and date.",
          },
          {
            name: "Cut Fruits",
            price: 200,
            description: "Fresh fruits cut into pieces.",
          },
          {
            name: "Payasam of the Day",
            price: 180,
            description: "Traditional Indian sweet dish.",
          },
          {
            name: "Gulab Jamun",
            price: 180,
            description: "Traditional Indian sweet dessert.",
          },
          {
            name: "Choice of Ice Cream",
            price: 180,
            description: "Choice of ice cream.",
          },
          {
            name: "Fresh Fruit Salad / with Ice Cream",
            price: 240,
            description:
              "Fresh fruits cut into pieces and served with ice cream.",
          },
          {
            name: "Tender Coconut Soufflé",
            price: 320,
            description: "Tender coconut soufflé .",
          },
          {
            name: "Crème Caramel",
            price: 320,
            description: "Creamy caramel dessert.",
          },
        ],
      },
      {
        category: "BEVERAGES",
        image: "/images/Dining/menu/beverages.jpg",
        items: [
          {
            name: "Tea / Coffee",
            price: 80,
            description: "Choice of tea or coffee.",
          },
          {
            name: "Milkshakes with Ice Cream (Chocolate/Mango/Strawberry)",
            price: 180,
            description: "Choice of milkshake with ice cream.",
          },
          {
            name: "Fresh Lime",
            price: "₹80/₹120",
            variants: [
              { name: "Juice", price: 80 },
              { name: "Soda", price: 120 },
            ],
          },
          {
            name: "Fresh Fruit Juice",
            price: 200,
            description: "Choice of fresh fruit juice.",
          },
        ],
      },
    ],
  },
];

// Helper functions for working with the enhanced menu data
export const getCollectionsByName = (
  collectionName: string
): MenuCollection | undefined => {
  return menuData.find(
    (collection) => collection.collection === collectionName
  );
};

export const getAllCollections = (): string[] => {
  return menuData.map((collection) => collection.collection);
};

export const getMenuItemsByCategory = (category: string): MenuItem[] => {
  for (const collection of menuData) {
    const categoryData = collection.categories.find(
      (cat) => cat.category === category
    );
    if (categoryData) {
      return categoryData.items;
    }
  }
  return [];
};

export const getAllCategories = (): string[] => {
  const categories: string[] = [];
  menuData.forEach((collection) => {
    collection.categories.forEach((category) => {
      categories.push(category.category);
    });
  });
  return categories;
};

export const searchMenuItems = (searchTerm: string): MenuItem[] => {
  const results: MenuItem[] = [];

  menuData.forEach((collection) => {
    collection.categories.forEach((category) => {
      category.items.forEach((item) => {
        if (
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.description &&
            item.description.toLowerCase().includes(searchTerm.toLowerCase()))
        ) {
          results.push(item);
        }
      });
    });
  });

  return results;
};

export const getItemsByPriceRange = (
  minPrice: number,
  maxPrice: number
): MenuItem[] => {
  const results: MenuItem[] = [];

  menuData.forEach((collection) => {
    collection.categories.forEach((category) => {
      category.items.forEach((item) => {
        if (
          typeof item.price === "number" &&
          item.price >= minPrice &&
          item.price <= maxPrice
        ) {
          results.push(item);
        } else if (item.variants) {
          const hasItemInRange = item.variants.some(
            (variant) => variant.price >= minPrice && variant.price <= maxPrice
          );
          if (hasItemInRange) {
            results.push(item);
          }
        }
      });
    });
  });

  return results;
};

export const getItemsByCollection = (collectionName: string): MenuItem[] => {
  const results: MenuItem[] = [];
  const collection = menuData.find((c) => c.collection === collectionName);

  if (collection) {
    collection.categories.forEach((category) => {
      results.push(...category.items);
    });
  }

  return results;
};

export const getCategoriesByCollection = (
  collectionName: string
): MenuCategory[] => {
  const collection = menuData.find((c) => c.collection === collectionName);
  return collection ? collection.categories : [];
};

export const getVegetarianItems = (): MenuItem[] => {
  const vegetarianKeywords = [
    "veg",
    "paneer",
    "mushroom",
    "vegetable",
    "aloo",
    "gobi",
    "palak",
  ];
  const results: MenuItem[] = [];

  menuData.forEach((collection) => {
    collection.categories.forEach((category) => {
      category.items.forEach((item) => {
        if (
          vegetarianKeywords.some(
            (keyword) =>
              item.name.toLowerCase().includes(keyword) ||
              (item.description &&
                item.description.toLowerCase().includes(keyword))
          )
        ) {
          results.push(item);
        }
      });
    });
  });

  return results;
};

// Statistics functions
export const getMenuStatistics = () => {
  let totalItems = 0;
  let totalCategories = 0;
  let itemsWithVariants = 0;

  menuData.forEach((collection) => {
    totalCategories += collection.categories.length;
    collection.categories.forEach((category) => {
      totalItems += category.items.length;
      itemsWithVariants += category.items.filter(
        (item) => item.variants
      ).length;
    });
  });

  return {
    totalCollections: menuData.length,
    totalCategories,
    totalItems,
    itemsWithVariants,
    averageItemsPerCategory: Math.round(totalItems / totalCategories),
  };
};

// Featured Dishes Data
export const featuredDishes = [
  {
    id: "featured-1",
    name: "Beef with Onion",
    description:
      "Tenderloin cuts stir-fried with caramelized onions in semi-gravy",
    price: 420,
    image: "/images/Dining/featured/BEEF WITH ONION copy.jpg",
    category: "Heritage Special",
  },
  {
    id: "featured-2",
    name: "Chemeen Thengapal Soup",
    description: "Traditional Kerala prawn soup with coconut milk and spices",
    price: 380,
    image: "/images/Dining/featured/Chemeen Thengapal Soup copy.jpg",
    category: "Soup",
  },
  {
    id: "featured-3",
    name: "Chicken Mushroom Varutharachathu",
    description: "Chicken and mushroom cooked in roasted & ground gravy",
    price: 380,
    image: "/images/Dining/featured/Chicken Mushroom Varutharachathu copy.jpg",
    category: "Kerala Special",
  },
  {
    id: "featured-4",
    name: "Fish Malabari",
    description:
      "Sea-fresh seer fish tempered and simmered in coconut milk gravy",
    price: 600,
    image: "/images/Dining/featured/amritha FISH MALABARI copy.jpg",
    category: "Heritage Signature",
  },
  {
    id: "featured-5",
    name: "Amritha Roast Chicken",
    description: "Old-hotel Amritha-style roast served with potato lyonnaise",
    price: 450,
    image: "/images/Dining/featured/amritha roast chicken copy.jpg",
    category: "Heritage Signature",
  },
  {
    id: "featured-6",
    name: "Bami Goreng",
    description: "Indonesian noodles with chicken, egg and prawns",
    price: 370,
    image: "/images/Dining/featured/bamee goreng copy.jpg",
    category: "Oriental",
  },
  {
    id: "featured-7",
    name: "Broccoli Almond Soup",
    description: "Creamy broccoli soup with roasted almonds",
    price: 280,
    image: "/images/Dining/featured/broccoli almond soup copy.jpg",
    category: "Soup",
  },
  {
    id: "featured-8",
    name: "Caramel Bread Butter Pudding",
    description: "Bread pudding with caramel sauce and butter",
    price: 320,
    image: "/images/Dining/featured/caramel bread butter pudding copy.jpg",
    category: "Dessert",
  },
  {
    id: "featured-9",
    name: "Kuttanadan Fish Pops",
    description:
      "Marinated king fish chunks coated with panko crumbs & corn flakes",
    price: 580,
    image: "/images/Dining/featured/kuttanadan fish pops copy.jpg",
    category: "Appetizer",
  },
  {
    id: "featured-10",
    name: "Nasi Goreng",
    description: "Indonesian fried rice with chicken, egg and prawn",
    price: 350,
    image: "/images/Dining/featured/nasi goreng copy.jpg",
    category: "Oriental",
  },
  {
    id: "featured-11",
    name: "Niagra Chicken",
    description: "Chef's special chicken preparation with exotic spices",
    price: 380,
    image: "/images/Dining/featured/nigara chicken copy.jpg",
    category: "Special",
  },
];

// Export function to get featured dishes
export const getFeaturedDishes = () => {
  return featuredDishes;
};
