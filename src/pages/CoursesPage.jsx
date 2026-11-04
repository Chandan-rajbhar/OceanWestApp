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
import { MENU_COURSES } from '../data/cateringData';

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
      {/* PAGE BANNER                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="page-header-banner">
        <div className="ow-container">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Courses &amp; Delicacies</span>
          </div>
          <span className="section-label">Culinary Repertoire</span>
          <h1 className="page-banner-title">Signature Courses &amp; Delicacies</h1>
          <p className="page-banner-intro">
            Executive Chef Michael Thomas harvests directly from Haida Gwaii halibut fishers, Langley
            heritage duck farms, and Cowichan Valley organic orchards to produce unforgettable fine
            Pacific Northwest courses.
          </p>

          {/* Quick Helper Tools Bar */}
          <div className="courses-tools-strip">
            <button
              type="button"
              className="course-tool-chip"
              onClick={onOpenServingGuide}
              title="Calculate recommended portions for courses and platters"
            >
              <Scale size={13} style={{ color: '#BA8D5B' }} />
              <span>Serving-Size Guide</span>
            </button>
            <button
              type="button"
              className="course-tool-chip"
              onClick={onOpenGallery}
              title="Browse plated course photography"
            >
              <Camera size={13} style={{ color: '#BA8D5B' }} />
              <span>Photo Gallery</span>
            </button>
            {favoriteDishes.length > 0 && (
              <button
                type="button"
                className="course-tool-chip"
                onClick={() => setActiveCategory('favorites')}
                title="View your saved dishes"
              >
                <Heart size={13} fill="#BA8D5B" color="#BA8D5B" />
                <span>{favoriteDishes.length} Saved Favorites</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* MENU REPERTOIRE SECTION                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="ow-section courses-section">
        <div className="ow-container">
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
                  style={{ color: '#BA8D5B' }}
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
              <span>Filter By:</span>
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
                return (
                  <div key={course.id} className="course-card">
                    <div className="course-card-top-row">
                      <div className="course-badges-row">
                        {course.isSignature && (
                          <span className="course-badge signature-badge">Signature</span>
                        )}
                        {course.isChefSpecial && (
                          <span className="course-badge chef-special-badge">Chef Special</span>
                        )}
                        {course.badges.map((b, idx) => (
                          <span key={idx} className={`course-badge ${b.type}`}>
                            {b.text}
                          </span>
                        ))}
                      </div>

                      {/* Favorite Button */}
                      <button
                        type="button"
                        className={`course-fav-btn ${isFavorite ? 'favorited' : ''}`}
                        onClick={() => onToggleFavorite && onToggleFavorite(course)}
                        title={
                          isFavorite
                            ? `Remove ${course.title} from favorites`
                            : `Save ${course.title} to favorites`
                        }
                        aria-label={isFavorite ? `Unfavorite ${course.title}` : `Favorite ${course.title}`}
                      >
                        <Heart
                          size={16}
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
                              <span>Add to Menu</span>
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
                {inspectingDish.isSignature && (
                  <span className="course-badge signature-badge">Signature Selection</span>
                )}
                {inspectingDish.isChefSpecial && (
                  <span className="course-badge chef-special-badge">Executive Chef Special</span>
                )}
                {inspectingDish.badges.map((b, idx) => (
                  <span key={idx} className={`course-badge ${b.type}`}>
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
