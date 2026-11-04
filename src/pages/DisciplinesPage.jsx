import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Award,
  Clock,
  Check,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Utensils,
  Calculator,
  Sliders,
  Scale,
  Camera,
  CheckSquare,
  Phone,
  MessageSquare
} from 'lucide-react';
import { DISCIPLINES } from '../data/cateringData';
import ImageWithFallback from '../components/ImageWithFallback';

export default function DisciplinesPage({
  onOpenQuotationModal,
  onOpenCustomizationModal,
  onOpenServingGuide,
  onOpenGallery,
  onOpenChecklistModal,
  onOpenSupportModal
}) {
  return (
    <div className="disciplines-page">
      {/* ------------------------------------------------------------------ */}
      {/* PAGE BANNER                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="page-header-banner">
        <div className="ow-container">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Disciplines</span>
          </div>
          <span className="section-label">Catering Programs</span>
          <h1 className="page-banner-title">Tailored Service Disciplines</h1>
          <p className="page-banner-intro">
            From 800-guest waterfront galas to 14-hour high-velocity film locations across British Columbia,
            Ocean West crafts customized dining programs engineered with passion, precision, and Michelin-trained rigor.
          </p>

          {/* Quick Helper Tools Grid (Uniform 40px Height, Clean Layout) */}
          <div className="services-tools-grid" style={{ marginTop: '16px' }}>
            <button
              type="button"
              className="services-tool-chip"
              onClick={onOpenQuotationModal}
              title="Generate a custom quotation estimate"
            >
              <Calculator size={14} style={{ color: '#BA8D5B' }} />
              <span>Quotation Slip</span>
            </button>
            <button
              type="button"
              className="services-tool-chip"
              onClick={onOpenCustomizationModal}
              title="Configure service style and staffing tier"
            >
              <Sliders size={14} style={{ color: '#BA8D5B' }} />
              <span>Custom Setup</span>
            </button>
            <button
              type="button"
              className="services-tool-chip"
              onClick={onOpenServingGuide}
              title="Portion calculator for banquets and courses"
            >
              <Scale size={14} style={{ color: '#BA8D5B' }} />
              <span>Serving Guide</span>
            </button>
            <button
              type="button"
              className="services-tool-chip"
              onClick={onOpenGallery}
              title="Explore event service gallery"
            >
              <Camera size={14} style={{ color: '#BA8D5B' }} />
              <span>Photo Gallery</span>
            </button>
            <button
              type="button"
              className="services-tool-chip"
              onClick={onOpenChecklistModal}
              title="Event planning timeline & checklist"
            >
              <CheckSquare size={14} style={{ color: '#BA8D5B' }} />
              <span>Checklist</span>
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* ALL 4 DETAILED SERVICE DISCIPLINES                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="ow-section">
        <div className="ow-container">
          <div className="disciplines-grid">
            {DISCIPLINES.map((discipline) => (
              <div key={discipline.id} className="discipline-card">
                <div className="discipline-img-wrap">
                  <ImageWithFallback
                    src={discipline.image}
                    alt={discipline.title}
                    aspect="16:10"
                    badge={discipline.tag}
                  />
                </div>
                <div className="discipline-body">
                  <h3 className="discipline-title">{discipline.title}</h3>
                  <p className="discipline-desc">{discipline.desc}</p>

                  <div className="discipline-features-sublist">
                    {discipline.features.map((feature, idx) => (
                      <div key={idx} className="discipline-feature-row">
                        <Check size={14} className="feature-check" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="discipline-footer">
                    <span className="discipline-meta-item">
                      {discipline.id === 'film' || discipline.id === 'platters' ? (
                        <Clock size={13} />
                      ) : (
                        <Users size={13} />
                      )}
                      <span>{discipline.scale}</span>
                    </span>
                    <Link to={discipline.targetRoute} className="discipline-meta-link">
                      <span>{discipline.linkText}</span>
                      <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SERVICE STANDARDS & PRODUCTION CALLOUT                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="ow-section" style={{ backgroundColor: '#F6F3EC', borderTop: '1px solid #EAE4D9' }}>
        <div className="ow-container">
          <div className="courses-header-centered" style={{ marginBottom: '32px' }}>
            <span className="section-label">The Ocean West Standard</span>
            <h2 className="section-heading-serif">Uncompromising Culinary Discipline</h2>
            <p className="courses-intro">
              Every discipline is backed by strict food-safety protocols, Vancouver Coastal Health 100% kitchen audit scores,
              and sustainable local sourcing directly from British Columbia farmers and fisheries.
            </p>
          </div>

          <div className="hero-stats-row">
            <div className="hero-stat-card">
              <span className="stat-metric">100% Audit Score</span>
              <span className="stat-desc">Vancouver Coastal Health Certified Commissary</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-metric">Dedicated Captain</span>
              <span className="stat-desc">Senior Event Lead on site for every occasion</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-metric">Zero Compromise</span>
              <span className="stat-desc">Segregated allergens &amp; strict dietary labeling</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-metric">Local Terroir</span>
              <span className="stat-desc">100% Pacific Northwest sustainable partners</span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/inquiry" className="btn-primary-gold" style={{ display: 'inline-flex' }}>
              <span>Plan Your Event in This Discipline</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DIRECT CHEF & CONCIERGE CONTACT CARD                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="app-section contact-plum-section" style={{ padding: '0 16px 28px' }}>
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

