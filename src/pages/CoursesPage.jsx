import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Utensils,
  ChevronRight,
  FileText,
  Download,
  Check,
  Sparkles,
  ArrowRight,
  Plus,
  ShoppingBag,
  Heart,
  Scale,
  Camera,
  Info,
  ShieldAlert,
  X,
  Filter,
  CheckCircle2,
  ChefHat,
  Flame
} from 'lucide-react';
import { MENU_COURSES, IMAGES, HERO_SLIDES } from '../data/cateringData';
import ImageWithFallback from '../components/ImageWithFallback';

function getDeduplicatedBadges(course) {
  const list = [];
  const seen = new Set();
  if (course.isSignature) {
    list.push({ text: 'Signature', type: 'signature' });
    seen.add('signature');
  }
  if (course.isChefSpecial) {
    list.push({ text: 'Chef Special', type: 'chef-special' });
    seen.add('chef special');
  }
  for (const b of (course.badges || [])) {
    const norm = (b.text || '').trim().toLowerCase();
    if (!seen.has(norm)) {
      seen.add(norm);
      list.push(b);
    }
  }
  return list.slice(0, 3);
}

export default function CoursesPage({
  setIsPdfModalOpen,
  selectedDishes = [],
  onToggleDishInMenu,
  onOpenMyMenu,
  favoriteDishes = [],
  onToggleFavorite,
  onOpenServingGuide,
  onOpenGallery,
  setFormData,
  showToast
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDietaryFilter, setActiveDietaryFilter] = useState('all'); // 'all' | 'vegetarian' | 'vegan' | 'gluten_free' | 'signature' | 'chef_special'
  const [inspectingDish, setInspectingDish] = useState(null);
  const navigate = useNavigate();

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

  // Filter logic
  const filteredCourses = MENU_COURSES.filter((course) => {
    // Category check
    if (activeCategory === 'favorites') {
      if (!favoriteDishes.includes(course.id)) return false;
    } else if (activeCategory !== 'all') {
      if (activeCategory === 'mains') {
        if (course.category !== 'mains' && course.category !== 'dinner') return false;
      } else if (course.category !== activeCategory) {
        return false;
      }
    }

    // Dietary filter check
    if (activeDietaryFilter === 'vegetarian') {
      const isVeg = course.badges.some((b) => b.text.toLowerCase().includes('vegetarian'));
      if (!isVeg) return false;
    } else if (activeDietaryFilter === 'vegan') {
      const isVegan = course.badges.some((b) => b.text.toLowerCase().includes('vegan'));
      if (!isVegan) return false;
    } else if (activeDietaryFilter === 'gluten_free') {
      const isGf = course.badges.some((b) => b.text.toLowerCase().includes('gluten-free'));
      if (!isGf) return false;
    } else if (activeDietaryFilter === 'signature') {
      if (!course.isSignature) return false;
    } else if (activeDietaryFilter === 'chef_special') {
      if (!course.isChefSpecial) return false;
    }

    return true;
  });

  const handleQuickInquire = (courseTitle) => {
    setFormData((prev) => ({
      ...prev,
      notes: `Interested in including: ${courseTitle}\n` + (prev.notes || '')
    }));
    showToast(`Added "${courseTitle}" to your inquiry preferences!`);
    navigate('/inquiry');
  };

  return (
    <div className="courses-page">
      {/* ------------------------------------------------------------------ */}
      {/* 1. COMPACT ROUNDED HERO CARD WITH GLOW & SHINE (HOME PAGE LAYOUT)  */}
      {/* ------------------------------------------------------------------ */}
      <section className="app-hero-card-wrap" style={{ padding: '12px 14px 4px' }}>
        <div className="app-hero-card">
          <div className="app-hero-shine" aria-hidden="true" />
          <img
            src={HERO_SLIDES[1]?.image || IMAGES.halibut || IMAGES.platter}
            alt="Ocean West Signature Courses"
            className="app-hero-bg-img"
            loading="eager"
          />
          <div className="app-hero-gradient-overlay" />

          <div className="app-hero-card-content">
            <div className="hero-location-chip">
              <Sparkles size={9} className="chip-pin-icon" />
              <span>CULINARY REPERTOIRE • PACIFIC NORTHWEST</span>
            </div>

            <h1 className="hero-app-headline">
              Signature Courses &amp; Delicacies
            </h1>
            <p className="hero-app-subtext">
              Haida Gwaii halibut, Cowichan Valley organic orchards &amp; artisan display platters.
            </p>

            <div className="hero-app-actions-row">
              <button
                type="button"
                className="btn-hero-explore"
                onClick={onOpenServingGuide}
                title="Portion calculator for banquets and courses"
              >
                <Scale size={11} />
                <span>Serving Guide</span>
              </button>
              <button
                type="button"
                className="btn-hero-quote"
                onClick={onOpenGallery}
                title="Browse plated course photography"
              >
                <Camera size={11} />
                <span>Photo Gallery</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. CATERING HIGHLIGHTS STRIP (MATCHING HOME PAGE)                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="menu-highlights-strip" style={{ padding: '8px 14px 4px' }}>
        <div className="menu-trust-metrics-row">
          <div className="menu-trust-metric-chip">
            <Sparkles size={12} style={{ color: '#BA8D5B' }} />
            <span>100% Ocean Wise®</span>
          </div>
          <div className="menu-trust-metric-chip">
            <ChefHat size={12} style={{ color: '#BA8D5B' }} />
            <span>Chef Prepared</span>
          </div>
          <div className="menu-trust-metric-chip">
            <CheckCircle2 size={12} style={{ color: '#BA8D5B' }} />
            <span>Dietary Protocols</span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. FEATURED READY-TO-SERVE EVENT PLATTERS                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="app-section event-platters-section" style={{ padding: '14px 14px 8px' }}>
        <div className="app-section-header">
          <div>
            <span className="app-kicker">READY-TO-SERVE</span>
            <h2 className="app-heading-serif">Featured Event Platters</h2>
          </div>
          <span style={{ fontSize: '10.5px', color: '#7A857E', fontWeight: 600 }}>
            Chef Prepared &amp; Display Ready
          </span>
        </div>

        <div className="platters-compact-list">
          {FEATURED_PLATTERS.map((platter) => {
            const isAdded = selectedDishes.some((d) => d.id === platter.id);
            const sourceDish = MENU_COURSES.find((c) => c.id === platter.id) || platter;

            return (
              <div
                key={platter.id}
                className="compact-platter-card"
                onClick={() => setInspectingDish(sourceDish)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setInspectingDish(sourceDish);
                  }
                }}
              >
                <div className="platter-thumbnail-box">
                  <ImageWithFallback
                    src={platter.image}
                    alt={platter.title}
                    aspect="1:1"
                  />
                </div>

                <div className="platter-info-box">
                  <div className="platter-title-price-row">
                    <h3 className="platter-title">{platter.title}</h3>
                    <span className="platter-rate-pill">{platter.rate}</span>
                  </div>

                  <p className="platter-desc">{platter.description}</p>

                  <div className="platter-action-row">
                    <span className="platter-dietary-pill">{platter.dietaryTag}</span>

                    <button
                      type="button"
                      className={`btn-add-platter ${isAdded ? 'is-added' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleDishInMenu(sourceDish);
                      }}
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
                          <span>Add</span>
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
      {/* MENU REPERTOIRE SECTION                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="ow-section courses-section">
        <div className="ow-container">
          {/* Sticky Filter Header Bar with Fade Hint */}
          <div className="sticky-menu-filters-bar">
            {/* Category Tabs */}
            <div className="courses-filter-tabs-wrapper">
              <div className="courses-filter-tabs" role="tablist" aria-label="Course categories">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === 'all'}
                  className={`filter-tab-pill ${activeCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('all')}
                >
                  All Courses ({MENU_COURSES.length})
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === 'starters'}
                  className={`filter-tab-pill ${activeCategory === 'starters' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('starters')}
                >
                  Starters
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === 'mains'}
                  className={`filter-tab-pill ${activeCategory === 'mains' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('mains')}
                >
                  Dinner Mains
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === 'lunch'}
                  className={`filter-tab-pill ${activeCategory === 'lunch' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('lunch')}
                >
                  Lunch
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === 'breakfast'}
                  className={`filter-tab-pill ${activeCategory === 'breakfast' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('breakfast')}
                >
                  Breakfast
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === 'canapes'}
                  className={`filter-tab-pill ${activeCategory === 'canapes' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('canapes')}
                >
                  Canapés
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === 'grazing'}
                  className={`filter-tab-pill ${activeCategory === 'grazing' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('grazing')}
                >
                  Grazing
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === 'desserts'}
                  className={`filter-tab-pill ${activeCategory === 'desserts' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('desserts')}
                >
                  Desserts
                </button>
                {favoriteDishes.length > 0 && (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === 'favorites'}
                    className={`filter-tab-pill ${activeCategory === 'favorites' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('favorites')}
                  >
                    Favorites ({favoriteDishes.length})
                  </button>
                )}
              </div>
            </div>

            {/* Secondary Dietary & Specials Filter Strip */}
            <div className="dietary-filter-substrip">
              <span className="filter-substrip-label">
                <Filter size={12} />
                <span>Filter:</span>
              </span>
              <div className="dietary-filter-pills">
                <button
                  type="button"
                  className={`sub-filter-pill ${activeDietaryFilter === 'all' ? 'is-active' : ''}`}
                  onClick={() => setActiveDietaryFilter('all')}
                >
                  All Dietary
                </button>
                <button
                  type="button"
                  className={`sub-filter-pill ${activeDietaryFilter === 'vegetarian' ? 'is-active' : ''}`}
                  onClick={() =>
                    setActiveDietaryFilter(activeDietaryFilter === 'vegetarian' ? 'all' : 'vegetarian')
                  }
                >
                  Vegetarian
                </button>
                <button
                  type="button"
                  className={`sub-filter-pill ${activeDietaryFilter === 'vegan' ? 'is-active' : ''}`}
                  onClick={() =>
                    setActiveDietaryFilter(activeDietaryFilter === 'vegan' ? 'all' : 'vegan')
                  }
                >
                  Vegan
                </button>
                <button
                  type="button"
                  className={`sub-filter-pill ${activeDietaryFilter === 'gluten_free' ? 'is-active' : ''}`}
                  onClick={() =>
                    setActiveDietaryFilter(activeDietaryFilter === 'gluten_free' ? 'all' : 'gluten_free')
                  }
                >
                  Gluten-Free
                </button>
                <button
                  type="button"
                  className={`sub-filter-pill ${activeDietaryFilter === 'signature' ? 'is-active' : ''}`}
                  onClick={() =>
                    setActiveDietaryFilter(activeDietaryFilter === 'signature' ? 'all' : 'signature')
                  }
                >
                  <Sparkles size={11} />
                  <span>Signatures</span>
                </button>
                <button
                  type="button"
                  className={`sub-filter-pill ${activeDietaryFilter === 'chef_special' ? 'is-active' : ''}`}
                  onClick={() =>
                    setActiveDietaryFilter(activeDietaryFilter === 'chef_special' ? 'all' : 'chef_special')
                  }
                >
                  <ChefHat size={11} />
                  <span>Chef Specials</span>
                </button>
              </div>
            </div>
          </div>

          {/* Menu Cards Grid */}
          <div className="courses-grid">
            {filteredCourses.length === 0 ? (
              <div className="my-menu-empty-state" style={{ gridColumn: '1 / -1', padding: '36px 16px' }}>
                <Heart size={32} style={{ color: '#BA8D5B', margin: '0 auto 12px' }} />
                <h4 className="empty-state-title">No Matching Dishes Found</h4>
                <p className="empty-state-desc">
                  Try adjusting your category or dietary filters to view more culinary selections.
                </p>
                <button
                  type="button"
                  className="btn-outline-subtle"
                  onClick={() => {
                    setActiveCategory('all');
                    setActiveDietaryFilter('all');
                  }}
                  style={{ margin: '0 auto' }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredCourses.map((course) => {
                const isSelected = selectedDishes.some((d) => d.id === course.id);
                const isFavorite = favoriteDishes.includes(course.id);
                const displayBadges = getDeduplicatedBadges(course);

                return (
                  <div key={course.id} className="course-card">
                    <div className="course-card-top-row">
                      <div className="course-badges-row">
                        {displayBadges.map((b, idx) => (
                          <span key={idx} className={`course-badge ${b.type || 'gold'}`}>
                            {b.text}
                          </span>
                        ))}
                      </div>

                      {/* Favorite Button: 44x44 tap target with smooth scale */}
                      <button
                        type="button"
                        className={`course-fav-btn ${isFavorite ? 'favorited' : ''}`}
                        onClick={() => {
                          if (onToggleFavorite) onToggleFavorite(course);
                          if (showToast) {
                            showToast(
                              isFavorite
                                ? `Removed "${course.title}" from favorites`
                                : `Saved "${course.title}" to favorites`
                            );
                          }
                        }}
                        title={
                          isFavorite
                            ? `Remove ${course.title} from favorites`
                            : `Save ${course.title} to favorites`
                        }
                        aria-label={isFavorite ? `Unfavorite ${course.title}` : `Favorite ${course.title}`}
                      >
                        <Heart
                          size={18}
                          fill={isFavorite ? '#BA8D5B' : 'none'}
                          color={isFavorite ? '#BA8D5B' : '#76837A'}
                        />
                      </button>
                    </div>

                    <h3
                      className="course-title clickable-dish-title"
                      onClick={() => setInspectingDish(course)}
                      title="Click to view ingredients and allergens"
                    >
                      {course.title}
                    </h3>
                    <p className="course-desc">{course.description}</p>

                    {/* Quick Ingredients & Allergen Pill Preview */}
                    <div className="course-provenance-bar">
                      <button
                        type="button"
                        className="btn-inspect-ingredients"
                        onClick={() => setInspectingDish(course)}
                      >
                        <Info size={12} />
                        <span>View Ingredients &amp; Allergens</span>
                      </button>
                    </div>

                    <div className="course-card-footer">
                      <span className="course-style-label">
                        <Utensils size={12} />
                        <span>{course.serviceStyle}</span>
                      </span>

                      <div className="course-action-btns">
                        <button
                          type="button"
                          className={`btn-dish-builder-toggle ${isSelected ? 'selected' : ''}`}
                          onClick={() => onToggleDishInMenu(course)}
                          title={isSelected ? 'Remove from My Menu' : 'Add to My Menu Builder'}
                          aria-label={
                            isSelected ? `Remove ${course.title} from menu` : `Add ${course.title} to menu`
                          }
                        >
                          {isSelected ? (
                            <>
                              <Check size={12} strokeWidth={3} />
                              <span>In Menu</span>
                            </>
                          ) : (
                            <>
                              <Plus size={12} strokeWidth={2.5} />
                              <span>Add</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          title="Add this dish and inquire immediately"
                          onClick={() => handleQuickInquire(course.title)}
                          className="btn-dish-inquire"
                        >
                          <span>Inquire</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* PDF Catalog banner */}
          <div className="menu-guide-banner" style={{ marginTop: '36px' }}>
            <div className="banner-left">
              <div className="banner-icon-box">
                <FileText size={22} />
              </div>
              <div>
                <h4 className="banner-title">Seasonal Catering &amp; Wine Pairing Guide</h4>
                <p className="banner-subtitle">
                  Download our complete 24-page catalog with tasting notes, full ingredient origins, and
                  dietary pairings.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="banner-btn"
              onClick={() => setIsPdfModalOpen(true)}
            >
              <span>Request PDF Catalog</span>
              <Download size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DISH DETAILS, INGREDIENTS & ALLERGEN MODAL                         */}
      {/* ------------------------------------------------------------------ */}
      {inspectingDish && (
        <div
          className="modal-overlay-backdrop active"
          onClick={() => setInspectingDish(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Detailed specifications for ${inspectingDish.title}`}
        >
          <div
            className="modal-content-box dish-inspect-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-top-header">
              <div className="modal-title-lockup">
                <span className="modal-kicker">Course Specification</span>
                <h2 className="modal-headline" style={{ fontSize: '1.25rem' }}>
                  {inspectingDish.title}
                </h2>
              </div>
              <button
                type="button"
                className="modal-close-round-btn"
                onClick={() => setInspectingDish(null)}
                aria-label="Close dish details"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-scroll-body dish-inspect-body">
              {/* Badges Row */}
              <div className="course-badges-row" style={{ marginBottom: '12px' }}>
                {getDeduplicatedBadges(inspectingDish).map((b, idx) => (
                  <span key={idx} className={`course-badge ${b.type || 'gold'}`}>
                    {b.text}
                  </span>
                ))}
              </div>

              <p className="dish-full-desc">{inspectingDish.description}</p>

              {/* Service Style Info */}
              <div className="dish-meta-row">
                <div className="dish-meta-item">
                  <span className="meta-item-label">Course Category:</span>
                  <span className="meta-item-val" style={{ textTransform: 'capitalize' }}>
                    {inspectingDish.category}
                  </span>
                </div>
                <div className="dish-meta-item">
                  <span className="meta-item-label">Serving Format:</span>
                  <span className="meta-item-val">{inspectingDish.serviceStyle}</span>
                </div>
              </div>

              {/* Ingredients List */}
              <div className="dish-ingredients-card">
                <h4 className="card-sub-header">
                  <Utensils size={14} />
                  <span>Key Ingredients &amp; Regional Provenance</span>
                </h4>
                {inspectingDish.ingredients && inspectingDish.ingredients.length > 0 ? (
                  <ul className="dish-ingredients-list">
                    {inspectingDish.ingredients.map((ing, i) => (
                      <li key={i}>
                        <CheckCircle2 size={13} className="ing-check-icon" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="provenance-unavailable-note">
                    Full ingredient provenance specification available upon seasonal menu consultation.
                  </p>
                )}
              </div>

              {/* Allergens & Safety Protocol */}
              <div className="dish-allergens-card">
                <h4 className="card-sub-header allergen-header">
                  <ShieldAlert size={14} />
                  <span>Allergen Declaration &amp; Safety Protocol</span>
                </h4>
                <div className="allergens-tags-row">
                  {inspectingDish.allergens && inspectingDish.allergens.length > 0 ? (
                    inspectingDish.allergens.map((alg, i) => (
                      <span key={i} className="allergen-danger-tag">
                        Contains {alg}
                      </span>
                    ))
                  ) : (
                    <span className="allergen-none-tag">No Common Top Allergens Declared</span>
                  )}
                </div>

                <div className="allergen-policy-box">
                  <p className="allergen-safety-text">
                    <strong>Kitchen Safety Note:</strong>{' '}
                    {inspectingDish.allergenSafetyNote ||
                      'Never infer allergen safety without source confirmation. Our commercial kitchen processes gluten, shellfish, and tree nuts.'}
                  </p>
                  <span className="strict-disclaimer-sub">
                    Individual sealed dietary meal boxes can be prepared under dedicated sterile sanitization
                    protocols upon notice.
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="modal-bottom-footer-bar custom-footer-bar">
              <button
                type="button"
                className={`footer-save-btn ${
                  selectedDishes.some((d) => d.id === inspectingDish.id) ? 'is-in-menu' : ''
                }`}
                onClick={() => {
                  onToggleDishInMenu(inspectingDish);
                }}
              >
                {selectedDishes.some((d) => d.id === inspectingDish.id) ? (
                  <>
                    <Check size={14} />
                    <span>In My Menu</span>
                  </>
                ) : (
                  <>
                    <Plus size={14} />
                    <span>Add to My Menu</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className="footer-cancel-btn"
                onClick={() => {
                  const title = inspectingDish.title;
                  setInspectingDish(null);
                  handleQuickInquire(title);
                }}
              >
                <span>Inquire Dish</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
