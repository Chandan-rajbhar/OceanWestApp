import React from 'react';
import { Heart, Plus, Check, Star } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useMenu } from '../../context/MenuContext';

export const FoodItemCard = ({ item, onOpenDetails }) => {
  const { toggleFavoriteItem, isItemFavorite } = useFavorites();
  const { toggleItemInMenu, isItemInMenu } = useMenu();

  const isFav = isItemFavorite(item.id);
  const inMenu = isItemInMenu(item.id);

  return (
    <div
      onClick={() => onOpenDetails(item)}
      className="bg-white rounded-3xl p-2.5 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(74,35,115,0.08)] transition-all duration-300 flex flex-col justify-between cursor-pointer group active:scale-[0.98]"
    >
      {/* Top Image with Floating Badges */}
      <div className="relative w-full h-28 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100/70 shadow-xs">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80';
          }}
        />

        {/* Dietary / Highlight Badge */}
        {item.dietary && item.dietary[0] && (
          <span className="absolute top-2 left-2 text-[9px] font-extrabold px-2 py-0.5 rounded-lg bg-white/95 backdrop-blur-md text-[#4A2373] shadow-xs truncate max-w-[95px] border border-slate-100/80">
            {item.dietary[0]}
          </span>
        )}

        {/* Favorite Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavoriteItem(item.id, item.name);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all shadow-xs ${
            isFav
              ? 'bg-rose-50 text-rose-600 scale-105'
              : 'bg-black/35 text-white hover:bg-white hover:text-slate-900'
          }`}
          title={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Middle: Dish Name, Serving Scale & Stars */}
      <div className="mt-2.5 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-extrabold text-[12px] text-slate-900 leading-snug line-clamp-2 min-h-[32px] group-hover:text-[#4A2373] transition-colors">
            {item.name}
          </h4>

          <div className="flex items-center justify-between mt-1 pt-0.5">
            <span className="text-[10px] font-semibold text-slate-400">
              Min 25 guests
            </span>
            <div className="flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 fill-[#FE8500] text-[#FE8500]" />
              <span className="text-[10px] font-bold text-slate-500">5.0</span>
            </div>
          </div>
        </div>

        {/* Bottom: Clean Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleItemInMenu(item);
          }}
          className={`w-full mt-2.5 py-1.5 px-2 rounded-2xl flex items-center justify-center gap-1.5 text-[11px] font-bold transition-all shadow-xs ${
            inMenu
              ? 'bg-[#FE8500] hover:bg-[#e67700] text-white shadow-md shadow-[#FE8500]/30 scale-[1.01]'
              : 'bg-[#4A2373] hover:bg-[#3A195C] text-white shadow-[#4A2373]/20 active:scale-95'
          }`}
          title={inMenu ? 'Remove from custom menu' : 'Add to custom menu'}
        >
          {inMenu ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Selected</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Select</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
