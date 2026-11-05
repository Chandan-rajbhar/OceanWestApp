import React, { useState } from 'react';
import { CATERING_SERVICES } from '../data/services';
import { ServiceCard } from '../components/services/ServiceCard';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const Services = () => {
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'film', label: 'Film & TV' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'private', label: 'Private & BBQ' }
  ];

  const filteredServices = CATERING_SERVICES.filter((s) => {
    if (filter === 'all') return true;
    if (filter === 'weddings') return s.id === 'weddings';
    if (filter === 'film') return s.id === 'film';
    if (filter === 'corporate') return s.id === 'corporate';
    if (filter === 'private') return s.id === 'private' || s.id === 'summer-fall' || s.id === 'celebration-of-life';
    return true;
  });

  return (
    <div className="flex flex-col pb-24">
      {/* Title Header */}
      <div className="bg-white/95 px-4 pt-3 pb-3 border-b border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-1">
          <Badge variant="galactic" size="sm" icon={Sparkles}>
            Specialized Catering
          </Badge>
          <span className="text-[10px] font-bold text-slate-500">
            Min 25 Guests
          </span>
        </div>
        <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
          Catering Services &amp; Divisions
        </h1>
        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
          From coastal wedding receptions to Teamsters 155 film production kitchens.
        </p>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar pb-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                filter === c.id
                  ? 'bg-[#4A2373] text-white shadow-sm shadow-[#4A2373]/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div className="p-3.5 flex flex-col gap-3">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};


