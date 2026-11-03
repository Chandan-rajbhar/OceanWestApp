import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ShieldCheck, X, ArrowRight, AlertCircle } from 'lucide-react';

export default function AvailabilityModal({
  isOpen,
  onClose,
  onApplyDate
}) {
  const [date, setDate] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheck = (e) => {
    e.preventDefault();
    if (!date) return;
    setResult({
      date,
      status: 'AVAILABLE',
      message: `Great news! Chef Michael Thomas currently has open availability for ${date}. Inquire early to secure your date hold.`
    });
  };

  const handleProceed = () => {
    if (result) {
      onApplyDate(result.date);
      onClose();
      navigate('/inquiry');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Check Date Availability">
      <div className="modal-content-box" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close Date Checker"
        >
          <X size={18} />
        </button>

        <div className="modal-header-centered">
          <div className="modal-icon-badge">
            <Calendar size={26} />
          </div>
          <h3 className="modal-heading">Check Date Availability</h3>
          <p className="modal-subtext">
            Enter your prospective event date to check Chef Michael Thomas' calendar.
          </p>
        </div>

        {result ? (
          <div className="modal-result-box success">
            <ShieldCheck size={28} style={{ color: '#2F6141', margin: '0 auto 8px' }} />
            <h4 className="result-box-title">{result.status}</h4>
            <p className="result-box-msg">{result.message}</p>

            <div className="demo-notice-pill">
              <AlertCircle size={12} />
              <span>Demo simulation: Final date reservation is confirmed by deposit with Chef Michael.</span>
            </div>

            <button
              type="button"
              className="btn-primary-gold"
              style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}
              onClick={handleProceed}
            >
              <span>Proceed to Inquire for This Date</span>
              <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <form onSubmit={handleCheck}>
            <div className="form-group" style={{ marginBottom: '18px' }}>
              <label className="form-label" htmlFor="availInputDate">Target Event Date</label>
              <input
                type="date"
                id="availInputDate"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="demo-notice-pill" style={{ marginBottom: '16px' }}>
              <AlertCircle size={12} />
              <span>Checking calendar availability is instantaneous in this web app preview.</span>
            </div>

            <button type="submit" className="btn-submit-inquiry">
              <span>Verify Date Availability</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

