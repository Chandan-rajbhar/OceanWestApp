import React, { useState } from 'react';
import {
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Radio
} from 'lucide-react';

export default function CustomerSupportModal({
  isOpen,
  onClose,
  showToast
}) {
  const [activeTab, setActiveTab] = useState('direct'); // 'direct' | 'ticket'
  const [ticketData, setTicketData] = useState({
    name: '',
    email: '',
    phone: '',
    referenceCode: '',
    topic: 'Menu Consultation',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketRef, setTicketRef] = useState('');

  if (!isOpen) return null;

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (!ticketData.name || !ticketData.email || !ticketData.message) {
      if (showToast) showToast('Please enter your name, email, and message.', 'info');
      return;
    }

    const generatedTicket = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketRef(generatedTicket);
    setIsSubmitted(true);

    // Save to local storage for persistence
    try {
      const existing = JSON.parse(localStorage.getItem('ow_support_tickets') || '[]');
      existing.push({
        ...ticketData,
        ticketId: generatedTicket,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('ow_support_tickets', JSON.stringify(existing));
    } catch (err) {
      // LocalStorage access fallback
    }

    if (showToast) {
      showToast(`Support query logged as ${generatedTicket}`, 'success');
    }
  };

  const handleResetTicket = () => {
    setIsSubmitted(false);
    setTicketData({
      name: '',
      email: '',
      phone: '',
      referenceCode: '',
      topic: 'Menu Consultation',
      message: ''
    });
  };

  return (
    <div
      className="modal-overlay-backdrop active"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Customer Support and Direct Communication"
    >
      <div
        className="modal-content-box support-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-top-header">
          <div className="modal-title-lockup">
            <span className="modal-kicker">Ocean West Client Concierge</span>
            <h2 className="modal-headline">Customer Support</h2>
          </div>
          <button
            type="button"
            className="modal-close-round-btn"
            onClick={onClose}
            aria-label="Close customer support modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="experiences-tab-nav" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'direct'}
            className={`exp-tab-btn ${activeTab === 'direct' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('direct')}
          >
            <Phone size={14} />
            <span>Direct Hotline &amp; Dispatch</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'ticket'}
            className={`exp-tab-btn ${activeTab === 'ticket' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('ticket')}
          >
            <MessageSquare size={14} />
            <span>Submit Concierge Query</span>
          </button>
        </div>

        {/* Body */}
        <div className="modal-scroll-body support-modal-body">
          {activeTab === 'direct' ? (
            <div className="support-direct-view">
              {/* Direct Call Card */}
              <div className="support-hotline-card">
                <div className="hotline-icon-badge">
                  <Phone size={24} />
                </div>
                <div className="hotline-info">
                  <span className="hotline-tag">Direct Commissary Hotline</span>
                  <a href="tel:6047224857" className="hotline-phone-number">
                    604-722-4857
                  </a>
                  <p className="hotline-desc">
                    Connects directly with Executive Chef Michael Thomas and the Pacific Coast
                    kitchen dispatch team.
                  </p>
                  <div className="hotline-hours">
                    <Clock size={12} />
                    <span>Operating Daily: 6:00 AM – 10:00 PM PST</span>
                  </div>
                </div>
              </div>

              {/* Direct Email Card */}
              <div className="support-hotline-card">
                <div className="hotline-icon-badge">
                  <Mail size={24} />
                </div>
                <div className="hotline-info">
                  <span className="hotline-tag">Inquiries &amp; Menu Revisions</span>
                  <a href="mailto:info@oceanwestcatering.com" className="hotline-email-address">
                    info@oceanwestcatering.com
                  </a>
                  <p className="hotline-desc">
                    For detailed tasting notes, contract queries, and call sheet attachments.
                    Average email turnaround is under 4 business hours.
                  </p>
                </div>
              </div>

              {/* Location Card */}
              <div className="support-hotline-card">
                <div className="hotline-icon-badge">
                  <MapPin size={24} />
                </div>
                <div className="hotline-info">
                  <span className="hotline-tag">Production Kitchen &amp; Tasting Suite</span>
                  <p className="hotline-address">
                    <strong>Ocean West Commissary</strong>
                    <br />
                    11300 River Road, Richmond, BC V6X 1Z5
                  </p>
                  <span className="location-note">
                    By appointment only for confirmed bridal and corporate client tastings.
                  </span>
                </div>
              </div>

              {/* Status Notice about Live Chat & WhatsApp */}
              <div className="channel-transparency-card">
                <div className="channel-header">
                  <AlertCircle size={14} />
                  <span>Channel Integration Status</span>
                </div>
                <ul className="channel-status-list">
                  <li>
                    <span className="channel-dot is-active"></span>
                    <span>
                      <strong>Direct Voice Hotline:</strong> Active &amp; Attended
                    </span>
                  </li>
                  <li>
                    <span className="channel-dot is-active"></span>
                    <span>
                      <strong>Email Concierge:</strong> Active &amp; Attended
                    </span>
                  </li>
                  <li>
                    <span className="channel-dot is-pending"></span>
                    <span>
                      <strong>Automated Web Live Chat:</strong> In development for Phase 2
                    </span>
                  </li>
                  <li>
                    <span className="channel-dot is-pending"></span>
                    <span>
                      <strong>WhatsApp Crew Dispatch:</strong> Reserved for contracted film productions
                    </span>
                  </li>
                  <li>
                    <span className="channel-dot is-pending"></span>
                    <span>
                      <strong>Mobile Push Alerts:</strong> Native SMS alerts trigger upon event dispatch
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="support-ticket-view">
              {isSubmitted ? (
                <div className="ticket-success-card">
                  <CheckCircle2 size={36} className="success-icon" />
                  <h3>Support Query Logged</h3>
                  <div className="ticket-id-pill">
                    <span>Reference #{ticketRef}</span>
                  </div>
                  <p>
                    Thank you, <strong>{ticketData.name}</strong>. Your message regarding{' '}
                    <strong>{ticketData.topic}</strong> has been forwarded to our client concierge and
                    Executive Chef Michael Thomas.
                  </p>
                  <div className="success-turnaround-box">
                    <Clock size={14} />
                    <span>Expected response time: 2 to 4 business hours to {ticketData.email}</span>
                  </div>
                  <button
                    type="button"
                    className="btn-new-ticket"
                    onClick={handleResetTicket}
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitTicket} className="ticket-form">
                  <div className="ticket-form-intro">
                    <p>
                      Have questions regarding a menu draft, dietary requirement, or billing statement?
                      Send a message directly to our commissary desk.
                    </p>
                  </div>

                  <div className="ticket-form-fields">
                    <div className="form-group-field">
                      <label htmlFor="tkt-name" className="field-label-text">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        id="tkt-name"
                        required
                        value={ticketData.name}
                        onChange={(e) => setTicketData({ ...ticketData, name: e.target.value })}
                        placeholder="e.g. Jordan Matthews"
                        className="custom-text-input"
                      />
                    </div>

                    <div className="form-group-field">
                      <label htmlFor="tkt-email" className="field-label-text">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="tkt-email"
                        required
                        value={ticketData.email}
                        onChange={(e) => setTicketData({ ...ticketData, email: e.target.value })}
                        placeholder="e.g. jordan@example.com"
                        className="custom-text-input"
                      />
                    </div>

                    <div className="form-group-field">
                      <label htmlFor="tkt-phone" className="field-label-text">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        id="tkt-phone"
                        value={ticketData.phone}
                        onChange={(e) => setTicketData({ ...ticketData, phone: e.target.value })}
                        placeholder="e.g. 604-555-0199"
                        className="custom-text-input"
                      />
                    </div>

                    <div className="form-group-field">
                      <label htmlFor="tkt-ref" className="field-label-text">
                        Inquiry / Booking Code (Optional)
                      </label>
                      <input
                        type="text"
                        id="tkt-ref"
                        value={ticketData.referenceCode}
                        onChange={(e) =>
                          setTicketData({ ...ticketData, referenceCode: e.target.value.toUpperCase() })
                        }
                        placeholder="e.g. OW-2026-7841"
                        className="custom-text-input uppercase-text"
                      />
                    </div>

                    <div className="form-group-field">
                      <label htmlFor="tkt-topic" className="field-label-text">
                        Inquiry Topic *
                      </label>
                      <select
                        id="tkt-topic"
                        value={ticketData.topic}
                        onChange={(e) => setTicketData({ ...ticketData, topic: e.target.value })}
                        className="custom-select-input"
                      >
                        <option value="Menu Consultation">Menu Consultation &amp; Tasting</option>
                        <option value="Date Availability">Event Date Availability &amp; Hold</option>
                        <option value="Dietary Question">Severe Allergy &amp; Dietary Protocol</option>
                        <option value="Invoice & Billing">Invoicing, Deposit &amp; Payment</option>
                        <option value="Film Craft Logistics">Film Production Daily Call Sheets</option>
                        <option value="Urgent Assistance">Urgent Day-Of Event Assistance</option>
                      </select>
                    </div>

                    <div className="form-group-field">
                      <label htmlFor="tkt-msg" className="field-label-text">
                        Your Message *
                      </label>
                      <textarea
                        id="tkt-msg"
                        required
                        rows={4}
                        value={ticketData.message}
                        onChange={(e) => setTicketData({ ...ticketData, message: e.target.value })}
                        placeholder="Describe your question or requirement in detail..."
                        className="custom-textarea-input"
                      />
                    </div>
                  </div>

                  <div className="ticket-form-footer">
                    <button type="submit" className="btn-submit-ticket">
                      <Send size={15} />
                      <span>Send Message to Concierge</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-bottom-footer-bar">
          <div className="footer-disclaimer-text">
            <span>Direct Line: 604-722-4857 • Ocean West Commissary, Richmond BC</span>
          </div>
          <button type="button" className="footer-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

