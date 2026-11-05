import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  Trash2,
  Calendar,
  Sparkles,
  Utensils,
  ArrowRight,
  ArrowLeft,
  Phone,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';

export const Notifications = () => {
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

  const [activeTab, setActiveTab] = useState('all');

  const filterTabs = [
    { id: 'all', label: `All (${notifications.length})` },
    { id: 'quote', label: 'Proposals' },
    { id: 'menu', label: 'Menu Releases' },
    { id: 'booking', label: 'Event Alerts' }
  ];

  const filteredNotifications = useMemo(() => {
    if (activeTab === 'all') return notifications;
    return notifications.filter((item) => item.type === activeTab);
  }, [notifications, activeTab]);

  const handleNotificationClick = (item) => {
    markNotificationRead(item.id);
    if (item.link) {
      navigate(item.link);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'quote':
        return <Calendar className="w-4 h-4 text-[#4A2373]" />;
      case 'menu':
        return <Utensils className="w-4 h-4 text-[#FE8500]" />;
      case 'booking':
        return <Sparkles className="w-4 h-4 text-[#4A2373]" />;
      default:
        return <Bell className="w-4 h-4 text-[#4A2373]" />;
    }
  };

  return (
    <div className="flex flex-col min-h-full pb-24">
      {/* Header Banner */}
      <div className="bg-white/95 px-4 pt-3 pb-3 border-b border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 -ml-1 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
              title="Go Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-base font-black text-slate-900 leading-tight">
                Notifications
              </h1>
              <p className="text-[10px] text-slate-500 font-medium">
                Live proposals, menu tastings &amp; event logistics
              </p>
            </div>
          </div>

          {unreadNotificationsCount > 0 ? (
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#FE8500] text-white shadow-xs">
              {unreadNotificationsCount} New
            </span>
          ) : (
            <span className="text-[10px] font-bold text-slate-400">
              All Caught Up
            </span>
          )}
        </div>

        {/* Filter Pills & Bulk Actions */}
        <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-xl transition-all shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-[#4A2373] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {unreadNotificationsCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="text-[10px] font-bold text-[#4A2373] hover:text-[#3A195C] px-2 py-1 rounded-lg hover:bg-[#4A2373]/10 transition-colors flex items-center gap-1 shrink-0"
              title="Mark all notifications as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark All Read</span>
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-3.5 flex flex-col gap-2.5 flex-1">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNotificationClick(item)}
              className={`rounded-2xl p-3.5 border transition-all cursor-pointer group flex flex-col justify-between ${
                item.unread
                  ? 'bg-white border-[#4A2373]/30 shadow-[0_2px_12px_rgba(74,35,115,0.06)]'
                  : 'bg-white/70 border-slate-200/70 hover:bg-white'
              }`}
            >
              {/* Top Row: Icon + Title + Timestamp + Unread Dot */}
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    item.unread ? 'bg-[#4A2373]/10' : 'bg-slate-100'
                  }`}
                >
                  {getIcon(item.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3
                      className={`text-xs leading-snug truncate ${
                        item.unread
                          ? 'font-black text-slate-900 group-hover:text-[#4A2373] transition-colors'
                          : 'font-bold text-slate-700'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] text-slate-400 font-semibold">
                        {item.time}
                      </span>
                      {item.unread && (
                        <span className="w-2 h-2 rounded-full bg-[#FE8500] ring-2 ring-white" />
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 font-medium leading-relaxed mt-1">
                    {item.message}
                  </p>
                </div>
              </div>

              {/* Action Bottom Row */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#4A2373] flex items-center gap-1 group-hover:text-[#FE8500] transition-colors">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(item.id);
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Dismiss notification"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <EmptyState
            icon={Bell}
            title="No Notifications in this View"
            description="All caught up! Formal catering quotes and seasonal seafood updates will arrive here."
            actionText="Explore Menus"
            onAction={() => navigate('/menus')}
            className="my-10"
          />
        )}

        {/* Clear All Option */}
        {notifications.length > 0 && (
          <div className="flex justify-center mt-1">
            <button
              onClick={clearAllNotifications}
              className="text-[10px] font-bold text-slate-400 hover:text-rose-500 transition-colors py-1 px-3 rounded-lg hover:bg-slate-100"
            >
              Clear All Notifications
            </button>
          </div>
        )}

        {/* Support Hotline Banner */}
        <div className="mt-3 p-3.5 bg-gradient-to-br from-[#4A2373] via-[#3D1B60] to-[#2C1247] rounded-3xl text-white shadow-md flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h4 className="font-extrabold text-xs text-white leading-tight">
              Urgent Schedule Changes?
            </h4>
            <p className="text-[10px] text-slate-300 font-medium mt-0.5 leading-tight">
              Direct hotline to Executive Chef Michael
            </p>
          </div>
          <button
            onClick={initiateCall}
            className="px-3 py-1.5 rounded-xl bg-[#FE8500] hover:bg-[#e67700] text-white text-[10px] font-bold flex items-center gap-1.5 shadow-md shadow-[#FE8500]/30 shrink-0 transition-transform active:scale-95"
          >
            <Phone className="w-3 h-3" />
            <span>(604) 722-4857</span>
          </button>
        </div>
      </div>
    </div>
  );
};

