import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomSheet } from '../common/BottomSheet';
import { MapPin, Users, CheckCircle2, Heart, CalendarCheck, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useFavorites } from '../../context/FavoritesContext';
import { useBooking } from '../../context/BookingContext';

export const VenueDetailModal = ({ venue, isOpen, onClose }) => {
  const navigate = useNavigate();
  const { toggleFavoriteVenue, isVenueFavorite } = useFavorites();
  const { setVenue } = useBooking();

  if (!venue) return null;

  const isFav = isVenueFavorite(venue.id);

  const handleSelectVenueAndBook = () => {
    setVenue(venue.name, venue.city);
    onClose();
    navigate('/book');
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={venue.name} subtitle={venue.location}>
      <div className="flex flex-col gap-4">
        {/* Cover Photo */}
        <div className="relative h-48 w-full rounded-2xl overflow-hidden shadow-md">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Favorite */}
          <button
            onClick={() => toggleFavoriteVenue(venue.id, venue.name)}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
              isFav
                ? 'bg-rose-50 text-rose-600 shadow-md'
                : 'bg-black/40 text-white hover:bg-white hover:text-slate-900'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>

          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <Badge variant="galactic" size="sm" className="bg-white/90 backdrop-blur-xs font-bold">
              {venue.city}
            </Badge>
            <span className="text-white text-xs font-semibold bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
              {venue.vibe}
            </span>
          </div>
        </div>

        {/* Address and Capacity */}
        <div className="bg-white/90 p-3.5 rounded-2xl border border-slate-200/80 grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#FE8500] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-slate-500 block">Verified Address</span>
              <span className="font-bold text-slate-800 leading-tight">{venue.address}</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Users className="w-4 h-4 text-[#4A2373] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-slate-500 block">Capacity</span>
              <span className="font-bold text-slate-800 leading-tight">{venue.capacity}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Venue Overview
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {venue.description}
          </p>
        </div>

        {/* Amenities */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Venue Amenities &amp; Features
          </h4>
          <div className="grid grid-cols-1 gap-1.5">
            {venue.amenities.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-white/60 px-3 py-1.5 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ocean West Partnership */}
        <div className="p-3.5 bg-blue-50/70 border border-blue-200/70 rounded-2xl">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#4A2373] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#FE8500]" />
            <span>Ocean West Catering Experience</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {venue.oceanWestExperience}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            variant="accent"
            fullWidth
            icon={CalendarCheck}
            onClick={handleSelectVenueAndBook}
            className="text-xs py-3.5 shadow-md shadow-[#FE8500]/30"
          >
            Select Venue for Event Inquiry
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
};


