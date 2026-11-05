export const INITIAL_DEMO_BOOKINGS = [
  {
    id: 'OWC-2025-8841',
    referenceNumber: 'OWC-2025-8841',
    eventType: 'Weddings & Receptions',
    serviceId: 'weddings',
    eventDate: '2025-08-16',
    eventTime: '16:00',
    guestCount: 110,
    city: 'Richmond',
    venueName: 'UBC Boathouse',
    venueSetting: 'Indoor & Waterfront Deck',
    cateringStyle: 'Buffet Style',
    dietaryNotes: '12 Gluten-Free guests, 8 Vegetarian, 2 Shellfish Allergies',
    specialRequests: 'Would love the Grand Pacific Seafood Platter as the buffet centerpiece during cocktail hour.',
    customer: {
      firstName: 'David',
      lastName: 'Sterling',
      email: 'david.sterling@example.com',
      phone: '604-555-0192',
      company: ''
    },
    selectedMenuItems: [
      { id: 'buf-1', name: 'West Coast Coastal Buffet' },
      { id: 'plt-1', name: 'Grand Pacific Seafood Platter' },
      { id: 'hho-1', name: 'Jumbo Prawns in Garlic & White Wine' },
      { id: 'fst-1', name: 'Baked Pear with Blue Cheese & Honey' }
    ],
    status: 'Quote Prepared',
    createdAt: '2025-02-14T10:30:00Z',
    notesFromChef: 'Chef Michael Thomas has reviewed your UBC Boathouse layout. Quote proposal with seasonal spot prawns is ready for your review.'
  },
  {
    id: 'OWC-2025-6219',
    referenceNumber: 'OWC-2025-6219',
    eventType: 'Movie & Film Catering',
    serviceId: 'film',
    eventDate: '2025-06-22',
    eventTime: '12:00',
    guestCount: 140,
    city: 'Vancouver',
    venueName: 'North Shore Soundstage 4',
    venueSetting: 'Indoor & Mobile Kitchen Pad',
    cateringStyle: 'Mobile Kitchen Buffet',
    dietaryNotes: 'Vegan & Keto options required for crew department heads',
    specialRequests: 'Teamsters 155 truck required on location by 05:30 for hot breakfast scramble before 12:00 lunch call.',
    customer: {
      firstName: 'Samantha',
      lastName: 'Wong',
      email: 's.wong@pacificproductions.ca',
      phone: '604-555-8314',
      company: 'Pacific Tide Feature Productions'
    },
    selectedMenuItems: [
      { id: 'lun-4', name: 'Film Crew Power Lunch Box' },
      { id: 'bbq-2', name: 'Chicken & Ribs BBQ Combo' },
      { id: 'brk-1', name: 'Pacific Sunrise Hot Breakfast' }
    ],
    status: 'Confirmed',
    createdAt: '2025-01-20T08:15:00Z',
    notesFromChef: 'Union call sheet logged. Mobile Kitchen Unit 2 assigned with head chef on-site.'
  },
  {
    id: 'OWC-2025-3390',
    referenceNumber: 'OWC-2025-3390',
    eventType: 'Company Events',
    serviceId: 'corporate',
    eventDate: '2025-09-05',
    eventTime: '11:30',
    guestCount: 65,
    city: 'Richmond',
    venueName: 'Richmond Corporate Centre',
    venueSetting: 'Indoor Boardroom Suite',
    cateringStyle: 'Invisible Chef Drop-off',
    dietaryNotes: '5 Dairy-Free, 4 Halal requests',
    specialRequests: 'Chafing warmers setup quietly before the keynote session begins at 10:45 AM.',
    customer: {
      firstName: 'Marcus',
      lastName: 'Chow',
      email: 'mchow@vanguardtech.ca',
      phone: '604-555-7721',
      company: 'Vanguard Tech Solutions'
    },
    selectedMenuItems: [
      { id: 'lun-1', name: 'Executive Gourmet Deli Platter & Wraps' },
      { id: 'lun-2', name: 'Hot Corporate Bistro Lunch' },
      { id: 'sal-1', name: 'Mixed Sweet Field Greens' }
    ],
    status: 'Under Review',
    createdAt: '2025-02-28T14:45:00Z',
    notesFromChef: 'Inquiry under evaluation for logistics and chafing equipment timing.'
  }
];

