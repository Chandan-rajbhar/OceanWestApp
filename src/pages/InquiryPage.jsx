import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Edit3
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
  onResetPlanningDraft,
  showToast
}) {
  const [activeDietaryChips, setActiveDietaryChips] = useState(() => {
    return formData.dietaryChips || [];
  });

  const toggleDietaryChip = (chipLabel) => {
    let updated;
    if (activeDietaryChips.includes(chipLabel)) {
      updated = activeDietaryChips.filter(c => c !== chipLabel);
    } else {
      updated = [...activeDietaryChips, chipLabel];
    }
    setActiveDietaryChips(updated);
    setFormData(prev => ({
      ...prev,
      dietaryChips: updated
    }));
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
          <h1 className="page-banner-title">Plan Your Next Culinary Experience</h1>
          <p className="page-banner-intro">
            Executive Chef Michael Thomas provides direct consultations for all private and production clients.
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
                <span>Auto-saved to device</span>
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
            <button
              type="button"
              className="draft-reset-btn"
              onClick={onResetPlanningDraft}
              title="Reset form fields and attached dishes"
            >
              <RotateCcw size={12} />
              <span>Reset Draft</span>
            </button>
          </div>

          <div className="inquiry-grid">
            {/* Left Contact & Info Column */}
            <div className="inquiry-left-info">
              <span className="section-label">Commissary Headquarters</span>
              <h2 className="inquiry-title">Direct Culinary Access</h2>
              <p className="inquiry-lead">
                Whether you are finalizing wedding dates, booking location shoots, or coordinating corporate banquets,
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
                    <div className="contact-card-sub">Available for urgent inquiries &amp; date holds</div>
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
                    <div className="contact-card-sub">24-hour turnaround on formal RFPs</div>
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
                  
                  {/* Summary of what was sent */}
                  <div className="submission-receipt-card">
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
                        <span className="receipt-label">Guest Count:</span>
                        <span className="receipt-val">{formData.guestCount} Guests</span>
                      </div>
                    )}
                    {selectedDishes.length > 0 && (
                      <div className="receipt-row">
                        <span className="receipt-label">Curated Dishes:</span>
                        <span className="receipt-val">{selectedDishes.length} dishes attached</span>
                      </div>
                    )}
                    {activeDietaryChips.length > 0 && (
                      <div className="receipt-row">
                        <span className="receipt-label">Dietary Accommodations:</span>
                        <span className="receipt-val">{activeDietaryChips.join(', ')}</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    className="btn-outline-subtle"
                    style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}
                    onClick={() => setFormSubmitted(false)}
                  >
                    Submit Another Inquiry / Edit Draft
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  {/* Form fields */}
                  <div className="form-grid-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="fullName">Full Name *</label>
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
                      <label className="form-label" htmlFor="category">Select Event Category</label>
                      <select
                        id="category"
                        name="category"
                        className="form-control"
                        value={formData.category}
                        onChange={handleFormChange}
                      >
                        <option value="The Grand Wedding Banquet">Wedding Feast &amp; Reception</option>
                        <option value="Movie & Film Production">Film &amp; TV Craft Services</option>
                        <option value="Galas & Executive Summits">Corporate Gala &amp; Executive Summit</option>
                        <option value="The Intimate Gathering">Intimate Celebration &amp; Micro-Wedding</option>
                        <option value="Party Platters & Casual BBQ">Party Platters &amp; Casual BBQ</option>
                      </select>
                    </div>
                  </div>

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
                        placeholder="e.g. 120"
                        value={formData.guestCount}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="location">Primary Event Location</label>
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

                  {/* Dietary Preference Chips (Feature 3) */}
                  <div className="form-group">
                    <label className="form-label">
                      Dietary Preference Quick Chips
                      <span className="form-label-hint"> (Tap to toggle accommodations)</span>
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
                    <label className="form-label" htmlFor="notes">Event Vision &amp; Detailed Notes</label>
                    <textarea
                      id="notes"
                      name="notes"
                      className="form-control"
                      rows={3}
                      placeholder="Describe your event vision, schedule, dietary nuances, and specific culinary requests..."
                      value={formData.notes}
                      onChange={handleFormChange}
                    ></textarea>
                  </div>

                  {/* Inquiry Pre-submission Summary Card (Feature 4) */}
                  <div className="inquiry-summary-card">
                    <div className="summary-card-header">
                      <FileCheck2 size={15} style={{ color: '#BA8D5B' }} />
                      <span className="summary-card-title">Inquiry Overview &amp; Verification</span>
                    </div>
                    <div className="summary-fields-grid">
                      <div className="summary-item">
                        <span className="summary-item-label">Package / Program:</span>
                        <span className="summary-item-val">{formData.category || 'Not specified'}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-item-label">Guest Count:</span>
                        <span className="summary-item-val">{formData.guestCount ? `${formData.guestCount} Guests` : 'To be determined'}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-item-label">Target Date:</span>
                        <span className="summary-item-val">{formData.eventDate || 'Flexible / TBD'}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-item-label">Location:</span>
                        <span className="summary-item-val">{formData.location || 'Metro Vancouver Area'}</span>
                      </div>
                      {activeDietaryChips.length > 0 && (
                        <div className="summary-item full-width">
                          <span className="summary-item-label">Dietary Accommodations:</span>
                          <span className="summary-item-val">{activeDietaryChips.join(' • ')}</span>
                        </div>
                      )}
                      {selectedDishes.length > 0 && (
                        <div className="summary-item full-width">
                          <span className="summary-item-label">Menu Items:</span>
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

