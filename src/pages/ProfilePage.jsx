import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Phone,
  Mail,
  ChevronRight,
  Calendar,
  Utensils,
  Heart,
  CheckSquare,
  ShieldCheck,
  Sliders,
  Calculator,
  Scale,
  MessageSquare,
  FileText,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  Camera,
  RefreshCw,
  Clock,
  MapPin,
  ExternalLink
} from 'lucide-react';

export default function ProfilePage({
  formData = {},
  setFormData,
  selectedDishes = [],
  favoriteDishes = [],
  onOpenStatusModal,
  onOpenMyMenu,
  onOpenSupportModal,
  onOpenConsultModal,
  onOpenChecklistModal,
  onOpenQuotationModal,
  onOpenCustomizationModal,
  onOpenServingGuideModal,
  onOpenPdfModal,
  onOpenResetConfirm,
  showToast
}) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const clientName = formData.fullName?.trim() || 'Private Dining Guest';
  const clientEmail = formData.email?.trim() || 'guest.client@oceanwestcatering.com';
  const clientPhone = formData.phone?.trim() || '604-722-4857';
  const referenceCode = 'OW-2026-7841';

  const handleCopyCode = (e) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(referenceCode);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (showToast) {
      showToast(`Copied Reference Code: ${referenceCode}`);
    }
  };

  return (
    <div className="native-profile-screen">
      {/* ------------------------------------------------------------------ */}
      {/* 1. COMPACT NATIVE APP TOP BAR                                      */}
      {/* ------------------------------------------------------------------ */}
      <div className="native-profile-top-bar">
        <h1 className="native-profile-header-title">My Account</h1>
        <span className="native-profile-sync-badge">
          <span className="sync-dot"></span>
          <span>Synced</span>
        </span>
      </div>

      <div className="native-profile-scroll-body">
        {/* ------------------------------------------------------------------ */}
        {/* 2. USER PROFILE HERO CARD                                          */}
        {/* ------------------------------------------------------------------ */}
        <div className="native-profile-hero-card">
          <div className="native-avatar-wrap">
            <div className="native-avatar-circle">
              <User size={30} strokeWidth={2.2} />
            </div>
            <div className="native-avatar-badge" title="Verified Host">
              <Check size={11} strokeWidth={3} />
            </div>
          </div>

          <div className="native-user-info">
            <h2 className="native-user-name">{clientName}</h2>
            <span className="native-membership-pill">VIP Event Host • West Coast Tier</span>
            <div className="native-contact-chips-row">
              <span className="native-contact-chip">{clientEmail}</span>
              <span className="native-contact-chip">{clientPhone}</span>
            </div>
          </div>

          {/* 3-Column Quick Metrics Bar */}
          <div className="native-profile-metrics-strip">
            <button
              type="button"
              className="native-metric-btn"
              onClick={() => onOpenStatusModal && onOpenStatusModal()}
              title="View Active RFP"
            >
              <span className="metric-val">{referenceCode}</span>
              <span className="metric-lbl">Active Inquiry</span>
            </button>

            <div className="metric-v-divider" />

            <button
              type="button"
              className="native-metric-btn"
              onClick={() => {
                if (selectedDishes.length > 0) {
                  navigate('/inquiry');
                } else {
                  navigate('/courses');
                }
              }}
              title="View Selected Courses"
            >
              <span className="metric-val">{selectedDishes.length}</span>
              <span className="metric-lbl">Tasting Courses</span>
            </button>

            <div className="metric-v-divider" />

            <button
              type="button"
              className="native-metric-btn"
              onClick={() => navigate('/courses')}
              title="View Saved Favorites"
            >
              <span className="metric-val">{favoriteDishes.length}</span>
              <span className="metric-lbl">Saved Favorites</span>
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 3. GROUP 1: CATERING & EVENT BOOKINGS                              */}
        {/* ------------------------------------------------------------------ */}
        <div className="native-grouped-section">
          <span className="native-section-header-title">CATERING &amp; EVENT INQUIRIES</span>

          <div className="native-inset-group">
            {/* Row 1: Active Inquiry & RFP */}
            <div
              className="native-group-row"
              onClick={() => onOpenStatusModal && onOpenStatusModal()}
              role="button"
              tabIndex={0}
            >
              <div className="native-row-icon plum">
                <Clock size={16} />
              </div>
              <div className="native-row-content">
                <div className="native-row-main-line">
                  <span className="native-row-title">Active Booking Proposal</span>
                  <span className="native-status-badge green">In Review</span>
                </div>
                <div className="native-row-sub">
                  <span>{referenceCode}</span>
                  <span className="dot">•</span>
                  <span>{formData.occasion || 'The Grand Wedding Banquet'}</span>
                </div>
              </div>
              <button
                type="button"
                className="btn-inline-copy"
                onClick={handleCopyCode}
                title="Copy reference code"
              >
                {copied ? <Check size={12} color="#2F6141" /> : <Copy size={12} />}
              </button>
              <ChevronRight size={16} className="native-row-chevron" />
            </div>

            {/* Row 2: Selected Tasting Courses */}
            <div
              className="native-group-row"
              onClick={() => {
                if (selectedDishes.length > 0) {
                  navigate('/inquiry');
                } else {
                  navigate('/courses');
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="native-row-icon gold">
                <Utensils size={16} />
              </div>
              <div className="native-row-content">
                <span className="native-row-title">Curated Tasting Courses</span>
                <span className="native-row-sub">
                  {selectedDishes.length > 0
                    ? `${selectedDishes.length} dish${selectedDishes.length > 1 ? 'es' : ''} configured in draft`
                    : 'No dishes attached yet'}
                </span>
              </div>
              {selectedDishes.length > 0 && (
                <span className="native-count-badge">{selectedDishes.length}</span>
              )}
              <ChevronRight size={16} className="native-row-chevron" />
            </div>

            {/* Row 3: Saved Repertoire Dishes */}
            <div
              className="native-group-row"
              onClick={() => navigate('/courses')}
              role="button"
              tabIndex={0}
            >
              <div className="native-row-icon rose">
                <Heart size={16} />
              </div>
              <div className="native-row-content">
                <span className="native-row-title">Saved Repertoire Delicacies</span>
                <span className="native-row-sub">
                  {favoriteDishes.length > 0
                    ? `${favoriteDishes.length} favorite${favoriteDishes.length > 1 ? 's' : ''} bookmarked`
                    : 'Bookmark favorite dishes while browsing'}
                </span>
              </div>
              {favoriteDishes.length > 0 && (
                <span className="native-count-badge">{favoriteDishes.length}</span>
              )}
              <ChevronRight size={16} className="native-row-chevron" />
            </div>

            {/* Row 4: Event Planning Checklist & Timeline */}
            <div
              className="native-group-row"
              onClick={() => onOpenChecklistModal && onOpenChecklistModal()}
              role="button"
              tabIndex={0}
            >
              <div className="native-row-icon sage">
                <CheckSquare size={16} />
              </div>
              <div className="native-row-content">
                <span className="native-row-title">Event Milestone Timeline</span>
                <span className="native-row-sub">Track tastings, floorplans &amp; vendor callouts</span>
              </div>
              <span className="native-value-text">6 Steps</span>
              <ChevronRight size={16} className="native-row-chevron" />
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 4. GROUP 2: CULINARY SPECIFICATIONS & TOOLS                        */}
        {/* ------------------------------------------------------------------ */}
        <div className="native-grouped-section">
          <span className="native-section-header-title">CULINARY &amp; SERVICE SETUP</span>

          <div className="native-inset-group">
            {/* Row 1: Dietary & Allergen Safety */}
            <div
              className="native-group-row"
              onClick={() => onOpenCustomizationModal && onOpenCustomizationModal()}
              role="button"
              tabIndex={0}
            >
              <div className="native-row-icon emerald">
                <ShieldCheck size={16} />
              </div>
              <div className="native-row-content">
                <span className="native-row-title">Dietary Protocols &amp; Allergens</span>
                <span className="native-row-sub">Nut-safe, celiac, &amp; Ocean Wise® standards</span>
              </div>
              <span className="native-value-text">Configured</span>
              <ChevronRight size={16} className="native-row-chevron" />
            </div>

            {/* Row 2: Service Discipline & Staffing */}
            <div
              className="native-group-row"
              onClick={() => onOpenCustomizationModal && onOpenCustomizationModal()}
              role="button"
              tabIndex={0}
            >
              <div className="native-row-icon amber">
                <Sliders size={16} />
              </div>
              <div className="native-row-content">
                <span className="native-row-title">Service Style &amp; Staffing Tier</span>
                <span className="native-row-sub">White-glove plated dinner or family banquet</span>
              </div>
              <ChevronRight size={16} className="native-row-chevron" />
            </div>

            {/* Row 3: Investment Quotation Slip */}
            <div
              className="native-group-row"
              onClick={() => onOpenQuotationModal && onOpenQuotationModal()}
              role="button"
              tabIndex={0}
            >
              <div className="native-row-icon ocean">
                <Calculator size={16} />
              </div>
              <div className="native-row-content">
                <span className="native-row-title">Estimated Quotation Slip</span>
                <span className="native-row-sub">Per-guest pricing calculator &amp; breakdown</span>
              </div>
              <span className="native-value-text">Instant Calc</span>
              <ChevronRight size={16} className="native-row-chevron" />
            </div>

            {/* Row 4: Serving Size Calculator */}
            <div
              className="native-group-row"
              onClick={() => onOpenServingGuideModal && onOpenServingGuideModal()}
              role="button"
              tabIndex={0}
            >
              <div className="native-row-icon bronze">
                <Scale size={16} />
              </div>
              <div className="native-row-content">
                <span className="native-row-title">Serving-Size &amp; Platter Guide</span>
                <span className="native-row-sub">Calculate banquet courses for your guest scale</span>
              </div>
              <ChevronRight size={16} className="native-row-chevron" />
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 5. GROUP 3: EXECUTIVE CHEF CONCIERGE & SUPPORT                     */}
        {/* ------------------------------------------------------------------ */}
        <div className="native-grouped-section">
          <span className="native-section-header-title">EXECUTIVE CHEF CONCIERGE</span>

          <div className="native-inset-group">
            {/* Row 1: Direct Hotline */}
            <a href="tel:6047224857" className="native-group-row native-link-row">
              <div className="native-row-icon gold">
                <Phone size={16} />
              </div>
              <div className="native-row-content">
                <span className="native-row-title">Call Executive Chef Hotline</span>
                <span className="native-row-sub">Direct urgent date holds &amp; film callouts</span>
              </div>
              <span className="native-value-text gold">604-722-4857</span>
              <ChevronRight size={16} className="native-row-chevron" />
            </a>

            {/* Row 2: Concierge Desk */}
            <div
              className="native-group-row"
              onClick={() => onOpenSupportModal && onOpenSupportModal()}
              role="button"
              tabIndex={0}
            >
              <div className="native-row-icon plum">
                <MessageSquare size={16} />
              </div>
              <div className="native-row-content">
                <span className="native-row-title">Concierge Support Desk</span>
                <span className="native-row-sub">Ask questions, request changes &amp; revisions</span>
              </div>
              <ChevronRight size={16} className="native-row-chevron" />
            </div>

            {/* Row 3: Seasonal Catalog */}
            <div
              className="native-group-row"
              onClick={() => onOpenPdfModal && onOpenPdfModal()}
              role="button"
              tabIndex={0}
            >
              <div className="native-row-icon sand">
                <FileText size={16} />
              </div>
              <div className="native-row-content">
                <span className="native-row-title">Seasonal Catering Guide (PDF)</span>
                <span className="native-row-sub">24-page catalog with wine pairings &amp; notes</span>
              </div>
              <span className="native-value-text">Download</span>
              <ChevronRight size={16} className="native-row-chevron" />
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 6. GROUP 4: SESSION & APP SETTINGS                                 */}
        {/* ------------------------------------------------------------------ */}
        <div className="native-grouped-section">
          <span className="native-section-header-title">PREFERENCES &amp; SESSION</span>

          <div className="native-inset-group">
            <div
              className="native-group-row"
              onClick={() => onOpenResetConfirm && onOpenResetConfirm()}
              role="button"
              tabIndex={0}
            >
              <div className="native-row-icon slate">
                <RefreshCw size={16} />
              </div>
              <div className="native-row-content">
                <span className="native-row-title">Reset Draft &amp; Clear Selections</span>
                <span className="native-row-sub">Clear current draft selections and reset preferences</span>
              </div>
              <ChevronRight size={16} className="native-row-chevron" />
            </div>
          </div>
        </div>

        {/* App Version Stamp */}
        <div className="native-profile-footer-stamp">
          <p className="app-stamp-title">Ocean West Catering Native App</p>
          <p className="app-stamp-sub">Version 2.4.0 • Richmond Commissary • British Columbia</p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 7. PRIMARY ACTION CTA                                              */}
        {/* ------------------------------------------------------------------ */}
        <div className="native-profile-bottom-cta">
          <button
            type="button"
            className="btn-native-cta-gold"
            onClick={() => navigate('/inquiry')}
          >
            <span>Proceed to Event Booking Form</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
