import React from 'react';
import { NavLink } from 'react-router-dom';
import { Utensils, BookOpen, Sparkles, Calendar, Mail } from 'lucide-react';

export default function BottomNav({ inquiryBadgeCount = 0 }) {
  return (
    <nav className="app-bottom-nav" aria-label="Mobile Navigation Bar">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `bottom-tab-link ${isActive ? 'active' : ''}`}
      >
        <div className="tab-icon-wrap">
          <Utensils size={18} strokeWidth={2.2} />
        </div>
        <span className="tab-label">Home</span>
      </NavLink>

      <NavLink
        to="/courses"
        className={({ isActive }) => `bottom-tab-link ${isActive ? 'active' : ''}`}
      >
        <div className="tab-icon-wrap">
          <BookOpen size={18} strokeWidth={2.2} />
        </div>
        <span className="tab-label">Menus</span>
      </NavLink>

      <NavLink
        to="/disciplines"
        className={({ isActive }) => `bottom-tab-link ${isActive ? 'active' : ''}`}
      >
        <div className="tab-icon-wrap">
          <Sparkles size={18} strokeWidth={2.2} />
        </div>
        <span className="tab-label">Services</span>
      </NavLink>

      <NavLink
        to="/inquiry"
        className={({ isActive }) => `bottom-tab-link ${isActive ? 'active' : ''}`}
      >
        <div className="tab-icon-wrap relative">
          <Calendar size={18} strokeWidth={2.2} />
          {inquiryBadgeCount > 0 && (
            <span className="bottom-tab-badge">{inquiryBadgeCount}</span>
          )}
        </div>
        <span className="tab-label">Book</span>
      </NavLink>
    </nav>
  );
}
