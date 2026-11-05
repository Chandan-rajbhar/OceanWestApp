import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, PhoneCall, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';

export const QuoteCtaSection = () => {
  const navigate = useNavigate();
  const { initiateCall } = useApp();

  return (
    <section className="px-4 py-3 mb-4">
      <div className="relative rounded-3xl overflow-hidden p-4 bg-gradient-to-br from-[#4A2373] via-[#3D1B60] to-[#2C1247] text-white shadow-xl shadow-[#4A2373]/25 border border-white/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FE8500]/25 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[10px] font-bold text-white mb-2 backdrop-blur-xs">

            <span>Ready to Plan Your Occasion?</span>
          </div>

          <h3 className="font-extrabold text-base text-white leading-tight">
            Design Your Custom Catering Experience
          </h3>

          <p className="text-xs text-white/90 mt-1 leading-relaxed font-normal">
            Minimum 25 guests. Inquire early to secure your preferred date.
          </p>

          <div className="grid grid-cols-2 gap-2 mt-3.5">
            <Button
              variant="accent"
              size="sm"
              icon={CalendarCheck}
              onClick={() => navigate('/book')}
              className="text-xs font-bold py-2.5 shadow-md shadow-[#FE8500]/30"
            >
              Get a Quote
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={PhoneCall}
              onClick={initiateCall}
              className="text-xs font-bold py-2.5 text-white bg-[#4A2373] hover:bg-[#3A195C] border border-white/20 shadow-md shadow-black/20"
            >
              Direct Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};


