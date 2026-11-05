import React from 'react';
import { Calendar, Users, MapPin, ChevronRight, FileText, XCircle, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '../common/Badge';

export const EventCard = ({ booking, onOpenDetails, onCancel }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <Badge variant="success" size="sm" icon={CheckCircle}>Confirmed</Badge>;
      case 'Quote Prepared':
        return <Badge variant="bubblegum" size="sm" icon={FileText}>Quote Prepared</Badge>;
      case 'Under Review':
        return <Badge variant="galactic" size="sm" icon={Clock}>Under Review</Badge>;
      case 'Cancelled':
        return <Badge variant="neutral" size="sm" icon={XCircle}>Cancelled</Badge>;
      case 'Submitted':
      default:
        return <Badge variant="galactic" size="sm">Submitted</Badge>;
    }
  };

  return (
    <div
      onClick={() => onOpenDetails(booking)}
      className="bg-white/95 rounded-2xl p-3.5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
    >
      <div>
        {/* Top Reference & Status */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
          <span className="text-[11px] font-extrabold text-[#4A2373] tracking-wider">
            {booking.referenceNumber}
          </span>
          {getStatusBadge(booking.status)}
        </div>

        {/* Title */}
        <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-[#4A2373] transition-colors leading-tight">
          {booking.eventType}
        </h3>

        {/* Date and Location */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mt-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#FE8500] shrink-0" />
            <span className="truncate">{booking.eventDate || 'Pending date'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#4A2373] shrink-0" />
            <span>{booking.guestCount} Guests</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{booking.venueName} ({booking.city})</span>
        </div>

        {/* Menu items count preview */}
        {booking.selectedMenuItems && booking.selectedMenuItems.length > 0 && (
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Selected Menu:</span>
            <span className="font-bold text-slate-700">
              {booking.selectedMenuItems.length} dishes chosen
            </span>
          </div>
        )}
      </div>

      {/* Action Row */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-bold text-[#4A2373] flex items-center gap-1">
          <span>Inquiry Details</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>

        {booking.status !== 'Cancelled' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCancel(booking.id);
            }}
            className="text-[10px] font-semibold text-rose-500 hover:text-rose-700 transition-colors"
          >
            Cancel Draft
          </button>
        )}
      </div>
    </div>
  );
};


