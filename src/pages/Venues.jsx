import React, { useState, useMemo } from 'react';
import { Search, MapPin, Building, Sparkles, X } from 'lucide-react';
import { RECOMMENDED_VENUES } from '../data/venues';
import { VenueCard } from '../components/venues/VenueCard';
import { VenueDetailModal } from '../components/venues/VenueDetailModal';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';

export const Venues = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [selectedVenue, setSelectedVenue] = useState(null);

  const cities = ['all', 'Richmond', 'Vancouver'];

  const filteredVenues = useMemo(() => {
    return RECOMMENDED_VENUES.filter((v) => {
      const cityMatch = cityFilter === 'all' || v.city.toLowerCase() === cityFilter.toLowerCase();
      const query = searchQuery.toLowerCase().trim();
      const queryMatch =
        !query ||
        v.name.toLowerCase().includes(query) ||
        v.location.toLowerCase().includes(query) ||
        v.description.toLowerCase().includes(query) ||
        v.vibe.toLowerCase().includes(query);

      return cityMatch && queryMatch;
    });
  }, [searchQuery, cityFilter]);

  return (
    <div className="flex flex-col pb-24">
      {/* Header */}
      <div className="bg-white/95 px-4 pt-3 pb-3 border-b border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-1.5">
          <Badge variant="galactic" size="sm" icon={Sparkles}>
            Venue Partnerships
          </Badge>
          <span className="text-[10px] font-bold text-slate-500">
            Richmond &amp; Vancouver
          </span>
        </div>

        <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
          Catering Venues Explorer
        </h1>
        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
          Historic halls, waterfront decks, and farmsteads vetted for Ocean West catering.
        </p>

        {/* Search */}
        <div className="relative mt-2.5">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search UBC Boathouse, Heritage Hall, farms..."
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

        {/* City Filter Pills */}
        <div className="flex items-center gap-1.5 mt-2.5">
          {cities.map((c) => (
            <button
              key={c}
              onClick={() => setCityFilter(c)}
              className={`text-xs font-bold px-3 py-1 rounded-xl transition-all ${
                cityFilter === c
                  ? 'bg-[#4A2373] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {c === 'all' ? 'All Locations' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Venues Grid */}
      <div className="p-3.5 flex flex-col gap-3">
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              onOpenDetails={(v) => setSelectedVenue(v)}
            />
          ))
        ) : (
          <EmptyState
            icon={Building}
            title="No Venues Match Your Search"
            description="Try clearing your search terms or selecting another city."
            actionText="View All Venues"
            onAction={() => {
              setSearchQuery('');
              setCityFilter('all');
            }}
            className="my-6"
          />
        )}
      </div>

      {/* Detail Modal */}
      <VenueDetailModal
        venue={selectedVenue}
        isOpen={Boolean(selectedVenue)}
        onClose={() => setSelectedVenue(null)}
      />
    </div>
  );
};


