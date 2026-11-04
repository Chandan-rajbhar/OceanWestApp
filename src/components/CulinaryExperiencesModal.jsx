import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ChefHat,
  Award,
  Flame,
  Wine,
  UtensilsCrossed,
  Clock,
  Users,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ShieldCheck,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { CULINARY_EXPERIENCES, CHEF_PROFILE } from '../data/cateringData';

export default function CulinaryExperiencesModal({
  isOpen,
  onClose,
  onSelectExperience,
  onOpenConsultation
}) {
  const [activeTab, setActiveTab] = useState('experiences'); // 'experiences' | 'chef'
  const [selectedExperience, setSelectedExperience] = useState(null);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay-backdrop active"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Personalized Culinary Experiences & Chef Portfolio"
    >
      <div
        className="modal-content-box culinary-experiences-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-top-header">
          <div className="modal-title-lockup">
            <span className="modal-kicker">Ocean West Private Kitchen</span>
            <h2 className="modal-headline">Culinary Experiences</h2>
          </div>
          <button
            type="button"
            className="modal-close-round-btn"
            onClick={onClose}
            aria-label="Close culinary experiences modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="experiences-tab-nav" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'experiences'}
            className={`exp-tab-btn ${activeTab === 'experiences' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('experiences')}
          >
            <Sparkles size={14} />
            <span>Featured Experiences ({CULINARY_EXPERIENCES.length})</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'chef'}
            className={`exp-tab-btn ${activeTab === 'chef' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('chef')}
          >
            <ChefHat size={14} />
            <span>Chef Michael Thomas</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="modal-scroll-body">
          {activeTab === 'experiences' ? (
            <div className="experiences-list-view">
              <div className="experience-intro-banner">
                <p>
                  Elevate your gathering with bespoke on-site cooking, interactive food stations, and
                  intimate tasting menus curated by Executive Chef Michael Thomas.
                </p>
                <div className="exp-transparency-pill">
                  <ShieldCheck size={13} />
                  <span>Subject to date confirmation &amp; kitchen logistics</span>
                </div>
              </div>

              <div className="experiences-cards-grid">
                {CULINARY_EXPERIENCES.map((exp) => (
                  <article key={exp.id} className="experience-detail-card">
                    <div className="exp-card-media-wrapper">
                      <img
                        src={exp.image}
                        alt={exp.title}
                        className="exp-card-img"
                        loading="lazy"
                      />
                      <span className="exp-card-badge">{exp.experienceType}</span>
                    </div>

                    <div className="exp-card-body">
                      <span className="exp-card-subtitle">{exp.subtitle}</span>
                      <h3 className="exp-card-title">{exp.title}</h3>
                      <p className="exp-card-desc">{exp.desc}</p>

                      <div className="exp-scale-tag">
                        <Users size={13} />
                        <span>Recommended: {exp.scale}</span>
                      </div>

                      <div className="exp-inclusions-list">
                        <span className="inclusions-heading">Experience Highlights:</span>
                        <ul>
                          {exp.inclusions.map((inc, i) => (
                            <li key={i}>
                              <CheckCircle2 size={13} className="inc-icon" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="exp-card-action-bar">
                        <button
                          type="button"
                          className="exp-request-btn"
                          onClick={() => {
                            if (onSelectExperience) {
                              onSelectExperience(exp);
                            }
                            onClose();
                          }}
                        >
                          <span>Request This Experience</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="chef-portfolio-view">
              {/* Chef Hero Profile */}
              <div className="chef-hero-card">
                <div className="chef-header-block">
                  <div className="chef-avatar-symbol">
                    <ChefHat size={32} />
                  </div>
                  <div className="chef-titles">
                    <span className="chef-role">{CHEF_PROFILE.title}</span>
                    <h3 className="chef-fullname">{CHEF_PROFILE.name}</h3>
                    <div className="chef-location-tag">
                      <MapPin size={12} />
                      <span>{CHEF_PROFILE.headquarters}</span>
                    </div>
                  </div>
                </div>

                <div className="chef-quote-box">
                  <blockquote>"{CHEF_PROFILE.quote}"</blockquote>
                </div>

                <div className="chef-bio-prose">
                  <p>{CHEF_PROFILE.bio}</p>
                </div>
              </div>

              {/* Chef Credentials */}
              <div className="chef-section-card">
                <h4 className="chef-sub-heading">
                  <Award size={16} />
                  <span>Professional Credentials &amp; Certifications</span>
                </h4>
                <ul className="chef-credentials-list">
                  {CHEF_PROFILE.credentials.map((cred, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={14} className="cred-icon" />
                      <span>{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chef Specialties */}
              <div className="chef-section-card">
                <h4 className="chef-sub-heading">
                  <UtensilsCrossed size={16} />
                  <span>Culinary Disciplines &amp; Specialties</span>
                </h4>
                <ul className="chef-specialties-list">
                  {CHEF_PROFILE.specialties.map((spec, idx) => (
                    <li key={idx}>
                      <span className="spec-dot">•</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consultation Callout */}
              <div className="chef-action-callout">
                <div className="callout-text">
                  <h5>Book a Tasting or Consultation</h5>
                  <p>
                    Meet 1-on-1 with Chef Michael to sample seasonal menu selections and plan your
                    service timeline.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-callout-consult"
                  onClick={() => {
                    onClose();
                    if (onOpenConsultation) {
                      onOpenConsultation();
                    }
                  }}
                >
                  <Calendar size={14} />
                  <span>Request Tasting with Chef</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-bottom-footer-bar">
          <div className="footer-disclaimer-text">
            <span>
              Ocean West Catering • Dates subject to availability. Official quotes prepared directly by
              Chef Michael Thomas.
            </span>
          </div>
          <button type="button" className="footer-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

