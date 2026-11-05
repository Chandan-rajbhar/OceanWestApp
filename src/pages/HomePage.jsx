import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Users,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Phone,
  Plus,
  Check,
  Heart,
  Calendar,
  Calculator,
  Sliders,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import {
  IMAGES,
  HERO_SLIDES,
  MENU_COURSES
} from '../data/cateringData';
import ImageWithFallback from '../components/ImageWithFallback';

export default function HomePage({
  setIsAvailabilityModalOpen,
  setIsConsultModalOpen,
  setIsPlannerModalOpen,
  onOpenBudgetEstimator,
  onOpenPackageComparison,
  onOpenServingGuide,
  onOpenGallery,
  onOpenChecklistModal,
  onOpenExperiencesModal,
  onOpenQuotationModal,
  onOpenCustomizationModal,
  onOpenSupportModal,
  favoriteDishes = [],
  onToggleFavorite,
  selectedDishes = [],
  onToggleDishInMenu,
  formData = {},
  setFormData,
  showToast
}) {
  const navigate = useNavigate();

<<<<<<< Updated upstream
  return (
    <div className="native-app-home">
      {/* ------------------------------------------------------------------ */}
      {/* 1. COMPACT ROUNDED HERO CARD WITH ACCENT BLEND PHOTO (REFERENCE)   */}
=======
  // 1. Trust & Experience Highlights
  const HIGHLIGHTS = [
    {
      id: 'experience',
      icon: Clock,
      title: '20+ Years Experience',
      sub: 'Executive Chef Michael Thomas'
    },
    {
      id: 'capacity',
      icon: Users,
      title: '25 – 500 to Up to 1,200+',
      sub: 'From intimate dinners to large galas'
    },
    {
      id: 'sourcing',
      icon: ShieldCheck,
      title: '100% Local & Organic',
      sub: 'Pacific Coast farm-sourced & ocean-wise'
    }
  ];

  // 2. Services Section (4 Cards in a 2x2 Grid)
  const SIGNATURE_SERVICES = [
    {
      id: 'weddings',
      title: 'Weddings & Receptions',
      badge: 'Weddings',
      subtag: 'Plated & Gala',
      desc: 'Custom multi-course dinners, family banquets & champagne service.',
      image: IMAGES.wedding,
      path: '/packages'
    },
    {
      id: 'film',
      title: 'Movie & Film Catering',
      badge: 'Film & Set',
      subtag: '24/7 Galley Trucks',
      desc: 'Rapid hot meal calls & continuous hot galley craft trucks across BC.',
      image: IMAGES.filmCraft,
      path: '/film-catering'
    },
    {
      id: 'bbq',
      title: 'Celebrations & BBQs',
      badge: 'Live Fire',
      subtag: 'Outdoor Feasts',
      desc: 'Live spit roasts, wood smoke feasts, garden platters & grazing tables.',
      image: IMAGES.platter,
      path: '/disciplines'
    },
    {
      id: 'corporate',
      title: 'Corporate & Cocktails',
      badge: 'Corporate',
      subtag: 'Executive VIP',
      desc: 'Executive boardroom lunches, cocktail canapés & gala hospitality.',
      image: IMAGES.gala,
      path: '/disciplines'
    }
  ];

  // 3. Menu Section (4 Cards in a 2x2 Grid)
  const FEATURED_MENU_DISHES = [
    {
      id: 2,
      title: 'Wild Pacific Salmon',
      rate: '$140',
      badge: 'Gluten-Free',
      subtag: 'Line-Caught BC',
      desc: 'Pan-seared BC salmon glazed with blood orange and parsnip purée.',
      image: HERO_SLIDES[1]?.image || IMAGES.platter
    },
    {
      id: 3,
      title: 'Prime Angus Beef',
      rate: '$165',
      badge: 'Chef Special',
      subtag: 'Alberta AAA',
      desc: 'Slow-roasted tenderloin with black garlic crust and morel truffle demi.',
      image: HERO_SLIDES[2]?.image || IMAGES.platter
    },
    {
      id: 1,
      title: 'Roasted Bosc Pear',
      rate: '$65',
      badge: 'Vegetarian',
      subtag: 'Lavender Honey',
      desc: 'Roasted pear in Okanagan wine reduction with whipped gorgonzola.',
      image: HERO_SLIDES[0]?.image || IMAGES.platter
    },
    {
      id: 5,
      title: 'Spot Prawn Tacos',
      rate: '$85',
      badge: 'Canapés',
      subtag: 'Local Spot Prawn',
      desc: 'Kaffir lime glaze with fresh sweet mango salsa and coconut cream.',
      image: HERO_SLIDES[3]?.image || IMAGES.platter
    }
  ];

  // 4. Book Section (4 Cards in a 2x2 Grid)
  const FEATURED_PACKAGES = [
    {
      id: 'wedding',
      title: 'Wedding Banquet',
      badge: 'Most Popular',
      rate: 'From $140/pp',
      subtag: '40–350 Guests',
      desc: '4-course plated banquet, cocktail canapés, bar & late-night station.',
      image: IMAGES.wedding,
      actionType: 'quote'
    },
    {
      id: 'film',
      title: 'Film & Set Craft',
      badge: '24/7 Galley',
      rate: 'Daily Rates',
      subtag: '25–400+ Crew',
      desc: 'Rolling hot tables, mobile kitchen trucks & union meal compliance.',
      image: IMAGES.filmCraft,
      actionType: 'film'
    },
    {
      id: 'intimate',
      title: 'Intimate Gathering',
      badge: 'Micro Event',
      rate: 'From $85/pp',
      subtag: '12–35 Guests',
      desc: 'Executive chef 3-course dinner, table-side plating & micro-weddings.',
      image: IMAGES.platter,
      actionType: 'quote'
    },
    {
      id: 'corporate',
      title: 'Corporate & Gala',
      badge: 'Enterprise',
      rate: 'Custom Quote',
      subtag: 'Up to 1,200',
      desc: 'Synchronized simultaneous service, VIP hospitality & brand galas.',
      image: IMAGES.gala,
      actionType: 'quote'
    }
  ];

  return (
    <div className="native-app-home">
      {/* ------------------------------------------------------------------ */}
      {/* 1. HERO SECTION (Compact, Balanced Ratio, Plum Gradient)          */}
>>>>>>> Stashed changes
      {/* ------------------------------------------------------------------ */}
      <section className="app-hero-card-wrap">
        <div className="app-hero-card">
          <div className="app-hero-shine" aria-hidden="true" />
          <img
            src={IMAGES.wedding}
            alt="Ocean West Coastal Fine Catering"
            className="app-hero-bg-img"
            loading="eager"
          />
          <div className="app-hero-gradient-overlay" />

          <div className="app-hero-card-content">
            {/* Compact Location Badge */}
            <div className="hero-location-chip">
<<<<<<< Updated upstream
              <MapPin size={9} className="chip-pin-icon" />
              <span>VANCOUVER • SURREY • WHISTLER</span>
=======
              <MapPin size={9.5} className="chip-pin-icon" />
              <span>Vancouver • Surrey • Whistler</span>
>>>>>>> Stashed changes
            </div>

            {/* Controlled Heading with Balanced Line Breaks */}
            <h1 className="hero-app-headline">
              Bespoke Catering &amp; Coastal Culinary Artistry
            </h1>

            {/* Concise Supporting Description */}
            <p className="hero-app-subtext">
              Elevating wedding receptions, film productions, and exclusive galas across the scenic
              British Columbia coastline.
            </p>

            {/* Side-by-Side Balanced CTAs */}
            <div className="hero-app-actions-row">
              <Link to="/courses" className="btn-hero-explore">
                <span>Explore Menus</span>
<<<<<<< Updated upstream
                <ArrowRight size={12} />
=======
                <ArrowRight size={13} />
>>>>>>> Stashed changes
              </Link>
              <button
                type="button"
                className="btn-hero-quote"
                onClick={() => onOpenQuotationModal && onOpenQuotationModal('wedding')}
              >
                <Phone size={12} />
                <span>Get a Quote</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
<<<<<<< Updated upstream
      {/* 2. STACKED TRUST & EXPERIENCE HIGHLIGHTS WITH CHEVRONS             */}
      {/* ------------------------------------------------------------------ */}
      <section className="app-trust-highlights-section">
        <button
          type="button"
          className="app-trust-card"
          onClick={() => setIsConsultModalOpen && setIsConsultModalOpen(true)}
          title="Executive Chef Profile & Philosophy"
        >
          <div className="trust-icon-badge lavender">
            <Clock size={16} />
          </div>
          <div className="trust-text-block">
            <div className="trust-primary-line">20+ Years Experience</div>
            <div className="trust-secondary-line">Executive Chef Michael Thomas</div>
          </div>
          <ChevronRight size={15} className="trust-chevron-arrow" />
        </button>

        <button
          type="button"
          className="app-trust-card"
          onClick={() => setIsPlannerModalOpen && setIsPlannerModalOpen(true)}
          title="Plan Celebrations & Guest Sizing"
        >
          <div className="trust-icon-badge amber">
            <Users size={16} />
          </div>
          <div className="trust-text-block">
            <div className="trust-primary-line">25 – 500 to Up to 1,200+</div>
            <div className="trust-secondary-line">From intimate dinners to large galas</div>
          </div>
          <ChevronRight size={15} className="trust-chevron-arrow" />
        </button>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. EXPLORE EXPERIENCES (3-COLUMN PHOTO CARDS MATCHING REFERENCE)   */}
      {/* ------------------------------------------------------------------ */}
      <section className="app-section explore-experiences-preview-section">
        <div className="app-section-header">
          <h2 className="app-heading-serif">Explore Experiences</h2>
          <Link
            to="/disciplines"
            className="gold-link"
            onClick={(e) => {
              if (onOpenExperiencesModal) {
                e.preventDefault();
                onOpenExperiencesModal();
              }
            }}
          >
            <span>View All</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="explore-experiences-grid">
          {/* Card 1: Weddings */}
          <Link to="/packages" className="experience-thumb-card" title="Weddings & Receptions">
            <img
              src={IMAGES.wedding}
              alt="Weddings & Receptions"
              className="experience-thumb-img"
              loading="lazy"
            />
            <div className="experience-thumb-gradient" />
            <div className="experience-thumb-footer">
              <span>Weddings</span>
              <ArrowRight size={11} className="experience-thumb-arrow" />
            </div>
          </Link>

          {/* Card 2: Corporate */}
          <Link to="/disciplines" className="experience-thumb-card" title="Corporate Dining">
            <img
              src={IMAGES.gala}
              alt="Corporate Dining"
              className="experience-thumb-img"
              loading="lazy"
            />
            <div className="experience-thumb-gradient" />
            <div className="experience-thumb-footer">
              <span>Corporate</span>
              <ArrowRight size={11} className="experience-thumb-arrow" />
            </div>
          </Link>

          {/* Card 3: Private Dining */}
          <Link to="/courses" className="experience-thumb-card" title="Private Dining Tastings">
            <img
              src={HERO_SLIDES[1]?.image || IMAGES.platter}
              alt="Private Dining Tastings"
              className="experience-thumb-img"
              loading="lazy"
            />
            <div className="experience-thumb-gradient" />
            <div className="experience-thumb-footer">
              <span>Private Dining</span>
              <ArrowRight size={11} className="experience-thumb-arrow" />
            </div>
          </Link>
=======
      {/* 2. EXPERIENCE / HIGHLIGHTS (Compact Horizontal Information Tiles)  */}
      {/* ------------------------------------------------------------------ */}
      <section className="app-highlights-section" aria-label="Experience Highlights">
        <div className="experience-tiles-list">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="experience-tile">
                <div className={`tile-icon-wrap ${item.id}`}>
                  <Icon size={14} strokeWidth={2.2} />
                </div>
                <div className="tile-text-wrap">
                  <span className="tile-title">{item.title}</span>
                  <span className="tile-sub">{item.sub}</span>
                </div>
              </div>
            );
          })}
>>>>>>> Stashed changes
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. SIGNATURE SERVICES SECTION (4 Cards, 2 in a Row)               */}
      {/* ------------------------------------------------------------------ */}
      <section className="home-section" aria-label="Signature Catering Services">
        <div className="app-section-header">
          <div>
            <span className="app-kicker">Bespoke Catering</span>
            <h2 className="app-heading-serif">Signature Services</h2>
          </div>
          <Link to="/disciplines" className="app-header-link">
            <span>All Services</span>
            <ChevronRight size={13} />
          </Link>
        </div>

<<<<<<< Updated upstream
        <div className="signature-cards-stack">
          {/* Card 1: Weddings */}
          <article className="sig-service-card">
            <div className="sig-card-media">
              <ImageWithFallback
                src={IMAGES.wedding}
                alt="Weddings & Receptions"
                aspect="16:10"
                badge="WEDDINGS"
              />
            </div>
            <div className="sig-card-body">
              <div className="sig-card-title-row">
                <h3 className="sig-card-title">Weddings &amp; Receptions</h3>
                <Wine size={16} className="sig-title-icon" />
              </div>
              <p className="sig-card-desc">
                Custom multi-course plated dinners, family-style banquets, late champagne service &amp;
                comprehensive staffing for unforgettable memories.
              </p>
              <Link to="/packages" className="sig-card-link">
                <span>Custom Tasting Menus</span>
                <ChevronRight size={13} />
              </Link>
            </div>
          </article>

          {/* Card 2: Film & Media */}
          <article className="sig-service-card">
            <div className="sig-card-media">
              <ImageWithFallback
                src={IMAGES.filmCraft}
                alt="Movie & Film Catering"
                aspect="16:10"
                badge="FAST TURNAROUND"
              />
            </div>
            <div className="sig-card-body">
              <div className="sig-card-title-row">
                <h3 className="sig-card-title">Movie &amp; Film Catering</h3>
                <Clapperboard size={16} className="sig-title-icon" />
              </div>
              <p className="sig-card-desc">
                Rapid hot meal callouts &amp; continuous hot galley craft trucks, central operations
                across BC, union compliant dietary standards.
              </p>
              <Link to="/film-catering" className="sig-card-link">
                <span>24-Hour Daily Logistics</span>
                <ChevronRight size={13} />
              </Link>
            </div>
          </article>

          {/* Card 3: Celebrations & BBQs */}
          <article className="sig-service-card">
            <div className="sig-card-media">
              <ImageWithFallback
                src={IMAGES.platter}
                alt="Celebrations & BBQs"
                aspect="16:10"
                badge="OUTDOOR"
              />
            </div>
            <div className="sig-card-body">
              <div className="sig-card-title-row">
                <h3 className="sig-card-title">Celebrations &amp; BBQs</h3>
                <Flame size={16} className="sig-title-icon" />
              </div>
              <p className="sig-card-desc">
                Casual assigned feasts with live spit roasts, wood smoke, garden harvest platters, home
                style grazing tables, and refreshing ciders.
              </p>
              <Link to="/disciplines" className="sig-card-link">
                <span>View BBQ Packages</span>
                <ChevronRight size={13} />
              </Link>
            </div>
          </article>

          {/* Card 4: Corporate & Cocktails */}
          <article className="sig-service-card">
            <div className="sig-card-media">
              <ImageWithFallback
                src={IMAGES.gala}
                alt="Corporate & Cocktails"
                aspect="16:10"
                badge="CORPORATE"
              />
            </div>
            <div className="sig-card-body">
              <div className="sig-card-title-row">
                <h3 className="sig-card-title">Corporate &amp; Cocktails</h3>
                <Briefcase size={16} className="sig-title-icon" />
              </div>
              <p className="sig-card-desc">
                Polished finger food, executive board lunches, and grand presentation banqueting for gala
                and summits. Premier hospitality.
              </p>
              <Link to="/disciplines" className="sig-card-link">
                <span>Corporate Menus</span>
                <ChevronRight size={13} />
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. FEATURED CHEF PROFILE CARD (DEEP PLUM BACKGROUND - LAST CARD)   */}
      {/* ------------------------------------------------------------------ */}
      <section className="app-section chef-plum-section">
        <div className="chef-plum-card">
          {/* Centered Circular Chef Portrait with Gold Ring */}
          <div className="chef-plum-avatar-wrap">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80"
              alt="Executive Chef Michael Thomas"
              className="chef-plum-avatar-img"
              loading="lazy"
            />
          </div>

          <span className="chef-plum-kicker">CULINARY DIRECTION</span>
          <h2 className="chef-plum-name">Executive Chef Michael Thomas</h2>

          <div className="chef-plum-quote-block">
            <p>
              "We blend Ocean Wise® innovation with classical gastronomy. Over 20 years of West Coast
              hospitality gives us the confidence to turn every gathering into a feast that your guests
              will reminisce about for years."
            </p>
          </div>

          {/* Credential Tags */}
          <div className="chef-plum-tags-row">
            <span className="chef-plum-tag">Red Seal Certified</span>
            <span className="chef-plum-tag">Custom Dietary &amp; Allergen Care</span>
          </div>

          {/* Action Button */}
          <div className="chef-plum-actions">
            <button
              type="button"
              className="btn-chef-plum-action"
              onClick={() => onOpenExperiencesModal && onOpenExperiencesModal()}
            >
              <span>Explore Chef Experiences &amp; Tastings</span>
              <ChevronRight size={14} />
=======
        <div className="home-cards-2col-grid">
          {SIGNATURE_SERVICES.map((service) => (
            <Link
              key={service.id}
              to={service.path}
              className="home-card-2col"
              aria-label={`View ${service.title}`}
            >
              <div className="home-card-media">
                <img src={service.image} alt={service.title} loading="lazy" />
                <span className="home-card-badge">{service.badge}</span>
              </div>

              <div className="home-card-body">
                <div className="home-card-title-row">
                  <h3 className="home-card-title">{service.title}</h3>
                </div>

                <span className="home-card-subtag">{service.subtag}</span>
                <p className="home-card-desc">{service.desc}</p>

                <div className="home-card-footer">
                  <div className="btn-card-service-link">
                    <span>Explore</span>
                    <ChevronRight size={12} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. CURATED MENU SECTION (4 Cards, 2 in a Row)                      */}
      {/* ------------------------------------------------------------------ */}
      <section className="home-section" aria-label="Curated Signature Dishes">
        <div className="app-section-header">
          <div>
            <span className="app-kicker">Culinary Repertoire</span>
            <h2 className="app-heading-serif">Signature Menu</h2>
          </div>
          <Link to="/courses" className="app-header-link">
            <span>View All Menu</span>
            <ChevronRight size={13} />
          </Link>
        </div>

        <div className="home-cards-2col-grid">
          {FEATURED_MENU_DISHES.map((dish) => {
            const isAdded = selectedDishes.some((d) => d.id === dish.id);
            const isFav = favoriteDishes.includes(dish.id);
            const sourceDish = MENU_COURSES.find((c) => c.id === dish.id) || dish;

            return (
              <div key={dish.id} className="home-card-2col">
                <div className="home-card-media">
                  <img src={dish.image} alt={dish.title} loading="lazy" />
                  <span className="home-card-badge">{dish.badge}</span>

                  <button
                    type="button"
                    className={`home-card-fav-btn ${isFav ? 'is-fav' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onToggleFavorite && onToggleFavorite(sourceDish);
                    }}
                    aria-label={isFav ? `Remove ${dish.title} from favorites` : `Save ${dish.title} to favorites`}
                    title={isFav ? "Saved to favorites" : "Save to favorites"}
                  >
                    <Heart
                      size={12}
                      fill={isFav ? '#BA8D5B' : 'none'}
                      color={isFav ? '#BA8D5B' : '#76837A'}
                    />
                  </button>
                </div>

                <div className="home-card-body">
                  <div className="home-card-title-row">
                    <h3 className="home-card-title">{dish.title}</h3>
                    <span className="home-card-rate">{dish.rate}</span>
                  </div>

                  <span className="home-card-subtag">{dish.subtag}</span>
                  <p className="home-card-desc">{dish.desc}</p>

                  <div className="home-card-footer">
                    <button
                      type="button"
                      className={`btn-card-add ${isAdded ? 'is-added' : ''}`}
                      onClick={() => onToggleDishInMenu && onToggleDishInMenu(sourceDish)}
                      aria-label={isAdded ? `Remove ${dish.title} from My Menu` : `Add ${dish.title} to My Menu`}
                    >
                      {isAdded ? (
                        <>
                          <Check size={11} strokeWidth={3} />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus size={11} strokeWidth={2.5} />
                          <span>Add Dish</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. BOOK AN EVENT SECTION (4 Cards, 2 in a Row)                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="home-section" aria-label="Book Event Packages">
        <div className="app-section-header">
          <div>
            <span className="app-kicker">Reservations &amp; Packages</span>
            <h2 className="app-heading-serif">Book an Event</h2>
          </div>
          <Link to="/packages" className="app-header-link">
            <span>All Packages</span>
            <ChevronRight size={13} />
          </Link>
        </div>

        <div className="home-cards-2col-grid">
          {FEATURED_PACKAGES.map((pkg) => (
            <div key={pkg.id} className="home-card-2col">
              <div className="home-card-media">
                <img src={pkg.image} alt={pkg.title} loading="lazy" />
                <span className="home-card-badge gold">{pkg.badge}</span>
              </div>

              <div className="home-card-body">
                <div className="home-card-title-row">
                  <h3 className="home-card-title">{pkg.title}</h3>
                  <span className="home-card-rate">{pkg.rate}</span>
                </div>

                <span className="home-card-subtag">{pkg.subtag}</span>
                <p className="home-card-desc">{pkg.desc}</p>

                <div className="home-card-footer">
                  {pkg.actionType === 'film' ? (
                    <Link to="/film-catering" className="btn-card-book">
                      <span>Book Call</span>
                      <ArrowRight size={11} />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="btn-card-book"
                      onClick={() => onOpenQuotationModal && onOpenQuotationModal(pkg.id)}
                    >
                      <span>Book Event</span>
                      <ArrowRight size={11} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. CLOSURE SECTION (Streamlined Minimal Coordination Card)          */}
      {/* ------------------------------------------------------------------ */}
      <section className="home-closure-section" aria-label="Quick Booking & Direct Coordination">
        <div className="home-closure-card">
          <h3 className="closure-card-title">Ready to Plan Your Celebration?</h3>
          <p className="closure-card-sub">
            Direct coordination &amp; bespoke menus with Executive Chef Michael Thomas.
          </p>

          <div className="closure-actions-primary-row">
            <button
              type="button"
              className="btn-closure-quote"
              onClick={() => onOpenQuotationModal && onOpenQuotationModal('wedding')}
            >
              <Calculator size={12} />
              <span>Instant Quote</span>
            </button>

            <button
              type="button"
              className="btn-closure-avail"
              onClick={() => setIsAvailabilityModalOpen && setIsAvailabilityModalOpen(true)}
            >
              <Calendar size={12} />
              <span>Check Availability</span>
            </button>
          </div>

          <div className="closure-meta-row">
            <a href="tel:6047224857" className="closure-meta-link">
              <Phone size={10} />
              <span>604-722-4857</span>
            </a>
            <span className="closure-meta-dot">•</span>
            <button
              type="button"
              className="closure-meta-btn"
              onClick={() => setIsPlannerModalOpen && setIsPlannerModalOpen(true)}
            >
              <Sliders size={10} />
              <span>Planner</span>
            </button>
            <span className="closure-meta-dot">•</span>
            <button
              type="button"
              className="closure-meta-btn"
              onClick={() => onOpenSupportModal && onOpenSupportModal()}
            >
              <MessageSquare size={10} />
              <span>Concierge</span>
>>>>>>> Stashed changes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
