import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Sparkles, Utensils, X, Layers } from 'lucide-react';
import { MENU_CATEGORIES, FOOD_ITEMS } from '../data/menus';
import { FoodItemCard } from '../components/menus/FoodItemCard';
import { FoodDetailsModal } from '../components/menus/FoodDetailsModal';
import { MenuSummaryBar } from '../components/menus/MenuSummaryBar';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const Menus = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState('all');
  const [selectedFoodDetail, setSelectedFoodDetail] = useState(null);

  const dietaryFilters = [
    { id: 'all', label: 'All Diets' },
    { id: 'Ocean-Wise', label: 'Ocean-Wise' },
    { id: 'Gluten-Free', label: 'Gluten-Free' },
    { id: 'Vegetarian', label: 'Vegetarian' },
    { id: 'Locally Sourced', label: 'Local Farm' }
  ];

  const filteredItems = useMemo(() => {
    return FOOD_ITEMS.filter((item) => {
      // Category match
      const categoryMatch = activeCategory === 'all' || item.category === activeCategory;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const searchMatch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.dietary && item.dietary.some((d) => d.toLowerCase().includes(query)));

      // Dietary filter match
      const dietaryMatch =
        selectedDietary === 'all' ||
        (item.dietary && item.dietary.some((d) => d.includes(selectedDietary)));

      return categoryMatch && searchMatch && dietaryMatch;
    });
  }, [activeCategory, searchQuery, selectedDietary]);

  return (
    <div className="flex flex-col pb-24">
      {/* Top Title Banner */}
      <div className="bg-white/95 px-4 pt-3 pb-3 border-b border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
              Food &amp; Catering Catalog
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              48+ authentic coastal culinary selections • Min 25 guests
            </p>
          </div>

          <Button
            variant="glass"
            size="sm"
            icon={Layers}
            onClick={() => navigate('/menu-builder')}
            className="text-[11px] font-bold py-1.5 px-3 border border-slate-200 text-[#4A2373]"
          >
          </Button>
        </div>

        {/* Search Input */}
        <div className="relative mt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search wild salmon, AAA beef, platters, canapés..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100/90 text-slate-900 text-xs pl-9 pr-8 py-2 rounded-xl border border-transparent focus:border-[#4A2373] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4A2373]/20 transition-all font-medium placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 14 Categories Filter Pills */}
      <div className="bg-white/70 border-b border-slate-200/60 py-2.5 px-4 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
        {MENU_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 flex items-center gap-1.5 ${isActive
                  ? 'bg-[#4A2373] text-white shadow-md shadow-[#4A2373]/25 scale-102'
                  : 'bg-white/90 text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
            >
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Dietary Sub-Filters */}
      <div className="px-4 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-bold text-slate-400 shrink-0 mr-0.5">Filter:</span>
        {dietaryFilters.map((df) => (
          <button
            key={df.id}
            onClick={() => setSelectedDietary(df.id)}
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg shrink-0 border transition-colors ${selectedDietary === df.id
                ? 'bg-[#FE8500] text-white border-[#FE8500]'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
          >
            {df.label}
          </button>
        ))}
      </div>

      {/* Food Grid / Results */}
      <div className="px-3.5 py-2">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-slate-700">
            {filteredItems.length} {filteredItems.length === 1 ? 'Dish' : 'Dishes'} Available
          </span>
          {activeCategory !== 'all' && (
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedDietary('all');
                setSearchQuery('');
              }}
              className="text-[10px] font-bold text-[#4A2373] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-2.5">
            {filteredItems.map((item) => (
              <FoodItemCard
                key={item.id}
                item={item}
                onOpenDetails={(selected) => setSelectedFoodDetail(selected)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Utensils}
            title="No dishes found"
            description="Try adjusting your search keywords or choosing another category filter."
            actionText="View All Menus"
            onAction={() => {
              setActiveCategory('all');
              setSearchQuery('');
              setSelectedDietary('all');
            }}
            className="my-6"
          />
        )}
      </div>

      {/* Food Details Bottom Sheet */}
      <FoodDetailsModal
        item={selectedFoodDetail}
        isOpen={Boolean(selectedFoodDetail)}
        onClose={() => setSelectedFoodDetail(null)}
      />

      {/* Sticky Custom Menu Summary Bar */}
      <MenuSummaryBar />
    </div>
  );
};

