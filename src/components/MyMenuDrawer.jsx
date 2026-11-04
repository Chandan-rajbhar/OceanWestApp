import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  X,
  Trash2,
  ArrowRight,
  Utensils,
  PlusCircle,
  Sparkles,
  Check,
  Plus
} from 'lucide-react';
import { MENU_COURSES } from '../data/cateringData';

export default function MyMenuDrawer({
  isOpen,
  onClose,
  selectedDishes,
  onRemoveDish,
  onClearMenu,
  onApplyMenuToInquiry,
  favoriteDishes = [],
  onToggleFavorite,
  onAddAllFavoritesToMenu
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'favorites'

  if (!isOpen) return null;

  const handleProceedToInquiry = () => {
    onApplyMenuToInquiry();
    onClose();
    navigate('/inquiry');
  };

  const handleBrowseCourses = () => {
    onClose();
    navigate('/courses');
  };

  // Get full dish objects for saved favorites
  const savedFavoriteObjects = MENU_COURSES.filter(d => 
    favoriteDishes.includes(d.id)
  );

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="My Curated Menu and Favorites">
      <div className="my-menu-sheet" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="sheet-header">
          <div className="sheet-header-title-box">
            <div className="sheet-icon-wrap">
              {activeTab === 'menu' ? <ShoppingBag size={18} /> : <Heart size={18} style={{ color: '#BA8D5B' }} />}
            </div>
            <div>
              <h3 className="sheet-title">
                {activeTab === 'menu' ? 'My Curated Event Menu' : 'Saved Favorite Dishes'}
              </h3>
              <span className="sheet-subtitle">
                {activeTab === 'menu'
                  ? `${selectedDishes.length} ${selectedDishes.length === 1 ? 'Dish' : 'Dishes'} Selected for Inquiry`
                  : `${savedFavoriteObjects.length} ${savedFavoriteObjects.length === 1 ? 'Dish' : 'Dishes'} Saved to Favorites`}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="sheet-close-btn"
            onClick={onClose}
            aria-label="Close menu drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="sheet-tab-nav" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'menu'}
            className={`sheet-tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            <ShoppingBag size={14} />
            <span>My Menu ({selectedDishes.length})</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'favorites'}
            className={`sheet-tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <Heart size={14} />
            <span>Saved Favorites ({savedFavoriteObjects.length})</span>
          </button>
        </div>

        {/* Body */}
        <div className="sheet-body">
          {activeTab === 'menu' ? (
            /* ================= MY MENU TAB ================= */
            selectedDishes.length === 0 ? (
              <div className="my-menu-empty-state">
                <div className="empty-icon-circle">
                  <Utensils size={30} style={{ color: '#BA8D5B' }} />
                </div>
                <h4 className="empty-state-title">Your Tasting Menu is Empty</h4>
                <p className="empty-state-desc">
                  Browse our seasonal Pacific Northwest courses and tap <strong>"Add to Menu"</strong> to assemble a personalized dining itinerary.
                </p>
                <button
                  type="button"
                  className="btn-primary-gold"
                  onClick={handleBrowseCourses}
                >
                  <span>Browse Courses &amp; Delicacies</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            ) : (
              <div className="my-menu-list">
                <div className="my-menu-list-header">
                  <span className="list-count-label">Selected Courses ({selectedDishes.length})</span>
                  <button
                    type="button"
                    className="clear-menu-btn"
                    onClick={onClearMenu}
                    title="Remove all items from your menu"
                  >
                    <Trash2 size={13} />
                    <span>Clear All</span>
                  </button>
                </div>

                <div className="selected-dishes-stack">
                  {selectedDishes.map((dish) => (
                    <div key={dish.id} className="selected-dish-card">
                      <div className="selected-dish-info">
                        <div className="selected-dish-badges">
                          <span className="dish-category-tag">{dish.category}</span>
                          {dish.serviceStyle && (
                            <span className="dish-style-tag">{dish.serviceStyle}</span>
                          )}
                        </div>

                        <h4 className="selected-dish-title">{dish.title}</h4>
                        <p className="selected-dish-snippet">{dish.description}</p>

                        {/* Dietary tags as required by Feature 1 */}
                        {dish.badges && dish.badges.length > 0 && (
                          <div className="selected-dish-dietary-row">
                            {dish.badges.map((b, idx) => (
                              <span key={idx} className={`dish-micro-badge ${b.type || 'tan'}`}>
                                {b.text}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="selected-dish-actions">
                        <button
                          type="button"
                          className="remove-dish-btn"
                          onClick={() => onRemoveDish(dish.id)}
                          title={`Remove ${dish.title}`}
                          aria-label={`Remove ${dish.title}`}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="menu-builder-notice">
                  <Sparkles size={14} style={{ color: '#BA8D5B', flexShrink: 0 }} />
                  <span>
                    These {selectedDishes.length} courses will be attached directly to your event inquiry notes for Executive Chef Michael Thomas.
                  </span>
                </div>
              </div>
            )
          ) : (
            /* ================= FAVORITES TAB ================= */
            savedFavoriteObjects.length === 0 ? (
              <div className="my-menu-empty-state">
                <div className="empty-icon-circle">
                  <Heart size={30} style={{ color: '#BA8D5B' }} />
                </div>
                <h4 className="empty-state-title">No Saved Favorites Yet</h4>
                <p className="empty-state-desc">
                  Tap the heart icon on any dish card while browsing courses to bookmark your top selections for later review.
                </p>
                <button
                  type="button"
                  className="btn-primary-gold"
                  onClick={handleBrowseCourses}
                >
                  <span>Explore Courses &amp; Save Favorites</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            ) : (
              <div className="my-menu-list">
                <div className="my-menu-list-header">
                  <span className="list-count-label">Bookmarked Favorites ({savedFavoriteObjects.length})</span>
                  {savedFavoriteObjects.length > 0 && (
                    <button
                      type="button"
                      className="clear-menu-btn"
                      onClick={onAddAllFavoritesToMenu}
                      title="Add all favorite dishes into My Menu"
                      style={{ color: '#BA8D5B' }}
                    >
                      <PlusCircle size={13} />
                      <span>Add All to Menu</span>
                    </button>
                  )}
                </div>

                <div className="selected-dishes-stack">
                  {savedFavoriteObjects.map((dish) => {
                    const isInMenu = selectedDishes.some(d => d.id === dish.id);
                    return (
                      <div key={dish.id} className="selected-dish-card">
                        <div className="selected-dish-info">
                          <div className="selected-dish-badges">
                            <span className="dish-category-tag">{dish.category}</span>
                            {dish.serviceStyle && (
                              <span className="dish-style-tag">{dish.serviceStyle}</span>
                            )}
                          </div>
                          <h4 className="selected-dish-title">{dish.title}</h4>
                          <p className="selected-dish-snippet">{dish.description}</p>
                          {dish.badges && (
                            <div className="selected-dish-dietary-row">
                              {dish.badges.map((b, idx) => (
                                <span key={idx} className={`dish-micro-badge ${b.type || 'tan'}`}>
                                  {b.text}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="fav-item-actions-col">
                          <button
                            type="button"
                            className={`btn-fav-add-menu ${isInMenu ? 'in-menu' : ''}`}
                            onClick={() => {
                              if (!isInMenu) {
                                onAddAllFavoritesToMenu ? onToggleFavorite && onToggleFavorite(dish, true) : null;
                              }
                            }}
                            title={isInMenu ? 'Already in My Menu' : 'Add to My Menu'}
                          >
                            {isInMenu ? <Check size={14} /> : <Plus size={14} />}
                            <span>{isInMenu ? 'In Menu' : 'Add'}</span>
                          </button>
                          <button
                            type="button"
                            className="remove-dish-btn"
                            onClick={() => onToggleFavorite(dish)}
                            title="Remove from favorites"
                            aria-label={`Unfavorite ${dish.title}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          )}
        </div>

        {/* Footer Actions */}
        {activeTab === 'menu' && selectedDishes.length > 0 && (
          <div className="sheet-footer">
            <button
              type="button"
              className="btn-primary-gold sheet-action-btn"
              onClick={handleProceedToInquiry}
            >
              <span>Transfer Menu to Inquiry Form ({selectedDishes.length})</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
