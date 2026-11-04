import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  X,
  Check,
  ArrowRight,
  Calculator,
  Users,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { PACKAGE_COMPARISON } from '../data/cateringData';

export default function PackageComparisonModal({
  isOpen,
  onClose,
  onSelectPackage,
  onOpenBudgetEstimator
}) {
  const navigate = useNavigate();
  const [activePackageId, setActivePackageId] = useState('wedding');

  if (!isOpen) return null;

  const handleSelectAndInquire = (pkg) => {
    if (onSelectPackage) {
      onSelectPackage(pkg.name, pkg.minGuests.toString());
    }
    onClose();
    navigate('/inquiry');
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Package Comparison Matrix">
      <div className="modal-content-box package-compare-modal-card" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close Package Comparison"
        >
          <X size={18} />
        </button>

        <div className="modal-header-centered">
          <div className="modal-icon-badge">
            <Layers size={22} />
          </div>
          <h3 className="modal-heading">Compare Event Programs</h3>
          <p className="modal-subtext">
            Side-by-side breakdown of service formats, guest capacities, and included culinary features.
          </p>
        </div>

        {/* Mobile Program Switcher Pills */}
        <div className="compare-tab-pill-row">
          {PACKAGE_COMPARISON.map(pkg => (
            <button
              type="button"
              key={pkg.id}
              className={`compare-pill-btn ${activePackageId === pkg.id ? 'active' : ''}`}
              onClick={() => setActivePackageId(pkg.id)}
            >
              <span>{pkg.name}</span>
            </button>
          ))}
        </div>

        {/* Comparison Details Card */}
        <div className="compare-cards-container">
          {PACKAGE_COMPARISON.map(pkg => {
            const isCurrent = activePackageId === pkg.id;
            return (
              <div
                key={pkg.id}
                className={`compare-detail-card ${isCurrent ? 'visible' : 'hidden'}`}
              >
                <div className="compare-card-top">
                  <div>
                    <span className="compare-tag">{pkg.bestFor}</span>
                    <h4 className="compare-pkg-name">{pkg.name}</h4>
                  </div>
                  <div className="compare-price-pill">
                    <strong>{pkg.baseRate}</strong>
                  </div>
                </div>

                <div className="compare-specs-grid">
                  <div className="compare-spec-row">
                    <span className="spec-label">Guest Scale</span>
                    <span className="spec-val"><strong>{pkg.guestRange}</strong></span>
                  </div>
                  <div className="compare-spec-row">
                    <span className="spec-label">Dining Format</span>
                    <span className="spec-val">{pkg.serviceFormat}</span>
                  </div>
                  <div className="compare-spec-row">
                    <span className="spec-label">Staffing &amp; Kitchen</span>
                    <span className="spec-val">{pkg.staffingIncluded}</span>
                  </div>
                  <div className="compare-spec-row">
                    <span className="spec-label">Settings &amp; Rentals</span>
                    <span className="spec-val">{pkg.tableSettings}</span>
                  </div>
                  <div className="compare-spec-row">
                    <span className="spec-label">Dietary Accommodations</span>
                    <span className="spec-val">{pkg.dietaryAdaptation}</span>
                  </div>
                  <div className="compare-spec-row">
                    <span className="spec-label">Late-Night Station</span>
                    <span className="spec-val">{pkg.lateNightStation}</span>
                  </div>
                </div>

                <div className="compare-actions-row">
                  <button
                    type="button"
                    className="btn-primary-gold"
                    onClick={() => handleSelectAndInquire(pkg)}
                  >
                    <span>Select {pkg.name}</span>
                    <ArrowRight size={15} />
                  </button>

                  {pkg.pricingType === 'published' && (
                    <button
                      type="button"
                      className="btn-outline-subtle"
                      onClick={() => {
                        onClose();
                        if (onOpenBudgetEstimator) onOpenBudgetEstimator(pkg.id);
                      }}
                      title="Calculate estimate for this package"
                    >
                      <Calculator size={14} />
                      <span>Estimate Budget</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Overview Table (Desktop / Tablet view) */}
        <div className="compare-table-wrapper">
          <table className="compare-matrix-table">
            <thead>
              <tr>
                <th>Feature</th>
                {PACKAGE_COMPARISON.map(pkg => (
                  <th key={pkg.id}>{pkg.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Baseline Rate</td>
                {PACKAGE_COMPARISON.map(pkg => (
                  <td key={pkg.id}><strong>{pkg.baseRate}</strong></td>
                ))}
              </tr>
              <tr>
                <td>Recommended Capacity</td>
                {PACKAGE_COMPARISON.map(pkg => (
                  <td key={pkg.id}>{pkg.guestRange}</td>
                ))}
              </tr>
              <tr>
                <td>Service Format</td>
                {PACKAGE_COMPARISON.map(pkg => (
                  <td key={pkg.id}>{pkg.serviceFormat}</td>
                ))}
              </tr>
              <tr>
                <td>Staffing Included</td>
                {PACKAGE_COMPARISON.map(pkg => (
                  <td key={pkg.id}>{pkg.staffingIncluded}</td>
                ))}
              </tr>
              <tr>
                <td>Late-Night Bites</td>
                {PACKAGE_COMPARISON.map(pkg => (
                  <td key={pkg.id}>{pkg.lateNightStation}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

