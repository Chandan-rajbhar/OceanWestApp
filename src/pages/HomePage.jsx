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

  return (
    <div className="native-app-home">
      {/* ------------------------------------------------------------------ */}
      {/* 1. COMPACT ROUNDED HERO CARD WITH ACCENT BLEND PHOTO (REFERENCE)   */}
      {/* ------------------------------------------------------------------ */}
      <section className="app-hero-card-wrap">
        <div className="app-hero-card">
          <div className="app-hero-shine" aria-hidden="true" />
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
              <MapPin size={9} className="chip-pin-icon" />
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
                <ArrowRight size={12} />
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
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
