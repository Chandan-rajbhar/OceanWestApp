import React from 'react';
import { Award, Users, Leaf } from 'lucide-react';

export const BusinessHighlights = () => {
  const highlights = [
    {
      icon: Award,
      metric: '25+ Years',
      label: 'Culinary Legacy',
      color: 'text-[#4A2373]',
      bg: 'bg-[#4A2373]/10',
      isActive: false
    },
    {
      icon: Users,
      metric: '25 – 1,200+',
      label: 'Guest Scale',
      color: 'text-white',
      bg: 'bg-white/20',
      isActive: true
    },
    {
      icon: Leaf,
      metric: '100% Local',
      label: 'Ocean-Wise BC',
      color: 'text-[#FE8500]',
      bg: 'bg-[#FE8500]/10',
      isActive: false
    }
  ];

  return (
    <section className="px-4 py-2.5">
      <div className="grid grid-cols-3 gap-2">
        {highlights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`rounded-2xl p-3 flex flex-col items-center text-center transition-all duration-300 ${
                item.isActive
                  ? 'bg-[#4A2373] text-white shadow-lg shadow-[#4A2373]/30 scale-[1.02]'
                  : 'bg-white border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] text-slate-800'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-1.5 shrink-0`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={`text-xs font-black tracking-tight leading-none ${
                  item.isActive ? 'text-white' : 'text-slate-900'
                }`}
              >
                {item.metric}
              </span>
              <span
                className={`text-[10px] font-semibold mt-1 leading-none truncate max-w-full ${
                  item.isActive ? 'text-purple-200' : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
