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
  Compass
} from 'lucide-react';
import { PACKAGES } from '../data/cateringData';

export default function PackagesPage({
  setFormData,
  setIsAvailabilityModalOpen,
  setIsPlannerModalOpen,
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
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* PACKAGES TIERS                                                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="ow-section packages-section">
        <div className="ow-container">
          {/* Quick Event Planner Banner */}
          <div className="planner-quick-card" style={{ marginBottom: '28px' }}>
            <div className="planner-quick-left">
              <div className="planner-quick-icon">
                <Compass size={18} />
              </div>
              <div>
                <div className="planner-quick-title">Custom Guest &amp; Staffing Planner</div>
                <div className="planner-quick-sub">Calculate staffing ratios and prep logistics for your guest count</div>
              </div>
            </div>
            <button
              type="button"
              className="planner-quick-btn"
              onClick={() => setIsPlannerModalOpen(true)}
            >
              <span>Launch Planner</span>
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
                  <button
                    type="button"
                    className="btn-package-action"
                    onClick={() => handleSelectPackage(pkg.categoryName, pkg.defaultGuestCount)}
                  >
                    Select {pkg.categoryName}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Guarantee banner */}
          <div className="guarantee-notice-bar" style={{ marginTop: '36px' }}>
            <div className="guarantee-icon">
              <ShieldCheck size={16} />
            </div>
            <p className="guarantee-text">
              <strong>Booking Guarantee &amp; Date Protection:</strong> Ocean West Catering guarantees 100% date protection once deposit is secured.
              In our commitment to culinary excellence and impeccable service, we accept a <strong>strictly limited number of bookings per weekend</strong> to preserve quality.
            </p>
          </div>

          {/* Check Availability Callout */}
          <div className="menu-guide-banner" style={{ marginTop: '30px' }}>
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

