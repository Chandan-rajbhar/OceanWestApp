import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const DEFAULT_USER = {
  id: 'usr-1',
  name: 'Taylor Evans',
  firstName: 'Taylor',
  lastName: 'Evans',
  email: 'taylor.evans@vancouverevents.ca',
  phone: '604-722-1920',
  city: 'Richmond',
  company: 'Evans & Co. Hospitality',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  notifications: {
    emailQuotes: true,
    smsReminders: true,
    seasonalTastingMenus: true
  }
};

const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Custom Proposal Ready',
    message: 'Executive Chef Michael Thomas has updated your West Coast Coastal Buffet quote for 50 guests.',
    time: '10m ago',
    unread: true,
    type: 'quote',
    link: '/events'
  },
  {
    id: 'notif-2',
    title: 'Seasonal Spring Menu',
    message: 'Wild BC Pacific Halibut & Spot Prawns are now available for summer bookings.',
    time: '2h ago',
    unread: true,
    type: 'menu',
    link: '/menus'
  },
  {
    id: 'notif-3',
    title: 'Peak Weekend Availability',
    message: 'Summer 2026 dates across Richmond and Vancouver are now open for reservations.',
    time: '1d ago',
    unread: false,
    type: 'booking',
    link: '/book'
  }
];

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('owc_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const saved = localStorage.getItem('owc_auth');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [toast, setToast] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('owc_notifications');
      return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
    } catch {
      return DEFAULT_NOTIFICATIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('owc_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.error(e);
    }
  }, [notifications]);

  const unreadNotificationsCount = notifications.filter((n) => n.unread).length;

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: false } : item))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
    showToast('All notifications marked as read', 'info');
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    showToast('All notifications cleared', 'info');
  };

  useEffect(() => {
    try {
      localStorage.setItem('owc_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('owc_auth', JSON.stringify(isAuthenticated));
    } catch (e) {
      console.error(e);
    }
  }, [isAuthenticated]);

  const showToast = (message, type = 'success', duration = 3200) => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, duration);
  };

  const hideToast = () => setToast(null);

  const updateUser = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
    showToast('Profile updated successfully');
  };

  const login = (email) => {
    setIsAuthenticated(true);
    setUser((prev) => ({
      ...prev,
      email: email || prev.email,
      name: email ? email.split('@')[0] : prev.name
    }));
    setIsAuthModalOpen(false);
    showToast('Signed in successfully');
  };

  const signup = (userData) => {
    setIsAuthenticated(true);
    setUser((prev) => ({
      ...prev,
      ...userData,
      name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'Guest'
    }));
    setIsAuthModalOpen(false);
    showToast('Welcome to Ocean West Catering!');
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('Signed out of demo session', 'info');
  };

  const initiateCall = () => {
    window.location.href = 'tel:6047224857';
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        toast,
        isAuthModalOpen,
        authMode,
        notifications,
        unreadNotificationsCount,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
        clearAllNotifications,
        showToast,
        hideToast,
        updateUser,
        login,
        signup,
        logout,
        setIsAuthModalOpen,
        setAuthMode,
        initiateCall
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

