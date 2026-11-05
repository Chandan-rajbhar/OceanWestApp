import React from 'react';
import { Calendar, Users, MapPin, Utensils, User, Mail, Phone, Edit2, ShieldCheck, Check } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Badge } from '../common/Badge';

export const BookingReview = () => {
  const { formData, goToStep } = useBooking();

  return (
    <div className="flex flex-col gap-3.5">
      {/* Intro Notice Card */}
      <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-xs flex items-start gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-[#FE8500]/10 text-[#FE8500] flex items-center justify-center shrink-0 mt-0.5">
          <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
        </div>
        <div className="text-[11px] text-slate-700 leading-relaxed font-medium">
          <span className="font-bold text-slate-900">Complimentary Quote Request: </span>
          Submitting this inquiry does not charge your card. Chef Michael will review kitchen logistics and provide a tailored catering proposal.
        </div>
      </div>

      {/* Card 1: Event Logistics */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs">
        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
          <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#4A2373]" />
            <span>Event Logistics &amp; Schedule</span>
          </h4>
          <button
            type="button"
            onClick={() => goToStep(1)}
            className="text-[11px] font-bold text-[#4A2373] hover:text-[#3A195C] flex items-center gap-1"
          >
            <Edit2 className="w-3 h-3" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Occasion</span>
            <span className="font-bold text-slate-900">{formData.eventType}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Date &amp; Serving Time</span>
            <span className="font-bold text-slate-900">
              {formData.eventDate || 'Pending'} • {formData.eventTime}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Guest Count</span>
            <span className="font-bold text-[#4A2373]">{formData.guestCount} Attendees</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Service Hub</span>
            <span className="font-bold text-slate-900">{formData.city}, BC</span>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-100">
          <span className="text-[10px] text-slate-400 block font-medium">Venue &amp; Setting</span>
          <span className="font-bold text-slate-900 text-xs">
            {formData.venueName} ({formData.venueSetting})
          </span>
        </div>
      </div>

      {/* Card 2: Catering & Menus */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs">
        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
          <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-[#FE8500]" />
            <span>Catering &amp; Menu Selections</span>
          </h4>
          <button
            type="button"
            onClick={() => goToStep(2)}
            className="text-[11px] font-bold text-[#4A2373] hover:text-[#3A195C] flex items-center gap-1"
          >
            <Edit2 className="w-3 h-3" />
            <span>Edit</span>
          </button>
        </div>

        <div className="text-xs mb-2">
          <span className="text-[10px] text-slate-400 block font-medium">Service Format</span>
          <span className="font-bold text-[#4A2373]">{formData.cateringStyle}</span>
        </div>

        {/* Selected Dishes */}
        <div>
          <span className="text-[10px] text-slate-400 block mb-1 font-medium">
            Attached Dishes ({formData.selectedMenuItems?.length || 0})
          </span>
          {formData.selectedMenuItems && formData.selectedMenuItems.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {formData.selectedMenuItems.map((item) => (
                <span
                  key={item.id}
                  className="text-[10px] font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-lg border border-slate-200/60"
                >
                  {item.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-slate-500 font-medium">
              Chef Michael’s recommended seasonal menu will be balanced and proposed.
            </p>
          )}
        </div>

        {/* Dietary */}
        {formData.dietaryRequirements && formData.dietaryRequirements.length > 0 && (
          <div className="mt-2.5 pt-2 border-t border-slate-100">
            <span className="text-[10px] text-slate-400 block mb-1 font-medium">Dietary Requirements</span>
            <div className="flex flex-wrap gap-1">
              {formData.dietaryRequirements.map((d, i) => (
                <span
                  key={i}
                  className="text-[9px] font-bold bg-[#4A2373]/10 text-[#4A2373] px-2 py-0.5 rounded-md"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        )}

        {formData.specialRequests && (
          <div className="mt-2.5 pt-2 border-t border-slate-100">
            <span className="text-[10px] text-slate-400 block font-medium">Special Requests</span>
            <p className="text-xs text-slate-700 italic mt-0.5 font-medium">"{formData.specialRequests}"</p>
          </div>
        )}
      </div>

      {/* Card 3: Contact Info */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs">
        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
          <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#4A2373]" />
            <span>Coordinator Contact Details</span>
          </h4>
          <button
            type="button"
            onClick={() => goToStep(3)}
            className="text-[11px] font-bold text-[#4A2373] hover:text-[#3A195C] flex items-center gap-1"
          >
            <Edit2 className="w-3 h-3" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Contact Name</span>
            <span className="font-bold text-slate-900">
              {formData.firstName} {formData.lastName}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Phone</span>
            <span className="font-bold text-slate-900">{formData.phone}</span>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Email</span>
            <span className="font-bold text-slate-900 truncate block">{formData.email}</span>
          </div>
          {formData.company && (
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Company / Production</span>
              <span className="font-bold text-slate-900 truncate block">{formData.company}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
