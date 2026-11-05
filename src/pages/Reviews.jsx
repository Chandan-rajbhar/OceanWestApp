import React, { useState } from 'react';
import { Star, MessageSquarePlus, ShieldCheck, Quote, CheckCircle2 } from 'lucide-react';
import { CLIENT_TESTIMONIALS } from '../data/testimonials';
import { AddReviewModal } from '../components/reviews/AddReviewModal';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const Reviews = () => {
  const [reviewsList, setReviewsList] = useState(() => {
    try {
      const saved = localStorage.getItem('owc_user_reviews');
      return saved ? JSON.parse(saved) : CLIENT_TESTIMONIALS;
    } catch {
      return CLIENT_TESTIMONIALS;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleReviewAdded = (newReview) => {
    const updated = [newReview, ...reviewsList];
    setReviewsList(updated);
    try {
      localStorage.setItem('owc_user_reviews', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const filteredReviews = reviewsList.filter((r) => {
    if (filter === 'all') return true;
    if (filter === 'weddings') return r.event.toLowerCase().includes('wedding');
    if (filter === 'corporate') return r.event.toLowerCase().includes('corporate') || r.event.toLowerCase().includes('gala');
    if (filter === 'film') return r.event.toLowerCase().includes('production') || r.event.toLowerCase().includes('film');
    return true;
  });

  return (
    <div className="flex flex-col pb-16">
      {/* Header */}
      <div className="bg-white/95 px-4 pt-3 pb-3 border-b border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-1">
          <Badge variant="galactic" size="sm" icon={ShieldCheck}>
            Verified Client Reviews
          </Badge>
          <div className="flex items-center gap-1 text-xs font-bold text-[#FE8500]">
            <Star className="w-3.5 h-3.5 fill-[#FE8500]" />
            <span>5.0 / 5.0 Rating</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
              Client Testimonials
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              Real feedback from Lower Mainland wedding couples &amp; film crews.
            </p>
          </div>

          <Button
            variant="accent"
            size="sm"
            icon={MessageSquarePlus}
            onClick={() => setIsModalOpen(true)}
            className="text-xs py-1.5 px-3 shrink-0"
          >
            Review Us
          </Button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'weddings', label: 'Weddings' },
            { id: 'corporate', label: 'Corporate Galas' },
            { id: 'film', label: 'Film & Crew' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                filter === f.id
                  ? 'bg-[#4A2373] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Cards List */}
      <div className="p-4 flex flex-col gap-3">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white/95 rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Rating and Event Tag */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FE8500] text-[#FE8500]" />
                  ))}
                </div>
                <Badge variant="galactic" size="sm">
                  {rev.event}
                </Badge>
              </div>

              {/* Quote */}
              <p className="text-xs text-slate-700 italic leading-relaxed font-medium">
                "{rev.quote}"
              </p>
            </div>

            {/* Author info */}
            <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <h5 className="font-extrabold text-slate-900 leading-tight">
                  {rev.author}
                </h5>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {rev.venue}
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400">
                {rev.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Modal */}
      <AddReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewAdded={handleReviewAdded}
      />
    </div>
  );
};


