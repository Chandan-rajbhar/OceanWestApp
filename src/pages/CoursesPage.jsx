import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  Search,
  Sliders,
  Plus,
  Check,
  Heart,
  ArrowRight
} from 'lucide-react';
import {
  MENU_COURSES,
  MENU_CATEGORIES,
  getDishPrice,
  getDishImage
} from '../data/cateringData';
import DishInspectModal from '../components/DishInspectModal';

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
  return list;
}

export default function CoursesPage({
  selectedDishes = [],
  onToggleDishInMenu,
  favoriteDishes = [],
  onToggleFavorite,
  showToast,
  onOpenNotificationsModal
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDietaryFilter, setActiveDietaryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectingDish, setInspectingDish] = useState(null);
  const navigate = useNavigate();

  // Two canonical Popular Dishes matching Reference Screen 2 & prompt
  const POPULAR_DISHES = [
    MENU_COURSES.find((d) => d.id === 101) || {
      id: 101,
      title: 'Seared Scallops',
      price: 28,
      rate: '$28 / person',
      category: 'starters',
      description: 'Pan-seared scallops with cauliflower purée, seasonal greens and citrus beurre blanc.',
      image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80',
      badges: [{ text: 'Signature', type: 'gold' }, { text: 'Gluten Free', type: 'green' }]
    },
    MENU_COURSES.find((d) => d.id === 102) || {
      id: 102,
      title: 'Herb Crusted Salmon',
      price: 32,
      rate: '$32 / person',
      category: 'dinner',
      description: 'Crispy herb-crusted wild salmon served with blistered shallots, lemon thyme emulsion, and asparagus.',
      image: MENU_COURSES[1]?.image,
      badges: [{ text: 'Signature', type: 'gold' }, { text: 'Gluten Free', type: 'green' }]
    }
  ];

  // Filtering for the full catalog
  const filteredCourses = MENU_COURSES.filter((course) => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = course.title?.toLowerCase().includes(q);
      const matchDesc = course.description?.toLowerCase().includes(q);
      const matchCat = course.category?.toLowerCase().includes(q);
      const matchIng = course.ingredients?.some((ing) => ing.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchCat && !matchIng) return false;
    }

    // 2. Category Filter (All, Breakfast, Lunch, Dinner, Desserts, Starters, etc.)
    if (activeCategory === 'favorites') {
      if (!favoriteDishes.includes(course.id)) return false;
    } else if (activeCategory !== 'all') {
      if (activeCategory === 'dinner' || activeCategory === 'mains') {
        if (course.category !== 'dinner' && course.category !== 'mains') return false;
      } else if (activeCategory === 'chef_specials') {
        if (!course.isChefSpecial) return false;
      } else if (activeCategory === 'vegetarian') {
        const isVeg = course.badges?.some((b) => b.text.toLowerCase().includes('vegetarian'));
        if (!isVeg) return false;
      } else if (activeCategory === 'beverages') {
        if (course.category !== 'beverages' && course.category !== 'canapes') return false;
      } else if (course.category !== activeCategory) {
        return false;
      }
    }

    // 3. Dietary Filter toggle
    if (activeDietaryFilter === 'vegetarian') {
      const isVeg = course.badges?.some((b) => b.text.toLowerCase().includes('vegetarian'));
      if (!isVeg) return false;
    } else if (activeDietaryFilter === 'gluten_free') {
      const isGf = course.badges?.some((b) => b.text.toLowerCase().includes('gluten-free') || b.text.toLowerCase().includes('gluten free'));
      if (!isGf) return false;
    }

    return true;
  });

  return (
    <div className="menus-redesign-screen">
      {/* ------------------------------------------------------------------ */}
      {/* 1. AUTHENTIC SCREEN 2 TOP BAR (NO HEADER CARD)                     */}
      {/* ------------------------------------------------------------------ */}
      <header className="menus-screen-top-bar" aria-label="Menu Header">
        <div className="menus-top-left-group">
          <button
            type="button"
            className="menus-top-icon-btn menus-top-back-btn"
            onClick={() => navigate('/')}
            aria-label="Back to Home"
          >
            <ArrowLeft size={22} strokeWidth={2.2} />
          </button>
          <h1 className="menus-top-bar-title">Menus</h1>
        </div>

        <button
          type="button"
          className="menus-top-icon-btn menus-top-bell-btn"
          onClick={() => {
            if (onOpenNotificationsModal) {
              onOpenNotificationsModal();
            } else {
              navigate('/profile');
            }
          }}
          aria-label="Notifications"
        >
          <Bell size={20} strokeWidth={2} />
          <span className="menus-bell-unread-dot" aria-hidden="true" />
        </button>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* 2. HORIZONTALLY SCROLLABLE FILTER CHIPS (All, Breakfast, Lunch...) */}
      {/* ------------------------------------------------------------------ */}
      <div className="menus-filter-chips-wrap">
        <div className="menus-filter-chips-row" role="tablist" aria-label="Menu Course Filters">
          {[
            { id: 'all', label: 'All' },
            { id: 'breakfast', label: 'Breakfast' },
            { id: 'lunch', label: 'Lunch' },
            { id: 'dinner', label: 'Dinner' },
            { id: 'desserts', label: 'Desserts' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === tab.id}
              className={`menus-category-chip ${activeCategory === tab.id ? 'is-active' : ''}`}
              onClick={() => {
                setActiveCategory(tab.id);
                setSearchQuery('');
              }}
            >
              {tab.label}
            </button>
          ))}
          {favoriteDishes.length > 0 && (
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'favorites'}
              className={`menus-category-chip ${activeCategory === 'favorites' ? 'is-active' : ''}`}
              onClick={() => setActiveCategory('favorites')}
            >
              Saved ({favoriteDishes.length})
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. SEARCH FIELD (48px, RADIUS 14px) WITH FILTER ICON               */}
      {/* ------------------------------------------------------------------ */}
      <div className="menus-search-wrapper">
        <div className="menus-search-input-field">
          <Search size={18} className="menus-search-lens-icon" />
          <input
            type="text"
            className="menus-search-text-input"
            placeholder="Search dishes, cuisine or ingredient..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search dishes"
          />
          <button
            type="button"
            className={`menus-search-filter-btn ${activeDietaryFilter !== 'all' ? 'is-filtering' : ''}`}
            onClick={() => {
              setActiveDietaryFilter((prev) => (prev === 'all' ? 'vegetarian' : 'all'));
              if (showToast) {
                showToast(activeDietaryFilter === 'all' ? 'Filtered by Vegetarian options' : 'Cleared dietary filter');
              }
            }}
            title="Filter by Dietary Preference"
            aria-label="Toggle dietary filter"
          >
            <Sliders size={18} />
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 4. "MENU CATEGORIES": WHITE CARD WITH 3x2 GRID OF 64px CIRCULAR IMAGES */}
      {/* ------------------------------------------------------------------ */}
      <section className="menus-section-block">
        <h2 className="menus-section-title">Menu Categories</h2>
        <div className="menu-categories-card">
          <div className="menu-categories-3x2-grid">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`menu-category-grid-tile ${activeCategory === cat.id ? 'is-selected' : ''}`}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchQuery('');
                }}
                aria-label={`Filter by ${cat.name}`}
              >
                <div className="category-circle-avatar">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                </div>
                <span className="category-tile-name">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. "POPULAR DISHES" + "View all →": 2-COLUMN GRID OF IDENTICAL CARDS*/}
      {/* ------------------------------------------------------------------ */}
      <section className="menus-section-block">
        <div className="menus-section-header-flex">
          <h2 className="menus-section-title">Popular Dishes</h2>
          <button
            type="button"
            className="menus-view-all-link"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
              const el = document.getElementById('full-catalog-heading');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>View all</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="popular-dishes-2col-grid">
          {POPULAR_DISHES.map((dish) => {
            const isAdded = selectedDishes.some((d) => d.id === dish.id);
            const price = getDishPrice(dish);
            const img = getDishImage(dish);

            return (
              <article
                key={dish.id}
                className="popular-dish-column-card"
                onClick={() => setInspectingDish(dish)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setInspectingDish(dish);
                  }
                }}
              >
                {/* Fixed height 112px photo */}
                <div className="popular-dish-photo-box">
                  <img src={img} alt={dish.title} className="popular-dish-cover-img" loading="lazy" />
                </div>

                <div className="popular-dish-info-body">
                  {/* Title: 19px serif, fixed 2-line height with ellipsis */}
                  <h3 className="popular-dish-serif-title">{dish.title}</h3>

                  {/* Bottom row: price "$32" (17px, 600) + "/person" & 44px round "+" button */}
                  <div className="popular-dish-card-bottom-row">
                    <div className="dish-rate-lockup">
                      <span className="rate-num">${price}</span>
                      <span className="rate-unit">/person</span>
                    </div>

                    <button
                      type="button"
                      className={`btn-round-44px-action ${isAdded ? 'is-added' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleDishInMenu(dish);
                      }}
                      aria-label={isAdded ? `Remove ${dish.title} from cart` : `Add ${dish.title} to cart`}
                    >
                      {isAdded ? (
                        <Check size={18} strokeWidth={2.8} />
                      ) : (
                        <Plus size={18} strokeWidth={2.4} />
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. "FULL CATALOG / Chef Tasting Selections" + "15 dishes"           */}
      {/* ------------------------------------------------------------------ */}
      <section className="menus-section-block" id="full-catalog-heading">
        <div className="menus-section-header-flex">
          <div>
            <span className="menus-kicker-tag">FULL CATALOG</span>
            <h2 className="menus-section-title">Chef Tasting Selections</h2>
          </div>
          <span className="menus-catalog-count-badge">
            {filteredCourses.length} dishes
          </span>
        </div>

        <div className="catalog-vertical-cards-stack">
          {filteredCourses.map((course) => {
            const isAdded = selectedDishes.some((d) => d.id === course.id);
            const isFavorite = favoriteDishes.includes(course.id);
            const badges = getDeduplicatedBadges(course).slice(0, 2); // max 2 visible
            const price = getDishPrice(course);
            const img = getDishImage(course);

            return (
              <article
                key={course.id}
                className="catalog-horizontal-card"
                onClick={() => setInspectingDish(course)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setInspectingDish(course);
                  }
                }}
              >
                {/* 44px hit-area Favorite Heart at top-right */}
                <button
                  type="button"
                  className={`catalog-card-fav-btn ${isFavorite ? 'is-fav' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onToggleFavorite) onToggleFavorite(course);
                  }}
                  aria-label={isFavorite ? `Remove ${course.title} from favorites` : `Add ${course.title} to favorites`}
                >
                  <Heart
                    size={18}
                    fill={isFavorite ? '#8A5A2B' : 'none'}
                    color={isFavorite ? '#8A5A2B' : '#A3998C'}
                  />
                </button>

                {/* Left: 88x88 rounded thumbnail */}
                <div className="catalog-thumb-88px">
                  <img src={img} alt={course.title} className="catalog-thumb-img" loading="lazy" />
                </div>

                {/* Right: Tag chips row > title > 2-line description > price + "+ Add" pill */}
                <div className="catalog-details-column">
                  {/* Tag chips row: small uppercase 11px, green-tinted for dietary, max 2 */}
                  {badges.length > 0 && (
                    <div className="catalog-tags-row">
                      {badges.map((b, idx) => (
                        <span key={idx} className="catalog-tag-chip">
                          {b.text}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title (19px serif) */}
                  <h3 className="catalog-dish-title">{course.title}</h3>

                  {/* 2-line description (13px, muted) */}
                  <p className="catalog-dish-desc">{course.description}</p>

                  {/* Row with price on left and "+ Add" pill on right (turns green "✓ Added" in cart) */}
                  <div className="catalog-bottom-action-row">
                    <div className="dish-rate-lockup">
                      <span className="rate-num">${price}</span>
                      <span className="rate-unit">/person</span>
                    </div>

                    <button
                      type="button"
                      className={`btn-catalog-add-pill ${isAdded ? 'is-added' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleDishInMenu(course);
                      }}
                      aria-label={isAdded ? `Remove ${course.title} from cart` : `Add ${course.title} to cart`}
                    >
                      {isAdded ? (
                        <>
                          <Check size={16} strokeWidth={2.8} />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus size={16} strokeWidth={2.5} />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DISH INSPECT DETAIL MODAL (WHEN OPEN, COVERS FROM VERY TOP)         */}
      {/* ------------------------------------------------------------------ */}
      {inspectingDish && (
        <DishInspectModal
          dish={inspectingDish}
          onClose={() => setInspectingDish(null)}
          selectedDishes={selectedDishes}
          onToggleDishInMenu={onToggleDishInMenu}
          favoriteDishes={favoriteDishes}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  );
}
