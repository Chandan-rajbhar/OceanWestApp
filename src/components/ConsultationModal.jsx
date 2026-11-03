import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, X, Phone, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

export default function ConsultationModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Book Private Consultation">
      <div className="modal-content-box" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close Consultation Modal"
        >
          <X size={18} />
        </button>

        <div className="modal-header-centered">
          <div className="modal-icon-badge">
            <Utensils size={26} />
          </div>
          <h3 className="modal-heading">Private Chef Consultation</h3>
          <p className="modal-subtext">
            Direct tasting and coordination session with Executive Chef Michael Thomas at our Richmond Commissary Kitchen.
          </p>
        </div>

        <div className="consult-body-content">
          <p className="consult-desc-text">
            We invite clients planning weddings over 50 guests or corporate events over 100 guests to sample seasonal courses, discuss dietary accommodations, and review styling mockups in person.
          </p>

          <div className="consult-perks-list">
            <div className="consult-perk-row">
              <ShieldCheck size={16} className="consult-perk-icon" />
              <span>Dedicated 1-on-1 tasting flight with wine pairings</span>
            </div>
            <div className="consult-perk-row">
              <MapPin size={16} className="consult-perk-icon" />
              <span>Richmond Commissary: 482 Panorama, Richmond, BC</span>
            </div>
          </div>

          <button
            type="button"
            className="btn-primary-gold"
            style={{ width: '100%', justifyContent: 'center', marginBottom: '14px' }}
            onClick={() => {
              onClose();
              navigate('/inquiry');
            }}
          >
            <span>Submit Consultation Request Form</span>
            <ArrowRight size={15} />
          </button>

          <div className="consult-phone-note">
            <span>Or call Chef Michael directly: </span>
            <a href="tel:6047224857" className="consult-direct-tel">
              <Phone size={12} style={{ display: 'inline', marginRight: '4px' }} />
              <strong>604-722-4857</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

