import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  Heart,
  Layers,
  Bell,
  LogIn,
  LogOut,
  Edit3,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useFavorites } from '../context/FavoritesContext';
import { useMenu } from '../context/MenuContext';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { AuthModal } from '../components/profile/AuthModal';

export const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, setIsAuthModalOpen, setAuthMode, isAuthModalOpen } = useApp();
  const { totalFavoritesCount } = useFavorites();
  const { totalItemsCount } = useMenu();
  const { allBookings } = useBooking();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [notifications, setNotifications] = useState({
    emailQuotes: true,
    smsAlerts: true,
    tastingMenus: true
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col pb-3">
      {/* Top Profile Header */}
      <div className="bg-white/95 px-4 pt-3 pb-4 border-b border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#4A2373]" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#4A2373]">
              Coordinator Profile
            </span>
          </div>

          {isAuthenticated ? (
            <button
              onClick={logout}
              className="text-[11px] font-bold text-rose-500 hover:text-rose-700 flex items-center gap-1 transition-colors px-2 py-0.5 rounded-lg hover:bg-rose-50"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setAuthMode('login');
                setIsAuthModalOpen(true);
              }}
              className="text-[11px] font-bold text-[#4A2373] hover:underline flex items-center gap-1"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <img
              src={
                user?.avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
              }
              alt={user?.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#4A2373] shadow-xs"
            />
            {isAuthenticated && (
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#FE8500] ring-2 ring-white shadow-xs" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-black text-slate-900 leading-tight truncate">
                {user?.name || 'Guest Planner'}
              </h2>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FE8500] shrink-0" />
            </div>
            <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
              {user?.email || 'guest@example.com'}
            </p>
            <span className="text-[10px] font-bold text-[#4A2373] bg-[#4A2373]/10 px-2 py-0.5 rounded-md inline-block mt-1 truncate">
              {user?.company || 'Evans & Co. Hospitality'}
            </span>
          </div>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
            title="Edit Profile"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-3.5 flex flex-col gap-3">
        {/* Activity & Workflow Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div
            onClick={() => navigate('/events')}
            className="bg-white rounded-2xl p-2.5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col items-center text-center cursor-pointer hover:border-[#4A2373] transition-all group"
          >
            <Calendar className="w-5 h-5 text-[#4A2373] mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-black text-slate-900 leading-none">
              {allBookings.length}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold mt-1">
              Inquiries
            </span>
          </div>

          <div
            onClick={() => navigate('/menu-builder')}
            className="bg-white rounded-2xl p-2.5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col items-center text-center cursor-pointer hover:border-[#FE8500] transition-all group"
          >
            <Layers className="w-5 h-5 text-[#FE8500] mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-black text-slate-900 leading-none">
              {totalItemsCount}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold mt-1">
              Custom Menu
            </span>
          </div>

          <div
            onClick={() => navigate('/favorites')}
            className="bg-white rounded-2xl p-2.5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col items-center text-center cursor-pointer hover:border-rose-400 transition-all group"
          >
            <Heart className="w-5 h-5 text-rose-500 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-black text-slate-900 leading-none">
              {totalFavoritesCount}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold mt-1">
              Saved
            </span>
          </div>
        </div>

        {/* Coordinator Profile Details */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900">
              Coordinator Information
            </h3>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="text-[11px] font-bold text-[#4A2373] hover:underline"
            >
              Edit
            </button>
          </div>

          <div className="flex flex-col gap-2.5 text-xs">
            <div className="flex items-center gap-2.5 text-slate-700">
              <Mail className="w-4 h-4 text-[#FE8500] shrink-0" />
              <span className="truncate font-medium">{user?.email || 'No email set'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <Phone className="w-4 h-4 text-[#4A2373] shrink-0" />
              <span className="font-medium">{user?.phone || '604-722-1920'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <MapPin className="w-4 h-4 text-[#FE8500] shrink-0" />
              <span className="font-medium">Primary Hub: {user?.city || 'Richmond'}, BC</span>
            </div>
          </div>
        </div>

        {/* Catering Coordinator Preferences */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs">
          <h3 className="text-xs font-bold text-slate-900 mb-2.5 flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-[#4A2373]" />
            <span>Event &amp; Notification Alerts</span>
          </h3>

          <div className="flex flex-col gap-2.5">
            {[
              {
                key: 'emailQuotes',
                title: 'Email Quote Updates',
                desc: 'Instant notifications when Chef Michael updates your menu proposal'
              },
              {
                key: 'smsAlerts',
                title: 'SMS Delivery & Schedule Alerts',
                desc: 'Text updates regarding mobile kitchen arrival and call-sheets'
              },
              {
                key: 'tastingMenus',
                title: 'Seasonal Seafood Releases',
                desc: 'Notices when wild BC salmon and spot prawn seasons open'
              }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between gap-2 pt-1.5 first:pt-0">
                <div className="min-w-0 pr-2">
                  <h5 className="text-xs font-bold text-slate-900 leading-tight">{item.title}</h5>
                  <p className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => toggleNotification(item.key)}
                  className={`w-9 h-5 rounded-full transition-colors relative p-0.5 shrink-0 ${
                    notifications[item.key] ? 'bg-[#4A2373]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                      notifications[item.key] ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Chef Support Card */}
        <div className="p-3.5 bg-gradient-to-br from-[#4A2373] via-[#3D1B60] to-[#2C1247] rounded-3xl text-white shadow-md">
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-[#FE8500]">
            <ShieldCheck className="w-4 h-4" />
            <span>Executive Chef Dispatch</span>
          </div>
          <p className="text-[11px] text-slate-200 leading-relaxed font-normal mb-3">
            Speak directly with Ocean West coordinators for urgent film schedule changes or summer weekend inquiries.
          </p>
          <Button
            variant="accent"
            fullWidth
            size="sm"
            onClick={() => (window.location.href = 'tel:6047224857')}
            className="text-xs py-2.5 font-bold shadow-md shadow-[#FE8500]/30"
          >
            Direct Call: (604) 722-4857
          </Button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};
