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
  ShoppingBag
} from 'lucide-react';
import { MENU_COURSES } from '../data/cateringData';

export default function CoursesPage({
  setIsPdfModalOpen,
  selectedDishes,
  onToggleDishInMenu,
  onOpenMyMenu,
  setFormData,
  showToast
}) {
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  const filteredCourses = activeTab === 'all'
    ? MENU_COURSES
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
            and Cowichan Valley organic berry orchards to produce unforgettable fine Pacific Northwest courses.
          </p>
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
                Dessert &amp; Grazing Boards
              </button>
            </div>
          </div>

          {/* Menu Cards Grid */}
          <div className="courses-grid">
            {filteredCourses.map((course) => {
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
            })}
          </div>

          {/* My Menu Sticky Floating Prompt if dishes are selected */}
          {selectedDishes.length > 0 && (
            <div className="floating-menu-summary-bar">
              <div className="floating-bar-left">
                <ShoppingBag size={18} style={{ color: '#BA8D5B' }} />
                <div>
                  <div className="floating-bar-title">My Curated Menu ({selectedDishes.length})</div>
                  <div className="floating-bar-sub">Dishes saved for inquiry review</div>
                </div>
              </div>
              <button
                type="button"
                className="btn-primary-gold floating-bar-btn"
                onClick={onOpenMyMenu}
              >
                <span>View My Menu</span>
                <ChevronRight size={14} />
              </button>
            </div>
          )}

          {/* Download Guide Banner Callout */}
          <div className="menu-guide-banner" style={{ marginTop: '36px' }}>
            <div className="banner-left">
              <div className="banner-icon-box">
                <FileText size={22} />
              </div>
              <div>
                <h4 className="banner-title">Download Complete Catering &amp; Platter Guide</h4>
                <p className="banner-subtitle">
                  Includes complete menu pricing, allergen declarations, wine pairing recommendations, and seasonal package selections.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="banner-btn"
              onClick={() => setIsPdfModalOpen(true)}
            >
              <span>Request Full Menu PDF</span>
              <Download size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DIETARY & COMMISSARY PHILOSOPHY                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="ow-section" style={{ backgroundColor: '#F6F3EC', borderTop: '1px solid #EAE4D9' }}>
        <div className="ow-container">
          <div className="section-header-split">
            <div>
              <span className="section-label">Culinary Integrity</span>
              <h2 className="section-heading-serif">Custom Dietary Adaptation Without Compromise</h2>
            </div>
            <p className="section-header-narrative">
              Every course can be custom tailored to meet strict dietary needs without sacrificing presentation,
              texture, or flavor. We prepare dedicated vegan, celiac-safe gluten-free, halal, and kosher-friendly offerings.
            </p>
          </div>

          <div className="hero-stats-row">
            <div className="hero-stat-card">
              <span className="stat-metric">100% Celiac Protocols</span>
              <span className="stat-desc">Dedicated prep tables and separate fryer equipment</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-metric">Vegan &amp; Plant-Forward</span>
              <span className="stat-desc">Handcrafted roasted vegetable glazes and dairy-free reductions</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-metric">Certified Sustainable</span>
              <span className="stat-desc">Ocean Wise certified wild seafood from BC waters</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

