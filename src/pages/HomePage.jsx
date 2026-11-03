import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ChevronRight,
  Users,
  Award,
  Clock,
  ShieldCheck,
  Star,
  Utensils,
  Calendar,
  Compass,
  Play,
  Pause,
  Plus,
  Check
} from 'lucide-react';
import { HERO_SLIDES, IMAGES, MENU_COURSES, TESTIMONIALS } from '../data/cateringData';

export default function HomePage({
  setIsAvailabilityModalOpen,
  setIsConsultModalOpen,
  setIsPlannerModalOpen,
  selectedDishes,
  onToggleDishInMenu,
  showToast
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="home-page-container">
      {/* ------------------------------------------------------------------ */}
      {/* HERO SECTION                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section id="hero" className="hero-section">
        <div className="ow-container">
          <div className="hero-content-col">
            <div className="hero-chef-pill">
              <Sparkles size={12} style={{ color: '#BA8D5B' }} />
              <span>Executive Chef Michael Thomas • Pacific Coast Commissary</span>
            </div>

            <h1 className="hero-title">
              Artisanal Catering &amp; <br />
              <em>Unforgettable</em> Culinary <br />
              Experiences
            </h1>

            <p className="hero-description">
              From intimate waterfront gatherings to prime film &amp; TV productions, Ocean West crafts
              fine Pacific Northwest fare with refined seasonal ingredients. Chef Michael brings twenty
              years of culinary expertise, delivering bespoke wedding banquets, certified high-velocity
              film &amp; media craft, corporate galled events, and curated party platters.
            </p>

            <div className="hero-cta-group">
              <button
                type="button"
                className="btn-primary-gold"
                onClick={() => setIsAvailabilityModalOpen(true)}
              >
                <span>Check Date Availability</span>
                <ArrowRight size={15} />
              </button>

              <Link to="/courses" className="btn-outline-subtle">
                <span>Explore Menu Collections</span>
                <ChevronRight size={15} />
              </Link>
            </div>

            {/* Quick Interactive Event Planner Prompt */}
            <div className="planner-quick-card">
              <div className="planner-quick-left">
                <div className="planner-quick-icon">
                  <Compass size={18} />
                </div>
                <div>
                  <div className="planner-quick-title">Interactive Event Planner</div>
                  <div className="planner-quick-sub">Estimate staffing, recommended menu tier &amp; prep logistics</div>
                </div>
              </div>
              <button
                type="button"
                className="planner-quick-btn"
                onClick={() => setIsPlannerModalOpen(true)}
              >
                <span>Launch Planner</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* 4 Stats Cards */}
            <div className="hero-stats-row">
              <div className="hero-stat-card">
                <span className="stat-metric">20+ Years</span>
                <span className="stat-desc">Executive Chef Michael Thomas</span>
              </div>
              <div className="hero-stat-card">
                <span className="stat-metric">A-List Film &amp; TV</span>
                <span className="stat-desc">Minimum 200 Location Shoots</span>
              </div>
              <div className="hero-stat-card">
                <span className="stat-metric">BC Pacific NW</span>
                <span className="stat-desc">Sustainably Harvested Local Ingredients</span>
              </div>
              <div className="hero-stat-card">
                <span className="stat-metric">Custom Menus</span>
                <span className="stat-desc">Allergies, Dietary, &amp; Halal/Kosher</span>
              </div>
            </div>

            {/* Culinary Auto-Showcase Carousel */}
            <div className="hero-visual-wrap" style={{ marginTop: '24px' }}>
              <div className="hero-img-container carousel-container">
                {HERO_SLIDES.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                    aria-hidden={index !== currentSlide}
                  >
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="carousel-dish-img"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <div className="hero-dish-overlay">
                      <div className="hero-dish-title">{slide.title}</div>
                      <div className="hero-dish-course">{slide.course}</div>
                    </div>
                  </div>
                ))}

                {/* Subtle Luxury Animated Progress Line */}
                <div className="carousel-progress-track">
                  <div
                    key={currentSlide}
                    className={`carousel-progress-bar ${isPaused ? 'paused' : ''}`}
                  />
                </div>

                {/* Pause/Play accessible toggle */}
                <button
                  type="button"
                  className="carousel-pause-btn"
                  onClick={() => setIsPaused(!isPaused)}
                  aria-label={isPaused ? "Play automated dish showcase" : "Pause automated dish showcase"}
                  title={isPaused ? "Resume automated showcase" : "Pause showcase"}
                >
                  {isPaused ? <Play size={12} fill="#FAF8F5" /> : <Pause size={12} fill="#FAF8F5" />}
                  <span>{isPaused ? 'Paused' : 'Auto'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DISCIPLINES PREVIEW                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="ow-section disciplines-section">
        <div className="ow-container">
          <div className="section-header-split">
            <div>
              <span className="section-label">Catering Programs</span>
              <h2 className="section-heading-serif">Tailored Service Disciplines</h2>
            </div>
            <div>
              <p className="section-header-narrative" style={{ marginBottom: '12px' }}>
                Whether servicing 800-guest galas or filming 14-hour days on location in Vancouver,
                Ocean West crafts customized dishes with passion &amp; precision.
              </p>
              <Link to="/disciplines" className="inline-text-link">
                <span>View All Service Disciplines In-Depth</span>
                <ChevronRight size={15} />
              </Link>
            </div>
          </div>

          <div className="disciplines-grid">
            {/* Card 1: Weddings */}
            <div className="discipline-card">
              <div className="discipline-img-wrap">
                <img src={IMAGES.wedding} alt="Bespoke Wedding Feasts" loading="lazy" />
                <span className="discipline-tag-badge">Weddings &amp; Receptions</span>
              </div>
              <div className="discipline-body">
                <h3 className="discipline-title">Bespoke Wedding Feasts</h3>
                <p className="discipline-desc">
                  Tailored to dietary requirements and personal preferences, complimented with full bar and service staffing.
                </p>
                <div className="discipline-footer">
                  <span className="discipline-meta-item">
                    <Users size={12} />
                    <span>25 to 500+ Guests</span>
                  </span>
                  <Link to="/disciplines" className="discipline-meta-link">
                    <span>Explore Feasts &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: Film & Media */}
            <div className="discipline-card">
              <div className="discipline-img-wrap">
                <img src={IMAGES.filmCraft} alt="Film & Media Craft Services" loading="lazy" />
                <span className="discipline-tag-badge">Film &amp; Television Production</span>
              </div>
              <div className="discipline-body">
                <h3 className="discipline-title">Film &amp; Media Craft Services</h3>
                <p className="discipline-desc">
                  High-speed hot craft trucks, 24/7 mobile kitchens, and continuous craft services for filming crews anywhere across BC.
                </p>
                <div className="discipline-footer">
                  <span className="discipline-meta-item">
                    <Clock size={12} />
                    <span>24/7 Hot Craft Trucks</span>
                  </span>
                  <Link to="/film-catering" className="discipline-meta-link">
                    <span>View Craft Setup &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3: Galas & Summits */}
            <div className="discipline-card">
              <div className="discipline-img-wrap">
                <img src={IMAGES.gala} alt="Galas & Executive Summits" loading="lazy" />
                <span className="discipline-tag-badge">Corporate &amp; Galas</span>
              </div>
              <div className="discipline-body">
                <h3 className="discipline-title">Galas &amp; Executive Summits</h3>
                <p className="discipline-desc">
                  Flawless execution for high-stakes corporate functions, client receptions, board luncheons, and celebration dinners.
                </p>
                <div className="discipline-footer">
                  <span className="discipline-meta-item">
                    <Users size={12} />
                    <span>Up to 1,200 Guests</span>
                  </span>
                  <Link to="/disciplines" className="discipline-meta-link">
                    <span>Explore Galas &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 4: Party Platters & BBQs */}
            <div className="discipline-card">
              <div className="discipline-img-wrap">
                <img src={IMAGES.platter} alt="Party Platters & BBQs" loading="lazy" />
                <span className="discipline-tag-badge">Casual &amp; Private</span>
              </div>
              <div className="discipline-body">
                <h3 className="discipline-title">Party Platters &amp; BBQs</h3>
                <p className="discipline-desc">
                  Curated grazing boards, artisanal platters, and casual barbecues for family events, corporate mixers, and relaxed gatherings.
                </p>
                <div className="discipline-footer">
                  <span className="discipline-meta-item">
                    <Clock size={12} />
                    <span>Drop-off &amp; Set Service</span>
                  </span>
                  <Link to="/disciplines" className="discipline-meta-link">
                    <span>View Platters &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SIGNATURE COURSES PREVIEW                                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="ow-section courses-section">
        <div className="ow-container">
          <div className="courses-header-centered">
            <span className="section-label">Culinary Repertoire</span>
            <h2 className="section-heading-serif">Signature Courses &amp; Delicacies</h2>
            <p className="courses-intro">
              Chef Michael harvests from traditional Haida Gwaii halibut, Langley farm duck eggs, and Cowichan Bay berries,
              honouring seasonal bounty from British Columbia's producers.
            </p>
          </div>

          <div className="courses-grid">
            {MENU_COURSES.slice(0, 3).map((course) => {
              const isSelected = selectedDishes.some(d => d.id === course.id);
              return (
                <div key={course.id} className="course-card">
                  <div className="course-badges-row">
                    {course.badges.map((b, idx) => (
                      <span key={idx} className={`course-badge ${b.type}`}>
                        {b.text}
                      </span>
                    ))}
                  </div>
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-desc">{course.description}</p>
                  <div className="course-card-footer">
                    <span className="course-style-label">
                      <Utensils size={12} />
                      <span>{course.serviceStyle}</span>
                    </span>
                    <button
                      type="button"
                      className={`btn-card-dish-add ${isSelected ? 'selected' : ''}`}
                      onClick={() => onToggleDishInMenu(course)}
                      title={isSelected ? "Remove from My Menu" : "Add to My Menu"}
                    >
                      {isSelected ? (
                        <>
                          <Check size={12} strokeWidth={3} />
                          <span>In Menu</span>
                        </>
                      ) : (
                        <>
                          <Plus size={12} strokeWidth={2.5} />
                          <span>Add to Menu</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <Link to="/courses" className="btn-primary-gold" style={{ display: 'inline-flex' }}>
              <span>View Full Menu Collections &amp; Download Guide</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* PACKAGES PREVIEW CALLOUT                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="ow-section packages-section">
        <div className="ow-container">
          <div className="courses-header-centered" style={{ marginBottom: '28px' }}>
            <span className="section-label">Package Selections</span>
            <h2 className="section-heading-serif">Event Programs Designed Around Your Guests</h2>
            <p className="courses-intro">
              Ocean West Catering provides full setup, professional staff, china, bar coordination,
              aesthetic styling, and complete dietary adaptation.
            </p>
          </div>

          <div className="packages-grid">
            <div className="package-card">
              <div className="package-meta-header">
                <span>Casual to Formal</span>
                <span className="package-rate">From $85/Guest</span>
              </div>
              <h3 className="package-title">The Intimate Gathering</h3>
              <p className="package-desc">
                Ideal for small celebration dinners, micro-weddings, corporate retreats, and cocktail evenings.
              </p>
              <div className="package-footer-block" style={{ marginTop: 'auto', paddingTop: '16px' }}>
                <Link to="/packages" className="btn-package-action" style={{ textAlign: 'center', display: 'block' }}>
                  Explore Package Details &rarr;
                </Link>
              </div>
            </div>

            <div className="package-card highlighted">
              <div className="most-requested-badge">Most Requested</div>
              <div className="package-meta-header">
                <span>Wedding &amp; Gala</span>
                <span className="package-rate">From $140/Guest</span>
              </div>
              <h3 className="package-title">The Grand Wedding Banquet</h3>
              <p className="package-desc">
                Our signature wedding dining experience. From bridal party arrivals to late-night bites.
              </p>
              <div className="package-footer-block" style={{ marginTop: 'auto', paddingTop: '16px' }}>
                <Link to="/packages" className="btn-package-action" style={{ textAlign: 'center', display: 'block' }}>
                  Explore Wedding Package &rarr;
                </Link>
              </div>
            </div>

            <div className="package-card">
              <div className="package-meta-header">
                <span>Film &amp; Set Production</span>
                <span className="package-rate">Daily Call Sheet Rates</span>
              </div>
              <h3 className="package-title">Movie &amp; Film Production</h3>
              <p className="package-desc">
                Reliable, high-energy, nutritious catering tailored for busy cast &amp; crew across British Columbia.
              </p>
              <div className="package-footer-block" style={{ marginTop: 'auto', paddingTop: '16px' }}>
                <Link to="/film-catering" className="btn-package-action" style={{ textAlign: 'center', display: 'block' }}>
                  Explore Film Craft &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* TESTIMONIALS                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="ow-section testimonials-section">
        <div className="ow-container">
          <div className="courses-header-centered" style={{ marginBottom: '28px' }}>
            <span className="section-label">Testimonials &amp; Client Experiences</span>
            <h2 className="section-heading-serif">Voices from British Columbia</h2>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((item) => (
              <div key={item.id} className="testimonial-card">
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#C89B6D" stroke="#C89B6D" />
                  ))}
                </div>
                <p className="testimonial-quote">"{item.quote}"</p>
                <div className="testimonial-author-box">
                  <div className="author-name">{item.name}</div>
                  <div className="author-role">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* QUICK INQUIRY INVITATION                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="ow-section" style={{ backgroundColor: '#FAF8F5', borderTop: '1px solid #EAE4D9' }}>
        <div className="ow-container">
          <div className="menu-guide-banner" style={{ background: '#192720', color: '#FAF8F5' }}>
            <div className="banner-left">
              <div className="banner-icon-box" style={{ background: 'rgba(186, 141, 91, 0.2)', color: '#BA8D5B' }}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="banner-title" style={{ color: '#FAF8F5' }}>Ready to Plan Your Next Culinary Experience?</h4>
                <p className="banner-subtitle" style={{ color: '#BAC4BD' }}>
                  Connect directly with Executive Chef Michael Thomas for custom proposals and date reservations.
                </p>
              </div>
            </div>
            <Link to="/inquiry" className="banner-btn" style={{ background: '#BA8D5B', color: '#192720' }}>
              <span>Start Direct Inquiry</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

