import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Utensils,
  Menu as MenuIcon,
  X,
  Phone,
  User,
  ShoppingBag
} from 'lucide-react';

export default function Header({
  isScrolled,
  selectedDishesCount,
  onOpenMyMenu,
  onOpenContactModal,
  onOpenConsultModal,
  drawerOpen,
  onToggleDrawer,
  onCloseDrawer,
  showToast
}) {
  return (
    <>
      {/* Top Notice Bar - Hidden when drawer is open to match reference design */}
      {!drawerOpen && (
        <aside className="app-top-notice-bar" aria-label="Announcement & Contact Bar">
          <div className="notice-pill-row">
            <span className="notice-geo">BC Pacific Northwest Catering</span>
            <span className="notice-separator">•</span>
            <a href="tel:6047224857" className="notice-phone-link">
              <Phone size={10} />
              <span>Direct: 604-722-4857</span>
            </a>
          </div>
        </aside>
      )}

      {/* Main Sticky Header with Dropdown Navigation Drawer */}
      <header className={`app-main-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="app-header-inner">
          {/* Brand Logo */}
          <Link to="/" className="app-brand-link" onClick={onCloseDrawer}>
            <div className="app-brand-icon">
              <Utensils size={16} strokeWidth={2.4} />
            </div>
            <div className="app-brand-text">
              <span className="app-brand-title">Ocean West</span>
              <span className="app-brand-sub">Fine Catering &amp; Services</span>
            </div>
          </Link>

          {/* Action Icons Group */}
          <div className="app-header-actions">
            {!drawerOpen ? (
              <>
                {/* My Menu Builder Shortcut Pill */}
                <button
                  type="button"
                  className="app-header-menu-pill"
                  onClick={onOpenMyMenu}
                  title="View Selected Dishes in My Menu"
                  aria-label={`My Menu with ${selectedDishesCount} selected dishes`}
                >
                  <ShoppingBag size={14} />
                  <span className="menu-pill-label">My Menu</span>
                  {selectedDishesCount > 0 && (
                    <span className="menu-pill-count">{selectedDishesCount}</span>
                  )}
                </button>

                {/* Quick Contact Shortcut */}
                <button
                  type="button"
                  className="app-header-action-icon"
                  onClick={onOpenContactModal}
                  title="Call, Email or Find Us"
                  aria-label="Contact Shortcuts"
                >
                  <Phone size={15} />
                </button>

                {/* 3 Horizontal Lines Hamburger Drawer Toggle */}
                <button
                  type="button"
                  className="app-hamburger-toggle"
                  onClick={onToggleDrawer}
                  aria-label="Open navigation menu"
                  aria-expanded="false"
                >
                  <MenuIcon size={22} />
                </button>
              </>
            ) : (
              /* Close Button when Drawer is Open */
              <button
                type="button"
                className="app-hamburger-toggle close-state"
                onClick={onToggleDrawer}
                aria-label="Close navigation menu"
                aria-expanded="true"
              >
                <X size={24} />
              </button>
            )}
          </div>
        </div>

        {/* Dropdown Mobile Navigation Drawer - Matches Reference Design Exactly */}
        {drawerOpen && (
          <div className="mobile-nav-drawer">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={onCloseDrawer}
            >
              Home
            </NavLink>
            <NavLink
              to="/disciplines"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={onCloseDrawer}
            >
              Disciplines
            </NavLink>
            <NavLink
              to="/courses"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={onCloseDrawer}
            >
              Courses &amp; Delicacies
            </NavLink>
            <NavLink
              to="/packages"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={onCloseDrawer}
            >
              Event Packages
            </NavLink>
            <NavLink
              to="/film-catering"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={onCloseDrawer}
            >
              Film &amp; Media Catering
            </NavLink>
            <NavLink
              to="/inquiry"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={onCloseDrawer}
            >
              Direct Inquiries
            </NavLink>

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
                  if (showToast) {
                    showToast('Ocean West Client Portal login is active for contracted events.');
                  }
                }}
              >
                <User size={15} />
                <span>Client Portal Access</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
