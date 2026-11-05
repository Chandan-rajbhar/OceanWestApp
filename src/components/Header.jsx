import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Utensils,
  Menu as MenuIcon,
  X,
  Phone,
  User,
  ShoppingBag,
  Compass,
  Calculator,
  Camera,
  CheckSquare,
  Scale,
  ChefHat,
  Sliders,
  PhoneCall
} from 'lucide-react';

export default function Header({
  isScrolled,
  selectedDishesCount = 0,
  onOpenMyMenu,
  onOpenContactModal,
  onOpenConsultModal,
  onOpenStatusModal,
  onOpenPlannerModal,
  onOpenBudgetModal,
  onOpenGalleryModal,
  onOpenChecklistModal,
  onOpenServingGuideModal,
  onOpenExperiencesModal,
  onOpenQuotationModal,
  onOpenCustomizationModal,
  onOpenSupportModal,
  drawerOpen,
  onToggleDrawer,
  onCloseDrawer,
  showToast
}) {
  return (
    <>
      {/* Compact Clean Native Mobile Header */}
      <header className={`app-main-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="app-header-inner">
          {/* Brand Logo with circular plum badge and refined typography */}
          <Link to="/" className="app-brand-link" onClick={onCloseDrawer}>
            <div className="app-brand-icon-circle">
              <Utensils size={13} strokeWidth={2.2} />
            </div>
            <div className="app-brand-text">
              <span className="app-brand-title">OCEAN WEST</span>
              <span className="app-brand-sub">Richmond • Fine Catering</span>
            </div>
          </Link>

<<<<<<< Updated upstream
          {/* Action Icons Group: Only 2 Options - Contact & Profile */}
          <div className="app-header-actions">
            {/* 1. Contact / Quick Call Button */}
=======
          {/* Action Icons Group: Small, Consistent, Proportionate */}
          <div className="app-header-actions">
            {/* Quick Call Button */}
>>>>>>> Stashed changes
            <a
              href="tel:6047224857"
              className="app-header-circle-btn"
              title="Call Chef Michael Direct (604-722-4857)"
              aria-label="Contact Direct"
            >
              <Phone size={13} />
            </a>

            {/* 2. Profile Button: Navigates Directly to the Client Profile Page */}
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `app-header-circle-btn ${isActive ? 'is-active-tab' : ''}`
              }
              title="Client Profile & Account"
              aria-label="Open Client Profile"
            >
<<<<<<< Updated upstream
              <User size={15} />
            </NavLink>
=======
              {drawerOpen ? <X size={13} /> : <User size={13} />}
              {selectedDishesCount > 0 && !drawerOpen && (
                <span className="header-badge-count">{selectedDishesCount}</span>
              )}
            </button>
>>>>>>> Stashed changes
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Sleek App Drawer Overlay                                           */}
        {/* ------------------------------------------------------------------ */}
        {drawerOpen && (
          <div
            className="mobile-header-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="App Navigation Menu"
          >
            {/* Primary Navigation Links */}
            <nav className="mobile-drawer-nav-list" aria-label="Drawer Links">
              <NavLink
                to="/"
                end
                className={({ isActive }) => `mobile-drawer-nav-item ${isActive ? 'active' : ''}`}
                onClick={onCloseDrawer}
              >
                <span>Home</span>
              </NavLink>

              <NavLink
                to="/courses"
                className={({ isActive }) => `mobile-drawer-nav-item ${isActive ? 'active' : ''}`}
                onClick={onCloseDrawer}
              >
                <span>Menu &amp; Platters</span>
              </NavLink>

              <NavLink
                to="/disciplines"
                className={({ isActive }) => `mobile-drawer-nav-item ${isActive ? 'active' : ''}`}
                onClick={onCloseDrawer}
              >
                <span>Signature Services</span>
              </NavLink>

              <NavLink
                to="/packages"
                className={({ isActive }) => `mobile-drawer-nav-item ${isActive ? 'active' : ''}`}
                onClick={onCloseDrawer}
              >
                <span>Event Packages</span>
              </NavLink>

              <NavLink
                to="/film-catering"
                className={({ isActive }) => `mobile-drawer-nav-item ${isActive ? 'active' : ''}`}
                onClick={onCloseDrawer}
              >
                <span>Film &amp; TV Craft</span>
              </NavLink>

              <NavLink
                to="/inquiry"
                className={({ isActive }) => `mobile-drawer-nav-item ${isActive ? 'active' : ''}`}
                onClick={onCloseDrawer}
              >
                <span>Book &amp; Inquire</span>
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) => `mobile-drawer-nav-item ${isActive ? 'active' : ''}`}
                onClick={onCloseDrawer}
              >
                <span>Client Profile</span>
              </NavLink>
            </nav>

            {/* My Menu Shortcut in Drawer */}
            <div className="drawer-menu-builder-shortcut">
              <button
                type="button"
                className="btn-drawer-my-menu"
                onClick={() => {
                  onCloseDrawer();
                  if (onOpenMyMenu) onOpenMyMenu();
                }}
              >
                <ShoppingBag size={15} />
                <span>My Menu &amp; Platter Builder</span>
                {selectedDishesCount > 0 && (
                  <span className="drawer-menu-count">{selectedDishesCount}</span>
                )}
              </button>
            </div>

            {/* Interactive Planning Tools Section */}
            <div className="drawer-tools-section">
              <span className="drawer-tools-label">App Planning Suite:</span>
              <div className="drawer-tools-grid">
                <button
                  type="button"
                  className="drawer-tool-pill"
                  onClick={() => {
                    onCloseDrawer();
                    if (onOpenPlannerModal) onOpenPlannerModal();
                  }}
                >
                  <Compass size={13} />
                  <span>Event Planner</span>
                </button>

                {onOpenExperiencesModal && (
                  <button
                    type="button"
                    className="drawer-tool-pill"
                    onClick={() => {
                      onCloseDrawer();
                      onOpenExperiencesModal();
                    }}
                  >
                    <ChefHat size={13} />
                    <span>Culinary Experiences</span>
                  </button>
                )}

                {onOpenQuotationModal && (
                  <button
                    type="button"
                    className="drawer-tool-pill"
                    onClick={() => {
                      onCloseDrawer();
                      onOpenQuotationModal();
                    }}
                  >
                    <Calculator size={13} />
                    <span>Quotation Slip</span>
                  </button>
                )}

                {onOpenCustomizationModal && (
                  <button
                    type="button"
                    className="drawer-tool-pill"
                    onClick={() => {
                      onCloseDrawer();
                      onOpenCustomizationModal();
                    }}
                  >
                    <Sliders size={13} />
                    <span>Custom Setup</span>
                  </button>
                )}

                <button
                  type="button"
                  className="drawer-tool-pill"
                  onClick={() => {
                    onCloseDrawer();
                    if (onOpenGalleryModal) onOpenGalleryModal();
                  }}
                >
                  <Camera size={13} />
                  <span>Photo Gallery</span>
                </button>

                <button
                  type="button"
                  className="drawer-tool-pill"
                  onClick={() => {
                    onCloseDrawer();
                    if (onOpenChecklistModal) onOpenChecklistModal();
                  }}
                >
                  <CheckSquare size={13} />
                  <span>Milestone Checklist</span>
                </button>

                <button
                  type="button"
                  className="drawer-tool-pill"
                  onClick={() => {
                    onCloseDrawer();
                    if (onOpenServingGuideModal) onOpenServingGuideModal();
                  }}
                >
                  <Scale size={13} />
                  <span>Serving Guide</span>
                </button>

                {onOpenSupportModal && (
                  <button
                    type="button"
                    className="drawer-tool-pill"
                    onClick={() => {
                      onCloseDrawer();
                      onOpenSupportModal();
                    }}
                  >
                    <PhoneCall size={13} />
                    <span>Concierge Support</span>
                  </button>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mobile-drawer-actions">
              <button
                type="button"
                className="btn-primary-gold mobile-drawer-btn"
                onClick={() => {
                  onCloseDrawer();
                  if (onOpenConsultModal) onOpenConsultModal();
                }}
              >
                <span>Book Private Consultation</span>
              </button>

              <button
                type="button"
                className="btn-outline-subtle mobile-drawer-btn"
                onClick={() => {
                  onCloseDrawer();
                  if (onOpenStatusModal) onOpenStatusModal();
                }}
              >
                <User size={15} />
                <span>Client Portal &amp; Inquiry Status</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
