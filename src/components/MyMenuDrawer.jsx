import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  X,
  Trash2,
  ArrowRight,
  Utensils,
  PlusCircle,
  Sparkles,
  Check
} from 'lucide-react';

export default function MyMenuDrawer({
  isOpen,
  onClose,
  selectedDishes,
  onRemoveDish,
  onClearMenu,
  onApplyMenuToInquiry
}) {
  const navigate = useNavigate();

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

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="My Curated Menu">
      <div className="my-menu-sheet" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="sheet-header">
          <div className="sheet-header-title-box">
            <div className="sheet-icon-wrap">
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 className="sheet-title">My Curated Event Menu</h3>
              <span className="sheet-subtitle">
                {selectedDishes.length} {selectedDishes.length === 1 ? 'Dish' : 'Dishes'} Selected for Inquiry
              </span>
            </div>
          </div>
          <button
            type="button"
            className="sheet-close-btn"
            onClick={onClose}
            aria-label="Close My Menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="sheet-body">
          {selectedDishes.length === 0 ? (
            <div className="my-menu-empty-state">
              <div className="empty-icon-circle">
                <Utensils size={30} style={{ color: '#BA8D5B' }} />
              </div>
              <h4 className="empty-state-title">Your Tasting Menu is Empty</h4>
              <p className="empty-state-desc">
                Browse our seasonal Pacific Northwest courses and tap <strong>"Add to My Menu"</strong> to build a personalized dining itinerary.
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
                    </div>
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
                ))}
              </div>

              <div className="menu-builder-notice">
                <Sparkles size={14} style={{ color: '#BA8D5B', flexShrink: 0 }} />
                <span>
                  These dishes will be attached directly to your event inquiry notes for Executive Chef Michael Thomas.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {selectedDishes.length > 0 && (
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

