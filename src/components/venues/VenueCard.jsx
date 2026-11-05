import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Heart, Check, Sparkles, ArrowRight } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useBooking } from '../../context/BookingContext';

export const VenueCard = ({ venue, onOpenDetails }) => {
  const navigate = useNavigate();
  const { toggleFavoriteVenue, isVenueFavorite } = useFavorites();
  const { setVenue, formData } = useBooking();

  const isFav = isVenueFavorite(venue.id);
  const isSelected = formData.venueName === venue.name;

  const handleSelectVenue = (e) => {
    e.stopPropagation();
    setVenue(venue.name, venue.city);
    navigate('/book');
  };

  return (
    <div
      onClick={() => onOpenDetails(venue)}
      className="bg-white rounded-3xl p-3 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(74,35,115,0.08)] transition-all duration-300 flex flex-col cursor-pointer group active:scale-[0.99]"
    >
      {/* Cover Image */}
      <div className="relative h-32 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-xs">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent pointer-events-none" />

        {/* City Badge */}
        <span className="absolute top-2 left-2 text-[9px] font-extrabold px-2 py-0.5 rounded-lg bg-white/95 backdrop-blur-md text-[#4A2373] shadow-xs border border-white/60">
          {venue.city}
        </span>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavoriteVenue(venue.id, venue.name);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-colors shadow-xs ${
            isFav
              ? 'bg-rose-50 text-rose-600'
              : 'bg-black/35 text-white hover:bg-white hover:text-slate-900'
          }`}
          title="Save Venue"
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current text-rose-500' : ''}`} />
        </button>

        {/* Bottom Banner on Image: Capacity */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-white text-[10px] font-bold bg-black/45 backdrop-blur-xs px-2 py-0.5 rounded-full">
          <Users className="w-3 h-3 text-[#FE8500]" />
          <span>{venue.capacity}</span>
        </div>
      </div>

      {/* Body: Clean & Readable */}
      <div className="mt-2.5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-[#4A2373] transition-colors leading-tight">
            {venue.name}
          </h3>

          <div className="flex items-center gap-1 text-xs text-slate-500 font-medium mt-1">
            <MapPin className="w-3 h-3 text-[#FE8500] shrink-0" />
            <span className="truncate">{venue.address}</span>
          </div>

          <span className="text-[10px] font-bold text-[#FE8500] block mt-1">
            {venue.vibe}
          </span>
        </div>

        {/* Bottom Actions */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-[#4A2373] flex items-center gap-1 group-hover:text-[#FE8500] transition-colors">
            <span>Explore Details</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>

          <button
            onClick={handleSelectVenue}
            className={`text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all active:scale-95 shadow-xs ${
              isSelected
                ? 'bg-[#FE8500] hover:bg-[#e67700] text-white shadow-[#FE8500]/30'
                : 'bg-[#4A2373] hover:bg-[#3A195C] text-white shadow-[#4A2373]/20'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Selected</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#FE8500]" />
                <span>Choose</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
