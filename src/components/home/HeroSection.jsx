import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="p-4 pt-3 pb-2">
      <div className="relative rounded-[28px] overflow-hidden h-[225px] flex flex-col justify-between p-4 pb-3.5 shadow-[0_4px_30px_rgba(254,133,0,0.38),0_10px_25px_-5px_rgba(0,0,0,0.35)] group">
        {/* Cinematic Background Image */}
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
          alt="Ocean West Coastal Fine Catering"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
        />

        {/* High-Contrast Readability Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-slate-950/30 pointer-events-none" />

        {/* Shining Glass Sheen & Spotlight Inside Card */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-white/[0.22] pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-white/25 via-[#FE8500]/20 to-transparent rounded-full blur-2xl pointer-events-none" />
        
        {/* Animated Light Shimmer Beam */}
        <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/15 to-transparent rotate-12 pointer-events-none -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

        {/* Top: Location Badge Only */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/45 backdrop-blur-md text-white text-[10px] font-semibold border border-white/20 shadow-xs">
            <MapPin className="w-3 h-3 text-[#FE8500]" />
            <span>Richmond • Vancouver Coast</span>
          </div>
        </div>

        {/* Bottom: Clean, Punchy & Uplifted Content */}
        <div className="relative z-10 flex flex-col gap-1 mt-auto pb-0.5">
          <h1 className="text-lg font-black text-white leading-tight tracking-tight drop-shadow-md">
            Bespoke Coastal Catering
          </h1>

          <p className="text-[11px] text-slate-200/90 leading-tight font-normal drop-shadow-sm">
            Weddings, film sets, and exclusive coastal events.
          </p>

          {/* Compact Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-1.5">
            <button
              onClick={() => navigate('/menus')}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#4A2373] hover:bg-[#3A195C] text-white text-xs font-bold shadow-md shadow-[#4A2373]/35 active:scale-95 transition-all"
            >
              <span>Explore Menus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('/book')}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#FE8500] hover:bg-[#e67700] text-white text-xs font-bold shadow-md shadow-[#FE8500]/40 active:scale-95 transition-all"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Get a Quote</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

