import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';

export const ChefSection = () => {
  return (
    <section className="px-4 py-4">
      <div className="bg-gradient-to-br from-slate-900 via-[#0d1627] to-[#0a101d] rounded-3xl p-5 text-white shadow-xl border border-slate-800 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A2373]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <Badge variant="bubblegum" size="sm" className="bg-[#FE8500]/20 text-[#FE8500] border-[#FE8500]/30 font-bold">
              Culinary Leadership
            </Badge>
            <span className="text-[10px] font-bold text-slate-400">
              Est. 1999 • BC Coast
            </span>
          </div>

          <div className="flex gap-3.5 items-center">
            {/* Chef Portrait */}
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-white/20 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80"
                alt="Executive Chef Michael Thomas"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Chef Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-black text-sm text-white leading-tight">
                Executive Chef Michael Thomas
              </h3>
              <p className="text-[11px] text-[#FE8500] font-bold mt-0.5">
                Co-Chef Robert Vandenberg
              </p>

            </div>
          </div>

          {/* Clean 2-column highlights */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px] text-slate-300 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FE8500] shrink-0" />
              <span>Ocean-Wise certified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#4A2373] shrink-0" />
              <span>Teamsters 155 affiliated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

