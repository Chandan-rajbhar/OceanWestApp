import React from 'react';
import { Phone, Mail, MapPin, Clock, X, ExternalLink, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../data/cateringData';

export default function ContactShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Contact Shortcuts">
      <div className="modal-content-box contact-shortcuts-card" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close Contact Sheet"
        >
          <X size={18} />
        </button>

        <div className="modal-header-centered">
          <div className="modal-icon-badge">
            <Phone size={24} />
          </div>
          <h3 className="modal-heading">Direct Contact Shortcuts</h3>
          <p className="modal-subtext">
            Fast one-tap communication with Chef Michael Thomas &amp; the Ocean West Commissary team.
          </p>
        </div>

        <div className="contact-shortcuts-stack">
          {/* Direct Chef Phone */}
          <a href={`tel:${CONTACT_INFO.directPhone.replace(/-/g, '')}`} className="contact-action-tile highlight">
            <div className="action-tile-icon-box">
              <Phone size={18} />
            </div>
            <div className="action-tile-text">
              <div className="action-tile-label">Call Chef Michael Direct</div>
              <div className="action-tile-value">{CONTACT_INFO.directPhone}</div>
              <div className="action-tile-desc">Immediate date inquiries &amp; urgent call-backs</div>
            </div>
            <ExternalLink size={16} className="action-tile-arrow" />
          </a>

          {/* Commissary Office */}
          <a href={`tel:${CONTACT_INFO.officePhone.replace(/-/g, '')}`} className="contact-action-tile">
            <div className="action-tile-icon-box">
              <Clock size={18} />
            </div>
            <div className="action-tile-text">
              <div className="action-tile-label">Richmond Kitchen Office</div>
              <div className="action-tile-value">{CONTACT_INFO.officePhone}</div>
              <div className="action-tile-desc">Mon–Fri 8:00 AM – 6:00 PM PST</div>
            </div>
            <ExternalLink size={16} className="action-tile-arrow" />
          </a>

          {/* Email */}
          <a href={`mailto:${CONTACT_INFO.email}`} className="contact-action-tile">
            <div className="action-tile-icon-box">
              <Mail size={18} />
            </div>
            <div className="action-tile-text">
              <div className="action-tile-label">Email Catering Inquiries</div>
              <div className="action-tile-value">{CONTACT_INFO.email}</div>
              <div className="action-tile-desc">24-hour turnaround on formal RFPs</div>
            </div>
            <ExternalLink size={16} className="action-tile-arrow" />
          </a>

          {/* Maps / Directions */}
          <a
            href={CONTACT_INFO.mapsQuery}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-action-tile"
          >
            <div className="action-tile-icon-box">
              <MapPin size={18} />
            </div>
            <div className="action-tile-text">
              <div className="action-tile-label">Directions to Commissary</div>
              <div className="action-tile-value">{CONTACT_INFO.commissaryAddress}</div>
              <div className="action-tile-desc">Open in Google Maps / Apple Maps</div>
            </div>
            <ExternalLink size={16} className="action-tile-arrow" />
          </a>
        </div>

        <div className="contact-shortcuts-footer-note">
          <ShieldCheck size={14} style={{ color: '#2F6141', flexShrink: 0 }} />
          <span>Vancouver Coastal Health 100% Certified Commercial Kitchen Facility.</span>
        </div>
      </div>
    </div>
  );
}

