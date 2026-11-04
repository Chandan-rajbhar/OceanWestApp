import React from 'react';
import {
  AlertTriangle,
  X,
  RotateCcw,
  Check
} from 'lucide-react';

export default function ResetConfirmModal({
  isOpen,
  onClose,
  onConfirmReset
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Confirm Reset Draft">
      <div className="modal-content-box reset-confirm-box" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Cancel"
        >
          <X size={18} />
        </button>

        <div className="modal-header-centered">
          <div className="modal-icon-badge warning">
            <AlertTriangle size={24} style={{ color: '#D9534F' }} />
          </div>
          <h3 className="modal-heading">Reset Saved Planning Draft?</h3>
          <p className="modal-subtext">
            This action will erase your drafted inquiry details, selected menu tasting courses, bookmarked favorites, and checklist progress.
          </p>
        </div>

        <div className="reset-confirm-details">
          <p className="reset-warn-text">
            Your current local storage draft will be cleared. This action cannot be undone. Are you sure you wish to start over with default values?
          </p>
        </div>

        <div className="reset-actions-row">
          <button
            type="button"
            className="btn-outline-subtle"
            onClick={onClose}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <span>Keep My Draft</span>
          </button>
          <button
            type="button"
            className="btn-danger-confirm"
            onClick={() => {
              onConfirmReset();
              onClose();
            }}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <RotateCcw size={14} />
            <span>Reset All Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}

