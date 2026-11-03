import React from 'react';
import { Sparkles, X } from 'lucide-react';

export default function Toast({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="toast-notice" role="alert" aria-live="assertive">
      <Sparkles size={16} style={{ color: '#BA8D5B', flexShrink: 0 }} />
      <span className="toast-text">{message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="toast-dismiss-btn"
          aria-label="Dismiss notification"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

