import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  X,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  Calendar,
  Clock,
  ArrowRight
} from 'lucide-react';
import { CHECKLIST_MILESTONES } from '../data/cateringData';

const STORAGE_KEY_CHECKLIST = 'oceanwest_checklist_v1';

export default function EventChecklistModal({
  isOpen,
  onClose,
  showToast
}) {
  const [completedIds, setCompletedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHECKLIST);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read checklist from storage:', e);
    }
    return ['milestone-1']; // default initial inquiry checked
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHECKLIST, JSON.stringify(completedIds));
    } catch (e) {
      console.warn('Could not save checklist:', e);
    }
  }, [completedIds]);

  if (!isOpen) return null;

  const toggleMilestone = (id) => {
    setCompletedIds(prev => {
      const isDone = prev.includes(id);
      const next = isDone ? prev.filter(item => item !== id) : [...prev, id];
      if (showToast) {
        showToast(isDone ? 'Milestone unchecked.' : 'Milestone marked complete!');
      }
      return next;
    });
  };

  const handleResetChecklist = () => {
    setCompletedIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY_CHECKLIST);
    } catch (e) {
      console.warn(e);
    }
    if (showToast) showToast('Checklist progress reset.');
  };

  const progressPercent = Math.round((completedIds.length / CHECKLIST_MILESTONES.length) * 100);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Event Planning Checklist">
      <div className="modal-content-box checklist-modal-card" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close Checklist"
        >
          <X size={18} />
        </button>

        <div className="modal-header-centered">
          <div className="modal-icon-badge">
            <CheckSquare size={22} />
          </div>
          <h3 className="modal-heading">Catering Milestone Checklist</h3>
          <p className="modal-subtext">
            Track your catering timeline from preliminary inquiry to seamless event-day execution.
          </p>
        </div>

        {/* Progress Bar & Counter */}
        <div className="checklist-progress-card">
          <div className="progress-card-header">
            <span className="progress-title">Planning Progress</span>
            <span className="progress-stats">
              <strong>{completedIds.length}</strong> of {CHECKLIST_MILESTONES.length} Completed ({progressPercent}%)
            </span>
          </div>
          <div className="checklist-progress-track">
            <div
              className="checklist-progress-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Milestones List */}
        <div className="milestones-stack">
          {CHECKLIST_MILESTONES.map((item, idx) => {
            const isCompleted = completedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`milestone-item-row ${isCompleted ? 'completed' : ''}`}
                onClick={() => toggleMilestone(item.id)}
                role="checkbox"
                aria-checked={isCompleted}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    toggleMilestone(item.id);
                  }
                }}
              >
                <div className={`milestone-check-box ${isCompleted ? 'checked' : ''}`}>
                  {isCompleted && <Check size={14} strokeWidth={3} />}
                </div>

                <div className="milestone-content">
                  <div className="milestone-title-row">
                    <span className="milestone-timeline-pill">{item.timeline}</span>
                    <h4 className="milestone-title">{item.title}</h4>
                  </div>
                  <p className="milestone-desc">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer as required by Requirement 7 */}
        <div className="planner-disclaimer" style={{ marginTop: '18px' }}>
          <Info size={14} style={{ flexShrink: 0 }} />
          <span>
            <strong>Personal Planning Aid:</strong> This interactive checklist is a self-guided organizer and does not represent an official booking agreement or schedule with Ocean West Catering.
          </span>
        </div>

        {/* Footer actions */}
        <div className="checklist-footer-row">
          <button
            type="button"
            className="clear-menu-btn"
            onClick={handleResetChecklist}
            title="Reset all checkboxes"
          >
            <RotateCcw size={13} />
            <span>Reset Progress</span>
          </button>

          <button
            type="button"
            className="btn-primary-gold"
            onClick={onClose}
          >
            <span>Save &amp; Continue Planning</span>
          </button>
        </div>
      </div>
    </div>
  );
}

