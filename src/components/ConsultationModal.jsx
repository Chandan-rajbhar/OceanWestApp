import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Utensils,
  X,
  Phone,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Calendar,
  Users,
  Info,
  Sparkles
} from 'lucide-react';
import { CONTACT_INFO } from '../data/cateringData';

export default function ConsultationModal({
  isOpen,
  onClose,
  initialData,
  onApplyConsultation
}) {
  const navigate = useNavigate();

  const [prefDate, setPrefDate] = useState(initialData?.eventDate || '');
  const [eventType, setEventType] = useState(initialData?.category || 'The Grand Wedding Banquet');
  const [guests, setGuests] = useState(initialData?.guestCount || '75');
  const [location, setLocation] = useState(initialData?.location || 'Richmond / Metro Vancouver');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (onApplyConsultation) {
      onApplyConsultation({
        eventDate: prefDate,
        category: eventType,
        guestCount: guests,
        location: location,
        notes: `[Private Chef Consultation & Tasting Request]\nPreferred Consultation/Event Date: ${prefDate || 'Flexible'}\nEvent Program: ${eventType}\nEstimated Guests: ${guests}\nLocation: ${location}${notes ? `\nTasting Notes: ${notes}` : ''}`
      });
    }
    onClose();
    navigate('/inquiry');
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Book Private Chef Consultation & Tasting">
      <div className="modal-content-box consult-modal-card" onClick={e => e.stopPropagation()}>
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
            <Utensils size={24} />
          </div>
          <h3 className="modal-heading">Chef Consultation &amp; Tasting</h3>
          <p className="modal-subtext">
            Request a private 1-on-1 culinary consultation and seasonal tasting session with Executive Chef Michael Thomas.
          </p>
        </div>

        {/* Mandatory Requirement 14 Transparency Notice */}
        <div className="planner-disclaimer" style={{ marginBottom: '18px' }}>
          <Info size={14} style={{ flexShrink: 0 }} />
          <span>
            <strong>Appointment Request:</strong> Submitting this request initiates a preliminary reservation hold. Tastings at our Richmond commissary are confirmed personally by phone or email based on kitchen prep schedules.
          </span>
        </div>

        <form onSubmit={handleSubmitRequest} className="consult-form">
          <div className="form-group">
            <label className="form-label" htmlFor="consultEventType">Event Program</label>
            <select
              id="consultEventType"
              className="form-control"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              <option value="The Grand Wedding Banquet">The Grand Wedding Banquet (Wedding &amp; Reception)</option>
              <option value="The Intimate Gathering">The Intimate Gathering (Micro-Wedding &amp; Estate Dinner)</option>
              <option value="Galas & Executive Summits">Galas &amp; Executive Summits (Corporate RFP)</option>
              <option value="Movie & Film Production">Movie &amp; Film Production Craft Services</option>
              <option value="Party Platters & Casual BBQ">Party Platters &amp; Casual BBQ</option>
            </select>
          </div>

          <div className="form-grid-row">
            <div className="form-group">
              <label className="form-label" htmlFor="consultDate">Preferred Date</label>
              <input
                type="date"
                id="consultDate"
                className="form-control"
                value={prefDate}
                onChange={(e) => setPrefDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="consultGuests">Expected Guests</label>
              <input
                type="number"
                id="consultGuests"
                className="form-control"
                placeholder="e.g. 100"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="consultLocation">Venue / Location</label>
            <input
              type="text"
              id="consultLocation"
              className="form-control"
              placeholder="e.g. Richmond Commissary or Private Venue"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="consultNotes">Tasting Preferences &amp; Vision</label>
            <textarea
              id="consultNotes"
              className="form-control"
              rows={2}
              placeholder="Dishes you would like to sample, dietary sensitivities, or event timing..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="consult-perks-list">
            <div className="consult-perk-row">
              <ShieldCheck size={15} className="consult-perk-icon" />
              <span>Complimentary sommelier wine and course pairing recommendations</span>
            </div>
            <div className="consult-perk-row">
              <MapPin size={15} className="consult-perk-icon" />
              <span>Richmond Commissary: {CONTACT_INFO.commissaryAddress}</span>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary-gold"
            style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
          >
            <span>Proceed with Consultation Request</span>
            <ArrowRight size={15} />
          </button>
        </form>

        <div className="consult-phone-note" style={{ marginTop: '16px' }}>
          <span>Or call Chef Michael directly: </span>
          <a href={`tel:${CONTACT_INFO.directPhone.replace(/-/g, '')}`} className="consult-direct-tel">
            <Phone size={12} style={{ display: 'inline', marginRight: '4px' }} />
            <strong>{CONTACT_INFO.directPhone}</strong>
          </a>
        </div>
      </div>
    </div>
  );
}
