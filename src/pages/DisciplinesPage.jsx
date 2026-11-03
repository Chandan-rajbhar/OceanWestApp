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
  Utensils
} from 'lucide-react';
import { DISCIPLINES } from '../data/cateringData';

export default function DisciplinesPage() {
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
                  <img src={discipline.image} alt={discipline.title} loading="lazy" />
                  <span className="discipline-tag-badge">{discipline.tag}</span>
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
                        <Clock size={12} />
                      ) : (
                        <Users size={12} />
                      )}
                      <span>{discipline.scale}</span>
                    </span>
                    <Link to={discipline.targetRoute} className="discipline-meta-link">
                      <span>{discipline.linkText}</span>
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
    </div>
  );
}

