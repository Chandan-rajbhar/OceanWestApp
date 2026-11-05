import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Utensils } from 'lucide-react';
import { useMenu } from '../../context/MenuContext';

export const MenuSummaryBar = () => {
  const navigate = useNavigate();
  const { totalItemsCount, menuTitle } = useMenu();

  if (totalItemsCount === 0) return null;

  return (
    <div className="sticky bottom-2 inset-x-0 z-30 px-3 pb-1 pointer-events-none animate-in slide-in-from-bottom-2 duration-300">
      <div className="pointer-events-auto bg-slate-900/95 text-white p-2.5 pl-3 rounded-2xl shadow-xl flex items-center justify-between border border-[#FE8500]/40 shadow-[0_8px_25px_rgba(254,133,0,0.25)] backdrop-blur-xl">
        {/* Left: Counter & Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#FE8500] flex items-center justify-center text-white shrink-0 font-black text-xs shadow-sm shadow-[#FE8500]/40">
            {totalItemsCount}
          </div>
          <div className="min-w-0">
            <h5 className="font-extrabold text-xs text-white truncate leading-tight">
              {menuTitle || 'Custom Event Menu'}
            </h5>
            <p className="text-[10px] text-slate-300 font-medium">
              {totalItemsCount} {totalItemsCount === 1 ? 'dish' : 'dishes'} in quote
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => navigate('/menu-builder')}
            className="text-[11px] font-bold px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            Review
          </button>
          <button
            onClick={() => navigate('/book')}
            className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-[#FE8500] hover:bg-[#e67700] text-white flex items-center gap-1 shadow-md shadow-[#FE8500]/40 transition-all active:scale-95"
          >
            <span>Book</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
