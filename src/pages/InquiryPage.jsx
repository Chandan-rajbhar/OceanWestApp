import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Phone,
  Clock,
  MapPin,
  ShieldCheck,
  Check,
  ArrowRight,
  ArrowLeft,
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
  Sparkles,
  Heart,
  Briefcase,
  Cake,
  Utensils,
  Users,
  Minus,
  Plus
} from 'lucide-react';
import { DIETARY_OPTIONS, CONTACT_INFO, IMAGES, HERO_SLIDES } from '../data/cateringData';

const EVENT_TYPES = [
  { id: 'wedding', label: 'Wedding', category: 'Weddings & Receptions', icon: Heart },
  { id: 'corporate', label: 'Corporate', category: 'Corporate & Galas', icon: Briefcase },
  { id: 'birthday', label: 'Birthday', category: 'Birthday Parties & Milestones', icon: Cake },
  { id: 'private_dining', label: 'Private Dining', category: 'Private Dining & Estates', icon: Utensils },
  { id: 'family', label: 'Family Gathering', category: 'Family Gatherings & Reunions', icon: Users },
  { id: 'custom', label: 'Custom Event', category: 'Custom Celebration', icon: Sparkles }
];

const CATERING_STYLES = [
  { id: 'buffet', label: 'Buffet', image: IMAGES.platter },
  { id: 'plated', label: 'Plated Dining', image: HERO_SLIDES[1]?.image || IMAGES.wedding },
  { id: 'family_style', label: 'Family Style', image: HERO_SLIDES[2]?.image || IMAGES.platter },
  { id: 'live_stations', label: 'Live Stations', image: IMAGES.filmCraft || IMAGES.gala }
];

const ADDITIONAL_SERVICES = [
  { id: 'staff', label: 'Serving Staff' },
  { id: 'beverage', label: 'Beverage Service' },
  { id: 'decor', label: 'Decor & Table Setup' },
  { id: 'coordination', label: 'Event Coordination' }
];

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
  const [currentStep, setCurrentStep] = useState(1); // 1: Event, 2: Details, 3: Customize, 4: Review

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

  const guestCount = Number(formData.guestCount) || 100;

  const setGuestCount = (val) => {
    setFormData((prev) => ({ ...prev, guestCount: String(val) }));
  };

  const additionalServices = formData.additionalServices || ['Serving Staff', 'Beverage Service'];

  const toggleAdditionalService = (serviceLabel) => {
    const updated = additionalServices.includes(serviceLabel)
      ? additionalServices.filter((s) => s !== serviceLabel)
      : [...additionalServices, serviceLabel];
    setFormData((prev) => ({
      ...prev,
      additionalServices: updated
    }));
  };

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
        .map((d) => `  ${d.title} (${d.serviceStyle || d.category || 'Course'})`)
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
      {/* 1. TOP HEADER & 4-STEP PROGRESS BAR (MATCHING SCREENS 5 & 6)       */}
      {/* ------------------------------------------------------------------ */}
      <div className="inquiry-step-header-wrap">
        <h1 className="inquiry-step-main-title">
          {currentStep === 3 ? 'Customize Your Event' : 'Book an Event'}
        </h1>

        {/* 4-Step Stepper Bar */}
        <div className="inquiry-progress-stepper" role="navigation" aria-label="Booking Steps">
          {[
            { step: 1, label: 'Event' },
            { step: 2, label: 'Details' },
            { step: 3, label: 'Customize' },
            { step: 4, label: 'Review' }
          ].map((item, idx, arr) => (
            <React.Fragment key={item.step}>
              <button
                type="button"
                className={`stepper-node-btn ${currentStep === item.step ? 'active' : ''} ${currentStep > item.step ? 'completed' : ''}`}
                onClick={() => setCurrentStep(item.step)}
              >
                <span className="stepper-circle">
                  {currentStep > item.step ? <Check size={12} strokeWidth={3} /> : item.step}
                </span>
                <span className="stepper-label">{item.label}</span>
              </button>
              {idx < arr.length - 1 && (
                <div className={`stepper-connector ${currentStep > item.step ? 'filled' : ''}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="inquiry-step-content-container">
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
            </div>

            <div className="receipt-actions-row" style={{ marginTop: '20px' }}>
              <button
                type="button"
                className="btn-primary-gold"
                onClick={() => setFormSubmitted(false)}
              >
                <span>Edit / Submit Another Inquiry</span>
              </button>
              <Link to="/courses" className="btn-outline-subtle" style={{ textAlign: 'center' }}>
                <span>Browse Menu Courses</span>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={onFormSubmitWithCleanNotes} className="inquiry-step-form">
            {/* -------------------------------------------------------------- */}
            {/* STEP 1: SELECT EVENT TYPE (SCREEN 5)                           */}
            {/* -------------------------------------------------------------- */}
            {currentStep === 1 && (
              <div className="inquiry-step-panel">
                <section className="inquiry-panel-card">
                  <h2 className="panel-card-heading">Select Event Type</h2>

                  <div className="event-type-tiles-grid">
                    {EVENT_TYPES.map((et) => {
                      const Icon = et.icon;
                      const isSelected = formData.category === et.category || formData.category === et.label;

                      return (
                        <button
                          key={et.id}
                          type="button"
                          className={`event-type-tile ${isSelected ? 'selected' : ''}`}
                          onClick={() => setFormData((prev) => ({ ...prev, category: et.category }))}
                        >
                          <div className="tile-icon-circle">
                            <Icon size={20} />
                          </div>
                          <span className="tile-label">{et.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                <div className="step-nav-actions">
                  <button
                    type="button"
                    className="btn-step-next"
                    onClick={() => setCurrentStep(2)}
                  >
                    <span>Next: Event Details</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------- */}
            {/* STEP 2: EVENT DETAILS & DATE / GUESTS (SCREEN 5)               */}
            {/* -------------------------------------------------------------- */}
            {currentStep === 2 && (
              <div className="inquiry-step-panel">
                <section className="inquiry-panel-card">
                  <h2 className="panel-card-heading">Event Details</h2>

                  {/* Event Date Input */}
                  <div className="inquiry-field-group">
                    <label className="inquiry-field-label" htmlFor="eventDate">
                      Event Date
                    </label>
                    <div className="inquiry-input-with-icon">
                      <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        className="inquiry-text-input"
                        value={formData.eventDate || ''}
                        onChange={handleFormChange}
                        required
                      />
                      <Calendar size={18} className="field-right-icon" />
                    </div>
                  </div>

                  {/* Number of Guests Stepper */}
                  <div className="inquiry-field-group">
                    <label className="inquiry-field-label">Number of Guests</label>
                    <div className="inquiry-stepper-control">
                      <button
                        type="button"
                        className="stepper-circle-btn"
                        onClick={() => setGuestCount(Math.max(10, guestCount - 5))}
                        aria-label="Decrease guest count"
                      >
                        <Minus size={15} />
                      </button>
                      <span className="stepper-count-display">{guestCount}</span>
                      <button
                        type="button"
                        className="stepper-circle-btn"
                        onClick={() => setGuestCount(Math.min(1000, guestCount + 5))}
                        aria-label="Increase guest count"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Venue / City */}
                  <div className="inquiry-field-group">
                    <label className="inquiry-field-label" htmlFor="location">
                      Venue / City Location
                    </label>
                    <div className="inquiry-input-with-icon">
                      <input
                        type="text"
                        id="location"
                        name="location"
                        className="inquiry-text-input"
                        placeholder="e.g. The Oceanview Resort, Vancouver"
                        value={formData.location || ''}
                        onChange={handleFormChange}
                      />
                      <MapPin size={18} className="field-right-icon" />
                    </div>
                  </div>
                </section>

                <div className="step-nav-actions dual">
                  <button
                    type="button"
                    className="btn-step-prev"
                    onClick={() => setCurrentStep(1)}
                  >
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    className="btn-step-next"
                    onClick={() => setCurrentStep(3)}
                  >
                    <span>Next: Customize</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------- */}
            {/* STEP 3: CUSTOMIZE YOUR EVENT (SCREEN 6)                        */}
            {/* -------------------------------------------------------------- */}
            {currentStep === 3 && (
              <div className="inquiry-step-panel">
                <section className="inquiry-panel-card">
                  <h2 className="panel-card-heading">Catering Style</h2>

                  <div className="catering-styles-cards-grid">
                    {CATERING_STYLES.map((cs) => {
                      const isSelected = (formData.serviceStyle || 'plated') === cs.id;

                      return (
                        <button
                          key={cs.id}
                          type="button"
                          className={`catering-style-photo-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => setFormData((prev) => ({ ...prev, serviceStyle: cs.id }))}
                        >
                          <div className="style-card-img-wrap">
                            <img src={cs.image} alt={cs.label} loading="lazy" />
                            {isSelected && (
                              <div className="style-selected-check-badge">
                                <Check size={12} strokeWidth={3} />
                              </div>
                            )}
                          </div>
                          <span className="style-card-title">{cs.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Additional Services Checklist */}
                  <h2 className="panel-card-heading" style={{ marginTop: '20px' }}>
                    Additional Services
                  </h2>
                  <div className="additional-services-list">
                    {ADDITIONAL_SERVICES.map((srv) => {
                      const isChecked = additionalServices.includes(srv.label);

                      return (
                        <label
                          key={srv.id}
                          className={`service-checkbox-row ${isChecked ? 'is-checked' : ''}`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleAdditionalService(srv.label)}
                            className="hidden-checkbox"
                          />
                          <div className="custom-check-box">
                            {isChecked && <Check size={13} strokeWidth={3} color="#FFFFFF" />}
                          </div>
                          <span className="service-row-label">{srv.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </section>

                <div className="step-nav-actions dual">
                  <button
                    type="button"
                    className="btn-step-prev"
                    onClick={() => setCurrentStep(2)}
                  >
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    className="btn-step-next"
                    onClick={() => setCurrentStep(4)}
                  >
                    <span>Next: Review Request</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------- */}
            {/* STEP 4: REVIEW REQUEST & CONTACT INFO (SCREEN 7 LINK)          */}
            {/* -------------------------------------------------------------- */}
            {currentStep === 4 && (
              <div className="inquiry-step-panel">
                {/* Contact Information */}
                <section className="inquiry-panel-card">
                  <h2 className="panel-card-heading">Contact Information</h2>

                  <div className="inquiry-field-group">
                    <label className="inquiry-field-label" htmlFor="fullName">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="inquiry-text-input"
                      placeholder="e.g. Aditya Vishwakarma"
                      value={formData.fullName || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="inquiry-field-group">
                    <label className="inquiry-field-label" htmlFor="email">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="inquiry-text-input"
                      placeholder="aditya@email.com"
                      value={formData.email || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="inquiry-field-group">
                    <label className="inquiry-field-label" htmlFor="phone">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="inquiry-text-input"
                      placeholder="604-555-0199"
                      value={formData.phone || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </section>

                {/* Attached Menu Items & Quotation Preview */}
                <section className="inquiry-panel-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h2 className="panel-card-heading" style={{ margin: 0 }}>
                      Selected Menu ({selectedDishes.length})
                    </h2>
                    <button
                      type="button"
                      className="attached-edit-link"
                      onClick={onOpenMyMenu}
                    >
                      {selectedDishes.length > 0 ? 'Edit Menu' : 'Browse Menu'}
                    </button>
                  </div>

                  {selectedDishes.length > 0 ? (
                    <div className="review-dishes-chips">
                      {selectedDishes.map((dish) => (
                        <span key={dish.id} className="review-dish-chip">
                          <span>{dish.title}</span>
                          <button
                            type="button"
                            className="chip-remove-btn"
                            onClick={() => onToggleDishInMenu && onToggleDishInMenu(dish)}
                            title={`Remove ${dish.title}`}
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontSize: '12px', color: '#7A857E', margin: 0 }}>
                      No dishes selected yet. Chef Michael will propose a customized seasonal menu.
                    </p>
                  )}

                  {/* Dietary Accommodations */}
                  <div style={{ marginTop: '16px' }}>
                    <label className="inquiry-field-label">Dietary Accommodations</label>
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
                </section>

                {/* Quotation Estimate Summary Pill */}
                <div className="inquiry-quotation-summary-card">
                  <div className="quotation-summary-row">
                    <span>Estimated Event Scale:</span>
                    <strong>{guestCount} Guests</strong>
                  </div>
                  <div className="quotation-summary-row">
                    <span>Catering Style:</span>
                    <strong style={{ textTransform: 'capitalize' }}>
                      {formData.serviceStyle || 'Plated'}
                    </strong>
                  </div>
                  <button
                    type="button"
                    className="view-quote-slip-btn"
                    onClick={onOpenQuotationModal}
                  >
                    <Calculator size={14} />
                    <span>View Indicative Quotation Slip</span>
                  </button>
                </div>

                <div className="step-nav-actions dual">
                  <button
                    type="button"
                    className="btn-step-prev"
                    onClick={() => setCurrentStep(3)}
                  >
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>
                  <button type="submit" className="btn-step-submit">
                    <span>Submit Event Request</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
