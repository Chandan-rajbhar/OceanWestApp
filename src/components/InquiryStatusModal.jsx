import React, { useState, useEffect } from 'react';
import {
  Clock,
  X,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Phone,
  Mail,
  User,
  ArrowRight,
  Info,
  Star,
  ChefHat,
  Users2,
  MessageSquare,
  Send
} from 'lucide-react';
import { CONTACT_INFO, CHEF_PROFILE } from '../data/cateringData';

export default function InquiryStatusModal({
  isOpen,
  onClose,
  currentInquiryRef = 'OW-2026-7841',
  showToast
}) {
  const [activeTab, setActiveTab] = useState('timeline'); // 'timeline' | 'team' | 'feedback'
  const [refInput, setRefInput] = useState(currentInquiryRef);
  const [searchedRef, setSearchedRef] = useState(currentInquiryRef);

  // Feedback form state
  const [rating, setRating] = useState(5);
  const [foodRating, setFoodRating] = useState(5);
  const [serviceRating, setServiceRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    // Check if feedback already submitted for this reference
    try {
      const existingReviews = JSON.parse(localStorage.getItem('ow_client_reviews') || '{}');
      if (existingReviews[searchedRef]) {
        setFeedbackSubmitted(true);
      } else {
        setFeedbackSubmitted(false);
      }
    } catch (e) {}
  }, [searchedRef]);

  if (!isOpen) return null;

  const handleLookup = (e) => {
    e.preventDefault();
    if (refInput.trim()) {
      setSearchedRef(refInput.trim().toUpperCase());
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    try {
      const existingReviews = JSON.parse(localStorage.getItem('ow_client_reviews') || '{}');
      existingReviews[searchedRef] = {
        rating,
        foodRating,
        serviceRating,
        reviewText,
        submittedAt: new Date().toISOString()
      };
      localStorage.setItem('ow_client_reviews', JSON.stringify(existingReviews));
    } catch (err) {}

    setFeedbackSubmitted(true);
    if (showToast) {
      showToast('Thank you! Your feedback has been recorded.', 'success');
    }
  };

  const STAGES = [
    {
      num: 1,
      title: 'Inquiry Submitted',
      date: 'Logged via Web Portal',
      status: 'complete',
      desc: 'Event specifications and culinary preferences received.'
    },
    {
      num: 2,
      title: 'Chef Michael Review & Date Hold',
      date: 'Within 24 Hours',
      status: 'complete',
      desc: 'Calendar availability verified; provisional date hold placed.'
    },
    {
      num: 3,
      title: 'Direct Consultation & Tasting',
      date: 'In Progress (Demo State)',
      status: 'current',
      desc: 'Menu tasting scheduled at Richmond Commissary; wine pairings tailored.'
    },
    {
      num: 4,
      title: 'Custom Proposal & Contract',
      date: 'Pending Tasting',
      status: 'upcoming',
      desc: 'Itemized culinary proposal and guaranteed booking deposit.'
    },
    {
      num: 5,
      title: 'Event-Day Culinary Execution',
      date: 'Event Date',
      status: 'upcoming',
      desc: 'Executive chef on-site arrival, mobile galley setup, and white-glove service.'
    },
    {
      num: 6,
      title: 'Post-Event Concierge Follow-up',
      date: '48 Hours Post-Event',
      status: 'upcoming',
      desc: 'Quality assurance review and final invoice reconciliation.'
    }
  ];

  return (
    <div
      className="modal-overlay active"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Inquiry Status and Client Portal"
    >
      <div className="modal-content-box status-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close Status Modal"
        >
          <X size={18} />
        </button>

        <div className="modal-header-centered">
          <div className="modal-icon-badge">
            <Clock size={22} />
          </div>
          <h3 className="modal-heading">Inquiry &amp; Booking Status</h3>
          <p className="modal-subtext">
            Track your catering journey from initial intake through culinary execution.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="experiences-tab-nav" role="tablist" style={{ marginTop: '12px' }}>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'timeline'}
            className={`exp-tab-btn ${activeTab === 'timeline' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            <Clock size={13} />
            <span>Timeline</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'team'}
            className={`exp-tab-btn ${activeTab === 'team' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            <Users2 size={13} />
            <span>Assigned Team</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'feedback'}
            className={`exp-tab-btn ${activeTab === 'feedback' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('feedback')}
          >
            <Star size={13} />
            <span>Review &amp; Feedback</span>
          </button>
        </div>

        <div className="modal-scroll-body" style={{ maxHeight: 'calc(100% - 150px)', overflowY: 'auto' }}>
          {activeTab === 'timeline' && (
            <>
              {/* Transparent Disclaimer Box */}
              <div className="status-notice-banner">
                <Info size={16} className="status-notice-icon" />
                <div className="status-notice-text">
                  <strong>Client Portal Preview:</strong> Live tracking and truck dispatch updates
                  activate after contract execution. This interactive view demonstrates our 6-stage
                  intake workflow.
                </div>
              </div>

              {/* Reference Lookup Input */}
              <form onSubmit={handleLookup} className="status-lookup-form">
                <label className="form-label" htmlFor="inquiryRefInput">
                  Inquiry Reference Code
                </label>
                <div className="status-input-row">
                  <input
                    type="text"
                    id="inquiryRefInput"
                    className="form-control"
                    placeholder="e.g. OW-2026-7841"
                    value={refInput}
                    onChange={(e) => setRefInput(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn-primary-gold"
                    style={{ flexShrink: 0, padding: '0 16px' }}
                  >
                    <span>Look Up</span>
                  </button>
                </div>
                <span className="ref-hint">
                  Active Reference: <code>{searchedRef}</code>
                </span>
              </form>

              {/* Timeline Progression */}
              <div className="status-timeline">
                {STAGES.map((st) => (
                  <div key={st.num} className={`status-timeline-node ${st.status}`}>
                    <div className="timeline-node-marker">
                      {st.status === 'complete' && <CheckCircle2 size={16} />}
                      {st.status === 'current' && <span className="pulsing-dot" />}
                      {st.status === 'upcoming' && <span className="future-num">{st.num}</span>}
                    </div>
                    <div className="timeline-node-content">
                      <div className="timeline-node-header">
                        <h4 className="node-title">{st.title}</h4>
                        <span className={`node-badge ${st.status}`}>
                          {st.status === 'complete'
                            ? 'Completed'
                            : st.status === 'current'
                            ? 'In Progress'
                            : 'Pending'}
                        </span>
                      </div>
                      <span className="node-date">{st.date}</span>
                      <p className="node-desc">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'team' && (
            <div className="assigned-team-view">
              <div className="status-notice-banner">
                <ShieldCheck size={16} className="status-notice-icon" />
                <div className="status-notice-text">
                  Your event is assigned to our dedicated culinary director and senior concierge
                  lead.
                </div>
              </div>

              <div className="team-member-card">
                <div className="team-member-avatar">
                  <ChefHat size={24} />
                </div>
                <div className="team-member-info">
                  <span className="team-role">Culinary Director &amp; Executive Chef</span>
                  <h4 className="team-name">Chef Michael Thomas</h4>
                  <p className="team-desc">
                    Oversees menu composition, provenance sourcing, allergen segregation, and on-site
                    culinary execution.
                  </p>
                  <div className="team-contact-link">
                    <Phone size={12} />
                    <a href="tel:6047224857">604-722-4857 (Commissary Direct)</a>
                  </div>
                </div>
              </div>

              <div className="team-member-card">
                <div className="team-member-avatar">
                  <Users2 size={24} />
                </div>
                <div className="team-member-info">
                  <span className="team-role">Lead Event Concierge &amp; Logistics</span>
                  <h4 className="team-name">Sarah Lindqvist</h4>
                  <p className="team-desc">
                    Coordinates rentals, table styling, floor plan flow, and timeline pacing with your
                    event planner.
                  </p>
                  <div className="team-contact-link">
                    <Mail size={12} />
                    <a href="mailto:info@oceanwestcatering.com">info@oceanwestcatering.com</a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="event-feedback-view">
              {feedbackSubmitted ? (
                <div className="ticket-success-card">
                  <CheckCircle2 size={36} className="success-icon" />
                  <h3>Feedback Received!</h3>
                  <p>
                    Thank you for rating your Ocean West Catering experience for booking{' '}
                    <strong>{searchedRef}</strong>. Chef Michael and our service team review all
                    client ratings to continually refine our Pacific Northwest culinary standard.
                  </p>
                  <button
                    type="button"
                    className="btn-new-ticket"
                    onClick={() => setFeedbackSubmitted(false)}
                  >
                    Edit Review
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="feedback-form">
                  <div className="feedback-form-intro">
                    <h4>Client Experience Rating</h4>
                    <p>
                      Share your thoughts on food presentation, flavor profile, and staff service for
                      reference <strong>{searchedRef}</strong>.
                    </p>
                  </div>

                  <div className="rating-row-block">
                    <label className="rating-label">Overall Experience:</label>
                    <div className="star-rating-buttons">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`star-btn ${star <= rating ? 'is-lit' : ''}`}
                          onClick={() => setRating(star)}
                        >
                          <Star size={20} fill={star <= rating ? '#BA8D5B' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rating-row-block">
                    <label className="rating-label">Culinary Flavor &amp; Plating:</label>
                    <div className="star-rating-buttons">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`star-btn ${star <= foodRating ? 'is-lit' : ''}`}
                          onClick={() => setFoodRating(star)}
                        >
                          <Star size={18} fill={star <= foodRating ? '#BA8D5B' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rating-row-block">
                    <label className="rating-label">Staff Punctuality &amp; Hospitality:</label>
                    <div className="star-rating-buttons">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`star-btn ${star <= serviceRating ? 'is-lit' : ''}`}
                          onClick={() => setServiceRating(star)}
                        >
                          <Star size={18} fill={star <= serviceRating ? '#BA8D5B' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group-field" style={{ marginTop: '14px' }}>
                    <label htmlFor="feedback-comment" className="field-label-text">
                      Detailed Comments / Commendations:
                    </label>
                    <textarea
                      id="feedback-comment"
                      rows={3}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Tell us what your guests enjoyed most about the meal or service..."
                      className="custom-textarea-input"
                    />
                  </div>

                  <button type="submit" className="btn-submit-ticket" style={{ marginTop: '12px' }}>
                    <Send size={14} />
                    <span>Submit Client Review</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Direct Contacts for Real Confirmation */}
          <div className="status-support-box" style={{ marginTop: '20px' }}>
            <h5 className="support-box-title">Need Real-Time Booking Confirmation?</h5>
            <p className="support-box-sub">
              Speak directly with Executive Chef Michael Thomas or our Richmond commissary office:
            </p>
            <div className="support-actions-row">
              <a
                href={`tel:${CONTACT_INFO.directPhone.replace(/-/g, '')}`}
                className="btn-outline-subtle support-btn"
              >
                <Phone size={14} />
                <span>{CONTACT_INFO.directPhone}</span>
              </a>
              <a href={`mailto:${CONTACT_INFO.email}`} className="btn-outline-subtle support-btn">
                <Mail size={14} />
                <span>Email Office</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
