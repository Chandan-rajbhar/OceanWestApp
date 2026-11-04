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

// Catering Features Components
import BudgetEstimatorModal from './components/BudgetEstimatorModal';
import PackageComparisonModal from './components/PackageComparisonModal';
import EventChecklistModal from './components/EventChecklistModal';
import InquiryStatusModal from './components/InquiryStatusModal';
import ServingGuideModal from './components/ServingGuideModal';
import PhotoGalleryModal from './components/PhotoGalleryModal';
import ResetConfirmModal from './components/ResetConfirmModal';

// Modules 4, 5, 6 & 8 Components
import CulinaryExperiencesModal from './components/CulinaryExperiencesModal';
import EventCustomizationModal from './components/EventCustomizationModal';
import QuotationPaymentModal from './components/QuotationPaymentModal';
import CustomerSupportModal from './components/CustomerSupportModal';

import HomePage from './pages/HomePage';
import DisciplinesPage from './pages/DisciplinesPage';
import CoursesPage from './pages/CoursesPage';
import PackagesPage from './pages/PackagesPage';
import FilmCateringPage from './pages/FilmCateringPage';
import InquiryPage from './pages/InquiryPage';
import ProfilePage from './pages/ProfilePage';
import { MENU_COURSES } from './data/cateringData';

const STORAGE_KEY_FORM = 'oceanwest_inquiry_draft_v1';
const STORAGE_KEY_DISHES = 'oceanwest_selected_dishes_v1';
const STORAGE_KEY_FAVORITES = 'oceanwest_favorite_dishes_v1';
const STORAGE_KEY_CHECKLIST = 'oceanwest_checklist_v1';

const DEFAULT_FORM_DATA = {
  fullName: '',
  email: '',
  phone: '',
  category: 'Weddings & Receptions',
  eventDate: '',
  guestCount: '75',
  location: 'Richmond / Metro Vancouver',
  serviceStyle: 'plated',
  notes: '',
  dietaryChips: [],
  severeAllergies: '',
  isFilmRequest: false,
  productionName: '',
  shootStartDate: '',
  shootEndDate: '',
  crewSize: '120',
  mealCalls: ['Hot Breakfast Call', 'Seated Hot Lunch'],
  locationMoves: '',
  craftNeeds: 'Hot Galley Truck & Continuous Espresso',
  customizations: {
    serviceStyle: 'plated',
    tableSetup: 'rustic_pnw',
    staffingTier: 'full_team',
    beveragePreference: 'bc_wine',
    decorPreferences: ['wildflowers'],
    uploadedImages: []
  }
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

  // 2. Saved Planning Draft State in LocalStorage
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FORM);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read form draft from local storage:', e);
    }
    return DEFAULT_FORM_DATA;
  });

  // Selected dishes in My Menu
  const [selectedDishes, setSelectedDishes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DISHES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read saved dishes from local storage:', e);
    }
    return [];
  });

  // Saved Favorite Dishes
  const [favoriteDishes, setFavoriteDishes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FAVORITES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read favorites from local storage:', e);
    }
    return [2]; // default favorite e.g. Wild Pacific Salmon
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

  // Synchronize favorites to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(favoriteDishes));
    } catch (e) {
      console.warn('Could not save favorite dishes:', e);
    }
  }, [favoriteDishes]);

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

  // Catering Modals State
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [budgetModalPackage, setBudgetModalPackage] = useState('wedding');
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isServingGuideOpen, setIsServingGuideOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Customer App Features State (Modules 4, 5, 6, 8)
  const [isExperiencesModalOpen, setIsExperiencesModalOpen] = useState(false);
  const [isCustomizationModalOpen, setIsCustomizationModalOpen] = useState(false);
  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);
  const [quotationModalPackage, setQuotationModalPackage] = useState('corporate');
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // 5. Menu Builder handlers
  const handleToggleDishInMenu = (dish) => {
    setSelectedDishes((prev) => {
      const exists = prev.some((d) => d.id === dish.id);
      if (exists) {
        showToast(`Removed "${dish.title}" from My Menu.`);
        return prev.filter((d) => d.id !== dish.id);
      } else {
        showToast(`Added "${dish.title}" to My Menu!`);
        return [...prev, dish];
      }
    });
  };

  const handleRemoveDish = (dishId) => {
    setSelectedDishes((prev) => prev.filter((d) => d.id !== dishId));
    showToast('Removed dish from My Menu.');
  };

  const handleClearMenu = () => {
    setSelectedDishes([]);
    showToast('Cleared all items from My Menu.');
  };

  const handleApplyMenuToInquiry = () => {
    if (selectedDishes.length === 0) return;
    showToast(`${selectedDishes.length} curated menu items attached to your inquiry!`);
  };

  // 6. Favorites handlers
  const handleToggleFavorite = (dish, alsoAddToMenu = false) => {
    setFavoriteDishes((prev) => {
      const exists = prev.includes(dish.id);
      let next;
      if (exists && !alsoAddToMenu) {
        showToast(`Removed "${dish.title}" from saved favorites.`);
        next = prev.filter((id) => id !== dish.id);
      } else {
        if (!exists) {
          showToast(`Saved "${dish.title}" to your favorites!`);
          next = [...prev, dish.id];
        } else {
          next = prev;
        }
      }
      return next;
    });

    if (alsoAddToMenu) {
      handleToggleDishInMenu(dish);
    }
  };

  const handleAddAllFavoritesToMenu = () => {
    const favoriteObjects = MENU_COURSES.filter((d) => favoriteDishes.includes(d.id));
    if (favoriteObjects.length === 0) return;
    setSelectedDishes((prev) => {
      const newItems = favoriteObjects.filter((f) => !prev.some((p) => p.id === f.id));
      return [...prev, ...newItems];
    });
    showToast(`Added ${favoriteObjects.length} favorites into My Menu!`);
  };

  // 7. Event Planner handler
  const handleApplyPlan = (planResult) => {
    setFormData((prev) => ({
      ...prev,
      category: planResult.category || prev.category,
      guestCount: planResult.guestCount || prev.guestCount,
      eventDate: planResult.eventDate || prev.eventDate,
      location: planResult.location || prev.location,
      serviceStyle: planResult.serviceStyle || prev.serviceStyle,
      notes: (prev.notes ? prev.notes + '\n\n' : '') + planResult.notesAppended
    }));
    showToast(`Planner applied: ${planResult.category} (${planResult.guestCount} guests).`);
  };

  // 8. Budget Estimator handler
  const handleApplyEstimate = (estResult) => {
    setFormData((prev) => ({
      ...prev,
      category: estResult.packageName || prev.category,
      guestCount: estResult.guestCount || prev.guestCount,
      notes: (prev.notes ? prev.notes + '\n\n' : '') + estResult.notes
    }));
    showToast(`Estimate applied: ${estResult.packageName} for ${estResult.guestCount} guests.`);
  };

  // 9. Save Customizations handler (Module 5)
  const handleSaveCustomizations = (customizedData) => {
    setFormData((prev) => ({
      ...prev,
      customizations: customizedData,
      serviceStyle: customizedData.serviceStyle || prev.serviceStyle,
      severeAllergies: customizedData.dietaryAllergyNotes || prev.severeAllergies,
      notes:
        (prev.notes ? prev.notes + '\n\n' : '') +
        (customizedData.specialInstructions
          ? `[Custom Logistics & Style Notes: ${customizedData.specialInstructions}]`
          : '')
    }));
  };

  // 10. Reset Planning Draft handler with confirmation
  const handleConfirmReset = () => {
    setFormData(DEFAULT_FORM_DATA);
    setSelectedDishes([]);
    setFavoriteDishes([]);
    setFormSubmitted(false);
    try {
      localStorage.removeItem(STORAGE_KEY_FORM);
      localStorage.removeItem(STORAGE_KEY_DISHES);
      localStorage.removeItem(STORAGE_KEY_FAVORITES);
      localStorage.removeItem(STORAGE_KEY_CHECKLIST);
    } catch (e) {
      console.warn(e);
    }
    showToast('Planning draft, tasting menus, and saved favorites have been reset.');
  };

  // 11. Form handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        {/* Compact Sticky Header with sleek dropdown navigation */}
        <Header
          isScrolled={isScrolled}
          selectedDishesCount={selectedDishes.length}
          onOpenMyMenu={() => setIsMyMenuOpen(true)}
          onOpenContactModal={() => setIsContactModalOpen(true)}
          onOpenConsultModal={() => setIsConsultModalOpen(true)}
          onOpenStatusModal={() => setIsStatusModalOpen(true)}
          onOpenPlannerModal={() => setIsPlannerModalOpen(true)}
          onOpenBudgetModal={(pkgId) => {
            setBudgetModalPackage(pkgId || 'wedding');
            setIsBudgetModalOpen(true);
          }}
          onOpenGalleryModal={() => setIsGalleryOpen(true)}
          onOpenChecklistModal={() => setIsChecklistModalOpen(true)}
          onOpenServingGuideModal={() => setIsServingGuideOpen(true)}
          onOpenExperiencesModal={() => setIsExperiencesModalOpen(true)}
          onOpenQuotationModal={() => setIsQuotationModalOpen(true)}
          onOpenCustomizationModal={() => setIsCustomizationModalOpen(true)}
          onOpenSupportModal={() => setIsSupportModalOpen(true)}
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
                  onOpenBudgetEstimator={(pkgId) => {
                    setBudgetModalPackage(pkgId || 'wedding');
                    setIsBudgetModalOpen(true);
                  }}
                  onOpenPackageComparison={() => setIsComparisonModalOpen(true)}
                  onOpenServingGuide={() => setIsServingGuideOpen(true)}
                  onOpenGallery={() => setIsGalleryOpen(true)}
                  onOpenChecklistModal={() => setIsChecklistModalOpen(true)}
                  onOpenExperiencesModal={() => setIsExperiencesModalOpen(true)}
                  onOpenQuotationModal={(pkgId) => {
                    if (pkgId) setQuotationModalPackage(pkgId);
                    setIsQuotationModalOpen(true);
                  }}
                  onOpenCustomizationModal={() => setIsCustomizationModalOpen(true)}
                  onOpenSupportModal={() => setIsSupportModalOpen(true)}
                  favoriteDishes={favoriteDishes}
                  onToggleFavorite={handleToggleFavorite}
                  selectedDishes={selectedDishes}
                  onToggleDishInMenu={handleToggleDishInMenu}
                  formData={formData}
                  setFormData={setFormData}
                  showToast={showToast}
                />
              }
            />
            <Route
              path="/disciplines"
              element={
                <DisciplinesPage
                  onOpenQuotationModal={() => setIsQuotationModalOpen(true)}
                  onOpenCustomizationModal={() => setIsCustomizationModalOpen(true)}
                  onOpenServingGuide={() => setIsServingGuideOpen(true)}
                  onOpenGallery={() => setIsGalleryOpen(true)}
                  onOpenChecklistModal={() => setIsChecklistModalOpen(true)}
                  onOpenSupportModal={() => setIsSupportModalOpen(true)}
                />
              }
            />
            <Route
              path="/courses"
              element={
                <CoursesPage
                  setIsPdfModalOpen={setIsPdfModalOpen}
                  selectedDishes={selectedDishes}
                  onToggleDishInMenu={handleToggleDishInMenu}
                  onOpenMyMenu={() => setIsMyMenuOpen(true)}
                  favoriteDishes={favoriteDishes}
                  onToggleFavorite={handleToggleFavorite}
                  onOpenServingGuide={() => setIsServingGuideOpen(true)}
                  onOpenGallery={() => setIsGalleryOpen(true)}
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
                  onOpenBudgetEstimator={(pkgId) => {
                    setBudgetModalPackage(pkgId || 'wedding');
                    setIsBudgetModalOpen(true);
                  }}
                  onOpenPackageComparison={() => setIsComparisonModalOpen(true)}
                  onOpenServingGuide={() => setIsServingGuideOpen(true)}
                  showToast={showToast}
                />
              }
            />
            <Route
              path="/film-catering"
              element={<FilmCateringPage setFormData={setFormData} showToast={showToast} />}
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
                  onOpenResetConfirm={() => setIsResetConfirmOpen(true)}
                  onOpenStatusModal={() => setIsStatusModalOpen(true)}
                  onOpenChecklistModal={() => setIsChecklistModalOpen(true)}
                  onOpenCustomizationModal={() => setIsCustomizationModalOpen(true)}
                  onOpenQuotationModal={() => setIsQuotationModalOpen(true)}
                  onToggleDishInMenu={handleToggleDishInMenu}
                  showToast={showToast}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProfilePage
                  formData={formData}
                  setFormData={setFormData}
                  selectedDishes={selectedDishes}
                  favoriteDishes={favoriteDishes}
                  onOpenStatusModal={() => setIsStatusModalOpen(true)}
                  onOpenMyMenu={() => setIsMyMenuOpen(true)}
                  onOpenSupportModal={() => setIsSupportModalOpen(true)}
                  onOpenConsultModal={() => setIsConsultModalOpen(true)}
                  onOpenChecklistModal={() => setIsChecklistModalOpen(true)}
                  onOpenQuotationModal={() => setIsQuotationModalOpen(true)}
                  onOpenCustomizationModal={() => setIsCustomizationModalOpen(true)}
                  onOpenServingGuideModal={() => setIsServingGuideOpen(true)}
                  onOpenPdfModal={() => setIsPdfModalOpen(true)}
                  onOpenResetConfirm={() => setIsResetConfirmOpen(true)}
                  showToast={showToast}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* ------------------------------------------------------------------ */}
        {/* Modals & Dialogs                                                   */}
        {/* ------------------------------------------------------------------ */}

        {/* Module 4: Culinary Experiences & Chef Portfolio */}
        <CulinaryExperiencesModal
          isOpen={isExperiencesModalOpen}
          onClose={() => setIsExperiencesModalOpen(false)}
          onSelectExperience={(exp) => {
            setFormData((prev) => ({
              ...prev,
              category: exp.title,
              notes: (prev.notes ? prev.notes + '\n\n' : '') + `[Requested Experience: ${exp.title} - ${exp.subtitle}]`
            }));
            showToast(`Selected "${exp.title}" for your inquiry draft!`);
            navigate('/inquiry');
          }}
          onOpenConsultation={() => setIsConsultModalOpen(true)}
        />

        {/* Module 5: Event Customization & Planning */}
        <EventCustomizationModal
          isOpen={isCustomizationModalOpen}
          onClose={() => setIsCustomizationModalOpen(false)}
          initialCustomizations={formData.customizations || {}}
          onSaveCustomizations={handleSaveCustomizations}
          showToast={showToast}
        />

        {/* Module 6: Indicative Quotation & Invoicing Terms */}
        <QuotationPaymentModal
          isOpen={isQuotationModalOpen}
          onClose={() => setIsQuotationModalOpen(false)}
          initialPackageId={quotationModalPackage}
          initialGuestCount={Number(formData.guestCount) || 50}
          onProceedToInquiry={(quoteDetails) => {
            setFormData((prev) => ({
              ...prev,
              category: quoteDetails.category === 'weddings' ? 'Weddings & Receptions' : 'Corporate & Galas',
              guestCount: quoteDetails.guestCount,
              notes:
                (prev.notes ? prev.notes + '\n\n' : '') +
                (quoteDetails.estimatedAmount
                  ? `[Estimated Ballpark: $${quoteDetails.estimatedAmount.toLocaleString()} CAD for ${quoteDetails.guestCount} guests]`
                  : '')
            }));
            navigate('/inquiry');
          }}
        />

        {/* Module 8: Customer Support & Concierge */}
        <CustomerSupportModal
          isOpen={isSupportModalOpen}
          onClose={() => setIsSupportModalOpen(false)}
          showToast={showToast}
        />

        {/* Menu Builder Drawer */}
        <MyMenuDrawer
          isOpen={isMyMenuOpen}
          onClose={() => setIsMyMenuOpen(false)}
          selectedDishes={selectedDishes}
          onRemoveDish={handleRemoveDish}
          onClearMenu={handleClearMenu}
          onApplyMenuToInquiry={handleApplyMenuToInquiry}
          favoriteDishes={favoriteDishes}
          onToggleFavorite={handleToggleFavorite}
          onAddAllFavoritesToMenu={handleAddAllFavoritesToMenu}
        />

        {/* Guided Event Planner */}
        <EventPlannerModal
          isOpen={isPlannerModalOpen}
          onClose={() => setIsPlannerModalOpen(false)}
          initialData={formData}
          onApplyPlan={handleApplyPlan}
        />

        {/* Indicative Budget Estimator */}
        <BudgetEstimatorModal
          isOpen={isBudgetModalOpen}
          onClose={() => setIsBudgetModalOpen(false)}
          initialPackage={budgetModalPackage}
          initialGuestCount={formData.guestCount}
          onApplyEstimate={handleApplyEstimate}
        />

        {/* Side-by-Side Package Comparison */}
        <PackageComparisonModal
          isOpen={isComparisonModalOpen}
          onClose={() => setIsComparisonModalOpen(false)}
          onSelectPackage={(pkgName, minG) => {
            setFormData((prev) => ({ ...prev, category: pkgName, guestCount: minG }));
            showToast(`Selected "${pkgName}".`);
          }}
          onOpenBudgetEstimator={(pkgId) => {
            setBudgetModalPackage(pkgId);
            setIsBudgetModalOpen(true);
          }}
        />

        {/* Event Planning Milestone Checklist */}
        <EventChecklistModal
          isOpen={isChecklistModalOpen}
          onClose={() => setIsChecklistModalOpen(false)}
          showToast={showToast}
        />

        {/* Module 7: Inquiry Status Tracker & Post-Event Feedback */}
        <InquiryStatusModal
          isOpen={isStatusModalOpen}
          onClose={() => setIsStatusModalOpen(false)}
          currentInquiryRef="OW-2026-7841"
          showToast={showToast}
        />

        {/* Serving-Size & Quantity Planning Guide */}
        <ServingGuideModal
          isOpen={isServingGuideOpen}
          onClose={() => setIsServingGuideOpen(false)}
          initialGuestCount={formData.guestCount}
          onApplyGuestCount={(count) => {
            setFormData((prev) => ({ ...prev, guestCount: count }));
            showToast(`Applied ${count} guests to inquiry.`);
          }}
        />

        {/* Culinary & Event Photo Gallery */}
        <PhotoGalleryModal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          onSelectDishToMenu={handleToggleDishInMenu}
        />

        {/* Clear Draft Confirmation Dialog */}
        <ResetConfirmModal
          isOpen={isResetConfirmOpen}
          onClose={() => setIsResetConfirmOpen(false)}
          onConfirmReset={handleConfirmReset}
        />

        {/* Date Availability Checker */}
        <AvailabilityModal
          isOpen={isAvailabilityModalOpen}
          onClose={() => setIsAvailabilityModalOpen(false)}
          onApplyDate={(date) => {
            setFormData((prev) => ({ ...prev, eventDate: date }));
            showToast(`Applied date ${date} to your inquiry!`);
          }}
        />

        {/* PDF Guide Requester */}
        <PdfGuideModal isOpen={isPdfModalOpen} onClose={() => setIsPdfModalOpen(false)} />

        {/* Private Chef Consultation & Tasting Request */}
        <ConsultationModal
          isOpen={isConsultModalOpen}
          onClose={() => setIsConsultModalOpen(false)}
          initialData={formData}
          onApplyConsultation={(data) => {
            setFormData((prev) => ({ ...prev, ...data }));
            showToast('Consultation request specifications attached to inquiry.');
          }}
        />

        {/* Contact Shortcuts Sheet */}
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
        <Toast message={toastMessage} onDismiss={() => setToastMessage('')} />
      </div>
    </MobileFrame>
  );
}
