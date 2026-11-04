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

export const MENU_COURSES = [
  {
    id: 1,
    title: "Roasted Anjou Pear with Gorgonzola",
    category: "starters",
    badges: [
      { text: "VEGETARIAN", type: "green" },
      { text: "HAIDA GWAII ORIGIN", type: "tan" }
    ],
    description: "Poached pear roasted in local lavender honey and Okanagan red wine reduction, served with whipped gorgonzola cream, candied pecans, and watercress.",
    serviceStyle: "Plated Dinner & Buffet"
  },
  {
    id: 2,
    title: "Wild Pacific Salmon with Citrus Herb Glaze",
    category: "mains",
    badges: [
      { text: "PACIFIC OCEAN SEAFOOD", type: "blue" },
      { text: "GLUTEN-FREE", type: "green" }
    ],
    description: "Pan-seared wild BC salmon glazed with blood orange and tarragon reduction, over parsnip purée with butter-braised asparagus.",
    serviceStyle: "Plated Dinner & Buffet"
  },
  {
    id: 3,
    title: "Prime Angus Beef Medallions & Truffle Demi",
    category: "mains",
    badges: [
      { text: "ALBERTA AAA BEEF", type: "tan" },
      { text: "GLUTEN-FREE", type: "green" }
    ],
    description: "Slow-roasted tenderloin with black garlic crust, served over pomme purée with morel mushroom sauce and roasted heritage carrots.",
    serviceStyle: "Plated Dinner Course"
  },
  {
    id: 4,
    title: "Pacific Coast Artisanal Grazing Board",
    category: "grazing",
    badges: [
      { text: "GRAZING TABLE", type: "tan" },
      { text: "VEGETARIAN & CHARCUTERIE OPTIONS", type: "green" }
    ],
    description: "Smoked trout mousse, Salt Spring Island goat cheese, cured salumi, pickled samphire, Vancouver Island honeycomb, and organic artisan breads.",
    serviceStyle: "Grazing Table / Platter"
  },
  {
    id: 5,
    title: "Charred Spot Prawn & Mango Skewers",
    category: "canapes",
    badges: [
      { text: "CANAPÉS", type: "blue" },
      { text: "LOCALLY CAUGHT SPOT PRAWN", type: "tan" }
    ],
    description: "Spot prawns glazed with kaffir lime, chili, and cilantro reduction, served with sweet mango salsa and coconut cream dipping sauce.",
    serviceStyle: "Passed Cocktail Canapé"
  },
  {
    id: 6,
    title: "Caramelized Tahitian Vanilla Bean Brûlée",
    category: "desserts",
    badges: [
      { text: "PLATED DESSERT", type: "tan" },
      { text: "VEGETARIAN", type: "green" }
    ],
    description: "Silky Madagascar custard infused with Tahitian vanilla bean, topped with a crackling caramel shell, served with Cowichan Bay wild blackberries.",
    serviceStyle: "Individual Dessert / Platter"
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


