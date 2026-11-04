import React, { useState } from 'react';
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
  Info
} from 'lucide-react';
import { CONTACT_INFO } from '../data/cateringData';

export default function InquiryStatusModal({
  isOpen,
  onClose,
  currentInquiryRef = 'OW-2026-7841'
}) {
  const [refInput, setRefInput] = useState(currentInquiryRef);
  const [searchedRef, setSearchedRef] = useState(currentInquiryRef);

  if (!isOpen) return null;

  const handleLookup = (e) => {
    e.preventDefault();
    if (refInput.trim()) {
      setSearchedRef(refInput.trim().toUpperCase());
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
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Inquiry Status and Client Portal">
      <div className="modal-content-box status-modal-card" onClick={e => e.stopPropagation()}>
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
          <h3 className="modal-heading">Inquiry &amp; Event Status</h3>
          <p className="modal-subtext">
            Track the progression of your catering booking from initial inquiry to event execution.
          </p>
        </div>

        {/* Transparent Disclaimer Box - Requirement 8 */}
        <div className="status-notice-banner">
          <Info size={16} className="status-notice-icon" />
          <div className="status-notice-text">
            <strong>Client Portal Preview:</strong> Status tracking becomes available after consultation confirmation. This interactive view demonstrates how your event timeline is managed. No real backend is connected.
          </div>
        </div>

        {/* Demo Reference Lookup Input */}
        <form onSubmit={handleLookup} className="status-lookup-form">
          <label className="form-label" htmlFor="inquiryRefInput">Reference Code</label>
          <div className="status-input-row">
            <input
              type="text"
              id="inquiryRefInput"
              className="form-control"
              placeholder="e.g. OW-2026-7841"
              value={refInput}
              onChange={(e) => setRefInput(e.target.value)}
            />
            <button type="submit" className="btn-primary-gold" style={{ flexShrink: 0, padding: '0 16px' }}>
              <span>Look Up</span>
            </button>
          </div>
          <span className="ref-hint">Demo Reference: <code>{searchedRef}</code></span>
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
                    {st.status === 'complete' ? 'Completed' : st.status === 'current' ? 'In Progress' : 'Pending'}
                  </span>
                </div>
                <span className="node-date">{st.date}</span>
                <p className="node-desc">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Contacts for Real Confirmation */}
        <div className="status-support-box">
          <h5 className="support-box-title">Need Real-Time Booking Confirmation?</h5>
          <p className="support-box-sub">
            Speak directly with Executive Chef Michael Thomas or our Richmond commissary office:
          </p>
          <div className="support-actions-row">
            <a href={`tel:${CONTACT_INFO.directPhone.replace(/-/g, '')}`} className="btn-outline-subtle support-btn">
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
  );
}

