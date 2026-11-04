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
  Camera
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
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  const filteredCourses = activeTab === 'all'
    ? MENU_COURSES
    : activeTab === 'favorites'
    ? MENU_COURSES.filter(course => favoriteDishes.includes(course.id))
    : MENU_COURSES.filter(course => {
        if (activeTab === 'starters') return course.category === 'starters';
        if (activeTab === 'mains') return course.category === 'mains';
        if (activeTab === 'canapes') return course.category === 'canapes';
        if (activeTab === 'grazing') return course.category === 'grazing' || course.category === 'desserts';
        return true;
      });

  const handleQuickInquire = (courseTitle) => {
    setFormData(prev => ({
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
            Executive Chef Michael Thomas harvests directly from Haida Gwaii halibut fishers, Langley heritage duck farms,
            and Cowichan Valley organic orchards to produce unforgettable fine Pacific Northwest courses.
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
                onClick={() => setActiveTab('favorites')}
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
          {/* Filter Tabs - Horizontally scrollable on mobile without page overflow */}
          <div className="courses-filter-tabs-wrapper">
            <div className="courses-filter-tabs" role="tablist" aria-label="Course categories">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'all'}
                className={`filter-tab-pill ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Selections
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'starters'}
                className={`filter-tab-pill ${activeTab === 'starters' ? 'active' : ''}`}
                onClick={() => setActiveTab('starters')}
              >
                First Courses &amp; Starters
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'mains'}
                className={`filter-tab-pill ${activeTab === 'mains' ? 'active' : ''}`}
                onClick={() => setActiveTab('mains')}
              >
                Artisanal Mains
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'canapes'}
                className={`filter-tab-pill ${activeTab === 'canapes' ? 'active' : ''}`}
                onClick={() => setActiveTab('canapes')}
              >
                Passed Hors d'oeuvres
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'grazing'}
                className={`filter-tab-pill ${activeTab === 'grazing' ? 'active' : ''}`}
                onClick={() => setActiveTab('grazing')}
              >
                Dessert &amp; Grazing
              </button>
              {favoriteDishes.length > 0 && (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'favorites'}
                  className={`filter-tab-pill ${activeTab === 'favorites' ? 'active' : ''}`}
                  onClick={() => setActiveTab('favorites')}
                  style={{ color: '#BA8D5B' }}
                >
                  Favorites ({favoriteDishes.length})
                </button>
              )}
            </div>
          </div>

          {/* Menu Cards Grid */}
          <div className="courses-grid">
            {filteredCourses.length === 0 && activeTab === 'favorites' ? (
              <div className="my-menu-empty-state" style={{ gridColumn: '1 / -1', padding: '36px 16px' }}>
                <Heart size={32} style={{ color: '#BA8D5B', margin: '0 auto 12px' }} />
                <h4 className="empty-state-title">No Saved Favorites Yet</h4>
                <p className="empty-state-desc">
                  Tap the heart icon on any dish below to save it to your personal favorites list.
                </p>
                <button
                  type="button"
                  className="btn-outline-subtle"
                  onClick={() => setActiveTab('all')}
                  style={{ margin: '0 auto' }}
                >
                  View All Courses
                </button>
              </div>
            ) : (
              filteredCourses.map((course) => {
                const isSelected = selectedDishes.some(d => d.id === course.id);
                const isFavorite = favoriteDishes.includes(course.id);
                return (
                  <div key={course.id} className="course-card">
                    <div className="course-card-top-row">
                      <div className="course-badges-row">
                        {course.badges.map((b, idx) => (
                          <span key={idx} className={`course-badge ${b.type}`}>
                            {b.text}
                          </span>
                        ))}
                      </div>

                      {/* Feature 5: Bookmark Favorite Button */}
                      <button
                        type="button"
                        className={`course-fav-btn ${isFavorite ? 'favorited' : ''}`}
                        onClick={() => onToggleFavorite && onToggleFavorite(course)}
                        title={isFavorite ? `Remove ${course.title} from favorites` : `Save ${course.title} to favorites`}
                        aria-label={isFavorite ? `Unfavorite ${course.title}` : `Favorite ${course.title}`}
                      >
                        <Heart
                          size={16}
                          fill={isFavorite ? '#BA8D5B' : 'none'}
                          color={isFavorite ? '#BA8D5B' : '#76837A'}
                        />
                      </button>
                    </div>

                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-desc">{course.description}</p>
                    
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
                          title={isSelected ? "Remove from My Menu" : "Add to My Menu Builder"}
                          aria-label={isSelected ? `Remove ${course.title} from menu` : `Add ${course.title} to menu`}
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
                  Download our complete 24-page catalog with tasting notes, full ingredient origins, and dietary pairings.
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
    </div>
  );
}
