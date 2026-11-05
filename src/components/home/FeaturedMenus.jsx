import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Plus, Check, Star } from 'lucide-react';
import { FOOD_ITEMS } from '../../data/menus';
import { useMenu } from '../../context/MenuContext';

export const FeaturedMenus = () => {
  const navigate = useNavigate();
  const { toggleItemInMenu, isItemInMenu } = useMenu();

  const featured = FOOD_ITEMS.filter((item) => item.isSignature).slice(0, 5);

  return (
    <section className="py-4">
      {/* Section Header */}
      <div className="flex items-end justify-between px-4 mb-3">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-[#FE8500] uppercase block mb-0.5">
            Chef's Selections
          </span>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            Featured Menus
          </h2>
        </div>
        <button
          onClick={() => navigate('/menus')}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#4A2373] hover:text-[#3A195C] transition-colors pb-0.5"
        >
          <span>Catalog</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Horizontal Carousel with Plated Dishes as in Reference Design */}
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar snap-x snap-mandatory">
        {featured.map((item) => {
          const inMenu = isItemInMenu(item.id);

          return (
            <div
              key={item.id}
              onClick={() => navigate('/menus')}
              className="w-[200px] shrink-0 bg-white rounded-3xl p-3 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(74,35,115,0.08)] transition-all flex flex-col justify-between snap-start cursor-pointer group"
            >
              {/* Plated Round Image as in Reference */}
              <div className="flex items-center justify-center my-1">
                <div className="w-24 h-24 rounded-full overflow-hidden shadow-md shadow-slate-900/10 border-2 border-white ring-1 ring-slate-100 group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Title & Stars */}
              <div className="mt-2 text-center">
                <h4 className="font-extrabold text-xs text-slate-900 line-clamp-1 group-hover:text-[#4A2373] transition-colors">
                  {item.name}
                </h4>
                <div className="flex items-center justify-center gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-[#FE8500] text-[#FE8500]" />
                  ))}
                  <span className="text-[9px] font-bold text-slate-400 ml-1">5.0</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">
                  Min 25 guests
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItemInMenu(item);
                }}
                className={`mt-2.5 w-full py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all shadow-xs ${
                  inMenu
                    ? 'bg-[#FE8500] hover:bg-[#e67700] text-white shadow-md shadow-[#FE8500]/25'
                    : 'bg-[#4A2373] text-white hover:bg-[#3A195C] shadow-[#4A2373]/20 active:scale-95'
                }`}
              >
                {inMenu ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Selected</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Select Dish</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
