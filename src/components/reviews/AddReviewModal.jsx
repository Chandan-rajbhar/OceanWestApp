import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddReviewModal = ({ isOpen, onClose, onReviewAdded }) => {
  const { showToast, user } = useApp();

  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState(user?.name || '');
  const [event, setEvent] = useState('Wedding Reception');
  const [venue, setVenue] = useState('UBC Boathouse, Richmond');
  const [quote, setQuote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quote.trim()) {
      showToast('Please enter your review comments.', 'error');
      return;
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      author: author.trim() || 'Client',
      event,
      venue,
      date: 'Just Now',
      rating,
      quote: quote.trim(),
      verified: true
    };

    onReviewAdded(newReview);
    showToast('Thank you! Your testimonial was added.', 'success');
    setQuote('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Your Catering Experience" subtitle="Review Ocean West Catering">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Rating Stars */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">Your Rating</label>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 text-[#FE8500] hover:scale-110 transition-transform"
              >
                <Star className={`w-6 h-6 ${star <= rating ? 'fill-[#FE8500]' : 'text-slate-300'}`} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">Your Name</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="e.g. Christine & David"
            className="w-full bg-white text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Event Type</label>
            <select
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              className="w-full bg-white text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:outline-none font-medium"
            >
              <option value="Wedding Reception">Wedding Reception</option>
              <option value="Corporate Gala">Corporate Gala</option>
              <option value="Film Production">Film Production</option>
              <option value="Private Celebration">Private Celebration</option>
              <option value="Summer BBQ">Summer BBQ</option>
              <option value="Celebration of Life">Celebration of Life</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Venue Location</label>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="e.g. Heritage Hall, Vancouver"
              className="w-full bg-white text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">Your Testimonial Feedback</label>
          <textarea
            rows="3"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="How was the food presentation, Chef Michael's communication, and banquet service?"
            className="w-full bg-white text-xs p-3 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:outline-none"
            required
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="accent" size="sm" type="submit">
            Post Review
          </Button>
        </div>
      </form>
    </Modal>
  );
};


