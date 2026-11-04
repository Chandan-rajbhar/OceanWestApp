import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  X,
  Users,
  Calendar,
  MapPin,
  Check,
  ArrowRight,
  Info,
  Clock,
  Sparkles,
  Calculator,
  Utensils
} from 'lucide-react';

export default function EventPlannerModal({
  isOpen,
  onClose,
  initialData,
  onApplyPlan
}) {
  const navigate = useNavigate();

  const [eventType, setEventType] = useState(initialData?.category || 'The Grand Wedding Banquet');
  const [guests, setGuests] = useState(initialData?.guestCount ? parseInt(initialData.guestCount, 10) || 75 : 75);
  const [date, setDate] = useState(initialData?.eventDate || '');
  const [location, setLocation] = useState(initialData?.location || 'Richmond / Metro Vancouver');
  const [serviceStyle, setServiceStyle] = useState(initialData?.serviceStyle || 'plated');

  // Sync when initialData changes
  useEffect(() => {
    if (initialData?.category) setEventType(initialData.category);
    if (initialData?.guestCount) setGuests(parseInt(initialData.guestCount, 10) || 75);
    if (initialData?.eventDate) setDate(initialData.eventDate);
    if (initialData?.location) setLocation(initialData.location);
    if (initialData?.serviceStyle) setServiceStyle(initialData.serviceStyle);
  }, [initialData]);

  if (!isOpen) return null;

  // Real-time calculation of logistics and staffing
  const calculatePlanningSummary = () => {
    let recommendedTier = 'The Grand Wedding Banquet';
    let startingRate = '$140/guest';
    let staffCount = `${Math.max(4, Math.ceil(guests / 22))} Service Waitstaff + 2 Kitchen Leads`;
    let prepHours = '16 Hours Kitchen Prep';
    let keyTip = 'Includes cocktail hour canapés and late-night station.';

    if (eventType === 'The Intimate Gathering' || guests <= 35) {
      recommendedTier = 'The Intimate Gathering';
      startingRate = '$85/guest';
      staffCount = '1 Executive Chef + 1 Dedicated Captain';
      prepHours = '8 Hours Artisanal Prep';
      keyTip = 'Ideal for seated fine dining or private estate cocktail evenings.';
    } else if (eventType === 'Movie & Film Production' || serviceStyle === 'craft services') {
      recommendedTier = 'Movie & Film Production';
      startingRate = 'Daily Call Sheet Rates';
      staffCount = `${Math.max(2, Math.ceil(guests / 40))} Mobile Galley Chefs + Barista`;
      prepHours = 'Continuous 14-Hour Service';
      keyTip = 'Hot truck rolling meal calls & continuous Italian espresso craft.';
    } else if (eventType === 'Galas & Executive Summits' || guests >= 200) {
      recommendedTier = 'Galas & Executive Summits';
      startingRate = 'Custom RFP Tier';
      staffCount = `${Math.ceil(guests / 20)} White-Glove Waitstaff + Senior Captain`;
      prepHours = 'Multi-Course Staged Execution';
      keyTip = 'Synchronized simultaneous dinner service with dedicated VIP table leads.';
    } else if (eventType === 'Party Platters & Casual BBQ' || serviceStyle === 'grazing') {
      recommendedTier = 'Party Platters & BBQs';
      startingRate = 'From $65/guest';
      staffCount = '2 Setup & Grilling Specialists';
      prepHours = '6 Hours Kitchen Prep';
      keyTip = 'Drop-off artisan grazing tables or live wood-fired BBQ stations.';
    }

    return {
      recommendedTier,
      startingRate,
      staffCount,
      prepHours,
      keyTip
    };
  };

  const plan = calculatePlanningSummary();

  const handleApply = (e) => {
    e.preventDefault();
    onApplyPlan({
      category: eventType,
      guestCount: guests.toString(),
      eventDate: date,
      location: location,
      serviceStyle: serviceStyle,
      notesAppended: `[Guided Planner: ${guests} Guests | Location: ${location} | Service Format: ${serviceStyle} | Recommended Tier: ${plan.recommendedTier}]`
    });
    onClose();
    navigate('/inquiry');
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Guided Event Planner">
      <div className="modal-content-box planner-modal-card" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close Event Planner"
        >
          <X size={18} />
        </button>

        <div className="modal-header-centered">
          <div className="modal-icon-badge">
            <Compass size={24} />
          </div>
          <h3 className="modal-heading">Guided Event Planner</h3>
          <p className="modal-subtext">
            Configure your event type, guest attendance, location, and dining format for an instant logistics outline.
          </p>
        </div>

        <form onSubmit={handleApply} className="planner-form">
          {/* 1. Event Category */}
          <div className="form-group">
            <label className="form-label" htmlFor="plannerType">1. Event Type</label>
            <select
              id="plannerType"
              className="form-control"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              <option value="The Grand Wedding Banquet">Wedding Feast &amp; Reception</option>
              <option value="The Intimate Gathering">Intimate Gathering &amp; Micro-Wedding</option>
              <option value="Movie & Film Production">Film &amp; Television Craft Services</option>
              <option value="Galas & Executive Summits">Corporate Gala &amp; Executive Summit</option>
              <option value="Party Platters & Casual BBQ">Party Platters &amp; Casual BBQ</option>
            </select>
          </div>

          {/* 2. Guest Count Slider */}
          <div className="form-group">
            <div className="planner-slider-header">
              <label className="form-label" htmlFor="plannerGuests">2. Expected Guest Attendance</label>
              <span className="planner-guest-count-badge">
                <Users size={12} />
                <strong>{guests} Guests</strong>
              </span>
            </div>
            <input
              type="range"
              id="plannerGuests"
              min="10"
              max="400"
              step="5"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value, 10))}
              className="planner-range-slider"
            />
            <div className="range-labels-row">
              <span>10 (Intimate)</span>
              <span>75 (Micro)</span>
              <span>150 (Wedding)</span>
              <span>400+ (Summit/Film)</span>
            </div>
          </div>

          {/* 3. Date & 4. Location Grid */}
          <div className="form-grid-row">
            <div className="form-group">
              <label className="form-label" htmlFor="plannerDate">3. Target Date</label>
              <input
                type="date"
                id="plannerDate"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="plannerLocation">4. Event Location</label>
              <input
                type="text"
                id="plannerLocation"
                className="form-control"
                placeholder="e.g. Richmond, Squamish, North Vancouver"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* 5. Service Style (plated, buffet, cocktail, grazing, craft services) - Exact match for Feature 2 */}
          <div className="form-group">
            <label className="form-label">5. Service Style</label>
            <div className="style-chips-row">
              {[
                { id: 'plated', label: 'Plated Multi-Course' },
                { id: 'buffet', label: 'Artisanal Hot Buffet' },
                { id: 'cocktail', label: 'Passed Cocktail Canapés' },
                { id: 'grazing', label: 'Artisanal Grazing Table' },
                { id: 'craft services', label: 'Film Craft Services' }
              ].map(st => (
                <button
                  type="button"
                  key={st.id}
                  className={`style-chip-btn ${serviceStyle === st.id ? 'active' : ''}`}
                  onClick={() => setServiceStyle(st.id)}
                >
                  {serviceStyle === st.id && <Check size={12} strokeWidth={3} />}
                  <span>{st.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Logistics Breakdown Card */}
          <div className="planner-results-card">
            <div className="results-card-header">
              <span className="results-card-label">Recommended Program Tier</span>
              <span className="results-card-rate">{plan.startingRate}</span>
            </div>
            <h4 className="results-tier-title">{plan.recommendedTier}</h4>
            
            <div className="results-metrics-grid">
              <div className="results-metric-item">
                <Users size={14} className="results-metric-icon" />
                <div>
                  <span className="results-metric-title">Staffing Ratio</span>
                  <span className="results-metric-value">{plan.staffCount}</span>
                </div>
              </div>
              <div className="results-metric-item">
                <Clock size={14} className="results-metric-icon" />
                <div>
                  <span className="results-metric-title">Service Timeline</span>
                  <span className="results-metric-value">{plan.prepHours}</span>
                </div>
              </div>
            </div>

            <p className="results-tip-text">
              <Sparkles size={13} style={{ color: '#BA8D5B', display: 'inline', marginRight: '6px' }} />
              {plan.keyTip}
            </p>

            <div className="planner-disclaimer">
              <Info size={13} style={{ flexShrink: 0, marginTop: '1px' }} />
              <span>
                Planning aid only. Official proposals and binding quotes are prepared directly by Executive Chef Michael Thomas.
              </span>
            </div>
          </div>

          <button type="submit" className="btn-primary-gold planner-submit-btn">
            <span>Apply Plan &amp; Proceed to Inquiry</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
