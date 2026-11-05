import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const BottomSheet = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  className = ''
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop tap area */}
      <div className="flex-1" onClick={onClose} />

      {/* Sheet panel */}
      <div
        className={`w-full bg-[#F0F0F0] rounded-t-[32px] shadow-2xl border-t border-white/80 overflow-hidden flex flex-col max-h-[88%] animate-in slide-in-from-bottom duration-300 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pull pill handle */}
        <div className="pt-3 pb-1 flex justify-center bg-white/90">
          <div className="w-12 h-1.5 rounded-full bg-slate-300" />
        </div>

        {/* Header */}
        <div className="px-5 py-3.5 bg-white/90 border-b border-slate-200/80 flex items-center justify-between shrink-0">
          <div>
            {title && <h3 className="font-bold text-slate-900 text-base leading-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="p-5 overflow-y-auto no-scrollbar flex-1">{children}</div>
      </div>
    </div>
  );
};

