import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Check,
  ShieldCheck,
  Calendar,
  ArrowRight,
  Clock,
  Sparkles,
  Users,
  Compass,
  Calculator,
  Layers,
  Scale
} from 'lucide-react';
import { PACKAGES } from '../data/cateringData';

export default function PackagesPage({
  setFormData,
  setIsAvailabilityModalOpen,
  setIsPlannerModalOpen,
  onOpenBudgetEstimator,
  onOpenPackageComparison,
  onOpenServingGuide,
  showToast
}) {
  const navigate = useNavigate();

  const handleSelectPackage = (categoryName, guestCount) => {
    setFormData(prev => ({
      ...prev,
      category: categoryName,
      guestCount: guestCount
    }));
    showToast(`Selected "${categoryName}". Enter your event date to complete inquiry.`);
    navigate('/inquiry');
  };

  return (
    <div className="packages-page">
      {/* ------------------------------------------------------------------ */}
      {/* PAGE BANNER                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="page-header-banner">
        <div className="ow-container">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Event Packages</span>
          </div>
          <span className="section-label">Package Selections</span>
          <h1 className="page-banner-title">Event Programs Designed Around Your Guests</h1>
          <p className="page-banner-intro">
            Ocean West Catering provides comprehensive setup, Michelin-caliber culinary craft, professional service staff,
            china, bar coordination, aesthetic styling, and complete dietary adaptation across British Columbia.
          </p>

          {/* Quick Helper Tools Strip */}
          <div className="courses-tools-strip">
            <button
              type="button"
              className="course-tool-chip"
              onClick={onOpenPackageComparison}
              title="Compare all 3 packages side-by-side"
            >
              <Layers size={13} style={{ color: '#BA8D5B' }} />
              <span>Compare All Packages</span>
            </button>
            <button
              type="button"
              className="course-tool-chip"
              onClick={() => onOpenBudgetEstimator && onOpenBudgetEstimator('wedding')}
              title="Calculate indicative catering budget by guest count"
            >
              <Calculator size={13} style={{ color: '#BA8D5B' }} />
              <span>Budget Estimator</span>
            </button>
            <button
              type="button"
              className="course-tool-chip"
              onClick={() => setIsPlannerModalOpen(true)}
              title="Open the guided event planner"
            >
              <Compass size={13} style={{ color: '#BA8D5B' }} />
              <span>Guided Planner</span>
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* PACKAGES TIERS                                                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="ow-section packages-section">
        <div className="ow-container">
          {/* Quick Event Planner & Budget Banner */}
          <div className="planner-quick-card" style={{ marginBottom: '28px' }}>
            <div className="planner-quick-left">
              <div className="planner-quick-icon">
                <Calculator size={18} />
              </div>
              <div>
                <div className="planner-quick-title">Instant Budget &amp; Logistics Estimator</div>
                <div className="planner-quick-sub">Explore indicative food and service baseline investments by guest count</div>
              </div>
            </div>
            <button
              type="button"
              className="planner-quick-btn"
              onClick={() => onOpenBudgetEstimator && onOpenBudgetEstimator('wedding')}
            >
              <span>Calculate Budget</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="packages-grid">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`package-card ${pkg.isMostRequested ? 'highlighted' : ''}`}
              >
                {pkg.isMostRequested && (
                  <div className="most-requested-badge">Most Requested</div>
                )}
                <div className="package-meta-header">
                  <span>{pkg.badge}</span>
                  <span className="package-rate">{pkg.rate}</span>
                </div>
                <h3 className="package-title">{pkg.categoryName}</h3>
                <p className="package-desc">{pkg.description}</p>
                <ul className="package-features-list">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="package-feature-item">
                      <span className="check-icon-wrap"><Check size={11} strokeWidth={3} /></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="package-footer-block">
                  <div className="package-capacity-pill">{pkg.minGuests}</div>
                  <div className="package-action-btns-group">
                    <button
                      type="button"
                      className="btn-package-action"
                      onClick={() => handleSelectPackage(pkg.categoryName, pkg.defaultGuestCount)}
                    >
                      Select &amp; Inquire
                    </button>
                    {pkg.id !== 'film' && (
                      <button
                        type="button"
                        className="btn-pkg-calc"
                        onClick={() => onOpenBudgetEstimator && onOpenBudgetEstimator(pkg.id)}
                        title="Estimate budget for this package"
                      >
                        <Calculator size={13} />
                        <span>Estimate</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Side-by-Side Comparison Feature Card - Feature 6 */}
          <div className="package-compare-cta-box" style={{ marginTop: '36px' }}>
            <div className="compare-cta-left">
              <div className="compare-cta-icon">
                <Layers size={20} />
              </div>
              <div>
                <h4 className="compare-cta-title">Need Help Choosing the Right Program?</h4>
                <p className="compare-cta-desc">
                  Compare Intimate Gatherings, Grand Weddings, and Film Craft services side by side by guest range, service style, and staffing.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="btn-primary-gold"
              onClick={onOpenPackageComparison}
            >
              <span>View Side-by-Side Comparison</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Guarantee banner */}
          <div className="guarantee-notice-bar" style={{ marginTop: '28px' }}>
            <div className="guarantee-icon">
              <ShieldCheck size={16} />
            </div>
            <p className="guarantee-text">
              <strong>Booking Guarantee &amp; Date Protection:</strong> Ocean West Catering guarantees 100% date protection once deposit is secured.
              In our commitment to culinary excellence and impeccable service, we accept a <strong>strictly limited number of bookings per weekend</strong> to preserve quality.
            </p>
          </div>

          {/* Check Availability Callout */}
          <div className="menu-guide-banner" style={{ marginTop: '28px' }}>
            <div className="banner-left">
              <div className="banner-icon-box">
                <Calendar size={22} />
              </div>
              <div>
                <h4 className="banner-title">Planning an Upcoming Event?</h4>
                <p className="banner-subtitle">
                  Verify date availability immediately before submitting your package specifications.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="banner-btn"
              onClick={() => setIsAvailabilityModalOpen(true)}
            >
              <span>Check Chef Availability</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
