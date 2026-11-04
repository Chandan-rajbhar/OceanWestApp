import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Users,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Wine,
  Clapperboard,
  Flame,
  Briefcase,
  Check,
  Plus,
  Phone,
  MessageSquare,
  Calendar,
  Sparkles,
  Download,
  Award,
  Sliders,
  Calculator,
  Camera,
  CheckSquare,
  Scale,
  ChefHat,
  PhoneCall
} from 'lucide-react';
import {
  IMAGES,
  MENU_COURSES,
  HERO_SLIDES,
  CHEF_PROFILE,
  PACKAGES
} from '../data/cateringData';

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

  // Planner card state
  const [plannerGuestCount, setPlannerGuestCount] = useState(75);
  const [plannerOccasion, setPlannerOccasion] = useState('Wedding Reception');

  // Featured event platters mapped to existing dish data with authentic pricing
  const FEATURED_PLATTERS = [
    {
      id: 2,
      title: 'Wild Pacific Sockeye Platter',
      rate: '$140',
      dietaryTag: 'GLUTEN-FREE',
      image: HERO_SLIDES[1]?.image || IMAGES.platter,
      description: 'Cedar plank wild sockeye salmon, blistered shallots, caper berries, whipped herbed cream.'
    },
    {
      id: 4,
      title: 'Okanagan Artisanal Charcuterie',
      rate: '$95',
      dietaryTag: 'GRAZING BOARD',
      image: IMAGES.platter,
      description: 'Cured meats, aged cheeses, raw honeycomb, spiced nuts, fig preserves, artisan sourdough.'
    },
    {
      id: 1,
      title: 'Farm Harvest Organic Crudité',
      rate: '$75',
      dietaryTag: 'VEGAN / GLUTEN-FREE',
      image: HERO_SLIDES[0]?.image || IMAGES.platter,
      description: 'Crisp market vegetables, preserved lemon labneh, smoked paprika hummus, seed crisps.'
    }
  ];

  const handlePlannerInquire = () => {
    if (setFormData) {
      setFormData((prev) => ({
        ...prev,
        category: plannerOccasion,
        guestCount: String(plannerGuestCount),
        notes: (prev.notes ? prev.notes + '\n\n' : '') + `[Planned Celebration: ${plannerOccasion} for ${plannerGuestCount} guests]`
      }));
    }
    if (showToast) {
      showToast(`Prefilled ${plannerOccasion} for ${plannerGuestCount} guests.`);
    }
    navigate('/inquiry');
  };

  return (
    <div className="native-app-home">
      {/* ------------------------------------------------------------------ */}
      {/* 1. LARGE ROUNDED HERO IMAGE CARD                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="app-hero-card-wrap">
        <div className="app-hero-card">
          <img
            src={IMAGES.wedding}
            alt="Ocean West Coastal Catering Banquet"
            className="app-hero-bg-img"
            loading="eager"
          />
          <div className="app-hero-gradient-overlay" />

          <div className="app-hero-card-content">
            {/* Top Amber Location Chip */}
            <div className="hero-location-chip">
              <MapPin size={11} className="chip-pin-icon" />
              <span>VANCOUVER • SURREY • WHISTLER</span>
            </div>

            {/* Display Headline & Subtitle */}
            <h1 className="hero-app-headline">
              Bespoke Catering &amp; Coastal Culinary Artistry
            </h1>
            <p className="hero-app-subtext">
              Elevating wedding receptions, film productions, and exclusive galas across the scenic
              British Columbia coastline.
            </p>

            {/* Prominent Action Buttons */}
            <div className="hero-app-actions-row">
              <Link to="/courses" className="btn-hero-explore">
                <span>Explore Menus</span>
                <ArrowRight size={14} />
              </Link>
              <button
                type="button"
                className="btn-hero-quote"
                onClick={() => onOpenQuotationModal && onOpenQuotationModal('wedding')}
              >
                <Phone size={13} />
                <span>Get a Quote</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. THREE STACKED TRUST & EXPERIENCE HIGHLIGHTS                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="app-trust-highlights-section">
        <div className="app-trust-card">
          <div className="trust-icon-badge lavender">
            <Clock size={16} />
          </div>
          <div className="trust-text-block">
            <div className="trust-primary-line">20+ Years Experience</div>
            <div className="trust-secondary-line">Executive Chef Michael Thomas</div>
          </div>
        </div>

        <div className="app-trust-card">
          <div className="trust-icon-badge amber">
            <Users size={16} />
          </div>
          <div className="trust-text-block">
            <div className="trust-primary-line">25 – 500 to Up to 1,200+</div>
            <div className="trust-secondary-line">From intimate dinners to large galas</div>
          </div>
        </div>

        <div className="app-trust-card">
          <div className="trust-icon-badge sage">
            <ShieldCheck size={16} />
          </div>
          <div className="trust-text-block">
            <div className="trust-primary-line">100% Local &amp; Organic</div>
            <div className="trust-secondary-line">Pacific Coast farm-sourced &amp; ocean-wise</div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. SIGNATURE SERVICES (VERTICALLY STACKED PHOTO CARDS)             */}
      {/* ------------------------------------------------------------------ */}
      <section className="app-section signature-services-section">
        <div className="app-section-header">
          <div>
            <span className="app-kicker">BESPOKE CATERING</span>
            <h2 className="app-heading-serif">Signature Services</h2>
          </div>
          <Link to="/disciplines" className="app-header-link">
            <span>All Services</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="signature-cards-stack">
          {/* Card 1: Weddings */}
          <article className="sig-service-card">
            <div className="sig-card-media">
              <img src={IMAGES.wedding} alt="Weddings & Receptions" loading="lazy" />
              <span className="sig-badge plum">WEDDINGS</span>
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
              <img src={IMAGES.filmCraft} alt="Movie & Film Catering" loading="lazy" />
              <span className="sig-badge gold">FAST TURNAROUND</span>
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
              <img src={IMAGES.platter} alt="Celebrations & BBQs" loading="lazy" />
              <span className="sig-badge blue">OUTDOOR</span>
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
              <img src={IMAGES.gala} alt="Corporate & Cocktails" loading="lazy" />
              <span className="sig-badge navy">CORPORATE</span>
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
      {/* 4. FEATURED CHEF PROFILE CARD (DEEP PLUM BACKGROUND)               */}
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
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. FEATURED EVENT PLATTERS (COMPACT DISH CARDS + ADD)             */}
      {/* ------------------------------------------------------------------ */}
      <section className="app-section event-platters-section">
        <div className="app-section-header">
          <div>
            <span className="app-kicker">READY-TO-SERVE</span>
            <h2 className="app-heading-serif">Featured Event Platters</h2>
          </div>
          <Link to="/courses" className="app-header-link">
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="platters-compact-list">
          {FEATURED_PLATTERS.map((platter) => {
            const isAdded = selectedDishes.some((d) => d.id === platter.id);
            const sourceDish = MENU_COURSES.find((c) => c.id === platter.id) || platter;

            return (
              <div key={platter.id} className="compact-platter-card">
                <div className="platter-thumbnail-box">
                  <img src={platter.image} alt={platter.title} loading="lazy" />
                </div>

                <div className="platter-info-box">
                  <div className="platter-title-price-row">
                    <h3 className="platter-title">{platter.title}</h3>
                    <span className="platter-rate">{platter.rate}</span>
                  </div>

                  <p className="platter-desc">{platter.description}</p>

                  <div className="platter-action-row">
                    <span className="platter-dietary-pill">{platter.dietaryTag}</span>

                    <button
                      type="button"
                      className={`btn-add-platter ${isAdded ? 'is-added' : ''}`}
                      onClick={() => onToggleDishInMenu(sourceDish)}
                      aria-label={isAdded ? `Remove ${platter.title}` : `Add ${platter.title}`}
                    >
                      {isAdded ? (
                        <>
                          <Check size={12} strokeWidth={3} />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus size={12} strokeWidth={2.5} />
                          <span>Add Platter</span>
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
      {/* 6. PLAN YOUR CELEBRATION (COMPACT INTERACTIVE PLANNER CARD)        */}
      {/* ------------------------------------------------------------------ */}
      <section className="app-section celebration-planner-section">
        <div className="celebration-planner-card">
          <div className="planner-card-header">
            <Calendar size={18} className="gold-icon" />
            <h3 className="planner-card-title">Plan Your Celebration</h3>
          </div>

          <p className="planner-recommendation-note">
            We're recommending <strong>{plannerGuestCount} guests</strong> and a celebration setup for a
            tailored experience.
          </p>

          {/* Slider Control */}
          <div className="planner-slider-block">
            <div className="slider-label-row">
              <span className="slider-field-title">Estimated Guest Count:</span>
              <span className="slider-active-val">{plannerGuestCount} Guests</span>
            </div>
            <input
              type="range"
              min="20"
              max="350"
              step="5"
              value={plannerGuestCount}
              onChange={(e) => setPlannerGuestCount(Number(e.target.value))}
              className="planner-range-input"
            />
            <div className="slider-markers-row">
              <span>20 Min</span>
              <span>50 Typical</span>
              <span>150+ Gala</span>
            </div>
          </div>

          {/* Occasion / Style Pills */}
          <div className="planner-occasions-block">
            <span className="occasions-block-label">Occasion Style:</span>
            <div className="occasions-pills-grid">
              {[
                'Wedding Reception',
                'Film Production',
                'Outdoor Summer BBQ',
                'Corporate Cocktail'
              ].map((style) => (
                <button
                  key={style}
                  type="button"
                  className={`occasion-choice-pill ${plannerOccasion === style ? 'is-selected' : ''}`}
                  onClick={() => setPlannerOccasion(style)}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Coordination & Inquire Button */}
          <div className="planner-card-bottom-bar">
            <div className="planner-direct-coord">
              <span className="coord-label">DIRECT COORDINATION</span>
              <span className="coord-val">Chef Michael | 604-722-4857</span>
            </div>

            <button
              type="button"
              className="btn-planner-inquire"
              onClick={handlePlannerInquire}
            >
              <span>Inquire Date</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. APP PLANNING TOOLS SUITE STRIP                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="app-section tools-shortcut-section">
        <div className="app-section-header">
          <div>
            <span className="app-kicker">CATERING TOOLS</span>
            <h2 className="app-heading-serif">Planning Suite</h2>
          </div>
        </div>

        <div className="app-tools-pills-row">
          <button
            type="button"
            className="app-tool-chip-btn"
            onClick={() => onOpenQuotationModal && onOpenQuotationModal()}
          >
            <Calculator size={13} />
            <span>Quotation Slip</span>
          </button>
          <button
            type="button"
            className="app-tool-chip-btn"
            onClick={() => onOpenCustomizationModal && onOpenCustomizationModal()}
          >
            <Sliders size={13} />
            <span>Custom Setup</span>
          </button>
          <button
            type="button"
            className="app-tool-chip-btn"
            onClick={onOpenServingGuide}
          >
            <Scale size={13} />
            <span>Serving Guide</span>
          </button>
          <button
            type="button"
            className="app-tool-chip-btn"
            onClick={onOpenGallery}
          >
            <Camera size={13} />
            <span>Photo Gallery</span>
          </button>
          <button
            type="button"
            className="app-tool-chip-btn"
            onClick={onOpenChecklistModal}
          >
            <CheckSquare size={13} />
            <span>Checklist</span>
          </button>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 8. STRONG CONTACT / PHONE ACTION CARD (DEEP PLUM BACKGROUND)       */}
      {/* ------------------------------------------------------------------ */}
      <section className="app-section contact-plum-section">
        <div className="contact-plum-card">
          <div className="contact-plum-icon-circle">
            <Phone size={22} />
          </div>

          <h2 className="contact-plum-title">Have Questions About Your Menu?</h2>
          <p className="contact-plum-sub">
            Contact Executive Chef Michael Thomas directly for custom culinary creations, dietary
            modifications, and instant date holds.
          </p>

          <div className="contact-plum-actions">
            <a href="tel:6047224857" className="btn-contact-gold-phone">
              <Phone size={15} />
              <span>604-722-4857</span>
            </a>

            <button
              type="button"
              className="btn-contact-text-dispatch"
              onClick={() => onOpenSupportModal && onOpenSupportModal()}
            >
              <MessageSquare size={15} />
              <span>Concierge Support Desk</span>
            </button>
          </div>

          <p className="contact-plum-footnote">
            Serving Vancouver, Surrey, Whistler, Richmond &amp; the Lower Mainland
          </p>
        </div>
      </section>
    </div>
  );
}
