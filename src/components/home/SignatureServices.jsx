import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { CATERING_SERVICES } from '../../data/services';
import { Badge } from '../common/Badge';

export const SignatureServices = () => {
  const navigate = useNavigate();

  // Show top 4 services cleanly to avoid visual overload
  const displayedServices = CATERING_SERVICES.slice(0, 4);

  return (
    <section className="px-4 py-4">
      {/* Section Header with Breathing Room */}
      <div className="flex items-end justify-between mb-3.5">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-[#4A2373] uppercase block mb-0.5">
            Specialized Catering
          </span>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            Signature Services
          </h2>
        </div>
        <button
          onClick={() => navigate('/services')}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#4A2373] hover:text-[#3A195C] transition-colors pb-0.5"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Clean 2-Column Grid with Large Tap Targets & High Contrast */}
      <div className="grid grid-cols-2 gap-3">
        {displayedServices.map((service) => (
          <div
            key={service.id}
            onClick={() => navigate(`/services/${service.id}`)}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200/70 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer active:scale-[0.98]"
          >
            {/* Image Thumbnail */}
            <div className="relative h-32 w-full overflow-hidden bg-slate-100">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              
              <div className="absolute top-2.5 left-2.5">
                <Badge
                  variant={service.id === 'weddings' ? 'galactic' : service.id === 'film' ? 'bubblegum' : 'neutral'}
                  size="sm"
                  className="bg-white/95 backdrop-blur-md text-[9px] font-bold shadow-xs border-0"
                >
                  {service.badge}
                </Badge>
              </div>

              <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                <h3 className="font-extrabold text-xs leading-tight drop-shadow-sm">
                  {service.title}
                </h3>
              </div>
            </div>

            {/* Clean Footer Row */}
            <div className="p-2.5 px-3 flex items-center justify-between bg-white text-[11px] font-bold text-[#4A2373]">
              <span className="text-[10px] text-slate-500 font-semibold">{service.guestRange.split(' ')[0]} guests</span>
              <div className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Details</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

