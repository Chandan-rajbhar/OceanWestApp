import React, { useState } from 'react';
import {
  ArrowLeft,
  X,
  Phone,
  MessageSquare,
  MessageCircle,
  Paperclip,
  CheckCircle2,
  Send,
  Clock
} from 'lucide-react';

export default function CustomerSupportModal({
  isOpen,
  onClose,
  showToast
}) {
  const [selectedBooking, setSelectedBooking] = useState('Wedding Catering - 24 Jan 2026');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachedFileName, setAttachedFileName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketRef, setTicketRef] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFileName(e.target.files[0].name);
      if (showToast) showToast(`Attached: ${e.target.files[0].name}`);
    }
  };

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      if (showToast) showToast('Please enter both subject and message.', 'info');
      return;
    }

    const generatedId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketRef(generatedId);
    setIsSubmitted(true);

    try {
      const existing = JSON.parse(localStorage.getItem('ow_support_tickets') || '[]');
      existing.push({
        ticketId: generatedId,
        booking: selectedBooking,
        subject,
        message,
        attachedFileName,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('ow_support_tickets', JSON.stringify(existing));
    } catch (err) {}

    if (showToast) {
      showToast(`Support ticket ${generatedId} submitted!`, 'success');
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubject('');
    setMessage('');
    setAttachedFileName('');
  };

  return (
    <div
      className="modal-overlay-backdrop active"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Support & Help"
    >
      <div
        className="modal-content-box support-help-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Screen 10 Top Bar */}
        <div className="support-sheet-top-bar">
          <button
            type="button"
            className="sheet-back-icon-btn"
            onClick={onClose}
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </button>
          <h2 className="support-sheet-title">Support &amp; Help</h2>
          <button
            type="button"
            className="sheet-close-icon-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="support-sheet-scrollable">
          <p className="support-sheet-subtext">
            We're here to make your event seamless.
          </p>

          {/* 3 Quick Contact Tiles */}
          <div className="support-quick-contact-grid">
            {/* Tile 1: Chat */}
            <button
              type="button"
              className="support-contact-tile"
              onClick={() => {
                if (showToast) showToast('Live concierge chat connecting...');
              }}
            >
              <div className="contact-tile-icon-wrap">
                <MessageSquare size={18} />
              </div>
              <span className="contact-tile-title">Chat</span>
              <span className="contact-tile-sub">Message us</span>
            </button>

            {/* Tile 2: WhatsApp */}
            <a
              href="https://wa.me/16047224857"
              target="_blank"
              rel="noopener noreferrer"
              className="support-contact-tile"
            >
              <div className="contact-tile-icon-wrap whatsapp">
                <MessageCircle size={18} />
              </div>
              <span className="contact-tile-title">WhatsApp</span>
              <span className="contact-tile-sub">Quick chat</span>
            </a>

            {/* Tile 3: Call Us */}
            <a href="tel:16045550199" className="support-contact-tile">
              <div className="contact-tile-icon-wrap phone">
                <Phone size={18} />
              </div>
              <span className="contact-tile-title">Call Us</span>
              <span className="contact-tile-sub">+1 604 555 0199</span>
            </a>
          </div>

          {/* Form: Create a Support Ticket */}
          <div className="support-ticket-form-card">
            <h3 className="ticket-form-headline">Create a Support Ticket</h3>

            {isSubmitted ? (
              <div className="ticket-submitted-success">
                <CheckCircle2 size={36} className="ticket-check-icon" />
                <h4>Ticket #{ticketRef} Created</h4>
                <p>
                  Our dedicated event manager and Chef Michael Thomas will follow up within 2 to 4 business hours.
                </p>
                <button
                  type="button"
                  className="btn-create-another-ticket"
                  onClick={handleReset}
                >
                  Create Another Ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitTicket} className="support-ticket-form">
                {/* Related Booking Dropdown */}
                <div className="support-form-field">
                  <label htmlFor="supportBookingSelect">Related Booking (Optional)</label>
                  <select
                    id="supportBookingSelect"
                    className="support-select-input"
                    value={selectedBooking}
                    onChange={(e) => setSelectedBooking(e.target.value)}
                  >
                    <option value="Wedding Catering - 24 Jan 2026">
                      Wedding Catering – 24 Jan 2026
                    </option>
                    <option value="Corporate Event - 10 Feb 2026">
                      Corporate Event – 10 Feb 2026
                    </option>
                    <option value="General Inquiry / Future Event">
                      General Inquiry / Future Event
                    </option>
                  </select>
                </div>

                {/* Subject */}
                <div className="support-form-field">
                  <label htmlFor="supportSubjectInput">Subject</label>
                  <input
                    type="text"
                    id="supportSubjectInput"
                    className="support-text-input"
                    placeholder="Menu Modification"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>

                {/* Message */}
                <div className="support-form-field">
                  <label htmlFor="supportMessageInput">Message</label>
                  <textarea
                    id="supportMessageInput"
                    className="support-textarea-input"
                    placeholder="I would like to add a vegetarian option to our menu."
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                {/* File Attachment */}
                <div className="support-form-field">
                  <label className="btn-attach-file-label">
                    <Paperclip size={14} />
                    <span>{attachedFileName ? attachedFileName : 'Attach File (Optional)'}</span>
                    <input
                      type="file"
                      className="sr-only-input"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn-submit-support-ticket">
                  <span>Submit Ticket</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
