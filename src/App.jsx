import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

import MobileFrame from './components/MobileFrame';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import MyMenuDrawer from './components/MyMenuDrawer';
import EventPlannerModal from './components/EventPlannerModal';
import AvailabilityModal from './components/AvailabilityModal';
import PdfGuideModal from './components/PdfGuideModal';
import ConsultationModal from './components/ConsultationModal';
import ContactShortcutsModal from './components/ContactShortcutsModal';
import PolicyModal from './components/PolicyModal';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import DisciplinesPage from './pages/DisciplinesPage';
import CoursesPage from './pages/CoursesPage';
import PackagesPage from './pages/PackagesPage';
import FilmCateringPage from './pages/FilmCateringPage';
import InquiryPage from './pages/InquiryPage';

const STORAGE_KEY_FORM = 'oceanwest_inquiry_draft_v1';
const STORAGE_KEY_DISHES = 'oceanwest_selected_dishes_v1';

const DEFAULT_FORM_DATA = {
  fullName: '',
  email: '',
  phone: '',
  category: 'The Grand Wedding Banquet',
  eventDate: '',
  guestCount: '75',
  location: 'Richmond / Metro Vancouver',
  notes: '',
  dietaryChips: []
};

export default function App() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  // 1. Toast State
  const [toastMessage, setToastMessage] = useState('');
  const toastTimeoutRef = useRef(null);

  const showToast = (msg) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage('');
    }, 4200);
  };

  // 2. Saved Planning State in LocalStorage (Feature 6)
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FORM);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read form draft from local storage:', e);
    }
    return DEFAULT_FORM_DATA;
  });

  const [selectedDishes, setSelectedDishes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DISHES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read saved dishes from local storage:', e);
    }
    return [];
  });

  // Synchronize draft form data to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FORM, JSON.stringify(formData));
    } catch (e) {
      console.warn('Could not save form draft:', e);
    }
  }, [formData]);

  // Synchronize selected dishes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DISHES, JSON.stringify(selectedDishes));
    } catch (e) {
      console.warn('Could not save selected dishes:', e);
    }
  }, [selectedDishes]);

  // Form submission state
  const [formSubmitted, setFormSubmitted] = useState(false);

  // 3. Scroll tracking for header elevation
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollPos = e?.target?.scrollTop !== undefined ? e.target.scrollTop : window.scrollY;
      setIsScrolled(scrollPos > 18);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 4. Modals State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isPlannerModalOpen, setIsPlannerModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMyMenuOpen, setIsMyMenuOpen] = useState(false);
  const [policyModal, setPolicyModal] = useState({ open: false, type: 'privacy' });

  // 5. Menu Builder handlers (Feature 1)
  const handleToggleDishInMenu = (dish) => {
    setSelectedDishes(prev => {
      const exists = prev.some(d => d.id === dish.id);
      if (exists) {
        showToast(`Removed "${dish.title}" from My Menu.`);
        return prev.filter(d => d.id !== dish.id);
      } else {
        showToast(`Added "${dish.title}" to My Menu!`);
        return [...prev, dish];
      }
    });
  };

  const handleRemoveDish = (dishId) => {
    setSelectedDishes(prev => prev.filter(d => d.id !== dishId));
    showToast('Removed dish from My Menu.');
  };

  const handleClearMenu = () => {
    setSelectedDishes([]);
    showToast('Cleared all items from My Menu.');
  };

  const handleApplyMenuToInquiry = () => {
    if (selectedDishes.length === 0) return;
    const dishListFormatted = selectedDishes.map(d => `• ${d.title} (${d.serviceStyle || d.category})`).join('\n');
    setFormData(prev => ({
      ...prev,
      notes: (prev.notes ? prev.notes + '\n\n' : '') + `[Selected Tasting Menu Courses:\n${dishListFormatted}]`
    }));
    showToast(`${selectedDishes.length} menu items attached to your inquiry notes!`);
  };

  // 6. Event Planner handler (Feature 2)
  const handleApplyPlan = (planResult) => {
    setFormData(prev => ({
      ...prev,
      category: planResult.category || prev.category,
      guestCount: planResult.guestCount || prev.guestCount,
      eventDate: planResult.eventDate || prev.eventDate,
      location: planResult.location || prev.location,
      notes: (prev.notes ? prev.notes + '\n\n' : '') + planResult.notesAppended
    }));
    showToast(`Planner applied: ${planResult.category} (${planResult.guestCount} guests).`);
  };

  // 7. Reset Planning Draft handler (Feature 6)
  const handleResetPlanningDraft = () => {
    setFormData(DEFAULT_FORM_DATA);
    setSelectedDishes([]);
    setFormSubmitted(false);
    try {
      localStorage.removeItem(STORAGE_KEY_FORM);
      localStorage.removeItem(STORAGE_KEY_DISHES);
    } catch (e) {
      console.warn(e);
    }
    showToast('Planning draft and menu selections reset to default.');
  };

  // 8. Form handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      showToast('Please provide your full name and email address.');
      return;
    }
    setFormSubmitted(true);
    showToast('Inquiry sent successfully to Executive Chef Michael Thomas!');
  };

  return (
    <MobileFrame
      scrollContainerRef={scrollContainerRef}
      bottomBar={<BottomNav inquiryBadgeCount={selectedDishes.length} />}
    >
      <ScrollToTop scrollContainerRef={scrollContainerRef} />

      <div className="oceanwest-mobile-app">
        {/* Compact Sticky Header with sleek dropdown navigation matching reference */}
        <Header
          isScrolled={isScrolled}
          selectedDishesCount={selectedDishes.length}
          onOpenMyMenu={() => setIsMyMenuOpen(true)}
          onOpenContactModal={() => setIsContactModalOpen(true)}
          onOpenConsultModal={() => setIsConsultModalOpen(true)}
          drawerOpen={drawerOpen}
          onToggleDrawer={() => setDrawerOpen(!drawerOpen)}
          onCloseDrawer={() => setDrawerOpen(false)}
          showToast={showToast}
        />

        {/* Main Content Router */}
        <main className="app-main-content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  setIsAvailabilityModalOpen={setIsAvailabilityModalOpen}
                  setIsConsultModalOpen={setIsConsultModalOpen}
                  setIsPlannerModalOpen={setIsPlannerModalOpen}
                  selectedDishes={selectedDishes}
                  onToggleDishInMenu={handleToggleDishInMenu}
                  showToast={showToast}
                />
              }
            />
            <Route
              path="/disciplines"
              element={<DisciplinesPage />}
            />
            <Route
              path="/courses"
              element={
                <CoursesPage
                  setIsPdfModalOpen={setIsPdfModalOpen}
                  selectedDishes={selectedDishes}
                  onToggleDishInMenu={handleToggleDishInMenu}
                  onOpenMyMenu={() => setIsMyMenuOpen(true)}
                  setFormData={setFormData}
                  showToast={showToast}
                />
              }
            />
            <Route
              path="/packages"
              element={
                <PackagesPage
                  setFormData={setFormData}
                  setIsAvailabilityModalOpen={setIsAvailabilityModalOpen}
                  setIsPlannerModalOpen={setIsPlannerModalOpen}
                  showToast={showToast}
                />
              }
            />
            <Route
              path="/film-catering"
              element={
                <FilmCateringPage
                  setFormData={setFormData}
                  showToast={showToast}
                />
              }
            />
            <Route
              path="/inquiry"
              element={
                <InquiryPage
                  formData={formData}
                  setFormData={setFormData}
                  formSubmitted={formSubmitted}
                  setFormSubmitted={setFormSubmitted}
                  handleFormChange={handleFormChange}
                  handleFormSubmit={handleFormSubmit}
                  selectedDishes={selectedDishes}
                  onOpenMyMenu={() => setIsMyMenuOpen(true)}
                  onResetPlanningDraft={handleResetPlanningDraft}
                  showToast={showToast}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Luxury Footer (Commented out) */}
        {/*
        <Footer
          onOpenPolicyModal={(type) => setPolicyModal({ open: true, type })}
        />
        */}

        {/* ------------------------------------------------------------------ */}
        {/* Modals & Dialogs                                                   */}
        {/* ------------------------------------------------------------------ */}

        {/* My Menu Builder Sheet (Feature 1) */}
        <MyMenuDrawer
          isOpen={isMyMenuOpen}
          onClose={() => setIsMyMenuOpen(false)}
          selectedDishes={selectedDishes}
          onRemoveDish={handleRemoveDish}
          onClearMenu={handleClearMenu}
          onApplyMenuToInquiry={handleApplyMenuToInquiry}
        />

        {/* Interactive Event Planner (Feature 2) */}
        <EventPlannerModal
          isOpen={isPlannerModalOpen}
          onClose={() => setIsPlannerModalOpen(false)}
          initialData={formData}
          onApplyPlan={handleApplyPlan}
        />

        {/* Date Availability Checker */}
        <AvailabilityModal
          isOpen={isAvailabilityModalOpen}
          onClose={() => setIsAvailabilityModalOpen(false)}
          onApplyDate={(date) => {
            setFormData(prev => ({ ...prev, eventDate: date }));
            showToast(`Applied date ${date} to your inquiry!`);
          }}
        />

        {/* PDF Guide Requester */}
        <PdfGuideModal
          isOpen={isPdfModalOpen}
          onClose={() => setIsPdfModalOpen(false)}
        />

        {/* Private Chef Consultation Modal */}
        <ConsultationModal
          isOpen={isConsultModalOpen}
          onClose={() => setIsConsultModalOpen(false)}
        />

        {/* Contact Shortcuts Sheet (Feature 5) */}
        <ContactShortcutsModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />

        {/* Policy Dialog */}
        <PolicyModal
          isOpen={policyModal.open}
          onClose={() => setPolicyModal({ open: false, type: 'privacy' })}
          policyType={policyModal.type}
        />

        {/* Toast Notification */}
        <Toast
          message={toastMessage}
          onDismiss={() => setToastMessage('')}
        />
      </div>
    </MobileFrame>
  );
}

