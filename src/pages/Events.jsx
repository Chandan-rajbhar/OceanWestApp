import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus, FileText, CheckCircle2, AlertCircle, XCircle, Clock, MapPin, Users, Utensils, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { EventCard } from '../components/events/EventCard';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';

export const Events = () => {
  const navigate = useNavigate();
  const { allBookings, cancelBooking, editDraftBooking } = useBooking();

  const [activeTab, setActiveTab] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const tabs = [
    { id: 'all', label: 'All Inquiries' },
    { id: 'Submitted', label: 'Submitted' },
    { id: 'Quote Prepared', label: 'Quote Prepared' },
    { id: 'Confirmed', label: 'Confirmed' },
    { id: 'Under Review', label: 'Under Review' },
    { id: 'Cancelled', label: 'Cancelled' }
  ];

  const filteredBookings = allBookings.filter((b) => {
    if (activeTab === 'all') return true;
    return b.status === activeTab;
  });

  const handleEditDraft = (booking) => {
    setSelectedBooking(null);
    editDraftBooking(booking);
    navigate('/book');
  };

  return (
    <div className="flex flex-col pb-16">
      {/* Top Banner */}
      <div className="bg-white/95 px-4 pt-3 pb-3 border-b border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-1.5">
          <Badge variant="galactic" size="sm" icon={Calendar}>
            Booking Management
          </Badge>
          <span className="text-[10px] font-bold text-slate-500">
            {allBookings.length} Total Records
          </span>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
            My Inquiries &amp; Events
          </h1>
          <Button
            variant="accent"
            size="sm"
            icon={Plus}
            onClick={() => navigate('/book')}
            className="text-xs py-1.5 px-3"
          >
            New Inquiry
          </Button>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar pb-1">
          {tabs.map((tab) => {
            const count = allBookings.filter((b) => (tab.id === 'all' ? true : b.status === tab.id)).length;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all shrink-0 flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-[#4A2373] text-white shadow-sm shadow-[#4A2373]/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bookings List */}
      <div className="p-4 flex flex-col gap-3">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <EventCard
              key={booking.id}
              booking={booking}
              onOpenDetails={(b) => setSelectedBooking(b)}
              onCancel={(id) => cancelBooking(id)}
            />
          ))
        ) : (
          <EmptyState
            icon={Calendar}
            title="No Inquiries in this Category"
            description="You don't have any bookings matching this status. Inquire for your upcoming wedding, corporate gala, or film production."
            actionText="Request a Quote"
            onAction={() => navigate('/book')}
            className="my-6"
          />
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedBooking && (
        <Modal
          isOpen={Boolean(selectedBooking)}
          onClose={() => setSelectedBooking(null)}
          title={selectedBooking.referenceNumber}
          subtitle={`${selectedBooking.eventType} • ${selectedBooking.status}`}
        >
          <div className="flex flex-col gap-3.5">
            {/* Status notification */}
            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Current Inquiry State</span>
                <span className="text-xs font-extrabold text-[#4A2373]">
                  {selectedBooking.status}
                </span>
              </div>
              <Badge
                variant={
                  selectedBooking.status === 'Confirmed'
                    ? 'success'
                    : selectedBooking.status === 'Quote Prepared'
                    ? 'bubblegum'
                    : 'galactic'
                }
                size="md"
              >
                {selectedBooking.status}
              </Badge>
            </div>

            {/* Chef note */}
            {selectedBooking.notesFromChef && (
              <div className="p-3 bg-blue-50/80 border border-blue-200/70 rounded-2xl text-xs text-slate-700">
                <span className="font-bold text-[#4A2373] block mb-0.5">Note from Catering Office:</span>
                <p className="leading-relaxed">{selectedBooking.notesFromChef}</p>
              </div>
            )}

            {/* Event Specs */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Event Date</span>
                <span className="font-bold text-slate-800">{selectedBooking.eventDate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Serving Time</span>
                <span className="font-bold text-slate-800">{selectedBooking.eventTime}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Guest Count</span>
                <span className="font-bold text-slate-800">{selectedBooking.guestCount} Guests</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Catering Style</span>
                <span className="font-bold text-slate-800">{selectedBooking.cateringStyle}</span>
              </div>
            </div>

            {/* Venue & Location */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200 text-xs">
              <span className="text-[10px] text-slate-400 block">Venue &amp; Service Area</span>
              <p className="font-bold text-slate-800 mt-0.5">
                {selectedBooking.venueName} • {selectedBooking.city}, BC
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Setting: {selectedBooking.venueSetting}
              </p>
            </div>

            {/* Menu Items */}
            {selectedBooking.selectedMenuItems && selectedBooking.selectedMenuItems.length > 0 && (
              <div className="bg-white rounded-2xl p-3 border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-semibold mb-1.5">
                  Selected Menu Items ({selectedBooking.selectedMenuItems.length})
                </span>
                <div className="flex flex-col gap-1">
                  {selectedBooking.selectedMenuItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A2373]" />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dietary notes */}
            {selectedBooking.dietaryNotes && (
              <div className="bg-white rounded-2xl p-3 border border-slate-200 text-xs">
                <span className="text-[10px] text-slate-400 block">Dietary &amp; Special Requests</span>
                <p className="text-slate-700 mt-0.5">{selectedBooking.dietaryNotes}</p>
                {selectedBooking.specialRequests && (
                  <p className="text-slate-500 italic mt-1 text-[11px]">"{selectedBooking.specialRequests}"</p>
                )}
              </div>
            )}

            {/* Customer Details */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200 text-xs">
              <span className="text-[10px] text-slate-400 block">Coordinator Contact</span>
              <p className="font-bold text-slate-800 mt-0.5">
                {selectedBooking.customer.firstName} {selectedBooking.customer.lastName}
              </p>
              <p className="text-slate-600 mt-0.5">
                {selectedBooking.customer.email} • {selectedBooking.customer.phone}
              </p>
              {selectedBooking.customer.company && (
                <p className="text-slate-500 mt-0.5">Company: {selectedBooking.customer.company}</p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between gap-2">
              {selectedBooking.status !== 'Cancelled' ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      cancelBooking(selectedBooking.id);
                      setSelectedBooking(null);
                    }}
                    className="text-xs text-rose-600 border-rose-200 hover:bg-rose-50"
                  >
                    Cancel Draft
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleEditDraft(selectedBooking)}
                    className="text-xs"
                  >
                    Edit &amp; Re-Submit
                  </Button>
                </>
              ) : (
                <Button
                  variant="primary"
                  fullWidth
                  size="sm"
                  onClick={() => handleEditDraft(selectedBooking)}
                  className="text-xs"
                >
                  Reopen as New Inquiry
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};


