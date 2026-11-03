import React, { useState } from 'react';
import { FileText, Download, Check, X, AlertCircle } from 'lucide-react';

export default function PdfGuideModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Catering & Platter Guide">
      <div className="modal-content-box" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close Guide Request"
        >
          <X size={18} />
        </button>

        <div className="modal-header-centered">
          <div className="modal-icon-badge">
            <FileText size={26} />
          </div>
          <h3 className="modal-heading">Catering &amp; Platter Guide</h3>
          <p className="modal-subtext">
            Get our complete package catalog with full seasonal menus, wine pairings, and dietary certifications.
          </p>
        </div>

        {submitted ? (
          <div className="modal-result-box success">
            <Check size={30} style={{ color: '#2F6141', margin: '0 auto 8px' }} />
            <h4 className="result-box-title">Catalog Dispatched!</h4>
            <p className="result-box-msg">
              We have dispatched the Catering &amp; Platter Guide link to <strong>{email}</strong>.
            </p>
            <div className="demo-notice-pill">
              <AlertCircle size={12} />
              <span>Demo simulation: In production, our automated server delivers the PDF packet immediately.</span>
            </div>
            <button
              type="button"
              className="btn-outline-subtle"
              style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '18px' }}>
              <label className="form-label" htmlFor="guideEmail">Your Email Address</label>
              <input
                type="email"
                id="guideEmail"
                className="form-control"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="demo-notice-pill" style={{ marginBottom: '16px' }}>
              <AlertCircle size={12} />
              <span>Free instant download for event planners, couples, and production managers.</span>
            </div>

            <button type="submit" className="btn-submit-inquiry">
              <span>Send Menu Guide Immediately</span>
              <Download size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

