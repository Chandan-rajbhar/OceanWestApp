import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  X,
  CheckCheck,
  Trash2,
  Calendar,
  Sparkles,
  Utensils,
  ArrowRight,
  Phone
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationsModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    clearAllNotifications,
    initiateCall
  } = useApp();

  if (!isOpen) return null;

  const handleNotificationClick = (notif) => {
    markNotificationRead(notif.id);
    onClose();
    if (notif.link) {
      navigate(notif.link);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'quote':
        return <Calendar className="w-4 h-4 text-[#4A2373]" />;
      case 'menu':
        return <Utensils className="w-4 h-4 text-[#FE8500]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#4A2373]" />;
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop tap area */}
      <div className="flex-1" onClick={onClose} />

      {/* Slide-up sheet */}
      <div
        className="w-full bg-[#F0F0F0] rounded-t-[32px] shadow-2xl border-t border-white/80 overflow-hidden flex flex-col max-h-[85%] animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pull handle */}
        <div className="pt-3 pb-1 flex justify-center bg-white/95">
          <div className="w-12 h-1 rounded-full bg-slate-300" />
        </div>

        {/* Header */}
        <div className="px-4 py-3 bg-white/95 border-b border-slate-200/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#4A2373]/10 flex items-center justify-center text-[#4A2373]">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                  Notifications
                </h3>
                {unreadNotificationsCount > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FE8500] text-white">
                    {unreadNotificationsCount} new
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-500 font-medium">
                Live catering proposals &amp; menu updates
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {unreadNotificationsCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-[10px] font-bold text-[#4A2373] hover:text-[#3A195C] px-2 py-1 rounded-lg hover:bg-[#4A2373]/10 transition-colors flex items-center gap-1"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark Read</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-3.5 overflow-y-auto no-scrollbar flex-1 flex flex-col gap-2">
          {notifications && notifications.length > 0 ? (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer relative group flex items-start gap-3 ${
                  item.unread
                    ? 'bg-white border-[#4A2373]/30 shadow-xs'
                    : 'bg-white/70 border-slate-200/70 hover:bg-white'
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    item.unread ? 'bg-[#4A2373]/10' : 'bg-slate-100'
                  }`}
                >
                  {getIcon(item.type)}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4
                      className={`text-xs leading-snug truncate ${
                        item.unread
                          ? 'font-extrabold text-slate-900'
                          : 'font-semibold text-slate-700'
                      }`}
                    >
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-medium shrink-0">
                      {item.time}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-tight">
                    {item.message}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100/80">
                    <span className="text-[10px] font-bold text-[#4A2373] flex items-center gap-1 group-hover:text-[#FE8500] transition-colors">
                      <span>View details</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(item.id);
                      }}
                      className="p-1 text-slate-300 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Dismiss notification"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Unread indicator dot */}
                {item.unread && (
                  <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#FE8500] ring-2 ring-white" />
                )}
              </div>
            ))
          ) : (
            <div className="py-10 text-center flex flex-col items-center justify-center text-slate-400">
              <div className="w-12 h-12 rounded-2xl bg-slate-200/60 flex items-center justify-center text-slate-400 mb-2">
                <Bell className="w-6 h-6 stroke-[1.5]" />
              </div>
              <p className="font-bold text-xs text-slate-700">No New Notifications</p>
              <p className="text-[11px] text-slate-400 max-w-[220px] mt-0.5">
                You're all caught up! New proposal updates and seasonal tasting menus will appear here.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-white/95 border-t border-slate-200/80 flex items-center justify-between">
          {notifications && notifications.length > 0 ? (
            <button
              onClick={clearAllNotifications}
              className="text-[10px] font-semibold text-slate-400 hover:text-rose-500 transition-colors"
            >
              Clear all
            </button>
          ) : (
            <span />
          )}

          <button
            onClick={initiateCall}
            className="text-[10px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200/60 transition-colors"
          >
            <Phone className="w-3 h-3 text-emerald-600" />
            <span>Call Chef: (604) 722-4857</span>
          </button>
        </div>
      </div>
    </div>
  );
};

