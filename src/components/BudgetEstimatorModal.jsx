import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calculator,
  X,
  Users,
  Info,
  ArrowRight,
  Sparkles,
  Check,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { PACKAGE_COMPARISON } from '../data/cateringData';

export default function BudgetEstimatorModal({
  isOpen,
  onClose,
  initialGuestCount = 75,
  initialPackage = 'wedding',
  onApplyEstimate
}) {
  const navigate = useNavigate();

  const [selectedPkgId, setSelectedPkgId] = useState(initialPackage);
  const [guests, setGuests] = useState(initialGuestCount ? parseInt(initialGuestCount, 10) || 75 : 75);

  if (!isOpen) return null;

  const currentPkg = PACKAGE_COMPARISON.find(p => p.id === selectedPkgId) || PACKAGE_COMPARISON[1];

  // Calculation logic
  const isPublishedRate = currentPkg.pricingType === 'published';
  const baseRatePerGuest = currentPkg.rateNumeric || 0;
  const estimatedTotal = isPublishedRate ? guests * baseRatePerGuest : null;

  // Estimated staffing recommendation
  const estimatedStaff = guests <= 35 
    ? '1 Chef + 1 Dedicated Captain' 
    : `${Math.max(4, Math.ceil(guests / 22))} Service Waitstaff + Culinary Brigade`;

  const handleApplyToInquiry = () => {
    if (onApplyEstimate) {
      onApplyEstimate({
        packageId: currentPkg.id,
        packageName: currentPkg.name,
        guestCount: guests.toString(),
        estimatedTotal: estimatedTotal ? `$${estimatedTotal.toLocaleString()}` : 'Custom RFP Call Sheet',
        notes: `[Indicative Budget Estimate: ${guests} Guests × ${currentPkg.name} (${currentPkg.baseRate}) = ${estimatedTotal ? `$${estimatedTotal.toLocaleString()}` : 'Request a Quote'}]`
      });
    }
    onClose();
    navigate('/inquiry');
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Catering Budget Estimator">
      <div className="modal-content-box budget-modal-card" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close Budget Estimator"
        >
          <X size={18} />
        </button>

        <div className="modal-header-centered">
          <div className="modal-icon-badge">
            <Calculator size={22} />
          </div>
          <h3 className="modal-heading">Indicative Budget Estimator</h3>
          <p className="modal-subtext">
            Explore indicative food and service baseline investments based on our published package rates.
          </p>
        </div>

        <div className="estimator-body">
          {/* Package Selection Chips */}
          <div className="form-group">
            <label className="form-label">Select Event Program</label>
            <div className="estimator-package-selector">
              {PACKAGE_COMPARISON.map((pkg) => (
                <button
                  type="button"
                  key={pkg.id}
                  className={`estimator-pkg-btn ${selectedPkgId === pkg.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedPkgId(pkg.id);
                    if (pkg.id === 'intimate' && guests > 35) setGuests(25);
                    if (pkg.id === 'wedding' && guests < 40) setGuests(80);
                  }}
                >
                  <div className="estimator-pkg-header">
                    <span className="pkg-btn-title">{pkg.name}</span>
                    <span className="pkg-btn-rate">{pkg.baseRate}</span>
                  </div>
                  <span className="pkg-btn-sub">{pkg.serviceFormat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Guest Count Slider */}
          <div className="form-group">
            <div className="planner-slider-header">
              <label className="form-label" htmlFor="estimatorGuests">Estimated Guest Count</label>
              <span className="planner-guest-count-badge">
                <Users size={12} />
                <strong>{guests} Guests</strong>
              </span>
            </div>
            <input
              type="range"
              id="estimatorGuests"
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
              <span>350+ (Summit)</span>
            </div>
          </div>

          {/* Calculation Display Card */}
          <div className="estimator-results-box">
            <div className="estimator-result-header">
              <span className="calc-eyebrow">Indicative Calculation</span>
              <span className="calc-program-tag">{currentPkg.name}</span>
            </div>

            {isPublishedRate ? (
              <div className="calculation-details">
                <div className="calc-formula-row">
                  <span className="formula-part">{guests} Guests</span>
                  <span className="formula-op">&times;</span>
                  <span className="formula-part">${baseRatePerGuest} / Guest</span>
                  <span className="formula-op">=</span>
                  <span className="formula-total">${estimatedTotal.toLocaleString()} CAD</span>
                </div>

                <div className="calc-breakdown-list">
                  <div className="breakdown-item">
                    <Check size={13} className="breakdown-check" />
                    <span><strong>Culinary Program:</strong> {currentPkg.serviceFormat}</span>
                  </div>
                  <div className="breakdown-item">
                    <Check size={13} className="breakdown-check" />
                    <span><strong>Service Staffing:</strong> {estimatedStaff}</span>
                  </div>
                  <div className="breakdown-item">
                    <Check size={13} className="breakdown-check" />
                    <span><strong>Dietary Inclusions:</strong> {currentPkg.dietaryAdaptation}</span>
                  </div>
                  <div className="breakdown-item">
                    <Check size={13} className="breakdown-check" />
                    <span><strong>Table Coordination:</strong> {currentPkg.tableSettings}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="quote-required-notice">
                <div className="quote-tag-badge">Daily Call Sheet Quote Required</div>
                <h4 className="quote-title">Custom Production Logistics</h4>
                <p className="quote-desc">
                  Film and TV craft service pricing is determined per shooting day based on crew call times, mobile hot galley truck deployment, off-grid water/power, and number of daily meal windows.
                </p>
                <div className="quote-contact-note">
                  Direct call sheet quotes available within 12 hours for unit managers.
                </div>
              </div>
            )}

            {/* Mandatory Requirement 3 Disclaimers */}
            <div className="estimator-disclaimer-box">
              <Info size={14} className="disclaimer-info-icon" />
              <div className="disclaimer-text">
                <strong>Rough Estimate Only:</strong> This indicative calculation illustrates baseline food and service investments. Official, binding quotes must be confirmed by Ocean West Catering based on seasonal ingredients, bar coordination, and rental equipment.
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            type="button"
            className="btn-primary-gold"
            onClick={handleApplyToInquiry}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <span>Apply Estimate to Inquiry Form</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

