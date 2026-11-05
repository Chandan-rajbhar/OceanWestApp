import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { Toast } from '../common/Toast';
import { useApp } from '../../context/AppContext';

export const AppLayout = () => {
  const { toast, hideToast } = useApp();
  const location = useLocation();

  // Scroll to top on route change
  React.useEffect(() => {
    const scrollContainer = document.getElementById('app-scroll-container');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  return (
    <div className="w-full h-full sm:min-h-screen bg-[#0d111a] flex items-center justify-center p-0 sm:py-6 sm:px-4 selection:bg-[#4A2373] selection:text-white overflow-hidden sm:overflow-visible">
      {/* Background ambient lighting for desktop view */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden hidden sm:block">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#4A2373]/12 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-[#FE8500]/10 rounded-full blur-[130px]" />
      </div>

      {/* Mobile Application Container */}
      <div className="fixed sm:relative inset-0 sm:inset-auto w-full sm:max-w-[390px] h-full sm:h-[90vh] sm:max-h-[852px] bg-[#F0F0F0] sm:rounded-[44px] shadow-2xl overflow-hidden flex flex-col mobile-device-frame border-0 sm:border sm:border-slate-700/50">
        
        {/* Floating Global Toast Notification */}
        <Toast toast={toast} onDismiss={hideToast} />

        {/* Permanently Fixed App Header - Top of Application */}
        <Header />

        {/* Scrollable Main Content Area */}
        <main
          id="app-scroll-container"
          className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar bg-[#F0F0F0] relative overscroll-contain"
        >
          <Outlet />
        </main>

        {/* Permanently Fixed Bottom Navigation */}
        <BottomNavigation />
      </div>
    </div>
  );
};

