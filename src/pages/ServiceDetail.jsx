import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, CalendarCheck, CheckCircle2, Utensils, Heart, ShieldCheck, Clock } from 'lucide-react';
import { CATERING_SERVICES } from '../data/services';
import { FOOD_ITEMS } from '../data/menus';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useBooking } from '../context/BookingContext';
import { useFavorites } from '../context/FavoritesContext';

export const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setService } = useBooking();
  const { toggleFavoriteService, isServiceFavorite } = useFavorites();

  const service = CATERING_SERVICES.find((s) => s.id === id) || CATERING_SERVICES[0];
  const isFav = isServiceFavorite(service.id);

  const handleBook = () => {
    setService(service.id, service.title);
    navigate('/book');
  };

  // Get recommended dishes
  const recommendedDishes = FOOD_ITEMS.filter((f) => service.recommendedMenus?.includes(f.id));

  return (
    <div className="flex flex-col pb-20">
      {/* Top Bar with Back Button */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-4 py-2.5 border-b border-slate-200/80 flex items-center justify-between shadow-xs">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#4A2373] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Services</span>
        </button>

        <button
          onClick={() => toggleFavoriteService(service.id, service.title)}
          className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
            isFav
              ? 'bg-rose-50 text-rose-600'
              : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
          }`}
          title="Favorite Service"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Hero Cover */}
      <div className="relative h-56 w-full bg-slate-900 overflow-hidden">
        <img
          src={service.coverImage || service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute top-4 left-4">
          <Badge
            variant={service.id === 'weddings' ? 'galactic' : service.id === 'film' ? 'bubblegum' : 'neutral'}
            size="md"
            className="bg-white/90 backdrop-blur-xs font-bold shadow-md"
          >
            {service.badge}
          </Badge>
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-xl font-extrabold leading-tight drop-shadow-md">
            {service.title}
          </h1>
          <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-200 font-semibold">
            <span className="flex items-center gap-1 bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
              <Users className="w-3.5 h-3.5 text-[#FE8500]" />
              <span>{service.guestRange}</span>
            </span>
            <span className="flex items-center gap-1 bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
              <Clock className="w-3.5 h-3.5 text-[#4A2373]" />
              <span>{service.leadTime}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 flex flex-col gap-4">
        {/* Full Overview */}
        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Service Overview
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {service.fullDescription}
          </p>
        </div>

        {/* Catering Styles */}
        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Available Catering Styles
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {service.cateringStyles.map((style, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-bold text-slate-800 flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-[#4A2373] shrink-0" />
                <span className="truncate">{style}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features & Hospitality */}
        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Key Highlights &amp; Inclusions
          </h3>
          <div className="flex flex-col gap-2">
            {service.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Dishes */}
        {recommendedDishes.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Recommended Menu Selections
              </h3>
              <button
                onClick={() => navigate('/menus')}
                className="text-[11px] font-bold text-[#4A2373] hover:underline"
              >
                Full Catalog
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {recommendedDishes.map((dish) => (
                <div
                  key={dish.id}
                  onClick={() => navigate('/menus')}
                  className="bg-white/95 rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs cursor-pointer group"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-20 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="p-2">
                    <h5 className="font-bold text-[11px] text-slate-900 truncate">
                      {dish.name}
                    </h5>
                    <span className="text-[9px] text-[#4A2373] font-semibold">
                      Min 25 guests
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quote CTA Button */}
        <div className="pt-2">
          <Button
            variant="accent"
            fullWidth
            size="lg"
            icon={CalendarCheck}
            onClick={handleBook}
            className="text-xs py-3.5 shadow-xl shadow-[#FE8500]/30"
          >
            Request a Quote for {service.title}
          </Button>
        </div>
      </div>
    </div>
  );
};


