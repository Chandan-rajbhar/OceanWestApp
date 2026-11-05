import heroPearAi from '../assets/hero-pear-ai.jpg';
import heroSalmonAi from '../assets/hero-salmon-ai.jpg';
import heroBeefAi from '../assets/hero-beef-ai.jpg';
import heroTacosAi from '../assets/hero-tacos-ai.jpg';
import heroHalibutAi from '../assets/hero-halibut-ai.jpg';

// 5 Curated authentic dishes perfectly proportioned to fill the hero card
export const HERO_SLIDES = [
  {
    id: 1,
    image: heroPearAi,
    title: "Bosc Pear with Gorgonzola & Thyme-Infused Honey",
    course: "Executive Chef's Signature First Course • Pacific Northwest Harvest",
    alt: "Roasted Bosc Pear with Gorgonzola, Candied Walnuts, and Thyme-Infused Honey"
  },
  {
    id: 2,
    image: heroSalmonAi,
    title: "Wild Pacific Salmon with Citrus Herb Glaze",
    course: "Artisanal Main • Haida Gwaii Wild Catch & Fine Herbs",
    alt: "Pan-Seared Wild Pacific Salmon with Citrus Glaze and Braised Asparagus"
  },
  {
    id: 3,
    image: heroBeefAi,
    title: "Prime Angus Beef Medallions & Truffle Demi",
    course: "Artisanal Main • Slow-Roasted Alberta AAA Tenderloin",
    alt: "Prime Angus Beef Tenderloin Medallion with Black Garlic and Truffle Demi-Glace"
  },
  {
    id: 4,
    image: heroTacosAi,
    title: "Pacific Coast Street Canapés & Artisan Tacos",
    course: "Passed Cocktail Canapés • Late-Night Feature",
    alt: "Artisan Spot Prawn Tacos and Fresh Mango Salsa Canapés"
  },
  {
    id: 5,
    image: heroHalibutAi,
    title: "Pan-Seared Pacific Halibut & Golden Glaze",
    course: "Chef's Feature • Wild Harvest British Columbia",
    alt: "Pan-Seared Pacific Halibut with Saffron Citrus Glaze and Summer Vegetables"
  }
];

export const IMAGES = {
  wedding: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
  filmCraft: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
  gala: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
  platter: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80"
};

export const MENU_CATEGORIES = [
  {
    id: "starters",
    name: "Starters",
    image: heroPearAi,
    count: 4
  },
  {
    id: "dinner",
    name: "Main Course",
    image: heroSalmonAi,
    count: 5
  },
  {
    id: "desserts",
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80",
    count: 3
  },
  {
    id: "beverages",
    name: "Beverages",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
    count: 4
  },
  {
    id: "vegetarian",
    name: "Vegetarian",
    image: heroPearAi,
    count: 4
  },
  {
    id: "chef_specials",
    name: "Chef Specials",
    image: heroHalibutAi,
    count: 4
  }
];

export const MENU_COURSES = [
  {
    id: 101,
    title: "Seared Scallops",
    rate: "$28 / person",
    price: 28,
    category: "starters",
    isSignature: true,
    isChefSpecial: true,
    badges: [
      { text: "Signature", type: "gold" },
      { text: "Gluten Free", type: "green" },
      { text: "Seafood", type: "blue" }
    ],
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
    description: "Pan-seared scallops with cauliflower purée, seasonal greens and citrus beurre blanc.",
    ingredients: ["Scallops", "Cauliflower", "Seasonal Greens", "Citrus", "Butter", "Herbs"],
    allergens: ["Contains dairy (Butter)", "May contain shellfish (Scallops)"],
    allergenSafetyNote: "Contains dairy and shellfish. Prepared in a dedicated seafood station.",
    serviceStyle: "Plated Course & Platter"
  },
  {
    id: 102,
    title: "Herb Crusted Salmon",
    rate: "$32 / person",
    price: 32,
    category: "dinner",
    isSignature: true,
    isChefSpecial: false,
    badges: [
      { text: "Signature", type: "gold" },
      { text: "Gluten Free", type: "green" },
      { text: "Seafood", type: "blue" }
    ],
    image: heroSalmonAi,
    description: "Crispy herb-crusted wild salmon served with blistered shallots, lemon thyme emulsion, and asparagus.",
    ingredients: ["Wild BC Salmon", "Fresh Dill & Thyme", "Blistered Shallots", "Cold-Pressed Olive Oil", "Asparagus"],
    allergens: ["Fish (Salmon)"],
    allergenSafetyNote: "Naturally gluten-free. Dairy-free olive oil emulsion.",
    serviceStyle: "Plated Dinner Course"
  },
  {
    id: 1,
    title: "Roasted Anjou Pear with Gorgonzola",
    category: "starters",
    price: 18,
    image: heroPearAi,
    isSignature: true,
    isChefSpecial: false,
    badges: [
      { text: "VEGETARIAN", type: "green" },
      { text: "HAIDA GWAII ORIGIN", type: "tan" },
      { text: "SIGNATURE", type: "gold" }
    ],
    description: "Poached pear roasted in local lavender honey and Okanagan red wine reduction, served with whipped gorgonzola cream, candied pecans, and watercress.",
    ingredients: ["Anjou Pears", "Wildflower Honey", "Okanagan Red Wine", "Gorgonzola Cream", "Candied Pecans", "Watercress"],
    allergens: ["Dairy (Gorgonzola)", "Tree Nuts (Pecans)"],
    allergenSafetyNote: "Contains dairy and nuts. Nut-free substitution prepared upon request.",
    serviceStyle: "Plated Dinner & Buffet"
  },
  {
    id: 2,
    title: "Wild Pacific Salmon with Citrus Herb Glaze",
    category: "dinner",
    price: 30,
    image: heroSalmonAi,
    isSignature: true,
    isChefSpecial: false,
    badges: [
      { text: "PACIFIC OCEAN SEAFOOD", type: "blue" },
      { text: "GLUTEN-FREE", type: "green" },
      { text: "SIGNATURE", type: "gold" }
    ],
    description: "Pan-seared wild BC salmon glazed with blood orange and tarragon reduction, over parsnip purée with butter-braised asparagus.",
    ingredients: ["Line-Caught BC Salmon", "Blood Orange", "Fresh Tarragon", "Parsnip Purée", "Braised Asparagus"],
    allergens: ["Fish (Salmon)", "Dairy (Butter)"],
    allergenSafetyNote: "Dairy-free preparation available by substituting olive oil glaze.",
    serviceStyle: "Plated Dinner & Buffet"
  },
  {
    id: 3,
    title: "Prime Angus Beef Medallions & Truffle Demi",
    category: "dinner",
    price: 36,
    image: heroBeefAi,
    isSignature: false,
    isChefSpecial: true,
    badges: [
      { text: "ALBERTA AAA BEEF", type: "tan" },
      { text: "GLUTEN-FREE", type: "green" },
      { text: "CHEF SPECIAL", type: "gold" }
    ],
    description: "Slow-roasted tenderloin with black garlic crust, served over pomme purée with morel mushroom sauce and roasted heritage carrots.",
    ingredients: ["Alberta AAA Angus Tenderloin", "Black Garlic", "Morel Mushrooms", "Pomme Purée", "Heritage Carrots", "Truffle Demi-Glace"],
    allergens: ["Dairy (Pomme Purée)"],
    allergenSafetyNote: "Naturally gluten-free reduction. Dairy-free starch substitution available.",
    serviceStyle: "Plated Dinner Course"
  },
  {
    id: 4,
    title: "Pacific Coast Artisanal Grazing Board",
    category: "grazing",
    price: 95,
    isSignature: true,
    isChefSpecial: false,
    badges: [
      { text: "GRAZING TABLE", type: "tan" },
      { text: "VEGETARIAN & CHARCUTERIE", type: "green" },
      { text: "SIGNATURE", type: "gold" }
    ],
    description: "Smoked trout mousse, Salt Spring Island goat cheese, cured salumi, pickled samphire, Vancouver Island honeycomb, and organic artisan breads.",
    ingredients: ["Smoked Steelhead Trout", "Salt Spring Goat Cheese", "Local Charcuterie", "Vancouver Island Honeycomb", "Pickled Samphire", "Artisan Sourdough"],
    allergens: ["Dairy (Cheeses)", "Fish (Trout Mousse)", "Gluten (Breads)"],
    allergenSafetyNote: "Separate gluten-free crackers and nut-isolated platter provided simultaneously.",
    serviceStyle: "Grazing Table / Platter"
  },
  {
    id: 5,
    title: "Charred Spot Prawn & Mango Skewers",
    category: "canapes",
    price: 24,
    isSignature: true,
    isChefSpecial: false,
    badges: [
      { text: "CANAPÉS", type: "blue" },
      { text: "LOCALLY CAUGHT SPOT PRAWN", type: "tan" },
      { text: "SIGNATURE", type: "gold" }
    ],
    description: "Spot prawns glazed with kaffir lime, chili, and cilantro reduction, served with sweet mango salsa and coconut cream dipping sauce.",
    ingredients: ["Wild BC Spot Prawns", "Kaffir Lime", "Chili Glaze", "Fresh Mango Salsa", "Coconut Cream"],
    allergens: ["Shellfish (Prawns)"],
    allergenSafetyNote: "Contains shellfish. Strictly separated from non-seafood canapé trays.",
    serviceStyle: "Passed Cocktail Canapé"
  },
  {
    id: 6,
    title: "Caramelized Tahitian Vanilla Bean Brûlée",
    category: "desserts",
    price: 14,
    isSignature: false,
    isChefSpecial: false,
    badges: [
      { text: "PLATED DESSERT", type: "tan" },
      { text: "VEGETARIAN", type: "green" }
    ],
    description: "Silky Madagascar custard infused with Tahitian vanilla bean, topped with a crackling caramel shell, served with Cowichan Bay wild blackberries.",
    ingredients: ["Farm Egg Yolks", "Heavy Cream", "Tahitian Vanilla Beans", "Caramel Shell", "Cowichan Bay Blackberries"],
    allergens: ["Dairy (Cream)", "Eggs"],
    allergenSafetyNote: "Vegetarian and naturally gluten-free. Contains dairy and eggs.",
    serviceStyle: "Individual Dessert / Platter"
  },
  {
    id: 7,
    title: "Fraser Valley Farm Egg & Smoked Trout Frittata",
    category: "breakfast",
    price: 20,
    isSignature: false,
    isChefSpecial: true,
    badges: [
      { text: "BREAKFAST & BRUNCH", type: "tan" },
      { text: "GLUTEN-FREE", type: "green" },
      { text: "CHEF SPECIAL", type: "gold" }
    ],
    description: "Free-range Fraser Valley eggs whisked with hot-smoked Pacific trout, baby leeks, and Vancouver Island sheep feta. Served with roasted fingerling potatoes.",
    ingredients: ["Fraser Valley Free-Range Eggs", "Hot-Smoked Trout", "Baby Leeks", "Vancouver Island Feta", "Organic Fingerling Potatoes"],
    allergens: ["Eggs", "Fish (Trout)", "Dairy (Feta)"],
    allergenSafetyNote: "Naturally gluten-free. Dairy-free egg white scramble option available.",
    serviceStyle: "Hot Breakfast Buffet & Plated Brunch"
  },
  {
    id: 8,
    title: "Artisan Brioche Breakfast Sliders",
    category: "breakfast",
    price: 18,
    isSignature: false,
    isChefSpecial: false,
    badges: [
      { text: "BREAKFAST CALL", type: "tan" },
      { text: "CREW FAVORITE", type: "blue" }
    ],
    description: "Toasted house-made brioche buns with thick-cut double-smoked bacon, aged white cheddar, soft scrambled eggs, and Okanagan apple-chili relish.",
    ingredients: ["House Brioche", "Double-Smoked Bacon", "Aged BC White Cheddar", "Farm Eggs", "Apple-Chili Relish"],
    allergens: ["Gluten (Brioche)", "Dairy (Cheddar)", "Eggs"],
    allergenSafetyNote: "Vegetarian avocado substitution and gluten-free wraps available on request.",
    serviceStyle: "Passed Breakfast & Hot Station"
  },
  {
    id: 9,
    title: "Pacific Rim Wild Salmon & Soba Noodle Bowl",
    category: "lunch",
    price: 26,
    isSignature: false,
    isChefSpecial: true,
    badges: [
      { text: "LUNCH FEATURE", type: "blue" },
      { text: "DAIRY-FREE", type: "green" },
      { text: "CHEF SPECIAL", type: "gold" }
    ],
    description: "Grilled wild salmon fillet over chilled buckwheat soba noodles, crisp snap peas, shaved radish, and sesame-ginger vinaigrette with scallion oil.",
    ingredients: ["Wild BC Salmon", "Buckwheat Soba", "Snap Peas", "Daikon Radish", "Sesame Vinaigrette", "Scallion Oil"],
    allergens: ["Fish (Salmon)", "Sesame", "Soy"],
    allergenSafetyNote: "Dairy-free. Can be prepared gluten-free with certified tamari and 100% buckwheat.",
    serviceStyle: "Individual Boxed Lunch or Buffet Station"
  },
  {
    id: 10,
    title: "Artisanal Porchetta & Rosemary Focaccia Platter",
    category: "lunch",
    price: 32,
    isSignature: true,
    isChefSpecial: false,
    badges: [
      { text: "LUNCH BUFFET", type: "tan" },
      { text: "SIGNATURE", type: "gold" }
    ],
    description: "Slow-roasted Fraser Valley pork loin with crispy crackling and fennel-herb stuffing, carved thin on fresh rosemary sea salt focaccia with salsa verde.",
    ingredients: ["Fraser Valley Pork", "Rosemary Focaccia", "Fennel & Herbs", "Salsa Verde", "Arugula"],
    allergens: ["Gluten (Focaccia)"],
    allergenSafetyNote: "Gluten-free focaccia provided in individually sealed containers.",
    serviceStyle: "Carvery Station & Sandwich Platter"
  },
  {
    id: 11,
    title: "Pan-Seared Pacific Halibut & Saffron Glaze",
    category: "dinner",
    price: 34,
    isSignature: false,
    isChefSpecial: true,
    badges: [
      { text: "HAIDA GWAII HALIBUT", type: "blue" },
      { text: "GLUTEN-FREE", type: "green" },
      { text: "CHEF SPECIAL", type: "gold" }
    ],
    description: "Sustainably caught Haida Gwaii halibut with saffron citrus emulsion, served over creamy Meyer lemon risotto and baby fennel.",
    ingredients: ["Haida Gwaii Halibut", "Saffron Citrus Emulsion", "Arborio Rice", "Meyer Lemon", "Baby Fennel"],
    allergens: ["Fish (Halibut)", "Dairy (Risotto)"],
    allergenSafetyNote: "Dairy-free saffron broth alternative available upon request.",
    serviceStyle: "Plated Dinner Entrée"
  },
  {
    id: 12,
    title: "Wild Foraged Chanterelle & Truffle Tartlets",
    category: "canapes",
    price: 22,
    isSignature: false,
    isChefSpecial: false,
    badges: [
      { text: "CANAPÉS", type: "blue" },
      { text: "VEGETARIAN", type: "green" }
    ],
    description: "Flaky puff pastry tartlets filled with sautéed Vancouver Island chanterelles, black truffle mousse, and micro herbs.",
    ingredients: ["Foraged BC Chanterelles", "Puff Pastry", "Black Truffle Cream", "Thyme", "Micro Greens"],
    allergens: ["Gluten (Pastry)", "Dairy (Cream)"],
    allergenSafetyNote: "Vegetarian. Gluten-free polenta-base version available upon notice.",
    serviceStyle: "Warm Passed Cocktail Canapé"
  },
  {
    id: 13,
    title: "Cowichan Bay Blackberry & Hazelnut Galette",
    category: "desserts",
    price: 16,
    isSignature: true,
    isChefSpecial: false,
    badges: [
      { text: "SEASONAL DESSERT", type: "tan" },
      { text: "VEGETARIAN", type: "green" },
      { text: "SIGNATURE", type: "gold" }
    ],
    description: "Rustic butter crust baked with wild Cowichan Bay blackberries, Frangelico essence, and roasted Agassiz hazelnuts. Served with vanilla cream.",
    ingredients: ["Cowichan Wild Blackberries", "Rustic Butter Crust", "Agassiz Hazelnuts", "Frangelico", "House Whipped Cream"],
    allergens: ["Dairy (Crust & Cream)", "Gluten (Flour)", "Tree Nuts (Hazelnuts)"],
    allergenSafetyNote: "Contains hazelnuts and gluten. Nut-free individual berry crumbles provided on request.",
    serviceStyle: "Plated Dessert & Station Platter"
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "Chef Michael was a marvel for our 185-guest wedding banquet in South Surrey. The braised beef and wild salmon were talk of dinner for months. The entire team was gracious, impeccably organized, and ridiculously stress-free.",
    name: "Claire & Marcus Tremblay",
    role: "Wedding Clients • South Surrey, BC"
  },
  {
    id: 2,
    quote: "On a 22-day film shoot in Squamish and North Vancouver, Ocean West Catering kept 140 cast and crew energized, happy, and well-fed. Dietary needs were 100% verified. A triumph of precision. Outstanding team.",
    name: "Dave Henderson",
    role: "Production Manager • Paramount Pictures / Vancouver Film Studios"
  },
  {
    id: 3,
    quote: "Our annual corporate gala in Richmond required both strict gluten-free accommodation and fine dining execution. Ocean West delivered seamlessly. The presentation was breathtaking and the service was pristine.",
    name: "Sarah Liu",
    role: "Executive Director • Pacific Rim Tech Summit"
  }
];

export const PACKAGES = [
  {
    id: "intimate",
    categoryName: "The Intimate Gathering",
    badge: "Casual to Formal",
    rate: "From $85/Guest",
    description: "Ideal for small celebration dinners, micro-weddings, corporate executive retreats, and cocktail evenings in private venues or homes.",
    minGuests: "12–35 Guests",
    defaultGuestCount: "25",
    isMostRequested: false,
    features: [
      "Choice of 3-course plated dinner or 5 passed canapés",
      "Dedicated executive chef and professional service staff",
      "Coordination of rental dinnerware, glassware & flatware",
      "Custom dietary substitutions (vegan, gluten-free, halal)"
    ]
  },
  {
    id: "wedding",
    categoryName: "The Grand Wedding Banquet",
    badge: "Wedding & Gala",
    rate: "From $140/Guest",
    description: "Our signature luxury wedding dining experience. From bridal party arrivals to cocktail hour and late-night artisan food stations.",
    minGuests: "40–350 Guests",
    defaultGuestCount: "150",
    isMostRequested: true,
    features: [
      "Full 4-course artisanal plated or luxury family-style banquet",
      "Complete culinary team & minimum 4 professional waitstaff",
      "Cocktail hour canapé service (4 selections) + bridal party platter",
      "Full table settings, linens, and bar glassware management",
      "Late-night wedding slider/taco station experience"
    ]
  },
  {
    id: "film",
    categoryName: "Movie & Film Production",
    badge: "Film & Set Production",
    rate: "Daily Call Sheet Rates",
    description: "Reliable, high-energy, nutritious catering tailored for busy cast & crew with flexible call times and remote BC shoot locations.",
    minGuests: "Crew Size 25–400+ Daily",
    defaultGuestCount: "120",
    isMostRequested: false,
    features: [
      "100% bespoke hot breakfast, lunch, and dinner menus daily",
      "Continuous hot craft truck service & barista setup",
      "Rapid turnaround boxed lunches for off-grid shoots",
      "Fully compliant with BC Motion Picture film union meal guidelines"
    ]
  }
];

export const DISCIPLINES = [
  {
    id: "weddings",
    tag: "Weddings & Receptions",
    title: "Bespoke Wedding Feasts",
    image: IMAGES.wedding,
    desc: "Tailored to dietary requirements, multi-generational guest palettes, and personal style. Complemented with full bar coordination, sommelier pairings, and attentive white-glove table service.",
    scale: "25 to 500+ Guests",
    linkText: "Wedding Packages →",
    targetRoute: "/packages",
    features: [
      "Cocktail hour passed canapés + bridal suite private platter",
      "Choice of 3 to 5-course plated dinner or luxury family-style banquet",
      "Late-night gourmet slider bar & artisan taco stations"
    ]
  },
  {
    id: "film",
    tag: "Film & Television Production",
    title: "Film & Media Craft Services",
    image: IMAGES.filmCraft,
    desc: "High-speed hot craft trucks, 24/7 mobile commercial kitchens, and continuous artisanal catering designed for demanding cast and crew schedules anywhere in British Columbia.",
    scale: "24/7 Hot Craft Trucks",
    linkText: "Film Catering Specs →",
    targetRoute: "/film-catering",
    features: [
      "24/7 rolling hot tables and continuous Italian espresso bar",
      "Individually labeled dietary packaging for 200+ cast & crew",
      "IATSE 891, DGC BC, and Teamsters 155 compliant union standards"
    ]
  },
  {
    id: "galas",
    tag: "Corporate & Galas",
    title: "Galas & Executive Summits",
    image: IMAGES.gala,
    desc: "Flawless execution for high-stakes corporate conferences, award galas, premier brand launches, and diplomatic summits demanding discretion, precision timing, and culinary distinction.",
    scale: "Up to 1,200 Guests",
    linkText: "Corporate Proposal →",
    targetRoute: "/inquiry",
    features: [
      "Simultaneous plated service for up to 1,200 delegates",
      "Bespoke branded cocktails and customized menu typography",
      "Executive VIP green room and board luncheon priority service"
    ]
  },
  {
    id: "platters",
    tag: "Casual & Private",
    title: "Party Platters & BBQs",
    image: IMAGES.platter,
    desc: "Curated grazing boards, artisanal charcuterie platters, and casual wood-fired barbecues for intimate family milestones, summer vineyard parties, and corporate team mixers.",
    scale: "Drop-off & Set Service",
    linkText: "Browse Platter Menus →",
    targetRoute: "/courses",
    features: [
      "Artisan BC cheeses, cured meats, and freshly baked sourdoughs",
      "White-glove delivery, styling, setup, or full live grilling chefs",
      "Eco-friendly bamboo compostable or luxury ceramic presentation"
    ]
  }
];

export const DIETARY_OPTIONS = [
  { id: "gf", label: "Gluten-Free (Celiac Safe)" },
  { id: "veg", label: "Vegetarian" },
  { id: "vegan", label: "Plant-Based / Vegan" },
  { id: "df", label: "Dairy-Free" },
  { id: "halal", label: "Halal Prepared" },
  { id: "kosher", label: "Kosher Friendly" },
  { id: "nut_free", label: "Nut / Peanut Free" },
  { id: "seafood_free", label: "Shellfish / Seafood Free" },
  { id: "low_sodium", label: "Low Sodium" },
  { id: "other", label: "Other Allergies" }
];

export const CONTACT_INFO = {
  directPhone: "604-722-4857",
  officePhone: "604-456-4481",
  email: "info@oceanwestcatering.com",
  commissaryAddress: "482 Panorama, Richmond, BC V6X 0E7",
  hours: "Monday–Friday 8:00 AM – 6:00 PM PST",
  mapsQuery: "https://www.google.com/maps/search/?api=1&query=482+Panorama+Richmond+BC+V6X+0E7"
};

// Curated Gallery Collection using local photography & verified event imagery
export const GALLERY_PHOTOS = [
  {
    id: 'dish-pear',
    category: 'dishes',
    title: 'Roasted Bosc Pear with Gorgonzola',
    courseType: 'Signature First Course',
    image: heroPearAi,
    alt: 'Roasted Bosc Pear with Gorgonzola, Candied Walnuts, and Thyme-Infused Honey',
    caption: 'Haida Gwaii wildflower honey and Okanagan red wine reduction with whipped gorgonzola cream.'
  },
  {
    id: 'dish-salmon',
    category: 'dishes',
    title: 'Wild Pacific Salmon with Citrus Herb Glaze',
    courseType: 'Artisanal Main Course',
    image: heroSalmonAi,
    alt: 'Pan-Seared Wild Pacific Salmon with Citrus Glaze and Braised Asparagus',
    caption: 'Haida Gwaii line-caught wild salmon with blood orange reduction over parsnip purée.'
  },
  {
    id: 'dish-beef',
    category: 'dishes',
    title: 'Prime Angus Beef Medallions & Truffle Demi',
    courseType: 'Artisanal Main Course',
    image: heroBeefAi,
    alt: 'Prime Angus Beef Tenderloin Medallion with Black Garlic and Truffle Demi-Glace',
    caption: 'Slow-roasted Alberta AAA tenderloin, morel mushroom sauce, and pomme purée.'
  },
  {
    id: 'dish-tacos',
    category: 'dishes',
    title: 'Pacific Coast Spot Prawn Tacos',
    courseType: 'Passed Cocktail Canapé',
    image: heroTacosAi,
    alt: 'Artisan Spot Prawn Tacos with Mango Salsa and Lime Crema',
    caption: 'Locally caught spot prawns with kaffir lime, cilantro reduction, and sweet mango salsa.'
  },
  {
    id: 'dish-halibut',
    category: 'dishes',
    title: 'Pan-Seared Pacific Halibut & Golden Glaze',
    courseType: "Chef's Feature Entrée",
    image: heroHalibutAi,
    alt: 'Pan-Seared Pacific Halibut with Saffron Citrus Glaze and Summer Vegetables',
    caption: 'Fresh BC halibut with saffron citrus glaze and tender summer garden vegetables.'
  },
  {
    id: 'event-wedding',
    category: 'weddings',
    title: 'Bespoke Waterfront Wedding Banquet',
    courseType: 'The Grand Wedding Banquet',
    image: IMAGES.wedding,
    alt: 'Outdoor Waterfront Wedding Dining Table Setting with Florals and Candlelight',
    caption: 'Full multi-course artisanal dinner, cocktail hour passed canapés, and sommelier wine service.'
  },
  {
    id: 'event-film',
    category: 'film',
    title: 'Mobile Galley Truck On-Set Production',
    courseType: 'Movie & Film Production Craft Services',
    image: IMAGES.filmCraft,
    alt: 'Film and Television On-Location Craft Catering Mobile Kitchen and Hot Table',
    caption: 'Continuous 14-hour hot meals, rolling craft tables, and Italian espresso bar for film crews.'
  },
  {
    id: 'event-gala',
    category: 'corporate',
    title: 'Executive Summit Plated Dinner',
    courseType: 'Galas & Executive Summits',
    image: IMAGES.gala,
    alt: 'Corporate Gala Ballroom Plated Dinner Table Setup in Richmond',
    caption: 'Synchronized simultaneous plated service for high-stakes conferences and corporate award dinners.'
  },
  {
    id: 'event-platter',
    category: 'platters',
    title: 'Artisanal Charcuterie & Grazing Table',
    courseType: 'Party Platters & Casual BBQ',
    image: IMAGES.platter,
    alt: 'Pacific Coast Artisanal Cheese and Charcuterie Grazing Table Presentation',
    caption: 'Salt Spring Island goat cheese, cured meats, honeycomb, and house-pickled samphire.'
  }
];

// Serving-Size & Quantity Planning Guidelines
export const SERVING_GUIDELINES = {
  canapes: {
    title: 'Passed Cocktail Canapés',
    preDinner: '4 to 6 bites per guest (1–1.5 hour cocktail hour before seated meal)',
    cocktailParty: '10 to 14 bites per guest (for stand-up evening reception replacing dinner)',
    notes: 'Includes selection of warm seafood skewers, cold canapés, and vegetarian tartlets.'
  },
  platedDinner: {
    title: 'Artisanal Plated Dinner',
    portion: '3 to 4 courses: Starter (4 oz), Main Protein (6–8 oz), Starch & Seasonal Greens (5 oz), Dessert (3 oz)',
    notes: 'Individually plated with custom dietary substitutions prepared simultaneously.'
  },
  grazingBoard: {
    title: 'Artisanal Grazing Tables & Platters',
    portion: '3 to 4.5 oz of cheeses, smoked seafood, and cured meats per person + artisan bread & crisps',
    notes: 'Stylized on reclaimed wood boards or luxury ceramic with seasonal edible florals.'
  },
  lateNight: {
    title: 'Late-Night Celebration Station',
    portion: '1.25 to 1.5 portions per guest (calculated for approximately 75% of remaining guests)',
    notes: 'Popular choices include artisan slider bars and BC spot prawn street tacos.'
  },
  filmCraft: {
    title: 'Film & Media Production Days',
    portion: '2 complete hot meal calls (breakfast & lunch/dinner) + continuous craft truck service per 12–14 hr shoot day',
    notes: 'All items individually portioned and labeled for rapid union meal windows.'
  }
};

// Event Planning Checklist Milestones
export const CHECKLIST_MILESTONES = [
  {
    id: 'milestone-1',
    title: 'Submit Initial Event Inquiry',
    timeline: '6–12 months prior',
    description: 'Submit your target date, estimated guest count, and event category to secure preliminary hold.',
    category: 'booking'
  },
  {
    id: 'milestone-2',
    title: 'Consultation with Chef Michael Thomas',
    timeline: '5–8 months prior',
    description: 'Discuss culinary vision, seasonal ingredient availability, service format, and venue parameters.',
    category: 'planning'
  },
  {
    id: 'milestone-3',
    title: 'Chef Tasting & Menu Curation',
    timeline: '3–6 months prior',
    description: 'Sample candidate first courses, wild catch entrées, and wine pairings at our Richmond commissary.',
    category: 'tasting'
  },
  {
    id: 'milestone-4',
    title: 'Collect Dietary & Allergy Restrictions',
    timeline: '4–6 weeks prior',
    description: 'Gather specific guest requirements: celiac/gluten-free, vegan, halal, and severe anaphylactic allergies.',
    category: 'dietary'
  },
  {
    id: 'milestone-5',
    title: 'Submit Final Guaranteed Guest Count',
    timeline: '14 days prior',
    description: 'Confirm the exact guest count for kitchen ingredient procurement and service staff scheduling.',
    category: 'logistics'
  },
  {
    id: 'milestone-6',
    title: 'Coordinate Venue Kitchen & Power Access',
    timeline: '7 days prior',
    description: 'Verify kitchen prep tables, electrical hookups, loading dock clearance, or generator truck access.',
    category: 'venue'
  },
  {
    id: 'milestone-7',
    title: 'Event-Day Execution & Service Sign-off',
    timeline: 'Day of Event',
    description: 'On-site executive chef arrival, rolling hot galley prep, attentive table service, and complete clean-down.',
    category: 'event'
  }
];

// Package Comparison Data
export const PACKAGE_COMPARISON = [
  {
    id: 'intimate',
    name: 'The Intimate Gathering',
    baseRate: '$85 / Guest',
    rateNumeric: 85,
    pricingType: 'published',
    guestRange: '12–35 Guests',
    minGuests: 12,
    maxGuests: 35,
    serviceFormat: '3-Course Plated or 5 Passed Canapés',
    staffingIncluded: '1 Executive Chef + 1 Dedicated Captain',
    tableSettings: 'Dinnerware, flatware & glassware coordination included',
    dietaryAdaptation: 'Custom 100% dietary substitutions included',
    lateNightStation: 'Optional add-on',
    bestFor: 'Private estates, executive retreats & micro-weddings'
  },
  {
    id: 'wedding',
    name: 'The Grand Wedding Banquet',
    baseRate: '$140 / Guest',
    rateNumeric: 140,
    pricingType: 'published',
    guestRange: '40–350 Guests',
    minGuests: 40,
    maxGuests: 350,
    serviceFormat: '4-Course Artisanal Plated or Luxury Family-Style',
    staffingIncluded: 'Full culinary team + minimum 4 professional waitstaff',
    tableSettings: 'Full table settings, linens, and bar glassware management',
    dietaryAdaptation: 'Full bespoke dietary packaging & allergen protocols',
    lateNightStation: 'Included (Late-night slider or taco station)',
    bestFor: 'Full-scale wedding receptions, galas & milestone celebrations'
  },
  {
    id: 'film',
    name: 'Movie & Film Production',
    baseRate: 'Daily Call Sheet Rates',
    rateNumeric: null,
    pricingType: 'quote_required',
    guestRange: '25–400+ Crew Daily',
    minGuests: 25,
    maxGuests: 450,
    serviceFormat: 'Continuous 14-Hour Hot Galley & Rolling Meal Calls',
    staffingIncluded: 'Mobile galley chefs, craft truck driver & barista',
    tableSettings: 'Self-contained commercial mobile kitchen trucks',
    dietaryAdaptation: 'Individually labeled union-compliant dietary packaging',
    lateNightStation: 'Second meal wraps & late night turnaround included',
    bestFor: 'Feature film, television series & commercial locations across BC'
  }
];




// --------------------------------------------------------------------------
// 7 Occasion Profiles for Discovery & Custom Inquiries (Module 1 & 3)
// --------------------------------------------------------------------------
export const OCCASIONS = [
  {
    id: "weddings",
    name: "Weddings & Receptions",
    badge: "Most Requested",
    description: "Bespoke plated feasts, passed canapés, sommelier wine pairing, and late-night culinary stations.",
    recommendedGuests: "40–350",
    serviceStyle: "plated",
    packageId: "wedding"
  },
  {
    id: "corporate",
    name: "Corporate & Galas",
    badge: "Executive Service",
    description: "Executive summits, awards galas, shareholder banquets, and VIP boardroom luncheons with precision timing.",
    recommendedGuests: "30–500+",
    serviceStyle: "plated",
    packageId: "wedding"
  },
  {
    id: "birthdays",
    name: "Birthday Parties & Milestones",
    badge: "Celebration",
    description: "Celebratory passed cocktail fare, curated artisanal grazing tables, and custom dessert stations.",
    recommendedGuests: "15–100",
    serviceStyle: "cocktail",
    packageId: "intimate"
  },
  {
    id: "private_dining",
    name: "Private Dining & Estates",
    badge: "Exclusive Chef",
    description: "Exclusive multi-course dinners prepared live by Executive Chef Michael Thomas in private residences.",
    recommendedGuests: "8–24",
    serviceStyle: "plated",
    packageId: "intimate"
  },
  {
    id: "family",
    name: "Family Gatherings & Reunions",
    badge: "Warm Feasts",
    description: "Abundant harvest-style platters, multi-generational feasts, and wood-fired artisanal outdoor spreads.",
    recommendedGuests: "20–80",
    serviceStyle: "buffet",
    packageId: "intimate"
  },
  {
    id: "film",
    name: "Film & Production Craft",
    badge: "24/7 Hot Galley",
    description: "Continuous rolling hot tables, high-velocity craft trucks, and IATSE/DGC union-compliant boxed meals.",
    recommendedGuests: "25–400+",
    serviceStyle: "craft services",
    packageId: "film"
  },
  {
    id: "custom",
    name: "Other Custom Events",
    badge: "Bespoke Service",
    description: "Bespoke winery receptions, brand activations, coastal alfresco banquets, and customized celebrations.",
    recommendedGuests: "Custom",
    serviceStyle: "buffet",
    packageId: "intimate"
  }
];

// --------------------------------------------------------------------------
// Seasonal Menus & Special Culinary Offerings (Module 1)
// --------------------------------------------------------------------------
export const SEASONAL_MENUS = [
  {
    id: "spring_summer",
    title: "Pacific Coast Spring & Summer Bounty",
    season: "May through September",
    status: "Active Reservation Season",
    description: "Spot prawns, line-caught wild salmon, Haida Gwaii halibut, and heirloom berries from Cowichan Valley.",
    highlights: ["Chilled Spot Prawn Ceviche", "Wild Salmon with Citrus Reduction", "Tahitian Vanilla Brûlée"],
    availabilityNote: "Booking peak weekend dates 4–8 months in advance."
  },
  {
    id: "autumn_harvest",
    title: "Autumn Wild Harvest & Foraged Mushroom",
    season: "October through November",
    status: "Fall Bookings Open",
    description: "Slow-roasted Alberta AAA tenderloin, foraged BC morels and chanterelles, roasted Bosc pears, and root vegetable purées.",
    highlights: ["Bosc Pear with Gorgonzola", "Angus Beef Medallions", "Wild Truffle Tartlets"],
    availabilityNote: "Ideal for indoor vineyard banquets and intimate estate dinners."
  },
  {
    id: "winter_gala",
    title: "Winter Executive Gala & Holiday Banquets",
    season: "November through January",
    status: "Holiday Reservation Window",
    description: "Festive multi-course plated galas, spiced Okanagan red wine reductions, artisanal charcuterie boards, and decadent desserts.",
    highlights: ["Artisan Grazing Table", "Alberta Tenderloin", "Tahitian Vanilla Brûlée"],
    availabilityNote: "Corporate holiday calendar is filling quickly; inquire early."
  }
];

// --------------------------------------------------------------------------
// Personalized Culinary Experiences & Chef Portfolio (Module 4)
// --------------------------------------------------------------------------
export const CULINARY_EXPERIENCES = [
  {
    id: "private_chef",
    title: "Private Chef Estate Experience",
    subtitle: "Executive Chef Michael Thomas Table-Side",
    image: IMAGES.wedding,
    desc: "An exclusive culinary experience in your private residence or rented estate. Chef Michael curates and cooks a personalized 4 to 6-course seasonal menu with course-by-course presentation.",
    scale: "8 to 24 Guests",
    inclusions: [
      "Custom multi-course menu design around dietary preferences",
      "Table-side plating & storytelling by Chef Michael Thomas",
      "Full kitchen staging, linen service & spotless clean-down"
    ],
    experienceType: "Private Chef Request"
  },
  {
    id: "live_stations",
    title: "Live Interactive Culinary Stations",
    subtitle: "Action Cooking & Searing",
    image: IMAGES.platter,
    desc: "Engage guests with sensory action stations: live cedar-planked wild salmon smoking, spot prawn flambé with Okanagan spirits, and hand-carved heritage beef stations.",
    scale: "40 to 500+ Guests",
    inclusions: [
      "Live chef attendants at interactive food stations",
      "Artisan carving stations with house-made jus & demis",
      "Custom bamboo compostable or fine china presentation"
    ],
    experienceType: "Live Cooking Stations"
  },
  {
    id: "curated_tasting",
    title: "Chef-Curated Tasting Menus",
    subtitle: "Multi-Sensory Pacific Northwest Degustation",
    image: IMAGES.gala,
    desc: "A formal 4 or 6-course gastronomic tasting showcasing British Columbia's micro-regions—from Haida Gwaii seafood to Fraser Valley duck and Okanagan vineyard pairings.",
    scale: "12 to 120 Guests",
    inclusions: [
      "Sommelier-curated BC VQA wine pairings for each course",
      "Bespoke printed menus with guest naming",
      "Simultaneous fine-dining synchronized service"
    ],
    experienceType: "Chef-Curated Tasting Menus"
  },
  {
    id: "custom_dining",
    title: "Customized Waterfront & Outdoor Banquets",
    subtitle: "Coastal British Columbia Alfresco Dining",
    image: IMAGES.wedding,
    desc: "Bespoke dining setups on oceanfront beaches, private docks, and remote vineyard bluffs. Self-sufficient mobile culinary staging ensures five-star dining in any landscape.",
    scale: "20 to 250 Guests",
    inclusions: [
      "Complete mobile kitchen setup with independent power",
      "Weather-resilient luxury dining coordination",
      "Local seasonal seafood and artisan farm pairings"
    ],
    experienceType: "Customized Dining Experiences"
  }
];

// --------------------------------------------------------------------------
// Event Customization Options (Module 5)
// --------------------------------------------------------------------------
export const CUSTOMIZATION_OPTIONS = {
  serviceStyles: [
    { id: "plated", label: "Plated Multi-Course", desc: "Formal seated individual courses served simultaneously" },
    { id: "family_style", label: "Luxury Family-Style", desc: "Elegantly plated sharing platters placed at center of tables" },
    { id: "buffet", label: "Artisan Buffet Stations", desc: "Attended hot stations and chilled presentation tables" },
    { id: "cocktail", label: "Cocktail Reception", desc: "Continuous passed canapés and stationary grazing boards" },
    { id: "grazing", label: "Artisan Grazing Table", desc: "Abundant styled boards with local cheeses, cured meats & breads" },
    { id: "craft", label: "Continuous Craft Services", desc: "Rolling 14-hour hot galley for film & media production" }
  ],
  tableSetups: [
    { id: "rustic_pnw", label: "Rustic Pacific Northwest", desc: "Natural reclaimed cedar boards, warm linen, and muted gold accents" },
    { id: "modern_minimal", label: "Modern Minimalist", desc: "Crisp white porcelain, brushed brass cutlery, and clean geometry" },
    { id: "coastal_formal", label: "Coastal Formal Banquet", desc: "Formal bone china, crystal stemware, and white-glove table appointments" },
    { id: "vineyard_casual", label: "Vineyard Alfresco", desc: "Casual stoneware, olivewood boards, and bistro glassware" }
  ],
  staffingOptions: [
    { id: "chef_only", label: "Executive Chef Only", desc: "Chef Michael prepares and plates; host manages table service" },
    { id: "chef_captain", label: "Chef + Dining Captain", desc: "Executive chef plus dedicated service captain for seamless flow" },
    { id: "full_team", label: "Full White-Glove Team", desc: "Complete culinary crew and 1 professional server per 12–15 guests" },
    { id: "craft_crew", label: "Film Galley Crew", desc: "Mobile kitchen truck drivers, line chefs, and barista attendants" }
  ],
  beveragePreferences: [
    { id: "bc_wine", label: "BC VQA Sommelier Pairings", desc: "Okanagan and Similkameen Valley boutique winery pairings" },
    { id: "craft_beer_cider", label: "Pacific NW Craft Beer & Cider", desc: "Locally brewed microbrews and small-batch heritage ciders" },
    { id: "zero_proof", label: "Artisanal Mocktails & Espresso", desc: "Botanical cold-pressed sodas, fresh shrubs & Italian espresso bar" },
    { id: "client_supplied", label: "Host-Supplied Alcohol", desc: "Client provides alcohol; Ocean West supplies certified Serving It Right bartenders" }
  ],
  decorPreferences: [
    { id: "wildflowers", label: "Seasonal British Columbia Wildflowers", desc: "Hand-arranged regional seasonal florals in ceramic vases" },
    { id: "candles", label: "Floating Candlelight & Brass Candelabras", desc: "Warm ambient candlelight along banquet tables" },
    { id: "printed_menus", label: "Bespoke Printed Menus", desc: "Custom cardstock with event typography and client monogram" },
    { id: "driftwood_evergreen", label: "Coastal Driftwood & Evergreen Sprigs", desc: "Subtle forest textures reflecting the Pacific Northwest shoreline" }
  ]
};


// --------------------------------------------------------------------------
// Chef Michael Thomas Profile & Portfolio (Module 4)
// --------------------------------------------------------------------------
export const CHEF_PROFILE = {
  name: "Executive Chef Michael Thomas",
  title: "Founder & Culinary Director",
  headquarters: "Ocean West Commissary, Richmond, British Columbia",
  experienceYears: "20+ Years Fine Dining & High-Volume Production",
  credentials: [
    "Canadian Red Seal Certified Executive Chef",
    "B.C. FoodSafe Level 2 Certified & Allergen Protocol Lead",
    "Serving It Right Certified Responsible Alcohol Management",
    "Ocean Wise Seafood Culinary Ambassador Partner"
  ],
  bio: "Chef Michael Thomas brings two decades of celebrated West Coast dining expertise to Ocean West Catering. Having led luxury hotel kitchens and Vancouver high-end banquet operations, Chef Michael specializes in hyper-local British Columbia provenance—working directly with Haida Gwaii sustainable halibut longliners, Fraser Valley heritage livestock growers, and Okanagan Valley vintners. Whether cooking an intimate 10-guest beachfront tasting or directing a 450-crew hot production galley on remote film locations, Chef Michael delivers culinary excellence with flawless operational discipline.",
  specialties: [
    "Pacific Northwest Indigenous & Coastal Seafood Gastronomy",
    "Wood-Smoke & Open-Fired Artisanal Banquet Plating",
    "Hyper-Seasonal 5-Course Wine-Paired Tasting Experiences",
    "Comprehensive Allergy-Safe & Dietary-Specific Menu Execution",
    "24/7 Mobile Hot Galley Logistics for Motion Picture Productions"
  ],
  quote: "Exceptional catering isn't just about delicious food—it's about orchestrating an unforgettable sensory journey rooted in the wild ingredients of British Columbia."
};

// --------------------------------------------------------------------------
// Cart & Menu Pricing Helpers
// --------------------------------------------------------------------------
export function getDishPrice(dish) {
  if (!dish) return 0;
  if (typeof dish.price === 'number') return dish.price;
  if (typeof dish.rate === 'string') {
    const parsed = parseInt(dish.rate.replace(/\D/g, ''), 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  const match = MENU_COURSES.find((c) => c.id === dish.id);
  if (match && typeof match.price === 'number') return match.price;
  if (dish.category === 'starters') return 18;
  if (dish.category === 'dinner' || dish.category === 'mains') return 30;
  if (dish.category === 'grazing' || dish.category === 'platters') return 95;
  if (dish.category === 'lunch') return 24;
  if (dish.category === 'breakfast') return 20;
  if (dish.category === 'canapes') return 22;
  if (dish.category === 'desserts') return 14;
  return 24;
}

export function calculateCartTotal(dishes) {
  if (!Array.isArray(dishes)) return 0;
  return dishes.reduce((sum, dish) => sum + getDishPrice(dish), 0);
}

export function getDishImage(dish) {
  if (!dish) return HERO_SLIDES[0].image;
  if (dish.image) return dish.image;
  if (dish.id === 1 || dish.id === '1') return heroPearAi;
  if (dish.id === 2 || dish.id === '2') return heroSalmonAi;
  if (dish.id === 3 || dish.id === '3') return heroBeefAi;
  if (dish.id === 4 || dish.id === '4') return heroTacosAi;
  if (dish.id === 5 || dish.id === '5') return heroHalibutAi;
  if (dish.category === 'desserts') return 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80';
  if (dish.category === 'canapes' || dish.category === 'grazing' || dish.category === 'platters') return IMAGES.platter;
  if (dish.category === 'lunch') return heroSalmonAi;
  if (dish.category === 'breakfast') return heroPearAi;
  return heroPearAi;
}
