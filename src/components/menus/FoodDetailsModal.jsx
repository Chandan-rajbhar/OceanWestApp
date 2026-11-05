import React from 'react';
import { BottomSheet } from '../common/BottomSheet';
import { Heart, Plus, Check, Utensils, Users, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useFavorites } from '../../context/FavoritesContext';
import { useMenu } from '../../context/MenuContext';

export const FoodDetailsModal = ({ item, isOpen, onClose }) => {
  const { toggleFavoriteItem, isItemFavorite } = useFavorites();
  const { toggleItemInMenu, isItemInMenu } = useMenu();

  if (!item) return null;

  const isFav = isItemFavorite(item.id);
  const inMenu = isItemInMenu(item.id);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={item.name} subtitle="Chef Michael's Coastal Kitchen">
      <div className="flex flex-col gap-4">
        {/* Cover Photo */}
        <div className="relative h-44 w-full rounded-2xl overflow-hidden shadow-md">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Favorite button */}
          <button
            onClick={() => toggleFavoriteItem(item.id, item.name)}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
              isFav
                ? 'bg-rose-50 text-rose-600 shadow-md'
                : 'bg-black/40 text-white hover:bg-white hover:text-slate-900'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>

          {item.isSignature && (
            <div className="absolute bottom-3 left-3">
              <Badge variant="bubblegum" size="sm" className="bg-[#FE8500] text-white border-0 shadow-md">
                Signature Dish
              </Badge>
            </div>
          )}
        </div>

        {/* Dietary Badges */}
        {item.dietary && item.dietary.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.dietary.map((tag, i) => (
              <Badge key={i} variant="galactic" size="md">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Description */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Culinary Description
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {item.description}
          </p>
        </div>

        {/* Specs Box */}
        <div className="grid grid-cols-2 gap-2 bg-white/90 p-3 rounded-2xl border border-slate-200/80 text-xs">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#4A2373] shrink-0" />
            <div>
              <span className="text-[10px] text-slate-500 block leading-tight">Scale</span>
              <span className="font-bold text-slate-800">Min 25 Guests</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#FE8500] shrink-0" />
            <div>
              <span className="text-[10px] text-slate-500 block leading-tight">Preparation</span>
              <span className="font-bold text-slate-800 truncate">{item.prepTime || 'Cooked on-site'}</span>
            </div>
          </div>
        </div>

        {/* Service Styles */}
        {item.serviceStyle && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Available Service Formats
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {item.serviceStyle.map((style, i) => (
                <span
                  key={i}
                  className="text-[11px] font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-xl border border-slate-200"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Pricing notice adhering to prompt rules */}
        <div className="p-3 bg-blue-50/70 border border-blue-200/60 rounded-2xl flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#4A2373] shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-700 leading-relaxed">
            <strong className="text-slate-900 font-bold">Custom Package Quote: </strong>
            Pricing is tailored to your guest count, service style, and seasonal ingredient availability. Add items to your menu to include them in your quote inquiry.
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 flex items-center gap-2">
          <Button
            variant={inMenu ? 'accent' : 'primary'}
            fullWidth
            icon={inMenu ? Check : Plus}
            onClick={() => toggleItemInMenu(item)}
            className="text-xs py-3 font-bold"
          >
            {inMenu ? 'Selected (Tap to Remove)' : 'Add to Custom Event Menu'}
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
};


