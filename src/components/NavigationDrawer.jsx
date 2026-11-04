import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  X,
  Home,
  Sparkles,
  Utensils,
  Calendar,
  Clock,
  Mail,
  Compass,
  ShoppingBag,
  User,
  Phone,
  ChevronRight,
  ShieldCheck,
  MapPin,
  ChefHat,
  Calculator,
  Sliders,
  PhoneCall
} from 'lucide-react';
import { CONTACT_INFO } from '../data/cateringData';

export default function NavigationDrawer({
  isOpen,
  onClose,
  selectedDishesCount,
  onOpenMyMenu,
  onOpenConsultModal,
  onOpenPlannerModal,
  onOpenExperiencesModal,
  onOpenQuotationModal,
  onOpenCustomizationModal,
  onOpenSupportModal,
  showToast
}) {
  if (!isOpen) return null;

  return (
    <div
      className="app-nav-drawer-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      <div className="app-nav-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header-row">
          <div className="drawer-chef-intro">
            <span className="drawer-eyebrow">Pacific Coast Commissary</span>
            <h3 className="drawer-title">Executive Chef Michael Thomas</h3>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close menu drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Primary Route Navigation Links */}
        <nav className="drawer-nav-links" aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <div className="drawer-nav-item-icon">
              <Home size={18} />
            </div>
            <div className="drawer-nav-item-text">
              <div className="drawer-item-title">Home</div>
              <span className="drawer-item-desc">Artisanal Northwest Catering &amp; Highlights</span>
            </div>
            <ChevronRight size={16} className="drawer-item-arrow" />
          </NavLink>

          <NavLink
            to="/disciplines"
            className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <div className="drawer-nav-item-icon">
              <Sparkles size={18} />
            </div>
            <div className="drawer-nav-item-text">
              <div className="drawer-item-title">Disciplines</div>
              <span className="drawer-item-desc">Weddings, Film Craft, Galas &amp; BBQs</span>
            </div>
            <ChevronRight size={16} className="drawer-item-arrow" />
          </NavLink>

          <NavLink
            to="/courses"
            className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <div className="drawer-nav-item-icon">
              <Utensils size={18} />
            </div>
            <div className="drawer-nav-item-text">
              <div className="drawer-item-title">Courses &amp; Delicacies</div>
              <span className="drawer-item-desc">Breakfast, Lunch, Dinner, Canapés &amp; Grazing</span>
            </div>
            <ChevronRight size={16} className="drawer-item-arrow" />
          </NavLink>

          <NavLink
            to="/packages"
            className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <div className="drawer-nav-item-icon">
              <Calendar size={18} />
            </div>
            <div className="drawer-nav-item-text">
              <div className="drawer-item-title">Event Packages</div>
              <span className="drawer-item-desc">Intimate, Grand Wedding &amp; Production Tiers</span>
            </div>
            <ChevronRight size={16} className="drawer-item-arrow" />
          </NavLink>

          <NavLink
            to="/film-catering"
            className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <div className="drawer-nav-item-icon">
              <Clock size={18} />
            </div>
            <div className="drawer-nav-item-text">
              <div className="drawer-item-title">Film &amp; Media Catering</div>
              <span className="drawer-item-desc">24/7 Mobile Galleys &amp; Hot Craft Trucks</span>
            </div>
            <ChevronRight size={16} className="drawer-item-arrow" />
          </NavLink>

          <NavLink
            to="/inquiry"
            className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <div className="drawer-nav-item-icon">
              <Mail size={18} />
            </div>
            <div className="drawer-nav-item-text">
              <div className="drawer-item-title">Direct Inquiries</div>
              <span className="drawer-item-desc">Proposals, Dates &amp; Custom Menu Requests</span>
            </div>
            <ChevronRight size={16} className="drawer-item-arrow" />
          </NavLink>
        </nav>

        {/* Drawer Planning & Action Tools */}
        <div className="drawer-action-block">
          {onOpenExperiencesModal && (
            <button
              type="button"
              className="drawer-action-btn gold"
              onClick={() => {
                onClose();
                onOpenExperiencesModal();
              }}
            >
              <ChefHat size={17} />
              <span>Culinary Experiences &amp; Chef Portfolio</span>
            </button>
          )}

          {onOpenQuotationModal && (
            <button
              type="button"
              className="drawer-action-btn subtle"
              onClick={() => {
                onClose();
                onOpenQuotationModal();
              }}
            >
              <Calculator size={17} />
              <span>Quotation &amp; Invoicing Estimator</span>
            </button>
          )}

          {onOpenCustomizationModal && (
            <button
              type="button"
              className="drawer-action-btn subtle"
              onClick={() => {
                onClose();
                onOpenCustomizationModal();
              }}
            >
              <Sliders size={17} />
              <span>Event Customization &amp; Moodboard</span>
            </button>
          )}

          <button
            type="button"
            className="drawer-action-btn primary"
            onClick={() => {
              onClose();
              onOpenPlannerModal();
            }}
          >
            <Compass size={17} />
            <span>Interactive Event Planner</span>
          </button>

          <button
            type="button"
            className="drawer-action-btn subtle"
            onClick={() => {
              onClose();
              onOpenMyMenu();
            }}
          >
            <ShoppingBag size={17} />
            <span>Open "My Menu" Builder ({selectedDishesCount})</span>
          </button>

          {onOpenSupportModal && (
            <button
              type="button"
              className="drawer-action-btn subtle"
              onClick={() => {
                onClose();
                onOpenSupportModal();
              }}
            >
              <PhoneCall size={17} />
              <span>Customer Support &amp; Concierge</span>
            </button>
          )}
        </div>

        {/* Drawer Direct Contact Footer */}
        <div className="drawer-contacts-footer">
          <div className="drawer-contact-line">
            <Phone size={15} style={{ color: '#BA8D5B', flexShrink: 0 }} />
            <a href={`tel:${CONTACT_INFO.directPhone.replace(/-/g, '')}`}>
              Chef Direct: <strong>{CONTACT_INFO.directPhone}</strong>
            </a>
          </div>
          <div className="drawer-contact-line">
            <Clock size={15} style={{ color: '#BA8D5B', flexShrink: 0 }} />
            <a href={`tel:${CONTACT_INFO.officePhone.replace(/-/g, '')}`}>
              Kitchen Office: <strong>{CONTACT_INFO.officePhone}</strong>
            </a>
          </div>
          <div className="drawer-contact-address">
            <MapPin size={13} style={{ color: '#8C8478', display: 'inline', marginRight: '4px' }} />
            <span>{CONTACT_INFO.commissaryAddress}</span>
          </div>
          <div className="drawer-vch-badge">
            <ShieldCheck size={13} style={{ color: '#2F6141', flexShrink: 0 }} />
            <span>Vancouver Coastal Health 100% Certified Commissary Kitchen</span>
          </div>
        </div>
      </div>
    </div>
  );
}
