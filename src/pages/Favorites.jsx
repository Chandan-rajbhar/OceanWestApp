import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Trash2, ArrowRight, Utensils, Building, Sparkles } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { FOOD_ITEMS } from '../data/menus';
import { RECOMMENDED_VENUES } from '../data/venues';
import { CATERING_SERVICES } from '../data/services';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';

export const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavoriteItem, toggleFavoriteVenue, toggleFavoriteService } = useFavorites();

  const [activeTab, setActiveTab] = useState('all');

  const favoriteFood = FOOD_ITEMS.filter((f) => favorites.foodItems.includes(f.id));
  const favoriteVenues = RECOMMENDED_VENUES.filter((v) => favorites.venues.includes(v.id));
  const favoriteServices = CATERING_SERVICES.filter((s) => favorites.services.includes(s.id));

  const totalCount = favoriteFood.length + favoriteVenues.length + favoriteServices.length;

  return (
    <div className="flex flex-col pb-16">
      {/* Header */}
      <div className="bg-white/95 px-4 pt-3 pb-3 border-b border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-1.5">
          <Badge variant="bubblegum" size="sm" icon={Heart}>
            Saved Selections
          </Badge>
          <span className="text-[10px] font-bold text-slate-500">
            {totalCount} Total Saved
          </span>
        </div>

        <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
          Favorites &amp; Bookmarks
        </h1>
        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
          Saved dishes, preferred venues, and signature catering services.
        </p>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: `All (${totalCount})` },
            { id: 'food', label: `Dishes (${favoriteFood.length})` },
            { id: 'venues', label: `Venues (${favoriteVenues.length})` },
            { id: 'services', label: `Services (${favoriteServices.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[#4A2373] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-4">
        {totalCount === 0 ? (
          <EmptyState
            icon={Heart}
            title="No Saved Items Yet"
            description="Tap the heart icon on any food dish, venue, or catering service to save it here for quick access."
            actionText="Explore Menus"
            onAction={() => navigate('/menus')}
            className="my-6"
          />
        ) : (
          <>
            {/* Food Section */}
            {(activeTab === 'all' || activeTab === 'food') && favoriteFood.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-2 uppercase tracking-wider">
                  <Utensils className="w-3.5 h-3.5 text-[#4A2373]" />
                  <span>Favorite Dishes ({favoriteFood.length})</span>
                </h3>
                <div className="flex flex-col gap-2">
                  {favoriteFood.map((dish) => (
                    <div
                      key={dish.id}
                      onClick={() => navigate('/menus')}
                      className="bg-white/95 rounded-2xl p-2.5 border border-slate-200/80 shadow-xs flex items-center gap-3 cursor-pointer group"
                    >
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-slate-900 group-hover:text-[#4A2373] transition-colors truncate">
                          {dish.name}
                        </h4>
                        <span className="text-[9px] font-semibold text-slate-500 block mt-0.5">
                          Min 25 guests • {dish.dietary?.[0] || 'Pacific Fresh'}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavoriteItem(dish.id, dish.name);
                        }}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl"
                        title="Remove from favorites"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Venues Section */}
            {(activeTab === 'all' || activeTab === 'venues') && favoriteVenues.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-2 uppercase tracking-wider">
                  <Building className="w-3.5 h-3.5 text-[#FE8500]" />
                  <span>Saved Venues ({favoriteVenues.length})</span>
                </h3>
                <div className="flex flex-col gap-2">
                  {favoriteVenues.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => navigate('/venues')}
                      className="bg-white/95 rounded-2xl p-2.5 border border-slate-200/80 shadow-xs flex items-center gap-3 cursor-pointer group"
                    >
                      <img
                        src={v.image}
                        alt={v.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-slate-900 group-hover:text-[#4A2373] transition-colors truncate">
                          {v.name}
                        </h4>
                        <span className="text-[9px] font-semibold text-slate-500 block mt-0.5">
                          {v.location} • {v.capacity}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavoriteVenue(v.id, v.name);
                        }}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl"
                        title="Remove from favorites"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services Section */}
            {(activeTab === 'all' || activeTab === 'services') && favoriteServices.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-2 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Saved Services ({favoriteServices.length})</span>
                </h3>
                <div className="flex flex-col gap-2">
                  {favoriteServices.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => navigate(`/services/${s.id}`)}
                      className="bg-white/95 rounded-2xl p-2.5 border border-slate-200/80 shadow-xs flex items-center gap-3 cursor-pointer group"
                    >
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-slate-900 group-hover:text-[#4A2373] transition-colors truncate">
                          {s.title}
                        </h4>
                        <span className="text-[9px] font-semibold text-slate-500 block mt-0.5">
                          {s.badge} • {s.guestRange}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavoriteService(s.id, s.title);
                        }}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl"
                        title="Remove from favorites"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};


