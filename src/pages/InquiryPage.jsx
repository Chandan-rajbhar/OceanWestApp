import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Phone,
  Clock,
  MapPin,
  ShieldCheck,
  Check,
  ArrowRight,
  Mail,
  Sparkles,
  ShoppingBag,
  RotateCcw,
  CheckCircle2,
  FileCheck2,
  Edit3,
  Clapperboard,
  Calendar,
  AlertTriangle,
  Info,
  CheckSquare,
  Sliders,
  Calculator,
  Image as ImageIcon
} from 'lucide-react';
import { DIETARY_OPTIONS, CONTACT_INFO, OCCASIONS } from '../data/cateringData';

export default function InquiryPage({
  formData,
  setFormData,
  formSubmitted,
  setFormSubmitted,
  handleFormChange,
  handleFormSubmit,
  selectedDishes = [],
  onOpenMyMenu,
  onOpenResetConfirm,
  onOpenStatusModal,
  onOpenChecklistModal,
  onOpenCustomizationModal,
  onOpenQuotationModal,
  showToast
}) {
  const [searchParams] = useSearchParams();

  // Check if routed specifically for film catering
  useEffect(() => {
    if (searchParams.get('type') === 'film' || formData.category === 'Movie & Film Production' || formData.category === 'film') {
      setFormData((prev) => ({
        ...prev,
        isFilmRequest: true,
        category: 'Movie & Film Production'
      }));
    }
  }, [searchParams, formData.category, setFormData]);

  const activeDietaryChips = formData.dietaryChips || [];

  const toggleDietaryChip = (chipLabel) => {
    let updated;
    if (activeDietaryChips.includes(chipLabel)) {
      updated = activeDietaryChips.filter((c) => c !== chipLabel);
    } else {
      updated = [...activeDietaryChips, chipLabel];
    }
    setFormData((prev) => ({
      ...prev,
      dietaryChips: updated
    }));
  };

  const isFilm = formData.isFilmRequest || formData.category === 'Movie & Film Production';

  const toggleMealCall = (meal) => {
    const current = formData.mealCalls || ['Breakfast', 'Lunch'];
    const updated = current.includes(meal)
      ? current.filter((m) => m !== meal)
      : [...current, meal];
    setFormData((prev) => ({ ...prev, mealCalls: updated }));
  };

  // Customization preview
  const customizations = formData.customizations || {};
  const hasCustomizations =
    customizations.serviceStyle ||
    customizations.tableSetup ||
    customizations.staffingTier ||
    (customizations.uploadedImages && customizations.uploadedImages.length > 0);

  return (
    <div className="inquiry-page">
      {/* ------------------------------------------------------------------ */}
      {/* PAGE BANNER                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="page-header-banner">
        <div className="ow-container">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Direct Inquiries</span>
          </div>
          <span className="section-label">Inquire &amp; Reserve</span>
          <h1 className="page-banner-title">
            {isFilm ? 'Film & Television Production RFP' : 'Plan Your Next Culinary Experience'}
          </h1>
          <p className="page-banner-intro">
            Executive Chef Michael Thomas provides direct consultations for all private, wedding, and
            production clients. Submit your specifications below to receive a bespoke catering
            proposal within 24 hours.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FORM SECTION                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="ow-section inquiry-form-section">
        <div className="ow-container">
          <div className="inquiry-layout-grid">
            {/* Left Column: Direct Contacts & Transparency */}
            <div className="inquiry-sidebar-col">
              <div className="sidebar-info-card">
                <div className="sidebar-card-header">
                  <ShieldCheck size={20} className="gold-icon" />
                  <h4>Executive Chef Concierge</h4>
                </div>
                <p className="sidebar-card-text">
                  We answer every catering inquiry within 24 hours. For short-notice film call sheets
                  or urgent date holds, call our commissary directly.
                </p>

                <div className="sidebar-contact-list">
                  <a href={`tel:${CONTACT_INFO.directPhone.replace(/-/g, '')}`} className="sidebar-contact-item">
                    <Phone size={15} />
                    <span>{CONTACT_INFO.directPhone}</span>
                  </a>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="sidebar-contact-item">
                    <Mail size={15} />
                    <span>{CONTACT_INFO.email}</span>
                  </a>
                  <div className="sidebar-contact-item non-link">
                    <MapPin size={15} />
                    <span>{CONTACT_INFO.address}</span>
                  </div>
                </div>

                <div className="sidebar-planning-tools">
                  <span className="tools-sub-title">Planning Shortcuts:</span>
                  <div className="tools-mini-grid">
                    <button
                      type="button"
                      className="mini-tool-btn"
                      onClick={onOpenQuotationModal}
                    >
                      <Calculator size={13} />
                      <span>Estimate Slip</span>
                    </button>
                    <button
                      type="button"
                      className="mini-tool-btn"
                      onClick={onOpenCustomizationModal}
                    >
                      <Sliders size={13} />
                      <span>Custom Setup</span>
                    </button>
                    <button
                      type="button"
                      className="mini-tool-btn"
                      onClick={onOpenChecklistModal}
                    >
                      <CheckSquare size={13} />
                      <span>Checklist</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Tracking Reminder */}
              <div className="sidebar-status-card">
                <Clock size={18} className="gold-icon" />
                <div>
                  <h5>Existing Client?</h5>
                  <p>Track your event intake status, assigned team, or submit feedback.</p>
                  <button
                    type="button"
                    className="btn-status-portal-link"
                    onClick={onOpenStatusModal}
                  >
                    <span>Open Status Portal</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form / Success Card */}
            <div className="inquiry-main-form-card">
              {formSubmitted ? (
                <div className="inquiry-success-receipt">
                  <div className="receipt-top-icon">
                    <CheckCircle2 size={44} style={{ color: '#BA8D5B' }} />
                  </div>
                  <h3 className="receipt-heading">Inquiry Registered</h3>
                  <p className="receipt-text">
                    Thank you, <strong>{formData.fullName}</strong>. Executive Chef Michael Thomas
                    has received your event details for <strong>{formData.category}</strong>. You will
                    receive a bespoke catering proposal at <strong>{formData.email}</strong> within
                    24 hours.
                  </p>

                  <div className="receipt-summary-box">
                    <div className="receipt-row">
                      <span className="receipt-label">Inquiry Code:</span>
                      <span className="receipt-val">
                        <code>{formData.inquiryReference || 'OW-2026-7841'}</code>
                      </span>
                    </div>
                    <div className="receipt-row">
                      <span className="receipt-label">Event Category:</span>
                      <span className="receipt-val">{formData.category}</span>
                    </div>
                    {formData.eventDate && (
                      <div className="receipt-row">
                        <span className="receipt-label">Target Date:</span>
                        <span className="receipt-val">{formData.eventDate}</span>
                      </div>
                    )}
                    {formData.guestCount && (
                      <div className="receipt-row">
                        <span className="receipt-label">Guest Scale:</span>
                        <span className="receipt-val">{formData.guestCount} Guests</span>
                      </div>
                    )}
                    {formData.location && (
                      <div className="receipt-row">
                        <span className="receipt-label">Location:</span>
                        <span className="receipt-val">{formData.location}</span>
                      </div>
                    )}
                    {selectedDishes.length > 0 && (
                      <div className="receipt-row">
                        <span className="receipt-label">Curated Tasting Menu:</span>
                        <span className="receipt-val">{selectedDishes.length} dishes attached</span>
                      </div>
                    )}
                    {activeDietaryChips.length > 0 && (
                      <div className="receipt-row">
                        <span className="receipt-label">Dietary Accommodations:</span>
                        <span className="receipt-val">{activeDietaryChips.join(', ')}</span>
                      </div>
                    )}
                    {formData.severeAllergies && (
                      <div className="receipt-row">
                        <span className="receipt-label">Allergens Flagged:</span>
                        <span className="receipt-val">{formData.severeAllergies}</span>
                      </div>
                    )}
                  </div>

                  <div className="submission-actions-group">
                    <button
                      type="button"
                      className="btn-primary-gold"
                      style={{ width: '100%', justifyContent: 'center' }}
                      onClick={onOpenStatusModal}
                    >
                      <Clock size={15} />
                      <span>Track Inquiry Status (Client Portal)</span>
                    </button>

                    <button
                      type="button"
                      className="btn-outline-subtle"
                      style={{ width: '100%', justifyContent: 'center' }}
                      onClick={() => setFormSubmitted(false)}
                    >
                      <span>Submit Another Inquiry / Edit Draft</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  {/* Category & Flow Mode Switcher */}
                  <div className="form-mode-tabs-row">
                    <button
                      type="button"
                      className={`form-mode-tab ${!isFilm ? 'active' : ''}`}
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          isFilmRequest: false,
                          category:
                            prev.category === 'Movie & Film Production'
                              ? 'Weddings & Receptions'
                              : prev.category
                        }));
                      }}
                    >
                      Standard Event Inquiry
                    </button>
                    <button
                      type="button"
                      className={`form-mode-tab ${isFilm ? 'active' : ''}`}
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          isFilmRequest: true,
                          category: 'Movie & Film Production'
                        }));
                      }}
                    >
                      <Clapperboard size={13} style={{ marginRight: '5px' }} />
                      Film &amp; TV Production RFP
                    </button>
                  </div>

                  {/* Contact Fields */}
                  <div className="form-grid-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="fullName">
                        Full Name / Primary Contact *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className="form-control"
                        placeholder="e.g. Lauren Miller"
                        value={formData.fullName}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="lauren@example.com"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-grid-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">
                        Phone / Mobile *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-control"
                        placeholder="604-000-0000"
                        value={formData.phone}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="category">
                        Select Event Occasion / Program
                      </label>
                      <select
                        id="category"
                        name="category"
                        className="form-control"
                        value={formData.category}
                        onChange={handleFormChange}
                      >
                        <option value="Weddings & Receptions">Weddings &amp; Receptions</option>
                        <option value="Corporate & Galas">Corporate &amp; Executive Galas</option>
                        <option value="Birthday Parties & Milestones">
                          Birthday Parties &amp; Milestones
                        </option>
                        <option value="Private Dining & Estates">Private Dining &amp; Estate Feasts</option>
                        <option value="Family Gatherings & Reunions">
                          Family Gatherings &amp; Reunions
                        </option>
                        <option value="Movie & Film Production">
                          Movie &amp; Film Production Craft
                        </option>
                        <option value="Custom Waterfront & Outdoor Banquets">
                          Custom Waterfront &amp; Outdoor Banquets
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Standard Event Fields */}
                  {!isFilm ? (
                    <div className="form-grid-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="eventDate">
                          Target Event Date
                        </label>
                        <input
                          type="date"
                          id="eventDate"
                          name="eventDate"
                          className="form-control"
                          value={formData.eventDate}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="guestCount">
                          Expected Guest Count
                        </label>
                        <input
                          type="number"
                          id="guestCount"
                          name="guestCount"
                          className="form-control"
                          placeholder="e.g. 100"
                          value={formData.guestCount}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                  ) : (
                    /* Film Specific Fields */
                    <div className="film-fields-container">
                      <div className="film-section-badge">
                        <Clapperboard size={14} />
                        <span>Production &amp; Crew Call Parameters</span>
                      </div>

                      <div className="form-grid-row">
                        <div className="form-group">
                          <label className="form-label" htmlFor="productionName">
                            Production / Project Title *
                          </label>
                          <input
                            type="text"
                            id="productionName"
                            name="productionName"
                            className="form-control"
                            placeholder="e.g. Paramount Feature / Commercial Project"
                            value={formData.productionName || ''}
                            onChange={handleFormChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="crewSize">
                            Daily Crew Size *
                          </label>
                          <input
                            type="number"
                            id="crewSize"
                            name="crewSize"
                            className="form-control"
                            placeholder="e.g. 140 crew daily"
                            value={formData.crewSize || formData.guestCount || '120'}
                            onChange={handleFormChange}
                          />
                        </div>
                      </div>

                      <div className="form-grid-row">
                        <div className="form-group">
                          <label className="form-label" htmlFor="shootStartDate">
                            Shoot Start Date
                          </label>
                          <input
                            type="date"
                            id="shootStartDate"
                            name="shootStartDate"
                            className="form-control"
                            value={formData.shootStartDate || formData.eventDate || ''}
                            onChange={handleFormChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="shootEndDate">
                            Wrap / End Date
                          </label>
                          <input
                            type="date"
                            id="shootEndDate"
                            name="shootEndDate"
                            className="form-control"
                            value={formData.shootEndDate || ''}
                            onChange={handleFormChange}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Required Daily Meal Calls</label>
                        <div className="meal-calls-chips-row">
                          {[
                            'Hot Breakfast Call',
                            'Seated Hot Lunch',
                            'Walking Dinner',
                            'Late Night Wrap'
                          ].map((call) => {
                            const isSelected = (
                              formData.mealCalls || ['Hot Breakfast Call', 'Seated Hot Lunch']
                            ).includes(call);
                            return (
                              <button
                                type="button"
                                key={call}
                                className={`style-chip-btn ${isSelected ? 'active' : ''}`}
                                onClick={() => toggleMealCall(call)}
                              >
                                {isSelected && <Check size={11} strokeWidth={3} />}
                                <span>{call}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="locationMoves">
                          Location &amp; Moves Breakdown
                        </label>
                        <input
                          type="text"
                          id="locationMoves"
                          name="locationMoves"
                          className="form-control"
                          placeholder="e.g. Squamish Basecamp (Days 1–8) then North Vancouver Sound Stage"
                          value={formData.locationMoves || ''}
                          onChange={handleFormChange}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="craftNeeds">
                          Craft Services Setup
                        </label>
                        <input
                          type="text"
                          id="craftNeeds"
                          name="craftNeeds"
                          className="form-control"
                          placeholder="e.g. Hot Craft Truck + Continuous Espresso + Off-Grid Boxed Lunches"
                          value={formData.craftNeeds || ''}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                  )}

                  {/* Location & Service Style */}
                  <div className="form-grid-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="location">
                        Venue / Event Location *
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        className="form-control"
                        placeholder="e.g. Vancouver waterfront, Richmond, Whistler, or Private Estate"
                        value={formData.location}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="serviceStyle">
                        Preferred Service Style
                      </label>
                      <select
                        id="serviceStyle"
                        name="serviceStyle"
                        className="form-control"
                        value={formData.serviceStyle || 'plated'}
                        onChange={handleFormChange}
                      >
                        <option value="plated">Plated Multi-Course</option>
                        <option value="family_style">Luxury Family-Style Sharing</option>
                        <option value="buffet">Artisan Buffet Stations</option>
                        <option value="cocktail">Passed Canapés &amp; Cocktail Reception</option>
                        <option value="grazing">Artisan Grazing Table</option>
                        <option value="craft">Continuous Mobile Craft Galley</option>
                      </select>
                    </div>
                  </div>

                  {/* Event Customization Trigger Card - Module 5 */}
                  <div className="customization-inquiry-callout">
                    <div className="custom-callout-text">
                      <div className="callout-badge-line">
                        <Sliders size={13} />
                        <span>Module 5: Event Customization &amp; Table Design</span>
                      </div>
                      <p>
                        Specify table setups, white-glove staffing tiers, sommelier pairings, and upload
                        inspiration moodboards.
                      </p>
                      {hasCustomizations && (
                        <div className="active-custom-tags">
                          {customizations.serviceStyle && (
                            <span className="custom-tag">Style: {customizations.serviceStyle}</span>
                          )}
                          {customizations.tableSetup && (
                            <span className="custom-tag">Setup: {customizations.tableSetup}</span>
                          )}
                          {customizations.staffingTier && (
                            <span className="custom-tag">Staff: {customizations.staffingTier}</span>
                          )}
                          {customizations.uploadedImages &&
                            customizations.uploadedImages.length > 0 && (
                              <span className="custom-tag">
                                <ImageIcon size={11} />
                                {customizations.uploadedImages.length} Photos Attached
                              </span>
                            )}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      className="btn-open-custom-modal"
                      onClick={onOpenCustomizationModal}
                    >
                      <Sliders size={13} />
                      <span>{hasCustomizations ? 'Edit Customizations' : 'Customize Event'}</span>
                    </button>
                  </div>

                  {/* Dietary Preference Chips */}
                  <div className="form-group">
                    <label className="form-label">
                      Dietary Preferences &amp; Accommodations
                      <span className="form-label-hint"> (Tap to toggle)</span>
                    </label>
                    <div className="dietary-chips-cloud">
                      {DIETARY_OPTIONS.map((chip) => {
                        const isSelected = activeDietaryChips.includes(chip.label);
                        return (
                          <button
                            type="button"
                            key={chip.id}
                            className={`dietary-chip-pill ${isSelected ? 'active' : ''}`}
                            onClick={() => toggleDietaryChip(chip.label)}
                          >
                            {isSelected && <Check size={11} strokeWidth={3} />}
                            <span>{chip.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Severe Allergy Details Free Text & Advisory */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="severeAllergies">
                      Specific Severe Allergies &amp; Cross-Contamination Notes
                      <span className="form-label-hint"> (Free text entry)</span>
                    </label>
                    <textarea
                      id="severeAllergies"
                      name="severeAllergies"
                      className="form-control"
                      rows={2}
                      placeholder="Detail any severe anaphylactic allergies, celiac disease, airborne sensitivities..."
                      value={formData.severeAllergies || ''}
                      onChange={handleFormChange}
                    />
                    <div className="allergen-warning-banner">
                      <AlertTriangle size={14} style={{ color: '#BA8D5B', flexShrink: 0 }} />
                      <span>
                        <strong>Allergen Notice:</strong> Never infer that a dish is safe for an allergy
                        unless confirmed during chef consultation. Ocean West commissary prepares
                        seasonal Pacific seafood, nuts, and dairy with rigorous cross-contamination
                        protocols.
                      </span>
                    </div>
                  </div>

                  {/* Attached dishes preview if any selected */}
                  {selectedDishes.length > 0 && (
                    <div className="attached-dishes-inquiry-box">
                      <div className="attached-dishes-header">
                        <span className="attached-dishes-title">
                          <ShoppingBag size={14} style={{ color: '#BA8D5B' }} />
                          Curated Tasting Menu ({selectedDishes.length} Items Selected)
                        </span>
                        <button
                          type="button"
                          className="attached-edit-link"
                          onClick={onOpenMyMenu}
                        >
                          Edit Menu
                        </button>
                      </div>
                      <div className="attached-dishes-tags">
                        {selectedDishes.map((dish) => (
                          <span key={dish.id} className="attached-dish-tag">
                            {dish.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Free text notes */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="notes">
                      Event Vision &amp; Logistics Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      className="form-control"
                      rows={3}
                      placeholder="Describe your event schedule, venue parameters, sommelier pairing requests, or additional notes..."
                      value={formData.notes}
                      onChange={handleFormChange}
                    />
                  </div>

                  {/* Inquiry Pre-submission Summary Card */}
                  <div className="inquiry-summary-card">
                    <div className="summary-card-header">
                      <FileCheck2 size={15} style={{ color: '#BA8D5B' }} />
                      <span className="summary-card-title">Inquiry Overview &amp; Verification</span>
                    </div>
                    <div className="summary-fields-grid">
                      <div className="summary-item">
                        <span className="summary-item-label">Occasion / Program:</span>
                        <span className="summary-item-val">{formData.category || 'Not specified'}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-item-label">Guest Scale:</span>
                        <span className="summary-item-val">
                          {formData.crewSize || formData.guestCount
                            ? `${formData.crewSize || formData.guestCount} Guests`
                            : 'To be determined'}
                        </span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-item-label">Target Date:</span>
                        <span className="summary-item-val">
                          {formData.shootStartDate || formData.eventDate || 'Flexible / TBD'}
                        </span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-item-label">Location:</span>
                        <span className="summary-item-val">
                          {formData.locationMoves || formData.location || 'Metro Vancouver'}
                        </span>
                      </div>
                      {activeDietaryChips.length > 0 && (
                        <div className="summary-item full-width">
                          <span className="summary-item-label">Dietary Accommodations:</span>
                          <span className="summary-item-val">{activeDietaryChips.join(' • ')}</span>
                        </div>
                      )}
                      {formData.severeAllergies && (
                        <div className="summary-item full-width">
                          <span className="summary-item-label">Allergy Instructions:</span>
                          <span className="summary-item-val">{formData.severeAllergies}</span>
                        </div>
                      )}
                      {selectedDishes.length > 0 && (
                        <div className="summary-item full-width">
                          <span className="summary-item-label">Attached Menu Courses:</span>
                          <span className="summary-item-val">
                            {selectedDishes.map((d) => d.title).join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="inquiry-disclaimer-note">
                    <Info size={13} />
                    <span>
                      Submitting this form initiates a formal catering consultation and menu draft.
                      Dates and menus are confirmed upon contract execution with Chef Michael Thomas.
                    </span>
                  </div>

                  <button type="submit" className="btn-submit-inquiry">
                    <span>Submit Inquiry to Executive Chef Michael Thomas</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
