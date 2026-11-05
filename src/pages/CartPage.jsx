import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  X,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Utensils,
  PlusCircle,
  Sparkles,
  Check,
  Plus,
  Info,
  Calendar,
  ChefHat
} from 'lucide-react';
import { MENU_COURSES, getDishPrice, calculateCartTotal } from '../data/cateringData';
import DishInspectModal from '../components/DishInspectModal';

export default function CartPage({
  selectedDishes = [],
  onRemoveDish,
  onClearMenu,
  onApplyMenuToInquiry,
  favoriteDishes = [],
  onToggleFavorite,
  onAddAllFavoritesToMenu,
  onToggleDishInMenu,
  showToast
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'favorites'
  const [inspectingDish, setInspectingDish] = useState(null);

  const cartTotal = calculateCartTotal(selectedDishes);

  const handleProceedToInquiry = () => {
    if (onApplyMenuToInquiry) {
      onApplyMenuToInquiry();
    }
    navigate('/inquiry');
  };

  const handleBrowseCourses = () => {
    navigate('/courses');
  };

  // Get full dish objects for saved favorites (excluding items already added to the cart)
  const savedFavoriteObjects = MENU_COURSES.filter(
    (d) => favoriteDishes.includes(d.id) && !selectedDishes.some((s) => s.id === d.id)
  );

  return (
    <div className="cart-page-screen">
      {/* ------------------------------------------------------------------ */}
      {/* 1. TOP APP BAR                                                     */}
      {/* ------------------------------------------------------------------ */}
      <div className="cart-page-top-bar">
        <button
          type="button"
          className="cart-page-back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go back to previous page"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <h1 className="cart-page-top-title">My Event Cart</h1>

        <span className="cart-page-count-badge">
          {selectedDishes.length} {selectedDishes.length === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      <div className="cart-page-scroll-content">
        {/* ------------------------------------------------------------------ */}
        {/* 2. CART HERO HEADER CARD                                           */}
        {/* ------------------------------------------------------------------ */}
        <div className="cart-page-hero-card">
          <div className="cart-page-header-row">
            <div className="cart-header-icon-circle">
              {activeTab === 'menu' ? (
                <ShoppingBag size={20} />
              ) : (
                <Heart size={20} style={{ color: '#BA8D5B' }} />
              )}
            </div>
            <div className="cart-header-text-lockup">
              <h2 className="cart-page-main-heading">
                {activeTab === 'menu' ? 'My Event Cart & Menu' : 'Saved Favorite Dishes'}
              </h2>
              <span className="cart-page-subheading">
                {activeTab === 'menu'
                  ? selectedDishes.length > 0
                    ? `${selectedDishes.length} ${
                        selectedDishes.length === 1 ? 'Course' : 'Courses'
                      } Selected • $${cartTotal} CAD Total`
                    : 'Your tasting cart is empty'
                  : `${savedFavoriteObjects.length} ${
                      savedFavoriteObjects.length === 1 ? 'Dish' : 'Dishes'
                    } Saved to Favorites`}
              </span>
            </div>
          </div>

          {/* Tab Switcher Pills */}
          <div className="cart-page-tab-nav" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'menu'}
              className={`cart-tab-pill-btn ${activeTab === 'menu' ? 'active' : ''}`}
              onClick={() => setActiveTab('menu')}
            >
              <ShoppingBag size={14} />
              <span>My Cart ({selectedDishes.length})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'favorites'}
              className={`cart-tab-pill-btn ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              <Heart size={14} />
              <span>Saved Favorites ({savedFavoriteObjects.length})</span>
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 3. CART CONTENT BODY                                               */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'menu' ? (
          /* ================= MY CART TAB ================= */
          selectedDishes.length === 0 ? (
            <div className="cart-empty-state-card">
              <div className="empty-icon-circle">
                <Utensils size={32} style={{ color: '#BA8D5B' }} />
              </div>
              <h3 className="empty-state-title">Your Tasting Cart is Empty</h3>
              <p className="empty-state-desc">
                Explore our seasonal Pacific Northwest courses and display platters. Tap <strong>"+ Add"</strong> to assemble your personalized dining itinerary.
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
            <div className="cart-items-section">
              <div className="cart-list-header-row">
                <span className="cart-items-count-kicker">
                  ITEMS IN CART ({selectedDishes.length})
                </span>
                <button
                  type="button"
                  className="cart-clear-all-btn"
                  onClick={onClearMenu}
                  title="Remove all items from your cart"
                >
                  <Trash2 size={13} />
                  <span>Clear All</span>
                </button>
              </div>

              <div className="selected-dishes-stack">
                {selectedDishes.map((dish) => {
                  const itemPrice = getDishPrice(dish);
                  return (
                    <div
                      key={dish.id}
                      className="selected-dish-card clickable-cart-item"
                      onClick={() => setInspectingDish(dish)}
                      role="button"
                      tabIndex={0}
                      title="Click to view ingredients & allergens"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setInspectingDish(dish);
                        }
                      }}
                    >
                      <div className="selected-dish-info">
                        <div className="selected-dish-badges">
                          <span className="dish-category-tag">{dish.category}</span>
                          {dish.serviceStyle && (
                            <span className="dish-style-tag">{dish.serviceStyle}</span>
                          )}
                          {itemPrice > 0 && (
                            <span className="cart-item-price-tag">${itemPrice}</span>
                          )}
                        </div>

                        <h4 className="selected-dish-title">{dish.title}</h4>
                        <p className="selected-dish-snippet">{dish.description}</p>

                        {/* Dietary tags */}
                        {dish.badges && dish.badges.length > 0 && (
                          <div className="selected-dish-dietary-row">
                            {dish.badges.map((b, idx) => (
                              <span key={idx} className={`dish-micro-badge ${b.type || 'tan'}`}>
                                {b.text}
                              </span>
                            ))}
                          </div>
                        )}

                        <span className="cart-inspect-hint">
                          <Info size={11} /> Tap to view ingredients &amp; allergens
                        </span>
                      </div>

                      <div className="selected-dish-actions">
                        <button
                          type="button"
                          className="remove-dish-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveDish(dish.id);
                          }}
                          title={`Delete ${dish.title} from cart`}
                          aria-label={`Delete ${dish.title} from cart`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chef Consultation Notice */}
              <div className="cart-chef-notice-box">
                <Sparkles size={16} style={{ color: '#BA8D5B', flexShrink: 0 }} />
                <span>
                  These {selectedDishes.length} selections will be attached directly to your event inquiry for Executive Chef Michael Thomas.
                </span>
              </div>
            </div>
          )
        ) : (
          /* ================= FAVORITES TAB ================= */
          savedFavoriteObjects.length === 0 ? (
            <div className="cart-empty-state-card">
              <div className="empty-icon-circle">
                <Heart size={32} style={{ color: '#BA8D5B' }} />
              </div>
              <h3 className="empty-state-title">No Saved Favorites Yet</h3>
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
            <div className="cart-items-section">
              <div className="cart-list-header-row">
                <span className="cart-items-count-kicker">
                  BOOKMARKED FAVORITES ({savedFavoriteObjects.length})
                </span>
                {savedFavoriteObjects.length > 0 && (
                  <button
                    type="button"
                    className="cart-clear-all-btn"
                    onClick={onAddAllFavoritesToMenu}
                    title="Add all favorite dishes into cart"
                    style={{ color: '#BA8D5B' }}
                  >
                    <PlusCircle size={13} />
                    <span>Add All to Cart</span>
                  </button>
                )}
              </div>

              <div className="selected-dishes-stack">
                {savedFavoriteObjects.map((dish) => {
                  const isInMenu = selectedDishes.some((d) => d.id === dish.id);
                  const itemPrice = getDishPrice(dish);
                  return (
                    <div
                      key={dish.id}
                      className="selected-dish-card clickable-cart-item"
                      onClick={() => setInspectingDish(dish)}
                      role="button"
                      tabIndex={0}
                      title="Click to view ingredients & allergens"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setInspectingDish(dish);
                        }
                      }}
                    >
                      <div className="selected-dish-info">
                        <div className="selected-dish-badges">
                          <span className="dish-category-tag">{dish.category}</span>
                          {dish.serviceStyle && (
                            <span className="dish-style-tag">{dish.serviceStyle}</span>
                          )}
                          {itemPrice > 0 && (
                            <span className="cart-item-price-tag">${itemPrice}</span>
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
                        <span className="cart-inspect-hint">
                          <Info size={11} /> Tap to view ingredients &amp; allergens
                        </span>
                      </div>

                      <div className="fav-item-actions-col">
                        <button
                          type="button"
                          className={`btn-fav-add-menu ${isInMenu ? 'in-menu' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isInMenu) {
                              if (onToggleDishInMenu) {
                                onToggleDishInMenu(dish);
                              } else if (onToggleFavorite) {
                                onToggleFavorite(dish, true);
                              }
                            }
                          }}
                          title={isInMenu ? 'Already in Cart' : 'Add to Cart'}
                        >
                          {isInMenu ? <Check size={14} /> : <Plus size={14} />}
                          <span>{isInMenu ? 'In Cart' : 'Add'}</span>
                        </button>
                        <button
                          type="button"
                          className="remove-dish-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(dish);
                          }}
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

      {/* ------------------------------------------------------------------ */}
      {/* 4. PINNED BOTTOM ACTION & SUMMARY BAR                              */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'menu' && selectedDishes.length > 0 && (
        <div className="cart-page-pinned-footer">
          <div className="cart-drawer-total-box">
            <div className="cart-total-line">
              <span className="cart-total-label">Estimated Cart Total:</span>
              <span className="cart-total-price">${cartTotal} CAD</span>
            </div>
            <span className="cart-total-hint">
              {selectedDishes.length} items • Inclusive of regional ingredients &amp; chef presentation
            </span>
          </div>

          <button
            type="button"
            className="btn-primary-gold cart-page-submit-btn"
            onClick={handleProceedToInquiry}
          >
            <span>Transfer Cart to Inquiry Form ({selectedDishes.length})</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 5. DISH SPECIFICATION & ALLERGEN INSPECTION MODAL                  */}
      {/* ------------------------------------------------------------------ */}
      {inspectingDish && (
        <DishInspectModal
          dish={inspectingDish}
          isOpen={Boolean(inspectingDish)}
          onClose={() => setInspectingDish(null)}
          isInMenu={selectedDishes.some((d) => d.id === inspectingDish.id)}
          onToggleMenu={(dishToToggle) => {
            if (onToggleDishInMenu) {
              onToggleDishInMenu(dishToToggle);
            } else if (selectedDishes.some((d) => d.id === dishToToggle.id)) {
              onRemoveDish(dishToToggle.id);
            }
          }}
          onInquire={(title) => {
            setInspectingDish(null);
            handleProceedToInquiry();
          }}
        />
      )}
    </div>
  );
}

