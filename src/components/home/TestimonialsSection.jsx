import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ChevronRight, Quote } from 'lucide-react';
import { CLIENT_TESTIMONIALS } from '../../data/testimonials';

export const TestimonialsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-3">
      {/* Header */}
      <div className="flex items-center justify-between px-4 mb-2.5">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
            Client Testimonials
          </h2>
          <p className="text-[11px] text-slate-500 font-medium">
            Real feedback from weddings &amp; productions
          </p>
        </div>
        <button
          onClick={() => navigate('/reviews')}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#4A2373] hover:text-[#3A195C] transition-colors"
        >
          <span>Reviews</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar snap-x snap-mandatory">
        {CLIENT_TESTIMONIALS.map((review) => (
          <div
            key={review.id}
            onClick={() => navigate('/reviews')}
            className="w-[260px] shrink-0 bg-white/95 rounded-2xl p-3.5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between snap-start cursor-pointer group"
          >
            <div>
              {/* Stars & Event */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FE8500] text-[#FE8500]" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-[#4A2373] bg-[#4A2373]/10 px-2 py-0.5 rounded-full">
                  {review.event.split(' ')[0]}
                </span>
              </div>

              {/* Quote */}
              <p className="text-[11px] text-slate-700 font-medium italic line-clamp-3 leading-relaxed relative">
                "{review.quote}"
              </p>
            </div>

            {/* Author */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h5 className="font-bold text-xs text-slate-900">{review.author}</h5>
                <p className="text-[9px] text-slate-500 truncate max-w-[170px]">{review.venue}</p>
              </div>
              <span className="text-[9px] font-semibold text-slate-400">{review.date.split(' ')[1]}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


