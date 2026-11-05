import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, MapPin, Users } from 'lucide-react';
import { RECOMMENDED_VENUES } from '../../data/venues';
import { Badge } from '../common/Badge';

export const RecommendedVenues = () => {
  const navigate = useNavigate();

  return (
    <section className="py-4">
      {/* Header */}
      <div className="flex items-end justify-between px-4 mb-3">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-[#4A2373] uppercase block mb-0.5">
            Partner Locations
          </span>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            Recommended Venues
          </h2>
        </div>
        <button
          onClick={() => navigate('/venues')}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#4A2373] hover:text-[#3A195C] transition-colors pb-0.5"
        >
          <span>All Venues</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex gap-3.5 overflow-x-auto px-4 pb-2 no-scrollbar snap-x snap-mandatory">
        {RECOMMENDED_VENUES.map((venue) => (
          <div
            key={venue.id}
            onClick={() => navigate('/venues')}
            className="w-[230px] shrink-0 bg-white rounded-3xl overflow-hidden border border-slate-200/70 shadow-xs hover:shadow-lg transition-all flex flex-col snap-start cursor-pointer group"
          >
            {/* Photo */}
            <div className="relative h-32 w-full bg-slate-100 overflow-hidden">
              <img
                src={venue.image}
                alt={venue.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <div className="absolute top-2.5 left-2.5">
                <Badge variant="galactic" size="sm" className="bg-white/95 backdrop-blur-md text-[9px] font-bold border-0 shadow-xs">
                  {venue.city}
                </Badge>
              </div>

              <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                <h4 className="font-extrabold text-xs leading-tight drop-shadow-sm">
                  {venue.name}
                </h4>
              </div>
            </div>

            {/* Body */}
            <div className="p-3 flex items-center justify-between bg-white text-xs">
              <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                <Users className="w-3.5 h-3.5 text-[#4A2373] shrink-0" />
                <span>{venue.capacity.split(' ')[0]} {venue.capacity.split(' ')[1]}</span>
              </div>

              <span className="text-[10px] font-bold text-[#4A2373] group-hover:translate-x-0.5 transition-transform">
                Explore →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

