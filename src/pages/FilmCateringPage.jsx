import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  ShieldCheck,
  Award,
  Check,
  ArrowRight,
  Star,
  Users,
  MapPin,
  FileText
} from 'lucide-react';
import { IMAGES } from '../data/cateringData';

export default function FilmCateringPage({ setFormData, showToast }) {
  const navigate = useNavigate();

  const handleBookFilm = () => {
    setFormData(prev => ({
      ...prev,
      category: 'Movie & Film Production',
      guestCount: '120',
      location: 'Metro Vancouver / Film Location'
    }));
    showToast('Film & TV production details applied to inquiry form.');
    navigate('/inquiry');
  };

  return (
    <div className="film-catering-page">
      {/* ------------------------------------------------------------------ */}
      {/* PAGE BANNER                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="page-header-banner">
        <div className="ow-container">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Film &amp; Media Catering</span>
          </div>
          <span className="section-label">High-Velocity Craft Services</span>
          <h1 className="page-banner-title">Motion Picture &amp; Commercial Craft Catering</h1>
          <p className="page-banner-intro">
            Powering feature films, streaming episodic productions, and prime commercial sets across British Columbia.
            Compliant with BC Motion Picture union guidelines with 24/7 hot mobile kitchens and continuous artisanal craft.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FILM CRAFT HIGHLIGHT GRID                                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="ow-section">
        <div className="ow-container">
          <div className="hero-content-col" style={{ marginBottom: '36px' }}>
            <span className="section-label">On-Set Capabilities</span>
            <h2 className="section-heading-serif">Engineered for 14-Hour Production Days</h2>
            <p className="hero-description">
              Filming in British Columbia demands speed, flexibility, and high nutritional density to keep
              director, camera, grips, and cast operating at peak energy. Ocean West operates self-contained
              all-weather mobile commercial galleys capable of serving 25 to 450+ cast and crew on mountain summits,
              deep forests, or urban sound stages.
            </p>

            <div className="discipline-img-wrap" style={{ borderRadius: '12px', overflow: 'hidden', margin: '18px 0 24px', boxShadow: '0 8px 24px rgba(25, 39, 32, 0.08)' }}>
              <img
                src={IMAGES.filmCraft}
                alt="Film & Media Craft Services on Location"
                loading="lazy"
                style={{ width: '100%', height: '240px', objectFit: 'cover' }}
              />
            </div>

            <div className="discipline-features-sublist">
              <div className="discipline-feature-row">
                <Check size={16} className="feature-check" />
                <span><strong>Full Daily Call Sheet Menus:</strong> Hot breakfast stations, seated hot lunches, walking dinners, and second meal wraps</span>
              </div>
              <div className="discipline-feature-row">
                <Check size={16} className="feature-check" />
                <span><strong>All-Weather Mobile Galleys:</strong> Self-powered generator trucks with water filtration, refrigeration, and commercial combi-ovens</span>
              </div>
              <div className="discipline-feature-row">
                <Check size={16} className="feature-check" />
                <span><strong>Dietary &amp; Allergen Precision:</strong> Individually wrapped and labeled gluten-free, vegan, halal, and dairy-free portions</span>
              </div>
              <div className="discipline-feature-row">
                <Check size={16} className="feature-check" />
                <span><strong>Union Endorsements:</strong> Full compliance with Teamsters 155, IATSE 891, and Directors Guild of Canada standards</span>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <button
                type="button"
                className="btn-primary-gold"
                onClick={handleBookFilm}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Submit Production Call Sheet Inquiry</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* 4 Film Metric Cards */}
          <div className="hero-stats-row">
            <div className="hero-stat-card">
              <span className="stat-metric">200+ Shoots</span>
              <span className="stat-desc">Feature films, Netflix, Warner Bros, Paramount &amp; indie productions</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-metric">24/7 Readiness</span>
              <span className="stat-desc">Night shoots, dawn camera calls, and multi-location unit moves</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-metric">Zero Downtime</span>
              <span className="stat-desc">Guaranteed on-time meal calls to eliminate union meal penalties</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-metric">Mobile Everywhere</span>
              <span className="stat-desc">Squamish, Whistler, Vancouver Island, Fraser Valley, Okanagan</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* PRODUCTION TESTIMONIAL                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="ow-section" style={{ backgroundColor: '#192720', color: '#FAF8F5' }}>
        <div className="ow-container">
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <div className="stars-row" style={{ justifyContent: 'center', marginBottom: '16px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#BA8D5B" stroke="#BA8D5B" />
              ))}
            </div>
            <blockquote style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '20px', color: '#FAF8F5' }}>
              "On a 22-day film shoot in Squamish and North Vancouver, Ocean West Catering kept 140 cast and crew energized, happy, and well-fed through rain and night calls. Dietary needs were 100% verified. A triumph of precision. Outstanding team."
            </blockquote>
            <div style={{ color: '#BA8D5B', fontWeight: 700, fontSize: '15px' }}>Dave Henderson</div>
            <div style={{ color: '#BAC4BD', fontSize: '12px' }}>Production Manager • Paramount Pictures / Vancouver Film Studios</div>
          </div>
        </div>
      </section>
    </div>
  );
}

