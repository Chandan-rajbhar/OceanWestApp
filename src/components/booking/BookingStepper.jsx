import React from 'react';
import { Check, Sparkles } from 'lucide-react';

export const BookingStepper = ({ currentStep, onStepClick }) => {
  const steps = [
    { num: 1, label: 'Details' },
    { num: 2, label: 'Catering' },
    { num: 3, label: 'Contact' },
    { num: 4, label: 'Review' }
  ];

  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <div className="w-full bg-white/95 px-4 pt-3 pb-3 border-b border-slate-200/80 shadow-xs">
      {/* Top Step Progress Bar */}
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-[#4A2373] to-[#FE8500] transition-all duration-300 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Touch-Friendly Step Pills */}
      <div className="grid grid-cols-4 gap-1.5">
        {steps.map((s) => {
          const isDone = s.num < currentStep;
          const isActive = s.num === currentStep;

          return (
            <button
              key={s.num}
              type="button"
              onClick={() => onStepClick(s.num)}
              className={`py-1.5 px-1 rounded-xl flex items-center justify-center gap-1 transition-all duration-200 text-xs font-bold ${
                isActive
                  ? 'bg-[#4A2373] text-white shadow-md shadow-[#4A2373]/25 scale-[1.02]'
                  : isDone
                  ? 'bg-[#4A2373]/10 text-[#4A2373] hover:bg-[#4A2373]/15'
                  : 'bg-slate-100 text-slate-400 hover:bg-slate-200/60'
              }`}
            >
              {isDone ? (
                <Check className="w-3 h-3 stroke-[3]" />
              ) : (
                <span className="text-[10px] opacity-80">{s.num}.</span>
              )}
              <span className="text-[10px] tracking-tight">{s.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
