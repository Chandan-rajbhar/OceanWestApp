import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  FileText,
  Heart,
  Utensils,
  MapPin,
  Bell,
  MessageSquare,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function ProfilePage({
  formData = {},
  setFormData,
  selectedDishes = [],
  favoriteDishes = [],
  onOpenStatusModal,
  onOpenMyMenu,
  onOpenSupportModal,
  onOpenConsultModal,
  onOpenChecklistModal,
  onOpenQuotationModal,
  onOpenCustomizationModal,
  onOpenServingGuideModal,
  onOpenPdfModal,
  onOpenResetConfirm,
  onOpenNotificationsModal,
  showToast
}) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(formData.fullName || 'Aditya Vishwakarma');
  const [userEmail, setUserEmail] = useState(formData.email || 'aditya@email.com');

  const handleEditToggle = () => {
    if (isEditing) {
      if (setFormData) {
        setFormData((prev) => ({
          ...prev,
          fullName: userName,
          email: userEmail
        }));
      }
      if (showToast) showToast('Profile details updated!');
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleLogout = () => {
    if (onOpenResetConfirm) {
      onOpenResetConfirm();
    } else if (showToast) {
      showToast('Logged out of demo session');
    }
  };

  // 8 Menu Items matching Screen 11:
  // 1. My Bookings -> onOpenStatusModal
  // 2. Quotes & Payments -> onOpenQuotationModal
  // 3. Saved Menus -> navigate('/cart')
  // 4. Dietary Preferences -> onOpenCustomizationModal
  // 5. Addresses -> open address prompt/toast
  // 6. Notifications -> onOpenNotificationsModal
  // 7. Support Tickets -> onOpenSupportModal
  // 8. Settings -> onOpenResetConfirm
  const menuItems = [
    {
      id: 'bookings',
      icon: Calendar,
      label: 'My Bookings',
      action: () => (onOpenStatusModal ? onOpenStatusModal() : null)
    },
    {
      id: 'quotes',
      icon: FileText,
      label: 'Quotes & Payments',
      action: () => (onOpenQuotationModal ? onOpenQuotationModal('wedding') : null)
    },
    {
      id: 'menus',
      icon: Heart,
      label: 'Saved Menus',
      action: () => navigate('/cart')
    },
    {
      id: 'dietary',
      icon: Utensils,
      label: 'Dietary Preferences',
      action: () => (onOpenCustomizationModal ? onOpenCustomizationModal() : null)
    },
    {
      id: 'addresses',
      icon: MapPin,
      label: 'Addresses',
      action: () => {
        if (showToast) showToast('Saved address: 11300 River Road, Richmond, BC');
      }
    },
    {
      id: 'notifications',
      icon: Bell,
      label: 'Notifications',
      action: () => (onOpenNotificationsModal ? onOpenNotificationsModal() : null)
    },
    {
      id: 'support',
      icon: MessageSquare,
      label: 'Support Tickets',
      action: () => (onOpenSupportModal ? onOpenSupportModal() : null)
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
      action: () => (onOpenResetConfirm ? onOpenResetConfirm() : null)
    }
  ];

  return (
    <div className="profile-screen-container">
      {/* ------------------------------------------------------------------ */}
      {/* 1. HERO PROFILE CARD (SCREEN 11)                                    */}
      {/* ------------------------------------------------------------------ */}
      <div className="profile-plum-hero-card">
        <div className="profile-hero-content">
          <div className="profile-avatar-circle">
            <span>AV</span>
          </div>
          <div className="profile-hero-info">
            {isEditing ? (
              <div className="profile-edit-inputs">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="profile-edit-input"
                  placeholder="Full Name"
                />
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="profile-edit-input"
                  placeholder="Email Address"
                />
              </div>
            ) : (
              <>
                <h2 className="profile-user-name">{userName}</h2>
                <p className="profile-user-email">{userEmail}</p>
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          className="profile-edit-btn"
          onClick={handleEditToggle}
          aria-label={isEditing ? 'Save profile' : 'Edit profile'}
        >
          {isEditing ? 'Save Profile' : 'Edit Profile'}
        </button>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. INSET GROUPED LIST (SCREEN 11)                                   */}
      {/* ------------------------------------------------------------------ */}
      <div className="profile-menu-inset-card">
        {menuItems.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              className={`profile-menu-row-item ${idx !== menuItems.length - 1 ? 'has-divider' : ''}`}
              onClick={item.action}
            >
              <div className="profile-menu-item-left">
                <div className="profile-menu-icon-wrap">
                  <IconComponent size={18} strokeWidth={2} />
                </div>
                <span className="profile-menu-label">{item.label}</span>
              </div>
              <ChevronRight size={16} className="profile-menu-chevron" />
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. LOG OUT BUTTON (SCREEN 11)                                       */}
      {/* ------------------------------------------------------------------ */}
      <button
        type="button"
        className="btn-profile-logout"
        onClick={handleLogout}
      >
        <LogOut size={16} />
        <span>Log Out</span>
      </button>

      {/* Footer Branding Info */}
      <div className="profile-footer-version">
        <p>Ocean West Catering App • Version 2.4.0</p>
      </div>
    </div>
  );
}
