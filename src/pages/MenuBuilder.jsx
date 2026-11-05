import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Utensils,
  Trash2,
  Plus,
  ArrowRight,
  ShieldCheck,
  Edit3,
  Check,
  Sparkles,
  CalendarCheck
} from 'lucide-react';
import { useMenu } from '../context/MenuContext';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { FOOD_ITEMS } from '../data/menus';

export const MenuBuilder = () => {
  const navigate = useNavigate();
  const {
    selectedItems,
    menuTitle,
    setMenuTitle,
    removeItemFromMenu,
    clearMenu,
    totalItemsCount
  } = useMenu();
  const { updateFormData } = useBooking();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(menuTitle);

  const handleSaveTitle = () => {
    if (tempTitle.trim()) {
      setMenuTitle(tempTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const handleProceedToBooking = () => {
    updateFormData({
      selectedMenuItems: selectedItems
    });
    navigate('/book');
  };

  // Find full item details for clean presentation
  const enrichedItems = selectedItems.map((sel) => {
    const full = FOOD_ITEMS.find((f) => f.id === sel.id);
    return {
      ...sel,
      image:
        full?.image ||
        sel.image ||
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      dietary: full?.dietary || []
    };
  });

  return (
    <div className="flex flex-col pb-24">
      {/* Clean Header Bar */}
      <div className="bg-white/95 px-4 pt-3 pb-3 border-b border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#4A2373]" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#4A2373]">
              Custom Menu Builder
            </span>
          </div>
          <span className="text-[10px] font-bold text-slate-400">
            Min 25 Guests
          </span>
        </div>

        {/* Editable Title Row */}
        <div className="flex items-center justify-between gap-2 mt-1">
          {isEditingTitle ? (
            <div className="flex items-center gap-1.5 flex-1">
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                className="w-full text-base font-extrabold text-slate-900 bg-slate-100 px-2 py-1 rounded-lg border border-[#4A2373] focus:outline-none"
                autoFocus
              />
              <button
                onClick={handleSaveTitle}
                className="p-1.5 bg-[#4A2373] text-white rounded-lg hover:bg-[#3A195C]"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <h1 className="text-base font-black text-slate-900 truncate">
                {menuTitle || 'My Custom Event Menu'}
              </h1>
              <button
                onClick={() => {
                  setTempTitle(menuTitle);
                  setIsEditingTitle(true);
                }}
                className="text-slate-400 hover:text-[#4A2373] p-1 rounded-lg hover:bg-slate-100 transition-colors"
                title="Edit menu title"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {totalItemsCount > 0 && (
            <button
              onClick={clearMenu}
              className="text-[11px] font-bold text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2 py-0.5 rounded-lg transition-colors shrink-0"
            >
              Clear All
            </button>
          )}
        </div>

        <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
          {totalItemsCount > 0
            ? `${totalItemsCount} ${totalItemsCount === 1 ? 'dish' : 'dishes'} curated for your formal proposal quote.`
            : 'Select dishes from our 14 culinary categories to build your menu.'}
        </p>
      </div>

      {/* Main Content Area */}
      <div className="p-3.5 flex flex-col gap-3">
        {totalItemsCount > 0 ? (
          <>
            {/* Compact Summary Status Card */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#4A2373]/10 text-[#4A2373] flex items-center justify-center font-extrabold text-xs">
                  {totalItemsCount}
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-900 block leading-tight">
                    {totalItemsCount} Selected {totalItemsCount === 1 ? 'Dish' : 'Dishes'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Ready to attach to event quote
                  </span>
                </div>
              </div>

              <Button
                variant="accent"
                size="sm"
                icon={CalendarCheck}
                onClick={handleProceedToBooking}
                className="text-xs py-1.5 px-3 font-bold shadow-xs shadow-[#FE8500]/30"
              >
                Book Quote
              </Button>
            </div>

            {/* Clean, Readable Dish Cards */}
            <div className="flex flex-col gap-2">
              {enrichedItems.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-2.5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-3 transition-all group"
                >
                  {/* Photo */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100/80"
                    loading="lazy"
                  />

                  {/* Details - Full Readability, No Ellipsis Clipping */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-extrabold text-[12px] text-slate-900 leading-snug line-clamp-2">
                      {item.name}
                    </h4>

                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      <span className="text-[10px] font-semibold text-slate-400">
                        Min 25 guests
                      </span>
                      {item.dietary && item.dietary.length > 0 && (
                        <>
                          <span className="text-slate-300 text-[10px]">•</span>
                          <span className="text-[9px] font-bold text-[#4A2373] bg-[#4A2373]/10 px-1.5 py-0.5 rounded-md truncate max-w-[110px]">
                            {item.dietary[0]}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Clean Remove Action */}
                  <button
                    onClick={() => removeItemFromMenu(item.id, item.name)}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors shrink-0"
                    title="Remove from custom menu"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add More Dishes Action Card */}
            <button
              onClick={() => navigate('/menus')}
              className="w-full py-2.5 rounded-2xl border border-dashed border-slate-300 bg-white/70 hover:bg-white text-[#4A2373] hover:border-[#4A2373] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4 text-[#FE8500]" />
              <span>Add More Dishes from Food Catalog</span>
            </button>

            {/* Chef Consultation Guarantee Note */}
            <div className="p-3 bg-white/90 border border-slate-200/80 rounded-2xl flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#4A2373] shrink-0" />
              <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                <strong className="text-slate-900 font-bold">Chef's Balance: </strong>
                Chef Michael Thomas coordinates complementary sides, sauces, and courses during proposal review.
              </p>
            </div>

            {/* Fixed Bottom CTA Bar */}
            <div className="pt-2">
              <Button
                variant="accent"
                fullWidth
                size="md"
                icon={ArrowRight}
                iconPosition="right"
                onClick={handleProceedToBooking}
                className="text-xs py-3.5 font-bold shadow-lg shadow-[#FE8500]/30"
              >
                Continue to Event Booking
              </Button>
            </div>
          </>
        ) : (
          <EmptyState
            icon={Utensils}
            title="Your Custom Menu is Empty"
            description="Explore our 14 coastal categories to select wild salmon, beef roasts, platters, and appetizers for your event."
            actionText="Explore Food Catalog"
            onAction={() => navigate('/menus')}
            className="my-8"
          />
        )}
      </div>
    </div>
  );
};
