import React from 'react';
import { ShieldCheck, X, FileText, CheckCircle2 } from 'lucide-react';

export default function PolicyModal({ isOpen, onClose, policyType }) {
  if (!isOpen) return null;

  const isPrivacy = policyType === 'privacy';

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={isPrivacy ? 'Privacy Policy' : 'Dietary Policies'}>
      <div className="modal-content-box policy-dialog-box" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close Dialog"
        >
          <X size={18} />
        </button>

        <div className="modal-header-centered">
          <div className="modal-icon-badge">
            {isPrivacy ? <FileText size={24} /> : <ShieldCheck size={24} />}
          </div>
          <h3 className="modal-heading">
            {isPrivacy ? 'Privacy & Event Confidentiality' : 'Dietary & Allergen Protocols'}
          </h3>
          <p className="modal-subtext">
            {isPrivacy
              ? 'Our commitment to private clients, high-profile nuptials, and studio film productions.'
              : 'Vancouver Coastal Health certified allergen separation and dietary standards.'}
          </p>
        </div>

        <div className="policy-text-body">
          {isPrivacy ? (
            <>
              <p>
                <strong>Strict Client Confidentiality:</strong> Ocean West Catering operates with utmost discretion. All high-profile guest lists, celebrity film shoot call sheets, NDA requirements, and private property locations are handled with strict operational secrecy.
              </p>
              <p>
                <strong>Data Protection:</strong> Event inquiries, telephone numbers, and email addresses collected through this web app are utilized exclusively for preparing your catering proposal. We never sell, lease, or distribute client records.
              </p>
              <p>
                <strong>Security Standards:</strong> Commercial contracts and digital deposit records are encrypted under Canadian PIPEDA privacy regulations.
              </p>
            </>
          ) : (
            <>
              <div className="policy-bullet-row">
                <CheckCircle2 size={16} className="policy-check" />
                <span><strong>Segregated Prep Zones:</strong> Our Richmond commissary maintains dedicated stainless steel preparation stations for celiac-safe gluten-free and allergen-free items.</span>
              </div>
              <div className="policy-bullet-row">
                <CheckCircle2 size={16} className="policy-check" />
                <span><strong>Individual Labeling:</strong> Film craft meals, wedding dietary plates, and corporate luncheon boxes are individually packaged, tamper-sealed, and clearly marked with guest dietary designations.</span>
              </div>
              <div className="policy-bullet-row">
                <CheckCircle2 size={16} className="policy-check" />
                <span><strong>100% VCH Audit Score:</strong> Licensed and regularly inspected under Vancouver Coastal Health food-safety guidelines with FoodSafe Level 2 certified kitchen captains on every shift.</span>
              </div>
            </>
          )}
        </div>

        <button
          type="button"
          className="btn-outline-subtle"
          style={{ width: '100%', justifyContent: 'center', marginTop: '18px' }}
          onClick={onClose}
        >
          Dismiss &amp; Return to App
        </button>
      </div>
    </div>
  );
}

