import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Phone,
  X,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';
import { IMAGES } from '../data/cateringData';

const ALL_SERVICES = [
  {
    id: 'private-chef',
    category: 'private_chef',
    title: 'Private Chef Experience',
    subtitle: 'A personalized dining experience with our executive chefs.',
    minGuestsText: 'Min 10 guests',
    priceText: 'From $95/person',
    priceNum: 95,
    minGuestsNum: 10,
    badge: 'MOST BOOKED',
    isHeroDefault: true,
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
    description: 'Immerse your guests in Michelin-caliber artistry in your private residence or executive retreat. Executive Chef Michael Thomas crafts bespoke seasonal courses paired with British Columbia estate wines.',
    inclusions: [
      'Dedicated Executive Chef & brigade team',
      'Custom 4 to 7-course seasonal tasting menu',
      'Artisanal bread and local churned butter presentation',
      'Table setting, silver service & complete kitchen clean-down'
    ]
  },
  {
    id: 'wedding-feasts',
    category: 'private_chef',
    title: 'Bespoke Wedding Feasts',
    subtitle: 'Multi-course plated dinners and champagne cocktail service for timeless memories.',
    minGuestsText: 'Min 30 guests',
    priceText: 'From $110/person',
    priceNum: 110,
    minGuestsNum: 30,
    image: IMAGES.wedding,
    description: 'Romantic and lavish coastal wedding banquets tailored to your love story. From passed canapés during golden hour to seated plated mains and late-night artisan s’mores and sliders.',
    inclusions: [
      'Bridal suite champagne & artisan canapés',
      'Multi-course plated dinner with table wine service',
      'Custom dietary menu cards and place settings',
      'Complimentary cake cutting and coffee service station'
    ]
  },
  {
    id: 'live-stations',
    category: 'live_stations',
    title: 'Live Stations',
    subtitle: 'Interactive culinary stations that bring flavour and theatre to your event.',
    minGuestsText: 'Min 50 guests',
    priceText: 'From $65/person',
    priceNum: 65,
    minGuestsNum: 50,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    description: 'Transform your venue with dynamic live cooking action. Watch chefs hand-carve Alberta AAA prime rib, flame-sear Pacific spot prawns, and toss wild mushroom risotto inside aged parmesan wheels.',
    inclusions: [
      'Live chef action stations with induction & flame torches',
      'Rotating seasonal station themes (Carvery, Seafood, Pasta)',
      'Chef-manned serving tables with display heating lamps',
      'Full compostable or premium porcelain tableware'
    ]
  },
  {
    id: 'interactive-dining',
    category: 'interactive',
    title: 'Interactive Dining',
    subtitle: 'Communal family-style feasts and interactive culinary moments.',
    minGuestsText: 'Min 25 guests',
    priceText: 'From $75/person',
    priceNum: 75,
    minGuestsNum: 25,
    image: IMAGES.gala,
    description: 'Break the ice with tactile, communal dining. Abundant long-table harvest platters, DIY hand-pulled taco stations, and tableside sauce finishes designed to foster connection and joy.',
    inclusions: [
      'Communal sharing platters and artisan board runners',
      'Interactive tableside sauce & torch finishes',
      'Family-style vegetable and grain harvest sides',
      'Dessert grazing boards with raw honeycomb'
    ]
  },
  {
    id: 'corporate-summits',
    category: 'interactive',
    title: 'Corporate Summits & Galas',
    subtitle: 'High-stakes conferences, award banquets, and premier brand launches across BC.',
    minGuestsText: 'Min 40 guests',
    priceText: 'From $85/person',
    priceNum: 85,
    minGuestsNum: 40,
    image: IMAGES.filmCraft,
    description: 'Precision timing, impeccable presentation, and energizing regional cuisine designed for high-profile business leaders, conferences, and formal corporate galas in Greater Vancouver.',
    inclusions: [
      'Synchronized table service for keynote presentations',
      'Individual dietary meal boxes labeled with guest names',
      'Continuous hot artisan espresso and cold brew bar',
      'Corporate invoicing and dedicated event logistics lead'
    ]
  },
  {
    id: 'display-platters',
    category: 'live_stations',
    title: 'Artisanal Display Platters',
    subtitle: 'Pacific Northwest charcuterie, organic crudités, and wild sockeye cedar displays.',
    minGuestsText: 'Min 20 guests',
    priceText: 'From $55/person',
    priceNum: 55,
    minGuestsNum: 20,
    image: IMAGES.platter,
    description: 'Show-stopping grazing tables and hand-carved cedar display planks loaded with artisanal cured meats, Okanagan cheeses, house pickled vegetables, and local lavender honeycomb.',
    inclusions: [
      'Locally foraged PNW cedar and slate display boards',
      'Okanagan artisan cheeses & charcuterie selections',
      'House-baked seeded sourdough & flax crisps',
      'Setup, floral decoration styling & breakdown'
    ]
  }
];

export default function DisciplinesPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [inspectingService, setInspectingService] = useState(null);
  const navigate = useNavigate();

  // Determine which service serves as the Hero Card
  // When 'all', canonical hero is Private Chef Experience
  // When filtered, if hero matches filter, use it; otherwise use first matching service
  let heroService = null;
  let row1Cards = [];
  let remainingCards = [];

  if (activeFilter === 'all') {
    heroService = ALL_SERVICES.find((s) => s.id === 'private-chef');
    row1Cards = [
      ALL_SERVICES.find((s) => s.id === 'wedding-feasts'),
      ALL_SERVICES.find((s) => s.id === 'live-stations')
    ].filter(Boolean);
    remainingCards = ALL_SERVICES.filter(
      (s) => s.id !== 'private-chef' && s.id !== 'wedding-feasts' && s.id !== 'live-stations'
    );
  } else {
    const matching = ALL_SERVICES.filter((s) => s.category === activeFilter);
    if (matching.length > 0) {
      // Pick first matching as hero card
      heroService = matching[0];
      const others = matching.slice(1);
      row1Cards = others.slice(0, 2);
      remainingCards = others.slice(2);
    }
  }

  const handleInquireService = (service) => {
    setInspectingService(null);
    navigate('/inquiry', { state: { selectedCategory: service.title } });
  };

  return (
    <div className="services-redesign-screen">
      {/* ------------------------------------------------------------------ */}
      {/* 1. TITLE & SUBTITLE (32px serif plum, 13px muted)                 */}
      {/* ------------------------------------------------------------------ */}
      <div className="services-title-header">
        <h1 className="services-main-title">Culinary Experiences</h1>
        <p className="services-main-subtitle">
          Curated dining for your special occasions.
        </p>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. FILTER CHIPS (All, Private Chef, Live Stations, Interactive)   */}
      {/* ------------------------------------------------------------------ */}
      <div className="services-filter-chips-row" role="tablist" aria-label="Experience Filters">
        {[
          { id: 'all', label: 'All' },
          { id: 'private_chef', label: 'Private Chef' },
          { id: 'live_stations', label: 'Live Stations' },
          { id: 'interactive', label: 'Interactive' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeFilter === tab.id}
            className={`services-filter-chip ${activeFilter === tab.id ? 'is-active' : ''}`}
            onClick={() => setActiveFilter(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. HERO CARD (210px tall, full width)                              */}
      {/* ------------------------------------------------------------------ */}
      {heroService && (
        <article
          className="services-hero-card"
          onClick={() => setInspectingService(heroService)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setInspectingService(heroService);
          }}
          aria-label={`View details for ${heroService.title}`}
        >
          {/* Photo Background */}
          <img
            src={heroService.image}
            alt={heroService.title}
            className="services-hero-bg-img"
            loading="eager"
          />

          {/* Bottom Gradient Overlay (transparent to rgba(32,6,26,.92)) */}
          <div className="services-hero-gradient-overlay" />

          {/* Top-Left Badge: "MOST BOOKED" (cream pill, gold text, 11px bold) */}
          <div className="services-hero-badge-pill">
            <span>{heroService.badge || 'FEATURED'}</span>
          </div>

          {/* Bottom Row Content */}
          <div className="services-hero-bottom-content">
            <div className="services-hero-text-block">
              <h2 className="services-hero-title">{heroService.title}</h2>
              <p className="services-hero-meta-line">
                <span className="services-hero-min-guests">{heroService.minGuestsText}</span>
                <span className="services-hero-bullet"> · </span>
                <span className="services-hero-price-gold">{heroService.priceText}</span>
              </p>
            </div>

            {/* Bottom-Right: 44px Gold Circular Arrow Button */}
            <button
              type="button"
              className="services-hero-circle-arrow-btn"
              onClick={(e) => {
                e.stopPropagation();
                setInspectingService(heroService);
              }}
              aria-label={`Inspect ${heroService.title}`}
            >
              <ArrowRight size={20} strokeWidth={2.4} />
            </button>
          </div>
        </article>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 4. TWO SMALL CARDS IN A ROW (equal width, 12px gap)                */}
      {/* ------------------------------------------------------------------ */}
      {row1Cards.length > 0 && (
        <div className="services-small-cards-grid">
          {row1Cards.map((service) => (
            <article
              key={service.id}
              className="services-small-card"
              onClick={() => setInspectingService(service)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setInspectingService(service);
              }}
              aria-label={`View ${service.title}`}
            >
              {/* 84px Photo on top */}
              <div className="services-small-card-photo-box">
                <img
                  src={service.image}
                  alt={service.title}
                  className="services-small-card-img"
                  loading="lazy"
                />
              </div>

              {/* Body: Name (14px bold), Min N guests (11px muted), From $X/person (13px bold, gold text) */}
              <div className="services-small-card-body">
                <h3 className="services-small-card-name">{service.title}</h3>
                <span className="services-small-card-guests">{service.minGuestsText}</span>
                <span className="services-small-card-price">{service.priceText}</span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 5. CONTACT STRIP (Plum background, 20px radius, 16px padding)      */}
      {/* ------------------------------------------------------------------ */}
      <section className="services-contact-strip" aria-label="Event Questions & Contact">
        <div className="services-contact-text-block">
          <h2 className="services-contact-title">Questions about your event?</h2>
          <p className="services-contact-subtitle">
            Chef Michael Thomas · custom menus &amp; date holds
          </p>
        </div>

        <a
          href="tel:6047224857"
          className="services-contact-gold-phone-btn"
          title="Call Chef Michael Thomas (604-722-4857)"
          aria-label="Call 604-722-4857"
        >
          <Phone size={15} strokeWidth={2.4} />
          <span>604-722-4857</span>
        </a>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. REMAINING SERVICES (Interactive Dining and rest in 2-column grid) */}
      {/* ------------------------------------------------------------------ */}
      {remainingCards.length > 0 && (
        <div className="services-small-cards-grid services-remaining-grid">
          {remainingCards.map((service) => (
            <article
              key={service.id}
              className="services-small-card"
              onClick={() => setInspectingService(service)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setInspectingService(service);
              }}
              aria-label={`View ${service.title}`}
            >
              {/* 84px Photo on top */}
              <div className="services-small-card-photo-box">
                <img
                  src={service.image}
                  alt={service.title}
                  className="services-small-card-img"
                  loading="lazy"
                />
              </div>

              {/* Body */}
              <div className="services-small-card-body">
                <h3 className="services-small-card-name">{service.title}</h3>
                <span className="services-small-card-guests">{service.minGuestsText}</span>
                <span className="services-small-card-price">{service.priceText}</span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 7. SERVICE DETAIL MODAL / SHEET                                    */}
      {/* ------------------------------------------------------------------ */}
      {inspectingService && (
        <div
          className="service-inspect-modal-overlay active"
          onClick={() => setInspectingService(null)}
          role="dialog"
          aria-modal="true"
          aria-label={inspectingService.title}
        >
          <div
            className="service-inspect-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Media */}
            <div className="service-inspect-hero">
              <img
                src={inspectingService.image}
                alt={inspectingService.title}
                className="service-inspect-hero-img"
              />
              <div className="service-inspect-hero-gradient" />
              <button
                type="button"
                className="service-inspect-close-btn"
                onClick={() => setInspectingService(null)}
                aria-label="Close details"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="service-inspect-body">
              <div className="service-inspect-badges-row">
                {inspectingService.badge && (
                  <span className="service-inspect-pill gold">
                    {inspectingService.badge}
                  </span>
                )}
                <span className="service-inspect-pill">
                  {inspectingService.minGuestsText}
                </span>
                <span className="service-inspect-pill price">
                  {inspectingService.priceText}
                </span>
              </div>

              <h2 className="service-inspect-title">{inspectingService.title}</h2>
              <p className="service-inspect-desc">{inspectingService.description}</p>

              {/* Inclusions */}
              <div className="service-inspect-inclusions-box">
                <h4 className="service-inspect-inclusions-heading">Experience Inclusions</h4>
                <ul className="service-inspect-inclusions-list">
                  {inspectingService.inclusions.map((item, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={15} className="service-inclusion-check" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="service-inspect-actions-row">
                <button
                  type="button"
                  className="service-inspect-inquire-btn"
                  onClick={() => handleInquireService(inspectingService)}
                >
                  <Calendar size={16} />
                  <span>Reserve or Inquire Date</span>
                </button>
                <a
                  href="tel:6047224857"
                  className="service-inspect-call-btn"
                  aria-label="Call Chef"
                >
                  <Phone size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
