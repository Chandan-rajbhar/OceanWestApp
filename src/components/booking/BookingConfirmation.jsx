import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Calendar, FileText, ArrowRight, Home, PhoneCall, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useApp } from '../../context/AppContext';

export const BookingConfirmation = ({ booking, onReset }) => {
  const navigate = useNavigate();
  const { initiateCall } = useApp();

  if (!booking) return null;

  return (
    <div className="p-4 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
      {/* Success Animated Icon */}
      <div className="w-16 h-16 rounded-3xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/15 ring-8 ring-emerald-500/5">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <Badge variant="bubblegum" size="sm" className="mb-2">
        Inquiry Successfully Transmitted
      </Badge>

      <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
        Catering Quote Request Logged!
      </h2>

      <p className="text-xs text-slate-500 max-w-xs mt-1.5 leading-relaxed font-medium">
        Thank you, <strong className="text-slate-800">{booking.customer.firstName}</strong>. Your customized event request has been routed directly to Executive Chef Michael Thomas.
      </p>

      {/* Reference Card */}
      <div className="w-full bg-white/95 rounded-3xl p-4 my-4 border border-slate-200/80 shadow-md text-left">
        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">Demo Reference ID</span>
            <span className="text-base font-extrabold text-[#4A2373] tracking-wide">
              {booking.referenceNumber}
            </span>
          </div>
          <Badge variant="galactic" size="md">
            Status: {booking.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block">Occasion</span>
            <span className="font-bold text-slate-800">{booking.eventType}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Event Date</span>
            <span className="font-bold text-slate-800">{booking.eventDate}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Guest Count</span>
            <span className="font-bold text-slate-800">{booking.guestCount} Guests</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Location</span>
            <span className="font-bold text-slate-800 truncate block">{booking.venueName}</span>
          </div>
        </div>

        {booking.selectedMenuItems && booking.selectedMenuItems.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-slate-100">
            <span className="text-[10px] text-slate-400 block mb-1">
              Selected Menu Items ({booking.selectedMenuItems.length})
            </span>
            <div className="flex flex-wrap gap-1">
              {booking.selectedMenuItems.map((item) => (
                <span
                  key={item.id}
                  className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Process Notice */}
      <div className="w-full bg-blue-50/80 border border-blue-200/70 p-3 rounded-2xl text-left mb-4 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-[#4A2373] shrink-0 mt-0.5" />
        <div className="text-[11px] text-slate-700 leading-relaxed">
          <strong className="text-slate-900 font-bold">What happens next? </strong>
          Our catering office prepares a formal itemized proposal reflecting fresh seasonal ingredients, staffing needs, and venue equipment. You can monitor its status anytime in <strong className="text-[#4A2373]">My Events</strong>.
        </div>
      </div>

      {/* Actions */}
      <div className="w-full flex flex-col gap-2">
        <Button
          variant="primary"
          fullWidth
          size="md"
          icon={FileText}
          onClick={() => {
            onReset();
            navigate('/events');
          }}
          className="text-xs py-3"
        >
          View in My Inquiries &amp; Bookings
        </Button>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Home}
            onClick={() => {
              onReset();
              navigate('/');
            }}
            className="text-xs py-2.5"
          >
            Home
          </Button>

          <Button
            variant="glass"
            size="sm"
            icon={PhoneCall}
            onClick={initiateCall}
            className="text-xs py-2.5"
          >
            Call Office
          </Button>
        </div>
      </div>
    </div>
  );
};


