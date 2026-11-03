import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Sparkles, Utensils, Calendar, Mail } from 'lucide-react';

export default function BottomNav({ inquiryBadgeCount }) {
  return (
    <nav className="app-bottom-nav" aria-label="Mobile Navigation Bar">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `bottom-tab-link ${isActive ? 'active' : ''}`}
      >
        <div className="tab-icon-wrap">
          <Home size={19} />
        </div>
        <span className="tab-label">Home</span>
      </NavLink>

      <NavLink
        to="/disciplines"
        className={({ isActive }) => `bottom-tab-link ${isActive ? 'active' : ''}`}
      >
        <div className="tab-icon-wrap">
          <Sparkles size={19} />
        </div>
        <span className="tab-label">Disciplines</span>
      </NavLink>

      <NavLink
        to="/courses"
        className={({ isActive }) => `bottom-tab-link ${isActive ? 'active' : ''}`}
      >
        <div className="tab-icon-wrap">
          <Utensils size={19} />
        </div>
        <span className="tab-label">Courses</span>
      </NavLink>

      <NavLink
        to="/packages"
        className={({ isActive }) => `bottom-tab-link ${isActive ? 'active' : ''}`}
      >
        <div className="tab-icon-wrap">
          <Calendar size={19} />
        </div>
        <span className="tab-label">Packages</span>
      </NavLink>

      <NavLink
        to="/inquiry"
        className={({ isActive }) => `bottom-tab-link ${isActive ? 'active' : ''}`}
      >
        <div className="tab-icon-wrap relative">
          <Mail size={19} />
          {inquiryBadgeCount > 0 && (
            <span className="bottom-tab-badge">{inquiryBadgeCount}</span>
          )}
        </div>
        <span className="tab-label">Inquire</span>
      </NavLink>
    </nav>
  );
}

