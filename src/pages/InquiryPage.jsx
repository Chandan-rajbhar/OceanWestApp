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
  CheckSquare
} from 'lucide-react';
import { DIETARY_OPTIONS, CONTACT_INFO } from '../data/cateringData';

export default function InquiryPage({
  formData,
  setFormData,
  formSubmitted,
  setFormSubmitted,
  handleFormChange,
  handleFormSubmit,
  selectedDishes,
  onOpenMyMenu,
  onOpenResetConfirm,
  onOpenStatusModal,
  onOpenChecklistModal,
  showToast
}) {
  const [searchParams] = useSearchParams();

  // Check if routed specifically for film catering
  useEffect(() => {
    if (searchParams.get('type') === 'film' || formData.category === 'Movie & Film Production') {
      setFormData(prev => ({
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
      updated = activeDietaryChips.filter(c => c !== chipLabel);
    } else {
      updated = [...activeDietaryChips, chipLabel];
    }
    setFormData(prev => ({
      ...prev,
      dietaryChips: updated
    }));
  };

  const isFilm = formData.isFilmRequest || formData.category === 'Movie & Film Production';

  const toggleMealCall = (meal) => {
    const current = formData.mealCalls || ['Breakfast', 'Lunch'];
    const updated = current.includes(meal)
      ? current.filter(m => m !== meal)
      : [...current, meal];
    setFormData(prev => ({ ...prev, mealCalls: updated }));
  };

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
            Executive Chef Michael Thomas provides direct consultations for all private, wedding, and production clients.
            Submit your specifications below to receive a bespoke catering proposal within 24 hours.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FORM & COMMISSARY CONTACT GRID                                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="ow-section inquiry-section">
        <div className="ow-container">
          {/* Quick Draft Actions Bar */}
          <div className="draft-tools-bar">
            <div className="draft-tools-left">
              <span className="draft-status-pill">
                <CheckCircle2 size={12} style={{ color: '#2F6141' }} />
                <span>Draft Auto-Saved</span>
              </span>
              {selectedDishes.length > 0 && (
                <button
                  type="button"
                  className="draft-menu-pill"
                  onClick={onOpenMyMenu}
                  title="View Selected Dishes in My Menu"
                >
                  <ShoppingBag size={12} />
                  <span>{selectedDishes.length} Dishes Attached</span>
                </button>
              )}
            </div>
            <div className="draft-tools-right">
              <button
                type="button"
                className="draft-reset-btn"
                onClick={onOpenResetConfirm}
                title="Reset form fields and attached dishes"
              >
                <RotateCcw size={12} />
                <span>Reset Draft</span>
              </button>
            </div>
          </div>

          <div className="inquiry-grid">
            {/* Left Contact & Info Column */}
            <div className="inquiry-left-info">
              <span className="section-label">Commissary Headquarters</span>
              <h2 className="inquiry-title">Direct Culinary Access</h2>
              <p className="inquiry-lead">
                Whether you are finalizing wedding dates, booking 14-hour location shoots, or coordinating corporate banquets,
                our executive team is available directly.
              </p>

              <div className="contact-cards-stack">
                {/* Direct Line */}
                <div className="contact-card-item">
                  <div className="contact-card-icon">
                    <Phone size={15} />
                  </div>
                  <div>
                    <div className="contact-card-label">Direct Chef Line</div>
                    <a href={`tel:${CONTACT_INFO.directPhone.replace(/-/g, '')}`} className="contact-card-value">
                      {CONTACT_INFO.directPhone}
                    </a>
                    <div className="contact-card-sub">Available for urgent date holds &amp; call sheets</div>
                  </div>
                </div>

                {/* Office Line */}
                <div className="contact-card-item">
                  <div className="contact-card-icon">
                    <Clock size={15} />
                  </div>
                  <div>
                    <div className="contact-card-label">Commissary Kitchen Office</div>
                    <a href={`tel:${CONTACT_INFO.officePhone.replace(/-/g, '')}`} className="contact-card-value">
                      {CONTACT_INFO.officePhone}
                    </a>
                    <div className="contact-card-sub">{CONTACT_INFO.hours}</div>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-card-item">
                  <div className="contact-card-icon">
                    <Mail size={15} />
                  </div>
                  <div>
                    <div className="contact-card-label">Official Email</div>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="contact-card-value">
                      {CONTACT_INFO.email}
                    </a>
                    <div className="contact-card-sub">24-hour turnaround on formal proposals</div>
                  </div>
                </div>

                {/* Location */}
                <div className="contact-card-item">
                  <div className="contact-card-icon">
                    <MapPin size={15} />
                  </div>
                  <div>
                    <div className="contact-card-label">Commissary Facility</div>
                    <a
                      href={CONTACT_INFO.mapsQuery}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-card-value"
                      style={{ fontSize: '13.5px' }}
                    >
                      {CONTACT_INFO.commissaryAddress}
                    </a>
                    <div className="contact-card-sub">Tastings and consultations by appointment</div>
                  </div>
                </div>
              </div>

              {/* Health permit certification */}
              <div className="health-permit-badge">
                <ShieldCheck size={16} className="health-permit-icon" />
                <span><strong>BC Health Certified &amp; Fully Insured:</strong> Commercial Kitchen Permit &amp; Comprehensive Event Liability Coverage</span>
              </div>

              {/* Event Checklist Shortcut */}
              <div className="inquiry-sidebar-checklist-card">
                <div className="sidebar-card-title">
                  <CheckSquare size={16} style={{ color: '#BA8D5B' }} />
                  <span>Planning an Event?</span>
                </div>
                <p className="sidebar-card-desc">
                  Keep track of all milestone deadlines from tasting to event day with our checklist.
                </p>
                <button
                  type="button"
                  className="btn-outline-subtle"
                  onClick={onOpenChecklistModal}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Open Milestone Checklist</span>
                </button>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="inquiry-form-card">
              {formSubmitted ? (
                <div className="inquiry-success-state">
                  <div className="success-icon-bubble">
                    <Check size={32} strokeWidth={2.5} />
                  </div>
                  <h3 className="success-heading">Inquiry Received</h3>
                  <p className="success-message">
                    Thank you, <strong>{formData.fullName}</strong>. Executive Chef Michael Thomas has received your event details for <strong>{formData.category}</strong>. You will receive a bespoke catering proposal at <strong>{formData.email}</strong> within 24 hours.
                  </p>
                  
                  {/* Generated demo reference */}
                  <div className="demo-ref-card">
                    <span className="demo-ref-label">Inquiry Reference Code:</span>
                    <span className="demo-ref-val">OW-2026-7841</span>
                    <span className="demo-ref-hint">Keep this code to reference your consultation request.</span>
                  </div>

                  {/* Summary of what was sent */}
                  <div className="submission-receipt-card">
                    <div className="receipt-row">
                      <span className="receipt-label">Event Program:</span>
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
                        <span className="receipt-label">Guest Count:</span>
                        <span className="receipt-val">{formData.guestCount} Guests</span>
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
                      <span>Track Inquiry Status (Client Portal Demo)</span>
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
                        setFormData(prev => ({
                          ...prev,
                          isFilmRequest: false,
                          category: prev.category === 'Movie & Film Production' ? 'The Grand Wedding Banquet' : prev.category
                        }));
                      }}
                    >
                      Standard Event Inquiry
                    </button>
                    <button
                      type="button"
                      className={`form-mode-tab ${isFilm ? 'active' : ''}`}
                      onClick={() => {
                        setFormData(prev => ({
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
                      <label className="form-label" htmlFor="fullName">Full Name / Primary Contact *</label>
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
                      <label className="form-label" htmlFor="email">Email Address *</label>
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
                      <label className="form-label" htmlFor="phone">Phone / Mobile *</label>
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
                      <label className="form-label" htmlFor="category">Select Event Program</label>
                      <select
                        id="category"
                        name="category"
                        className="form-control"
                        value={formData.category}
                        onChange={handleFormChange}
                      >
                        <option value="The Grand Wedding Banquet">The Grand Wedding Banquet</option>
                        <option value="The Intimate Gathering">The Intimate Gathering</option>
                        <option value="Movie & Film Production">Movie &amp; Film Production Craft</option>
                        <option value="Galas & Executive Summits">Galas &amp; Executive Summits</option>
                        <option value="Party Platters & Casual BBQ">Party Platters &amp; Casual BBQ</option>
                      </select>
                    </div>
                  </div>

                  {/* Standard Event Fields */}
                  {!isFilm ? (
                    <div className="form-grid-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="eventDate">Target Event Date</label>
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
                        <label className="form-label" htmlFor="guestCount">Expected Guest Count</label>
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
                    /* Film Specific Fields - Feature 13 */
                    <div className="film-fields-container">
                      <div className="film-section-badge">
                        <Clapperboard size={14} />
                        <span>Production &amp; Crew Call Parameters</span>
                      </div>

                      <div className="form-grid-row">
                        <div className="form-group">
                          <label className="form-label" htmlFor="productionName">Production / Project Title *</label>
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
                          <label className="form-label" htmlFor="crewSize">Daily Crew Size *</label>
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
                          <label className="form-label" htmlFor="shootStartDate">Shoot Start Date</label>
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
                          <label className="form-label" htmlFor="shootEndDate">Wrap / End Date</label>
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
                          {['Hot Breakfast Call', 'Seated Hot Lunch', 'Walking Dinner', 'Late Night Wrap'].map(call => {
                            const isSelected = (formData.mealCalls || ['Hot Breakfast Call', 'Seated Hot Lunch']).includes(call);
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
                        <label className="form-label" htmlFor="locationMoves">Location &amp; Moves Breakdown</label>
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
                        <label className="form-label" htmlFor="craftNeeds">Craft Services Setup</label>
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

                  <div className="form-group">
                    <label className="form-label" htmlFor="location">Primary Event Location / Stage</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="form-control"
                      placeholder="e.g. Richmond, North Vancouver, Squamish, Tsawwassen"
                      value={formData.location}
                      onChange={handleFormChange}
                    />
                  </div>

                  {/* Dietary Preference Chips - Feature 4 */}
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

                  {/* Severe Allergy Details Free Text & Advisory - Feature 4 */}
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
                        <strong>Allergen Notice:</strong> Never infer that a dish is safe for an allergy unless confirmed during chef consultation. Ocean West commissary prepares seasonal Pacific seafood, nuts, and dairy with rigorous cross-contamination protocols.
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
                    <label className="form-label" htmlFor="notes">Event Vision &amp; Logistics Notes</label>
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

                  {/* Inquiry Pre-submission Summary Card - Feature 4 */}
                  <div className="inquiry-summary-card">
                    <div className="summary-card-header">
                      <FileCheck2 size={15} style={{ color: '#BA8D5B' }} />
                      <span className="summary-card-title">Inquiry Overview &amp; Verification</span>
                    </div>
                    <div className="summary-fields-grid">
                      <div className="summary-item">
                        <span className="summary-item-label">Program:</span>
                        <span className="summary-item-val">{formData.category || 'Not specified'}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-item-label">Guest Scale:</span>
                        <span className="summary-item-val">{formData.crewSize || formData.guestCount ? `${formData.crewSize || formData.guestCount} Guests` : 'To be determined'}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-item-label">Target Date:</span>
                        <span className="summary-item-val">{formData.shootStartDate || formData.eventDate || 'Flexible / TBD'}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-item-label">Location:</span>
                        <span className="summary-item-val">{formData.locationMoves || formData.location || 'Metro Vancouver'}</span>
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
                          <span className="summary-item-val">{selectedDishes.map(d => d.title).join(', ')}</span>
                        </div>
                      )}
                    </div>
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
