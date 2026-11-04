import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Utensils,
  X,
  Users,
  Info,
  Check,
  ArrowRight,
  Sparkles,
  Layers,
  Clock
} from 'lucide-react';
import { SERVING_GUIDELINES } from '../data/cateringData';

export default function ServingGuideModal({
  isOpen,
  onClose,
  initialGuestCount = 75,
  onApplyGuestCount
}) {
  const navigate = useNavigate();
  const [guests, setGuests] = useState(initialGuestCount ? parseInt(initialGuestCount, 10) || 75 : 75);

  if (!isOpen) return null;

  // Calculators based on standard Pacific Northwest catering rules-of-thumb
  const canapePreDinnerLow = guests * 4;
  const canapePreDinnerHigh = guests * 6;
  const canapeCocktailOnlyLow = guests * 10;
  const canapeCocktailOnlyHigh = guests * 14;

  const grazingCheeseLbs = (guests * 3.5 / 16).toFixed(1);
  const lateNightPortions = Math.round(guests * 1.25);
  const wineGlassServings = Math.round(guests * 3.5);

  const handleApply = () => {
    if (onApplyGuestCount) {
      onApplyGuestCount(guests.toString());
    }
    onClose();
    navigate('/inquiry');
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Serving Size and Quantity Guide">
      <div className="modal-content-box serving-modal-card" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close Serving Guide"
        >
          <X size={18} />
        </button>

        <div className="modal-header-centered">
          <div className="modal-icon-badge">
            <Utensils size={22} />
          </div>
          <h3 className="modal-heading">Serving-Size &amp; Quantity Guide</h3>
          <p className="modal-subtext">
            Recommended catering portion calculations based on guest attendance and event format.
          </p>
        </div>

        {/* Guest Count Controller */}
        <div className="form-group" style={{ marginBottom: '22px' }}>
          <div className="planner-slider-header">
            <label className="form-label" htmlFor="servingGuests">Target Guest Count</label>
            <span className="planner-guest-count-badge">
              <Users size={12} />
              <strong>{guests} Guests</strong>
            </span>
          </div>
          <input
            type="range"
            id="servingGuests"
            min="10"
            max="350"
            step="5"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value, 10))}
            className="planner-range-slider"
          />
          <div className="range-labels-row">
            <span>10 (Intimate)</span>
            <span>75 (Micro)</span>
            <span>150 (Wedding)</span>
            <span>350+ (Gala)</span>
          </div>
        </div>

        {/* Portions Matrix */}
        <div className="serving-cards-grid">
          {/* Passed Canapés */}
          <div className="serving-spec-card">
            <div className="serving-card-head">
              <span className="serving-card-category">Hors d'oeuvres</span>
              <h4 className="serving-card-title">{SERVING_GUIDELINES.canapes.title}</h4>
            </div>
            <div className="serving-quantities">
              <div className="quantity-stat-box">
                <span className="quantity-num">{canapePreDinnerLow}–{canapePreDinnerHigh}</span>
                <span className="quantity-label">Pieces for Cocktail Hour</span>
                <span className="quantity-sub">(4–6 passed bites/guest)</span>
              </div>
              <div className="quantity-stat-box secondary">
                <span className="quantity-num">{canapeCocktailOnlyLow}–{canapeCocktailOnlyHigh}</span>
                <span className="quantity-label">Pieces for Cocktail Reception</span>
                <span className="quantity-sub">(10–14 bites if replacing dinner)</span>
              </div>
            </div>
            <p className="serving-card-note">{SERVING_GUIDELINES.canapes.notes}</p>
          </div>

          {/* Plated Dinner */}
          <div className="serving-spec-card">
            <div className="serving-card-head">
              <span className="serving-card-category">Seated Banquet</span>
              <h4 className="serving-card-title">{SERVING_GUIDELINES.platedDinner.title}</h4>
            </div>
            <div className="serving-quantities single">
              <div className="quantity-stat-box">
                <span className="quantity-num">{guests} Plated Covers</span>
                <span className="quantity-label">3–4 Course Individual Service</span>
                <span className="quantity-sub">Starter, 6–8 oz Wild Catch/Beef, Starch &amp; Dessert</span>
              </div>
            </div>
            <p className="serving-card-note">{SERVING_GUIDELINES.platedDinner.notes}</p>
          </div>

          {/* Grazing Table */}
          <div className="serving-spec-card">
            <div className="serving-card-head">
              <span className="serving-card-category">Artisan Platters</span>
              <h4 className="serving-card-title">{SERVING_GUIDELINES.grazingBoard.title}</h4>
            </div>
            <div className="serving-quantities single">
              <div className="quantity-stat-box">
                <span className="quantity-num">~{grazingCheeseLbs} lbs</span>
                <span className="quantity-label">Artisan Cheeses &amp; Charcuterie</span>
                <span className="quantity-sub">(3–4.5 oz per guest + artisan breads &amp; fruits)</span>
              </div>
            </div>
            <p className="serving-card-note">{SERVING_GUIDELINES.grazingBoard.notes}</p>
          </div>

          {/* Late-Night Bites */}
          <div className="serving-spec-card">
            <div className="serving-card-head">
              <span className="serving-card-category">Late-Night Station</span>
              <h4 className="serving-card-title">{SERVING_GUIDELINES.lateNight.title}</h4>
            </div>
            <div className="serving-quantities single">
              <div className="quantity-stat-box">
                <span className="quantity-num">~{lateNightPortions} Portions</span>
                <span className="quantity-label">Slider or Spot Prawn Tacos</span>
                <span className="quantity-sub">(1.25 portions per remaining guest)</span>
              </div>
            </div>
            <p className="serving-card-note">{SERVING_GUIDELINES.lateNight.notes}</p>
          </div>
        </div>

        {/* Mandatory Requirement 9 Disclaimer */}
        <div className="planner-disclaimer" style={{ margin: '18px 0 16px' }}>
          <Info size={14} style={{ flexShrink: 0 }} />
          <span>
            <strong>Approximate Guidance Only:</strong> Quantities are approximate industry baselines and do not constitute a performance guarantee. Exact kitchen batching is customized during menu review with Chef Michael.
          </span>
        </div>

        {/* Action Button */}
        <button
          type="button"
          className="btn-primary-gold"
          onClick={handleApply}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <span>Transfer {guests} Guests to Inquiry Form</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

