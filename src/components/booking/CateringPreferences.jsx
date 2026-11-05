import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, Sparkles, Plus, Trash2, ShieldCheck, Check } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useMenu } from '../../context/MenuContext';
import { CATERING_SERVICES } from '../../data/services';

export const CateringPreferences = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useBooking();
  const { selectedItems, removeItemFromMenu } = useMenu();

  const cateringStyles = [
    { title: 'Buffet Style', desc: 'Full hot buffet lines managed with professional staffing' },
    { title: 'Food Stations', desc: 'Interactive live stations: carving boards, raw seafood & satay grills' },
    { title: 'Family Style', desc: 'Abundant platters brought directly to guest tables' },
    { title: 'Live Charcoal BBQ', desc: 'Live Grill Masters cooking wild salmon, ribs & souvlaki on-site' },
    { title: 'Invisible Chef Drop-off', desc: 'Pristine delivery, quiet setup with hot chafing gear' }
  ];

  const dietaryOptions = [
    'Gluten-Free Option',
    'Ocean-Wise Sourced',
    'Vegetarian Options',
    'Vegan Selections',
    'Dairy-Free Preparations',
    'Nut-Free Safe',
    'Halal Available',
    'Shellfish-Free Accommodations'
  ];

  const toggleDietary = (item) => {
    const current = formData.dietaryRequirements || [];
    const updated = current.includes(item)
      ? current.filter((d) => d !== item)
      : [...current, item];
    updateFormData({ dietaryRequirements: updated });
  };

  const handleRemoveMenuItem = (itemId) => {
    const updated = formData.selectedMenuItems.filter((i) => i.id !== itemId);
    updateFormData({ selectedMenuItems: updated });
    removeItemFromMenu(itemId);
  };

  return (
    <div className="flex flex-col gap-3.5">
      {/* Service Division */}
      <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs">
        <label className="block text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#4A2373]" />
          <span>Catering Division / Primary Service *</span>
        </label>
        <select
          value={formData.serviceId}
          onChange={(e) => {
            const found = CATERING_SERVICES.find((s) => s.id === e.target.value);
            updateFormData({
              serviceId: e.target.value,
              serviceName: found ? found.title : ''
            });
          }}
          className="w-full bg-slate-50 text-slate-800 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4A2373]/20 font-medium"
        >
          {CATERING_SERVICES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title} ({s.guestRange})
            </option>
          ))}
        </select>
      </div>

      {/* Catering Styles */}
      <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs">
        <label className="block text-xs font-bold text-slate-900 mb-2">
          Service Format &amp; Style *
        </label>
        <div className="flex flex-col gap-2">
          {cateringStyles.map((style) => {
            const isSelected = formData.cateringStyle === style.title;
            return (
              <div
                key={style.title}
                onClick={() => updateFormData({ cateringStyle: style.title })}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#4A2373] bg-[#4A2373]/10 shadow-xs'
                    : 'border-slate-200/80 bg-slate-50/60 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isSelected ? 'text-[#4A2373]' : 'text-slate-800'}`}>
                    {style.title}
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-[#4A2373] bg-[#4A2373]' : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{style.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Menu Items */}
      <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-[#FE8500]" />
            <span>Attached Custom Dishes ({formData.selectedMenuItems?.length || 0})</span>
          </label>
          <button
            type="button"
            onClick={() => navigate('/menus')}
            className="text-[10px] font-bold text-[#4A2373] hover:text-[#3A195C] flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>Add from Catalog</span>
          </button>
        </div>

        {formData.selectedMenuItems && formData.selectedMenuItems.length > 0 ? (
          <div className="flex flex-col gap-1.5 max-h-44 overflow-y-auto no-scrollbar p-1 bg-slate-50 rounded-xl border border-slate-200/70">
            {formData.selectedMenuItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-100 shadow-2xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-[#FE8500] shrink-0" />
                  <span className="text-xs font-bold text-slate-800 truncate">{item.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveMenuItem(item.id)}
                  className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3 bg-slate-50/80 rounded-xl border border-dashed border-slate-200 text-center">
            <p className="text-xs text-slate-600 font-medium">No dishes pre-attached yet.</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Chef Michael will balance courses tailored to your guest count.</p>
            <button
              type="button"
              onClick={() => navigate('/menus')}
              className="mt-1.5 text-xs font-bold text-[#4A2373] hover:underline"
            >
              Browse 48+ Dishes
            </button>
          </div>
        )}
      </div>

      {/* Dietary Requirements */}
      <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs">
        <label className="block text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FE8500]" />
          <span>Dietary Accommodations (Select all that apply)</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {dietaryOptions.map((opt) => {
            const isSelected = formData.dietaryRequirements?.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleDietary(opt)}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-[#4A2373] text-white border-[#4A2373] shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Special Requests */}
      <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs">
        <label className="block text-xs font-bold text-slate-900 mb-1.5">
          Special Requests &amp; Notes
        </label>
        <textarea
          rows={3}
          placeholder="Tell Chef Michael about timelines, VIP talent riders, equipment access, or bar service requirements..."
          value={formData.specialRequests}
          onChange={(e) => updateFormData({ specialRequests: e.target.value })}
          className="w-full bg-slate-50 text-slate-800 text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4A2373]/20 font-medium"
        />
      </div>
    </div>
  );
};
