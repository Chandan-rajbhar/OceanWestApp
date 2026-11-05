import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ toast, onDismiss }) => {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />,
    info: <Info className="w-4 h-4 text-[#4A2373] shrink-0" />
  };

  const borders = {
    success: 'border-emerald-500/30',
    error: 'border-rose-500/30',
    info: 'border-[#4A2373]/30'
  };

  return (
    <div className="absolute top-16 left-3 right-3 z-50 pointer-events-none flex justify-center animate-in slide-in-from-top-4 fade-in duration-200">
      <div
        className={`pointer-events-auto max-w-sm w-full bg-slate-900/95 text-white backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl flex items-center justify-between gap-3 border ${borders[toast.type || 'info']}`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {icons[toast.type || 'info']}
          <p className="text-xs font-medium text-slate-100 truncate">{toast.message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};


