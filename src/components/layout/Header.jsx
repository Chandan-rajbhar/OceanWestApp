import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, unreadNotificationsCount } = useApp();

  const isProfileActive = location.pathname === '/profile';
  const isNotificationsActive = location.pathname === '/notifications';

  return (
    <header className="shrink-0 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/70 px-4 py-2.5 flex items-center justify-between transition-colors shadow-xs">
      {/* Brand Left - Clean & Impactful */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2.5 text-left group focus:outline-none"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4A2373] via-[#3D1B60] to-[#2C1247] flex items-center justify-center shadow-md shadow-[#4A2373]/30 shrink-0 border border-white/25 group-hover:scale-105 transition-transform duration-200">
          <svg
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M2 17c.6.5 1.2 1 2.5 1s2.5-1 3.5-1 2.5 1 3.5 1 2.5-1 3.5-1"
              stroke="#FE8500"
              strokeWidth="2.8"
            />
            <path d="M2 12c.6.5 1.2 1 2.5 1s2.5-1 3.5-1 2.5 1 3.5 1 2.5-1 3.5-1" />
            <circle cx="17" cy="6" r="3" fill="#FE8500" stroke="none" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-[15px] tracking-wide text-slate-900 leading-tight group-hover:text-[#4A2373] transition-colors">
            OCEAN WEST
          </span>
          <span className="text-[9px] font-bold tracking-widest text-[#4A2373] uppercase mt-0.5 leading-none">
            FINE CATERING
          </span>
        </div>
      </button>

      {/* Clean Right Controls: Notification Bell + Profile Avatar */}
      <div className="flex items-center gap-2">
        {/* Modern Notification Bell Button - Navigates to /notifications page */}
        <button
          onClick={() => navigate('/notifications')}
          className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 border shadow-xs ${
            isNotificationsActive
              ? 'bg-[#4A2373]/15 text-[#4A2373] border-[#4A2373]/40 ring-2 ring-[#4A2373]/20'
              : 'bg-slate-100 hover:bg-[#4A2373]/10 text-slate-700 hover:text-[#4A2373] border-slate-200/80'
          }`}
          title="Notifications Page"
          aria-label="View notifications page"
        >
          <Bell className="w-4 h-4 stroke-[2]" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FE8500] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FE8500] ring-2 ring-white" />
            </span>
          )}
        </button>

        {/* Profile / Account Button */}
        <button
          onClick={() => navigate('/profile')}
          className={`relative p-0.5 rounded-full transition-all duration-200 active:scale-95 ${
            isProfileActive
              ? 'ring-2 ring-[#4A2373] ring-offset-2 ring-offset-white'
              : 'ring-1 ring-slate-200 hover:ring-slate-300'
          }`}
          title="Profile & Account"
        >
          {isAuthenticated && user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
              <User className="w-4 h-4" />
            </div>
          )}
          {isAuthenticated && (
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#FE8500] ring-1.5 ring-white" />
          )}
        </button>
      </div>
    </header>
  );
};
