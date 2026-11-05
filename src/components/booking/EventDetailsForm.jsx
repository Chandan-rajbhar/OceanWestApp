import React from 'react';
import { Calendar, Users, MapPin, Building, Clock, AlertCircle, Check } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { BUSINESS_INFO } from '../../data/faqs';
import { RECOMMENDED_VENUES } from '../../data/venues';

export const EventDetailsForm = () => {
  const { formData, updateFormData } = useBooking();

  const eventTypes = [
    'Weddings & Receptions',
    'Movie & Film Catering',
    'Company Events',
    'Private Parties',
    'Summer & Fall Parties',
    'Celebration of Life'
  ];

  const venueSettings = [
    'Waterfront Deck & Indoor Hall',
    'Indoor Banquet Ballroom',
    'Outdoor Lawn & Marquee Tent',
    'Film Soundstage / Production Lot',
    'Private Residence & Backyard',
    'Corporate Executive Suite'
  ];

  const guestPresets = [25, 50, 100, 250, 500];

  // Calculate today's date in YYYY-MM-DD for min date attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="flex flex-col gap-3.5">
      {/* Notice Card: Min 25 guests & 6-month window */}
      <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs flex items-start gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-[#4A2373]/10 text-[#4A2373] flex items-center justify-center shrink-0 mt-0.5">
          <AlertCircle className="w-4 h-4" />
        </div>
        <div className="text-[11px] text-slate-600 leading-relaxed font-medium">
          <span className="font-bold text-slate-900">Standard Catering Scale: </span>
          Minimum event size is <strong className="text-[#4A2373]">25 guests</strong>. We cater groups up to 1,200+ guests across British Columbia.
        </div>
      </div>

      {/* Event Occasion Grid */}
      <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs">
        <label className="block text-xs font-bold text-slate-900 mb-2">
          Event Occasion &amp; Style *
        </label>
        <div className="grid grid-cols-2 gap-2">
          {eventTypes.map((type) => {
            const isSelected = formData.eventType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => updateFormData({ eventType: type })}
                className={`p-2.5 text-left rounded-xl text-xs font-bold border transition-all flex items-center justify-between gap-1.5 ${
                  isSelected
                    ? 'border-[#4A2373] bg-[#4A2373]/10 text-[#4A2373] shadow-xs'
                    : 'border-slate-200/80 bg-slate-50/60 text-slate-700 hover:bg-slate-100/80'
                }`}
              >
                <span className="truncate">{type}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#4A2373] shrink-0 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Date & Time */}
      <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs">
        <label className="block text-xs font-bold text-slate-900 mb-2">
          Event Schedule *
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <span className="text-[10px] font-semibold text-slate-500 mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#4A2373]" />
              <span>Event Date</span>
            </span>
            <input
              type="date"
              min={today}
              value={formData.eventDate}
              onChange={(e) => updateFormData({ eventDate: e.target.value })}
              className="w-full bg-slate-50 text-slate-800 text-xs px-2.5 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4A2373]/20 font-medium"
            />
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-500 mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#FE8500]" />
              <span>Serving Time</span>
            </span>
            <input
              type="time"
              value={formData.eventTime}
              onChange={(e) => updateFormData({ eventTime: e.target.value })}
              className="w-full bg-slate-50 text-slate-800 text-xs px-2.5 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4A2373]/20 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Guest Count with Quick Pills & Slider */}
      <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#4A2373]" />
            <span>Estimated Guest Count</span>
          </label>
          <span className="text-xs font-black text-white bg-[#4A2373] px-2.5 py-0.5 rounded-full shadow-xs">
            {formData.guestCount} Guests
          </span>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 mb-2.5 overflow-x-auto no-scrollbar">
          {guestPresets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => updateFormData({ guestCount: preset })}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all shrink-0 ${
                formData.guestCount === preset
                  ? 'bg-[#FE8500] text-white border-[#FE8500] shadow-xs'
                  : 'bg-slate-100 text-slate-600 border-slate-200/80 hover:bg-slate-200'
              }`}
            >
              {preset === 500 ? '500+' : preset}
            </button>
          ))}
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min="25"
          max="500"
          step="5"
          value={formData.guestCount}
          onChange={(e) => updateFormData({ guestCount: parseInt(e.target.value, 10) })}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4A2373]"
        />

        <div className="flex justify-between text-[9px] text-slate-400 mt-1 font-semibold">
          <span>Min 25</span>
          <span>100</span>
          <span>250</span>
          <span>500+ Gala</span>
        </div>
      </div>

      {/* Location / Service Area */}
      <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs">
        <label className="block text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-[#FE8500]" />
          <span>City / British Columbia Service Hub *</span>
        </label>
        <select
          value={formData.city}
          onChange={(e) => updateFormData({ city: e.target.value })}
          className="w-full bg-slate-50 text-slate-800 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4A2373]/20 font-medium"
        >
          {BUSINESS_INFO.serviceAreas.map((city) => (
            <option key={city} value={city}>
              {city}, British Columbia
            </option>
          ))}
        </select>
      </div>

      {/* Venue Name & Recommended Quick Select */}
      <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs">
        <label className="block text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1">
          <Building className="w-3.5 h-3.5 text-[#4A2373]" />
          <span>Venue Name or Address *</span>
        </label>
        <input
          type="text"
          placeholder="e.g. UBC Boathouse, Heritage Hall, or Private Residence"
          value={formData.venueName}
          onChange={(e) => updateFormData({ venueName: e.target.value })}
          className="w-full bg-slate-50 text-slate-800 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4A2373]/20 font-medium"
        />

        {/* Quick Venue Chips */}
        <div className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar pb-0.5">
          <span className="text-[9px] font-bold text-slate-400 shrink-0">Popular:</span>
          {RECOMMENDED_VENUES.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => updateFormData({ venueName: v.name, city: v.city })}
              className={`text-[9px] font-bold px-2 py-0.5 rounded-lg shrink-0 border transition-colors ${
                formData.venueName === v.name
                  ? 'bg-[#4A2373] text-white border-[#4A2373]'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {v.name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => updateFormData({ venueName: 'Private Residence' })}
            className="text-[9px] font-bold px-2 py-0.5 rounded-lg shrink-0 border bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
          >
            Private Residence
          </button>
        </div>
      </div>

      {/* Venue Setting Preference */}
      <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs">
        <label className="block text-xs font-bold text-slate-900 mb-1.5">
          Venue Setting Preference
        </label>
        <select
          value={formData.venueSetting}
          onChange={(e) => updateFormData({ venueSetting: e.target.value })}
          className="w-full bg-slate-50 text-slate-800 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4A2373]/20 font-medium"
        >
          {venueSettings.map((setting) => (
            <option key={setting} value={setting}>
              {setting}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
