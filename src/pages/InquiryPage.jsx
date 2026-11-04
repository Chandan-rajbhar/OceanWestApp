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
  ShoppingBag,
  CheckCircle2,
  FileCheck2,
  Clapperboard,
  Calendar,
  AlertTriangle,
  Info,
  CheckSquare,
  Sliders,
  Calculator,
  Image as ImageIcon,
  X,
  Sparkles
} from 'lucide-react';
import { DIETARY_OPTIONS, CONTACT_INFO, IMAGES, HERO_SLIDES } from '../data/cateringData';

export default function InquiryPage({
  formData = {},
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
  onToggleDishInMenu,
  showToast
}) {
  const [searchParams] = useSearchParams();

  // Check if routed specifically for film catering
  useEffect(() => {
    if (
      searchParams.get('type') === 'film' ||
      formData.category === 'Movie & Film Production' ||
      formData.category === 'film'
    ) {
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

  // Clean user notes (hide raw debug string from textarea)
  const cleanUserNotes = (formData.notes || '')
    .replace(/\[Selected Tasting Menu Courses:[\s\S]*?\]/g, '')
    .replace(/\[Planned Celebration:[\s\S]*?\]/g, '')
    .trim();

  // Custom form submission that appends structured menu in background payload without polluting notes
  const onFormSubmitWithCleanNotes = (e) => {
    e.preventDefault();
    if (selectedDishes.length > 0) {
      const dishListFormatted = selectedDishes
        .map((d) => `• ${d.title} (${d.serviceStyle || d.category || 'Course'})`)
        .join('\n');
      const backgroundAppend = `[Selected Tasting Menu Courses:\n${dishListFormatted}]`;
      const combined = cleanUserNotes ? `${cleanUserNotes}\n\n${backgroundAppend}` : backgroundAppend;
      setFormData((prev) => ({
        ...prev,
        notes: combined,
        attachedCourses: selectedDishes.map((d) => d.title)
      }));
    }
    handleFormSubmit(e);
  };

  return (
    <div className="inquiry-page">
      {/* ------------------------------------------------------------------ */}
      {/* 1. COMPACT ROUNDED HERO CARD WITH GLOW & SHINE (HOME PAGE LAYOUT)  */}
      {/* ------------------------------------------------------------------ */}
      <section className="app-hero-card-wrap" style={{ padding: '12px 14px 4px' }}>
        <div className="app-hero-card">
          <div className="app-hero-shine" aria-hidden="true" />
          <img
            src={isFilm ? (IMAGES.filmCraft || IMAGES.filmCrew) : (IMAGES.wedding || HERO_SLIDES[2]?.image || IMAGES.platter)}
            alt={isFilm ? "Film Catering Production" : "Ocean West Event Inquiry"}
            className="app-hero-bg-img"
            loading="eager"
          />
          <div className="app-hero-gradient-overlay" />

          <div className="app-hero-card-content">
            <div className="hero-location-chip">
              <Sparkles size={9} className="chip-pin-icon" />
              <span>{isFilm ? 'FILM & TV RFP • METRO VANCOUVER' : 'DIRECT CONCIERGE INTAKE • 24H RESPONSE'}</span>
            </div>

            <h1 className="hero-app-headline">
              {isFilm ? 'Film & TV Production RFP' : 'Plan & Reserve Your Event'}
            </h1>
            <p className="hero-app-subtext">
              Direct consultations with Executive Chef Michael Thomas. Custom proposal in 24h.
            </p>

            <div className="hero-app-actions-row">
              <a
                href={`tel:${CONTACT_INFO.directPhone.replace(/-/g, '')}`}
                className="btn-hero-explore"
                title="Call commissary hotline"
              >
                <Phone size={11} />
                <span>Call {CONTACT_INFO.directPhone}</span>
              </a>
              <button
                type="button"
                className="btn-hero-quote"
                onClick={onOpenStatusModal}
                title="Track active inquiry or booking"
              >
                <Clock size={11} />
                <span>Status Portal</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. CONCIERGE SUPPORT BAR & SHORTCUTS                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="booking-concierge-strip" style={{ padding: '10px 14px 4px' }}>
        <div className="concierge-vip-bar">
          <div className="concierge-vip-left">
            <div className="concierge-vip-badge">
              <ShieldCheck size={17} />
            </div>
            <div className="concierge-vip-text">
              <div className="vip-title-row">
                <span className="vip-title">Executive Chef Concierge</span>
                <span className="vip-badge-24h">24h Response</span>
              </div>
              <span className="vip-sub">Chef Michael Thomas • Direct Oversight</span>
            </div>
          </div>

          <div className="concierge-vip-actions">
            <a
              href={`tel:${CONTACT_INFO.directPhone.replace(/-/g, '')}`}
              className="btn-vip-action"
              title="Call Commissary Hotline"
            >
              <Phone size={12} />
              <span>Call</span>
            </a>
            <button
              type="button"
              className="btn-vip-action"
              onClick={onOpenStatusModal}
              title="Check Active Intake Status"
            >
              <Clock size={12} />
              <span>Portal</span>
            </button>
          </div>
        </div>

        {/* 3 Quick Helper Tools in 3 Equal Columns */}
        <div className="booking-tools-mini-grid" style={{ marginTop: '8px' }}>
          <button
            type="button"
            className="mini-tool-btn"
            onClick={onOpenQuotationModal}
            title="Generate custom catering quote"
          >
            <Calculator size={13} />
            <span>Estimate Slip</span>
          </button>
          <button
            type="button"
            className="mini-tool-btn"
            onClick={onOpenCustomizationModal}
            title="Configure staffing & setup"
          >
            <Sliders size={13} />
            <span>Custom Setup</span>
          </button>
          <button
            type="button"
            className="mini-tool-btn"
            onClick={onOpenChecklistModal}
            title="View timeline checklist"
          >
            <CheckSquare size={13} />
            <span>Checklist</span>
          </button>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. BOOKING INTAKE FORM (STRUCTURED, HIGHLY READABLE NATIVE CARDS)  */}
      {/* ------------------------------------------------------------------ */}
      <section className="ow-section inquiry-form-section" style={{ padding: '10px 14px 24px' }}>
        <div className="ow-container">
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
            <form onSubmit={onFormSubmitWithCleanNotes} className="native-booking-form">
              {/* Segmented Mode Toggle: Standard Event vs Film & TV RFP */}
              <div className="form-mode-tabs-row" role="tablist" aria-label="Inquiry Mode">
                <button
                  type="button"
                  role="tab"
                  aria-selected={!isFilm}
                  className={`form-mode-tab ${!isFilm ? 'is-active active' : ''}`}
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
                  role="tab"
                  aria-selected={isFilm}
                  className={`form-mode-tab ${isFilm ? 'is-active active' : ''}`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      isFilmRequest: true,
                      category: 'Movie & Film Production'
                    }));
                  }}
                >
                  <Clapperboard size={13} style={{ marginRight: '5px' }} />
                  <span>Film &amp; TV RFP</span>
                </button>
              </div>

              {/* CARD 1: EVENT SCOPE & GUEST SCALE */}
              <div className="booking-card-group">
                <div className="card-group-header">
                  <div className="group-num-pill">1</div>
                  <div className="group-header-text">
                    <h3 className="group-title">Event Scope &amp; Schedule</h3>
                    <p className="group-sub">Guests, occasion type, venue location &amp; date</p>
                  </div>
                </div>

                {/* Interactive Guest Count Slider + Stepper Controls */}
                <div className="booking-field-block">
                  <div className="slider-label-row">
                    <span className="slider-field-title">Estimated Guest Count:</span>
                    <span className="slider-active-val">{formData.guestCount || '75'} Guests</span>
                  </div>
                  <div className="slider-stepper-control-row">
                    <button
                      type="button"
                      className="btn-stepper"
                      onClick={() => {
                        const cur = Number(formData.guestCount) || 75;
                        const next = Math.max(20, cur - 5);
                        setFormData((prev) => ({ ...prev, guestCount: String(next) }));
                      }}
                      aria-label="Decrease guest count by 5"
                    >
                      −
                    </button>
                    <input
                      type="range"
                      min="20"
                      max="350"
                      step="5"
                      value={Number(formData.guestCount) || 75}
                      onChange={(e) => setFormData((prev) => ({ ...prev, guestCount: e.target.value }))}
                      className="planner-range-input"
                      style={{
                        '--slider-pct': `${((Number(formData.guestCount || 75) - 20) / 330) * 100}%`
                      }}
                      aria-label="Estimated Guest Count Slider"
                    />
                    <button
                      type="button"
                      className="btn-stepper"
                      onClick={() => {
                        const cur = Number(formData.guestCount) || 75;
                        const next = Math.min(350, cur + 5);
                        setFormData((prev) => ({ ...prev, guestCount: String(next) }));
                      }}
                      aria-label="Increase guest count by 5"
                    >
                      +
                    </button>
                  </div>
                  <div className="slider-markers-row">
                    <span>20 Min</span>
                    <span>50 Typical</span>
                    <span>150+ Gala</span>
                  </div>
                </div>

                {/* Quick Occasion Selection Pills */}
                <div className="booking-field-block">
                  <span className="occasions-block-label">Occasion Style:</span>
                  <div className="occasions-pills-grid">
                    {[
                      'Weddings & Receptions',
                      'Corporate & Galas',
                      'Private Dining & Estates',
                      'Birthday Parties & Milestones',
                      'Family Gatherings & Reunions'
                    ].map((style) => (
                      <button
                        key={style}
                        type="button"
                        className={`occasion-choice-pill ${formData.category === style ? 'is-selected' : ''}`}
                        onClick={() => setFormData((prev) => ({ ...prev, category: style }))}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date & Location Grid */}
                <div className="form-grid-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="eventDate">
                      Target Event Date *
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      className="form-control"
                      value={formData.eventDate || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="location">
                      Venue / City *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="form-control"
                      placeholder="e.g. Vancouver waterfront, Whistler, Richmond"
                      value={formData.location || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="serviceStyle">
                    Preferred Dining Format
                  </label>
                  <select
                    id="serviceStyle"
                    name="serviceStyle"
                    className="form-control"
                    value={formData.serviceStyle || 'plated'}
                    onChange={handleFormChange}
                  >
                    <option value="plated">Plated Multi-Course Banquet</option>
                    <option value="family_style">Luxury Family-Style Sharing</option>
                    <option value="buffet">Artisan Buffet Display Stations</option>
                    <option value="cocktail">Passed Canapés &amp; Cocktail Reception</option>
                    <option value="grazing">Artisan Grazing Table</option>
                    <option value="craft">Continuous Mobile Craft Services</option>
                  </select>
                </div>

                {/* Film Specific Fields if Film RFP Mode */}
                {isFilm && (
                  <div className="film-specific-fields-box" style={{ marginTop: '12px' }}>
                    <div className="film-box-title">
                      <Clapperboard size={14} style={{ color: '#BA8D5B' }} />
                      <span>Production Logistics Specifications</span>
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
                          placeholder="e.g. Paramount Feature / Commercial"
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
                        placeholder="e.g. Squamish Basecamp then North Vancouver Stage"
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
                        placeholder="e.g. Hot Craft Truck + Continuous Espresso Bar"
                        value={formData.craftNeeds || ''}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* CARD 2: PRIMARY CONTACT INFORMATION */}
              <div className="booking-card-group">
                <div className="card-group-header">
                  <div className="group-num-pill">2</div>
                  <div className="group-header-text">
                    <h3 className="group-title">Primary Contact</h3>
                    <p className="group-sub">Where to send your custom proposal</p>
                  </div>
                </div>

                <div className="form-grid-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="form-control"
                      placeholder="e.g. Lauren Miller"
                      value={formData.fullName || ''}
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
                      value={formData.email || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    Phone / Direct Mobile *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    placeholder="604-000-0000"
                    value={formData.phone || ''}
                    onChange={handleFormChange}
                    required
                  />
                  <span className="form-field-trust-hint">
                    🔒 100% confidential. Used solely for your custom catering proposal.
                  </span>
                </div>
              </div>

              {/* CARD 3: MENU SELECTION & DIETARY PREFERENCES */}
              <div className="booking-card-group">
                <div className="card-group-header">
                  <div className="group-num-pill">3</div>
                  <div className="group-header-text">
                    <h3 className="group-title">Menu &amp; Dietary Preferences</h3>
                    <p className="group-sub">Curated dishes, allergen care &amp; special notes</p>
                  </div>
                </div>

                {/* Attached Tasting Menu Section */}
                <div className="booking-field-block">
                  <div className="attached-dishes-header">
                    <span className="attached-dishes-title">
                      <ShoppingBag size={14} style={{ color: '#BA8D5B' }} />
                      <span>Curated Tasting Menu ({selectedDishes.length} Selected)</span>
                    </span>
                    <button
                      type="button"
                      className="attached-edit-link"
                      onClick={onOpenMyMenu}
                    >
                      {selectedDishes.length > 0 ? 'Edit Menu' : 'Browse Menu'}
                    </button>
                  </div>

                  {selectedDishes.length > 0 ? (
                    <div className="attached-dishes-tags">
                      {selectedDishes.map((dish) => (
                        <span key={dish.id} className="attached-dish-chip">
                          <span>{dish.title}</span>
                          <button
                            type="button"
                            className="chip-remove-btn"
                            onClick={() => onToggleDishInMenu && onToggleDishInMenu(dish)}
                            title={`Remove ${dish.title}`}
                            aria-label={`Remove ${dish.title}`}
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="menu-empty-hint">
                      No courses attached yet. You can add dishes anytime from the Menus tab.
                    </p>
                  )}
                </div>

                {/* Dietary Preference Chips */}
                <div className="booking-field-block">
                  <label className="form-label">
                    Dietary Accommodations
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

                {/* Severe Allergy & Protocols */}
                <div className="form-group">
                  <label className="form-label" htmlFor="severeAllergies">
                    Severe Allergies &amp; Airborne Sensitivities
                  </label>
                  <input
                    type="text"
                    id="severeAllergies"
                    name="severeAllergies"
                    className="form-control"
                    placeholder="e.g. Anaphylactic peanut, severe celiac, shellfish allergy"
                    value={formData.severeAllergies || ''}
                    onChange={handleFormChange}
                  />
                  <div className="allergen-compact-badge">
                    <AlertTriangle size={12} style={{ color: '#BA8D5B', flexShrink: 0 }} />
                    <span>Cross-contamination protocols confirmed during chef consultation.</span>
                  </div>
                </div>

                {/* Event Customization Link Pill */}
                <div className="custom-setup-pill-row">
                  <div className="custom-pill-left">
                    <Sliders size={14} style={{ color: '#BA8D5B' }} />
                    <span>Tableware, Staffing &amp; Moodboard</span>
                  </div>
                  <button
                    type="button"
                    className="btn-custom-pill-trigger"
                    onClick={onOpenCustomizationModal}
                  >
                    <span>{hasCustomizations ? 'Edit Setup' : 'Customize'}</span>
                    <ArrowRight size={12} />
                  </button>
                </div>

                {/* Vision & Logistics Notes */}
                <div className="form-group" style={{ marginTop: '12px' }}>
                  <label className="form-label" htmlFor="notes">
                    Vision &amp; Schedule Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    className="form-control notes-textarea"
                    rows={2}
                    placeholder="Describe event schedule, sommelier requests, or venue parameters..."
                    value={cleanUserNotes}
                    onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  />
                </div>
              </div>

              {/* CARD 4: VERIFICATION SUMMARY & SUBMIT */}
              <div className="booking-summary-strip">
                <div className="summary-strip-header">
                  <FileCheck2 size={15} style={{ color: '#BA8D5B' }} />
                  <span className="summary-strip-title">Inquiry Proposal Summary</span>
                </div>
                <div className="summary-quick-grid">
                  <div className="summary-quick-cell">
                    <span className="cell-label">Occasion</span>
                    <span className="cell-val">{formData.category || 'Not specified'}</span>
                  </div>
                  <div className="summary-quick-cell">
                    <span className="cell-label">Guest Scale</span>
                    <span className="cell-val">
                      {formData.crewSize || formData.guestCount
                        ? `${formData.crewSize || formData.guestCount} Guests`
                        : '75 Guests'}
                    </span>
                  </div>
                  <div className="summary-quick-cell">
                    <span className="cell-label">Target Date</span>
                    <span className="cell-val">
                      {formData.shootStartDate || formData.eventDate || 'Flexible / TBD'}
                    </span>
                  </div>
                  <div className="summary-quick-cell">
                    <span className="cell-label">Location</span>
                    <span className="cell-val">
                      {formData.locationMoves || formData.location || 'Metro Vancouver'}
                    </span>
                  </div>
                </div>

                <div className="inquiry-disclaimer-note" style={{ marginTop: '8px' }}>
                  <Info size={12} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Chef Michael Thomas prepares a tailored proposal within 24 hours.</span>
                </div>

                {/* Submit Button */}
                <div className="sticky-submit-bar" style={{ marginTop: '12px' }}>
                  <button type="submit" className="btn-sticky-submit">
                    <span>Submit Inquiry to Executive Chef</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
