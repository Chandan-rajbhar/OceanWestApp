import React, { useState } from 'react';
import {
  X,
  ArrowLeft,
  Bell,
  CheckCircle2,
  CreditCard,
  FileText,
  Calendar,
  Tag,
  Clock,
  Sparkles
} from 'lucide-react';

const NOTIFICATIONS_DATA = [
  {
    id: 1,
    type: 'booking',
    title: 'Booking Confirmed',
    message: 'Your Wedding Catering on 24 Jan 2026 is confirmed.',
    time: '2m ago',
    icon: CheckCircle2,
    iconColor: '#3A7D44',
    iconBg: '#E8F5E9'
  },
  {
    id: 2,
    type: 'payment',
    title: 'Payment Received',
    message: 'Advance payment of CAD $3,268.13 has been received.',
    time: '1h ago',
    icon: CreditCard,
    iconColor: '#2E7D32',
    iconBg: '#E8F5E9'
  },
  {
    id: 3,
    type: 'booking',
    title: 'Quote Ready',
    message: 'Your quotation #Q-1084 is ready for review.',
    time: '3h ago',
    icon: FileText,
    iconColor: '#BA8D5B',
    iconBg: '#FDF7EE'
  },
  {
    id: 4,
    type: 'booking',
    title: 'Event Update',
    message: 'Preparation for your event has started.',
    time: 'Yesterday',
    icon: Calendar,
    iconColor: '#280829',
    iconBg: '#F6EBF7'
  },
  {
    id: 5,
    type: 'offers',
    title: 'Special Offer',
    message: 'Get 10% off on private dining bookings this month!',
    time: '2 days ago',
    icon: Tag,
    iconColor: '#C05621',
    iconBg: '#FEEBC8'
  }
];

export default function NotificationsModal({ isOpen, onClose }) {
  const [activeFilter, setActiveFilter] = useState('all');

  if (!isOpen) return null;

  const filtered = activeFilter === 'all'
    ? NOTIFICATIONS_DATA
    : NOTIFICATIONS_DATA.filter((n) => n.type === activeFilter);

  return (
    <div
      className="modal-overlay-backdrop active"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Notifications"
      style={{ zIndex: 1100 }}
    >
      <div
        className="modal-content-box notifications-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="modal-top-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              className="modal-back-arrow-btn"
              onClick={onClose}
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>
            <h2 className="modal-headline" style={{ margin: 0, fontSize: '1.25rem' }}>
              Notifications
            </h2>
          </div>
          <button
            type="button"
            className="modal-close-round-btn"
            onClick={onClose}
            aria-label="Close notifications"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter Chips Bar */}
        <div className="notif-filter-chips-row">
          {['all', 'booking', 'payment', 'offers'].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`notif-filter-pill ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="modal-scroll-body notif-list-body">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="notif-item-card">
                <div
                  className="notif-icon-circle"
                  style={{ backgroundColor: item.iconBg, color: item.iconColor }}
                >
                  <Icon size={18} />
                </div>
                <div className="notif-content-lockup">
                  <div className="notif-header-line">
                    <h4 className="notif-item-title">{item.title}</h4>
                    <span className="notif-item-time">{item.time}</span>
                  </div>
                  <p className="notif-item-desc">{item.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

