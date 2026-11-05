import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Heart,
  Plus,
  Minus,
  Check,
  Utensils,
  ShieldAlert,
  Sparkles,
  Info
} from 'lucide-react';
import { getDishPrice, getDishImage } from '../data/cateringData';

export default function DishInspectModal({
  dish,
  onClose,
  selectedDishes = [],
  onToggleDishInMenu,
  favoriteDishes = [],
  onToggleFavorite
}) {
  const [guestCount, setGuestCount] = useState(50);

  // Lock body scroll and notify parent to hide top header when open
  useEffect(() => {
    document.body.classList.add('menu-content-modal-open');
    return () => {
      document.body.classList.remove('menu-content-modal-open');
    };
  }, []);

  if (!dish) return null;

  const price = getDishPrice(dish);
  const dishImg = getDishImage(dish);
  const isInMenu = selectedDishes.some((d) => d.id === dish.id);
  const isFavorite = favoriteDishes.includes(dish.id);

  // Normalize badges
  const displayBadges = [];
  if (dish.isSignature) displayBadges.push({ text: 'Signature', type: 'signature' });
  if (dish.isChefSpecial) displayBadges.push({ text: 'Chef Special', type: 'gold' });
  for (const b of dish.badges || []) {
    if (!displayBadges.some((item) => item.text.toLowerCase() === b.text.toLowerCase())) {
      displayBadges.push(b);
    }
  }

  return (
    <div
      className="dish-inspect-full-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Detailed specifications for ${dish.title}`}
    >
      {/* 1. Full-bleed Hero Photo with Floating Actions */}
      <div className="dish-inspect-hero-banner">
        <img
          src={dishImg}
          alt={dish.title}
          className="dish-inspect-hero-img"
        />
        <div className="dish-inspect-hero-gradient" />

        {/* Floating Back Button (44x44px target) */}
        <button
          type="button"
          className="dish-inspect-circle-action-btn back"
          onClick={onClose}
          aria-label="Back to menus"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Floating Favorite Heart Button (44x44px target) */}
        <button
          type="button"
          className={`dish-inspect-circle-action-btn heart ${isFavorite ? 'favorited' : ''}`}
          onClick={() => onToggleFavorite && onToggleFavorite(dish)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart
            size={20}
            fill={isFavorite ? '#8A5A2B' : 'none'}
            color={isFavorite ? '#8A5A2B' : '#FFFFFF'}
          />
        </button>

        {/* Carousel Pagination Dots */}
        <div className="dish-inspect-dots-row" aria-hidden="true">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>

      {/* 2. Scrollable Body Content */}
      <div className="dish-inspect-scrollable-content">
        {/* Title, Price & Description */}
        <div className="dish-inspect-heading-card">
          <h2 className="dish-inspect-title">{dish.title}</h2>
          <div className="dish-inspect-price-line">
            <span className="price-val">${price}</span>
            <span className="price-unit">/ person</span>
          </div>
          <p className="dish-inspect-desc">{dish.description}</p>
        </div>

        {/* Dietary Tag Chips */}
        {displayBadges.length > 0 && (
          <div className="dish-inspect-tags-row">
            {displayBadges.map((b, idx) => (
              <span key={idx} className={`dish-inspect-pill ${b.type || 'gold'}`}>
                {b.text}
              </span>
            ))}
          </div>
        )}

        {/* Inset Ingredients Card */}
        <div className="dish-inspect-info-card">
          <div className="dish-inspect-card-header">
            <Utensils size={15} className="card-icon" />
            <span>Ingredients</span>
          </div>
          <p className="dish-inspect-card-text">
            {dish.ingredients && dish.ingredients.length > 0
              ? dish.ingredients.join(', ')
              : 'Scallops, cauliflower, seasonal greens, citrus, butter, herbs.'}
          </p>
        </div>

        {/* Inset Allergen Information Card */}
        <div className="dish-inspect-info-card">
          <div className="dish-inspect-card-header">
            <ShieldAlert size={15} className="card-icon alert" />
            <span>Allergen Information</span>
          </div>
          <p className="dish-inspect-card-text">
            {dish.allergenSafetyNote || (
              dish.allergens && dish.allergens.length > 0
                ? `Contains: ${dish.allergens.join(', ')}.`
                : 'Contains dairy. May contain shellfish. Prepared in a certified commissary.'
            )}
          </p>
        </div>

        {/* Guest Count Stepper */}
        <div className="dish-inspect-stepper-row">
          <button
            type="button"
            className="dish-stepper-btn"
            onClick={() => setGuestCount((c) => Math.max(10, c - 5))}
            aria-label="Decrease guest count"
          >
            <Minus size={16} />
          </button>
          <span className="dish-stepper-display">{guestCount} Guests</span>
          <button
            type="button"
            className="dish-stepper-btn"
            onClick={() => setGuestCount((c) => Math.min(500, c + 5))}
            aria-label="Increase guest count"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Full-Width Action Button */}
        <button
          type="button"
          className={`dish-inspect-submit-btn ${isInMenu ? 'is-added' : ''}`}
          onClick={() => {
            if (onToggleDishInMenu) onToggleDishInMenu(dish);
          }}
        >
          {isInMenu ? (
            <>
              <Check size={18} strokeWidth={2.8} />
              <span>In Event Menu (${price * guestCount} CAD)</span>
            </>
          ) : (
            <>
              <Plus size={18} strokeWidth={2.5} />
              <span>Add to Event Menu</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
