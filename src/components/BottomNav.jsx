import React from 'react';
import { NavLink } from 'react-router-dom';
<<<<<<< Updated upstream
import { Home, BookOpen, Sparkles, Calendar, ShoppingBag } from 'lucide-react';
=======
import { Utensils, BookOpen, Sparkles, Calendar } from 'lucide-react';
>>>>>>> Stashed changes

export default function BottomNav({
  cartCount = 0,
  cartTotal = 0,
  inquiryBadgeCount = 0
}) {
  return (
    <nav className="app-bottom-nav" aria-label="Mobile Navigation Bar">
      {/* 1. Home Tab */}
      <NavLink
        to="/"
        end
        className={({ isActive }) => `bottom-tab-link ${isActive ? 'active' : ''}`}
      >
        <div className="tab-icon-wrap">
<<<<<<< Updated upstream
          <Home size={18} strokeWidth={2.2} />
=======
          <Utensils size={18} strokeWidth={2} />
>>>>>>> Stashed changes
        </div>
        <span className="tab-label">Home</span>
      </NavLink>

      {/* 2. Menus Tab */}
      <NavLink
        to="/courses"
        className={({ isActive }) => `bottom-tab-link ${isActive ? 'active' : ''}`}
      >
        <div className="tab-icon-wrap">
          <BookOpen size={18} strokeWidth={2} />
        </div>
        <span className="tab-label">Menus</span>
      </NavLink>

      {/* 3. Cart Tab */}
      <NavLink
        to="/cart"
        className={({ isActive }) => `bottom-tab-link ${isActive ? 'active' : ''}`}
        aria-label={`Open Cart (${cartCount} items)`}
      >
        <div className="tab-icon-wrap relative">
          <ShoppingBag size={18} strokeWidth={2.2} />
          {cartCount > 0 && (
            <span className="bottom-tab-badge">{cartCount}</span>
          )}
        </div>
        <span className="tab-label">Cart</span>
      </NavLink>

      {/* 4. Services Tab */}
      <NavLink
        to="/disciplines"
        className={({ isActive }) => `bottom-tab-link ${isActive ? 'active' : ''}`}
      >
        <div className="tab-icon-wrap">
          <Sparkles size={18} strokeWidth={2} />
        </div>
        <span className="tab-label">Services</span>
      </NavLink>

      {/* 5. Book Tab */}
      <NavLink
        to="/inquiry"
        className={({ isActive }) => `bottom-tab-link ${isActive ? 'active' : ''}`}
      >
        <div className="tab-icon-wrap relative">
<<<<<<< Updated upstream
          <Calendar size={18} strokeWidth={2.2} />
          <span className="bottom-tab-badge">
            {inquiryBadgeCount > 0 ? inquiryBadgeCount : 2}
          </span>
=======
          <Calendar size={18} strokeWidth={2} />
          {inquiryBadgeCount > 0 && (
            <span className="bottom-tab-badge">{inquiryBadgeCount}</span>
          )}
>>>>>>> Stashed changes
        </div>
        <span className="tab-label">Book</span>
      </NavLink>
    </nav>
  );
}
