import React, { useState } from 'react';
import {
  ArrowLeft,
  X,
  Search,
  Calendar,
  Users,
  MapPin,
  CheckCircle2,
  Clock,
  ChevronRight,
  Info
} from 'lucide-react';
import { IMAGES } from '../data/cateringData';

export default function InquiryStatusModal({
  isOpen,
  onClose,
  currentInquiryRef = 'OW-2026-7841',
  showToast
}) {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);

  if (!isOpen) return null;

  const UPCOMING_BOOKINGS = [
    {
      id: 'book-1',
      title: 'Wedding Catering',
      date: 'Sat, 24 Jan 2026',
      guests: '100 Guests',
      location: 'The Oceanview Resort, Vancouver',
      status: 'Confirmed',
      statusType: 'confirmed',
      image: IMAGES.wedding,
      refCode: 'OW-2026-7841',
      stages: [
        { name: 'Request', completed: true },
        { name: 'Quote', completed: true },
        { name: 'Payment', completed: true },
        { name: 'Prep', completed: true },
        { name: 'Event', completed: false, current: true }
      ],
      menuHighlights: 'Seared Scallops, Prime Angus Medallions, Artisan Pastry Display',
      depositPaid: '$3,268.13 CAD (25%)'
    },
    {
      id: 'book-2',
      title: 'Corporate Event',
      date: 'Tue, 10 Feb 2026',
      guests: '50 Guests',
      location: 'Fairmont Pacific Rim, Vancouver',
      status: 'Under Review',
      statusType: 'under-review',
      image: IMAGES.gala,
      refCode: 'OW-2026-9042',
      stages: [
        { name: 'Request', completed: true },
        { name: 'Quote', completed: false, current: true },
        { name: 'Payment', completed: false },
        { name: 'Prep', completed: false },
        { name: 'Event', completed: false }
      ],
      menuHighlights: 'Artisanal Charcuterie, Wild Sockeye Platter, Okanagan Wine Service',
      depositPaid: 'Pending Quote Approval'
    }
  ];

  const PAST_BOOKINGS = [
    {
      id: 'past-1',
      title: 'Private Executive Tasting',
      date: '15 Nov 2025',
      guests: '16 Guests',
      location: 'Private Villa, Whistler',
      status: 'Completed',
      statusType: 'completed',
      image: IMAGES.platter,
      refCode: 'OW-2025-4120',
      stages: [
        { name: 'Request', completed: true },
        { name: 'Quote', completed: true },
        { name: 'Payment', completed: true },
        { name: 'Prep', completed: true },
        { name: 'Event', completed: true }
      ]
    }
  ];

  const bookingsList = activeTab === 'upcoming' ? UPCOMING_BOOKINGS : PAST_BOOKINGS;
  const filteredBookings = bookingsList.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.refCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="modal-overlay-backdrop active"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="My Bookings"
    >
      <div
        className="modal-content-box my-bookings-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Screen 9 Top Bar */}
        <div className="bookings-sheet-top-bar">
          <button
            type="button"
            className="sheet-back-icon-btn"
            onClick={onClose}
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </button>
          <h2 className="bookings-sheet-title">My Bookings</h2>
          <button
            type="button"
            className="sheet-search-icon-btn"
            onClick={() => {
              const el = document.getElementById('bookingSearchInput');
              if (el) el.focus();
            }}
            aria-label="Search Bookings"
          >
            <Search size={18} />
          </button>
        </div>

        {/* Filter Tabs: Upcoming (2) | Past (5) */}
        <div className="bookings-filter-tabs-strip">
          <button
            type="button"
            className={`booking-tab-pill ${activeTab === 'upcoming' ? 'is-active' : ''}`}
            onClick={() => {
              setActiveTab('upcoming');
              setSelectedBookingDetails(null);
            }}
          >
            Upcoming (2)
          </button>
          <button
            type="button"
            className={`booking-tab-pill ${activeTab === 'past' ? 'is-active' : ''}`}
            onClick={() => {
              setActiveTab('past');
              setSelectedBookingDetails(null);
            }}
          >
            Past (5)
          </button>
        </div>

        <div className="bookings-sheet-scrollable">
          {/* Detailed Modal view if clicked "View Details" or "Track Event" */}
          {selectedBookingDetails ? (
            <div className="booking-deep-detail-card">
              <div className="deep-detail-header">
                <div>
                  <span className="booking-ref-badge">{selectedBookingDetails.refCode}</span>
                  <h3 className="deep-detail-title">{selectedBookingDetails.title}</h3>
                </div>
                <button
                  type="button"
                  className="btn-back-to-cards"
                  onClick={() => setSelectedBookingDetails(null)}
                >
                  Close Details
                </button>
              </div>

              <div className="deep-detail-meta">
                <p><strong>Date:</strong> {selectedBookingDetails.date}</p>
                <p><strong>Scale:</strong> {selectedBookingDetails.guests}</p>
                <p><strong>Venue:</strong> {selectedBookingDetails.location}</p>
                <p><strong>Deposit Status:</strong> {selectedBookingDetails.depositPaid}</p>
                <p><strong>Menu Highlights:</strong> {selectedBookingDetails.menuHighlights}</p>
              </div>

              <div className="deep-detail-notice">
                <Info size={14} />
                <span>Executive Chef Michael Thomas and the Pacific dispatch crew are assigned to this event.</span>
              </div>
            </div>
          ) : null}

          {/* Cards List */}
          <div className="bookings-cards-stack">
            {filteredBookings.map((b) => (
              <div key={b.id} className="screen9-booking-card">
                {/* Photo & Badge */}
                <div className="booking-card-media-wrap">
                  <img src={b.image} alt={b.title} className="booking-card-photo" />
                  <span className={`booking-status-badge ${b.statusType}`}>
                    {b.status}
                  </span>
                </div>

                {/* Content */}
                <div className="booking-card-body">
                  <h3 className="booking-title">{b.title}</h3>
                  <div className="booking-sub-meta-row">
                    <span className="booking-meta-item">
                      <Calendar size={12} />
                      <span>{b.date}</span>
                    </span>
                    <span className="booking-meta-sep">•</span>
                    <span className="booking-meta-item">
                      <Users size={12} />
                      <span>{b.guests}</span>
                    </span>
                  </div>

                  <div className="booking-location-row">
                    <MapPin size={12} />
                    <span>{b.location}</span>
                  </div>

                  {/* 5-Step Tracker: Request -> Quote -> Payment -> Prep -> Event */}
                  <div className="booking-tracker-container">
                    <div className="tracker-steps-row">
                      {b.stages.map((st, i) => (
                        <React.Fragment key={st.name}>
                          <div className={`tracker-step-node ${st.completed ? 'is-complete' : ''} ${st.current ? 'is-current' : ''}`}>
                            <div className="tracker-dot">
                              {st.completed ? <span className="inner-dot-check" /> : null}
                            </div>
                            <span className="tracker-node-label">{st.name}</span>
                          </div>
                          {i < b.stages.length - 1 && (
                            <div className={`tracker-connector-line ${st.completed ? 'is-complete' : ''}`} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Actions: View Details / Track Event */}
                  <div className="booking-card-actions-row">
                    <button
                      type="button"
                      className="btn-booking-view-details"
                      onClick={() => setSelectedBookingDetails(b)}
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      className="btn-booking-track-event"
                      onClick={() => {
                        setSelectedBookingDetails(b);
                        if (showToast) showToast(`Live tracking for ${b.title} active`);
                      }}
                    >
                      Track Event
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
