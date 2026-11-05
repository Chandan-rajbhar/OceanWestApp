import React from 'react';
import { MapPin, CheckCircle2, Truck, Navigation } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/faqs';

export const ServiceAreasSection = () => {
  const coverageHubs = [
    {
      region: 'Vancouver & Richmond',
      role: 'Commercial Kitchen Base'
    },
    {
      region: 'White Rock & Surrey',
      role: 'Executive Headquarters'
    },
    {
      region: 'Burnaby & New West',
      role: 'Film & Media Catering'
    },
    {
      region: 'Delta, Langley & Tri-Cities',
      role: 'Private Estates & Galas'
    }
  ];

  return (
    <section className="px-4 py-3">
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#4A2373]/10 text-[#4A2373] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-extrabold text-xs text-slate-900 tracking-tight leading-tight">
                British Columbia Service Areas
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Serving Greater Vancouver &amp; Coast
              </p>
            </div>
          </div>
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#FE8500] bg-[#FE8500]/10 px-2.5 py-1 rounded-full border border-[#FE8500]/30 shrink-0">
            Full Service
          </span>
        </div>

        {/* Clean 2-Column Hub Layout */}
        <div className="grid grid-cols-2 gap-2">
          {coverageHubs.map((hub, idx) => (
            <div
              key={idx}
              className="bg-slate-50/80 rounded-2xl p-2.5 border border-slate-100/90 flex flex-col justify-between"
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FE8500] shrink-0" />
                <span className="text-[11px] font-bold text-slate-900 leading-tight">
                  {hub.region}
                </span>
              </div>
              <p className="text-[9px] font-medium text-slate-500 pl-5 leading-tight">
                {hub.role}
              </p>
            </div>
          ))}
        </div>

        {/* Clean Footer Dispatch Bar */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5 truncate">
            <Truck className="w-3.5 h-3.5 text-[#4A2373] shrink-0" />
            <span className="truncate">Mobile refrigerated kitchens across BC</span>
          </div>
          <span className="text-[#4A2373] font-bold shrink-0 ml-2">
            White Rock HQ
          </span>
        </div>
      </div>
    </section>
  );
};
