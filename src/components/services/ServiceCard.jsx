import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ArrowRight, Heart, CalendarCheck } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useBooking } from '../../context/BookingContext';

export const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const { toggleFavoriteService, isServiceFavorite } = useFavorites();
  const { setService } = useBooking();

  const isFav = isServiceFavorite(service.id);

  const handleBookService = (e) => {
    e.stopPropagation();
    setService(service.id, service.title);
    navigate('/book');
  };

  return (
    <div
      onClick={() => navigate(`/services/${service.id}`)}
      className="bg-white rounded-3xl p-3 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(74,35,115,0.08)] transition-all duration-300 flex flex-col cursor-pointer group active:scale-[0.99]"
    >
      {/* Cover Image with Badges */}
      <div className="relative h-28 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-xs">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

        {/* Category Badge */}
        {service.badge && (
          <span className="absolute top-2 left-2 text-[9px] font-extrabold px-2 py-0.5 rounded-lg bg-white/95 backdrop-blur-md text-[#4A2373] shadow-xs border border-white/60">
            {service.badge}
          </span>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavoriteService(service.id, service.title);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-colors shadow-xs ${
            isFav
              ? 'bg-rose-50 text-rose-600'
              : 'bg-black/35 text-white hover:bg-white hover:text-slate-900'
          }`}
          title="Save Service"
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current text-rose-500' : ''}`} />
        </button>

        {/* Bottom Overlay Guest Range */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-white text-[10px] font-bold bg-black/45 backdrop-blur-xs px-2 py-0.5 rounded-full">
          <Users className="w-3 h-3 text-[#FE8500]" />
          <span>{service.guestRange}</span>
        </div>
      </div>

      {/* Card Content - Clean & Readable */}
      <div className="mt-2.5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-[#4A2373] transition-colors leading-tight">
            {service.title}
          </h3>
          <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-1 leading-snug">
            {service.shortDescription}
          </p>
        </div>

        {/* Action Row */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-[#4A2373] flex items-center gap-1 group-hover:text-[#FE8500] transition-colors">
            <span>Explore Details</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>

          <button
            onClick={handleBookService}
            className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-[#FE8500] hover:bg-[#e67700] text-white flex items-center gap-1 shadow-xs shadow-[#FE8500]/30 transition-all active:scale-95"
          >
            <CalendarCheck className="w-3 h-3" />
            <span>Get Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
};
