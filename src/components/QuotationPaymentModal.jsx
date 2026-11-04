import React, { useState } from 'react';
import {
  X,
  Calculator,
  Printer,
  FileText,
  CreditCard,
  Building,
  CheckCircle2,
  AlertTriangle,
  Info,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Phone
} from 'lucide-react';
import { PACKAGES } from '../data/cateringData';

export default function QuotationPaymentModal({
  isOpen,
  onClose,
  initialPackageId = 'corporate',
  initialGuestCount = 50,
  onProceedToInquiry
}) {
  const [selectedPkgId, setSelectedPkgId] = useState(initialPackageId);
  const [guestCount, setGuestCount] = useState(initialGuestCount);
  const [activeTab, setActiveTab] = useState('quotation'); // 'quotation' | 'payment_terms'

  if (!isOpen) return null;

  const currentPkg = PACKAGES.find((p) => p.id === selectedPkgId) || PACKAGES[0];
  const isQuoteOnly = currentPkg.pricingType === 'quote_required' || !currentPkg.rateNumeric;

  // Calculation parameters
  const numericRate = currentPkg.rateNumeric || 0;
  const foodBaseTotal = numericRate * guestCount;
  // Estimated production/staffing baseline
  const staffingProductionEstimate = currentPkg.pricingType === 'published' ? Math.max(350, Math.round(guestCount * 12)) : 0;
  const subtotalBeforeTax = foodBaseTotal + staffingProductionEstimate;
  const gstAmount = Math.round(subtotalBeforeTax * 0.05);
  const estimatedGrandTotal = subtotalBeforeTax + gstAmount;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="modal-overlay-backdrop active"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Indicative Quotation & Payment Invoicing Terms"
    >
      <div
        className="modal-content-box quotation-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-top-header">
          <div className="modal-title-lockup">
            <span className="modal-kicker">Ocean West Transparency</span>
            <h2 className="modal-headline">Quotation &amp; Invoicing</h2>
          </div>
          <button
            type="button"
            className="modal-close-round-btn"
            onClick={onClose}
            aria-label="Close quotation and payment modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="experiences-tab-nav" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'quotation'}
            className={`exp-tab-btn ${activeTab === 'quotation' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('quotation')}
          >
            <Calculator size={14} />
            <span>Indicative Estimate</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'payment_terms'}
            className={`exp-tab-btn ${activeTab === 'payment_terms' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('payment_terms')}
          >
            <CreditCard size={14} />
            <span>Payment &amp; Invoicing Terms</span>
          </button>
        </div>

        {/* Body */}
        <div className="modal-scroll-body quotation-modal-body">
          {activeTab === 'quotation' ? (
            <div className="quotation-calc-view">
              {/* Printable container begins */}
              <div className="printable-estimate-sheet">
                <div className="estimate-sheet-header">
                  <div className="sheet-brand">
                    <span className="sheet-brand-name">Ocean West Catering</span>
                    <span className="sheet-brand-sub">Pacific Coast Commissary • Richmond, BC</span>
                  </div>
                  <div className="sheet-badge">
                    <span>ESTIMATE SLIP</span>
                  </div>
                </div>

                {/* Package & Guest Selector */}
                <div className="quote-controls-grid no-print">
                  <div className="form-group-field">
                    <label htmlFor="quote-pkg-select" className="field-label-text">
                      Select Catering Tier:
                    </label>
                    <select
                      id="quote-pkg-select"
                      value={selectedPkgId}
                      onChange={(e) => setSelectedPkgId(e.target.value)}
                      className="custom-select-input"
                    >
                      {PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} ({pkg.baseRate})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group-field">
                    <label htmlFor="quote-guest-count" className="field-label-text">
                      Estimated Guest Count: ({guestCount})
                    </label>
                    <input
                      type="range"
                      id="quote-guest-count"
                      min={currentPkg.minGuests || 15}
                      max={currentPkg.maxGuests || 300}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="custom-range-slider"
                    />
                    <div className="range-bounds-text">
                      <span>Min: {currentPkg.minGuests || 15}</span>
                      <span className="current-range-val">{guestCount} Guests</span>
                      <span>Max: {currentPkg.maxGuests || 300}</span>
                    </div>
                  </div>
                </div>

                {/* Calculation Breakdown or Custom Notice */}
                {isQuoteOnly ? (
                  <div className="quote-required-notice-box">
                    <div className="quote-req-icon">
                      <FileText size={24} />
                    </div>
                    <div className="quote-req-content">
                      <h4>Custom Quote Required</h4>
                      <p>
                        <strong>{currentPkg.name}</strong> operates on daily call-sheet schedules,
                        mobile galley trucks, and bespoke crew counts. Pricing cannot be automated
                        because production hours, location logistics, and turnaround meals vary.
                      </p>
                      <div className="quote-req-callout">
                        <Phone size={13} />
                        <span>
                          Direct Production Line: <a href="tel:6047224857">604-722-4857</a>
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="quote-breakdown-table">
                    <div className="breakdown-row">
                      <span className="row-desc">
                        {currentPkg.name} Base (${numericRate} × {guestCount} guests)
                      </span>
                      <span className="row-val">${foodBaseTotal.toLocaleString()} CAD</span>
                    </div>
                    <div className="breakdown-row">
                      <span className="row-desc">
                        Culinary Equipment, Service Captain &amp; Kitchen Prep (Est.)
                      </span>
                      <span className="row-val">
                        ${staffingProductionEstimate.toLocaleString()} CAD
                      </span>
                    </div>
                    <div className="breakdown-row subtotal-row">
                      <span className="row-desc">Subtotal (before taxes)</span>
                      <span className="row-val">${subtotalBeforeTax.toLocaleString()} CAD</span>
                    </div>
                    <div className="breakdown-row tax-row">
                      <span className="row-desc">Applicable British Columbia GST (5%)</span>
                      <span className="row-val">${gstAmount.toLocaleString()} CAD</span>
                    </div>
                    <div className="breakdown-row total-highlight-row">
                      <span className="total-label">Indicative Estimate:</span>
                      <span className="total-amount">${estimatedGrandTotal.toLocaleString()} CAD</span>
                    </div>
                  </div>
                )}

                {/* Important Legal / Process Disclaimer */}
                <div className="quote-disclaimer-card">
                  <div className="disclaimer-header">
                    <Info size={14} />
                    <span>Planning Estimate Only • Not a Binding Quote</span>
                  </div>
                  <p>
                    This figure provides a transparent ballpark based on published package baselines.
                    It does not include venue-specific kitchen surcharges, customized beverage
                    pairings, or travel beyond Metro Vancouver. Official binding proposals are issued in
                    writing by Executive Chef Michael Thomas.
                  </p>
                </div>
              </div>
              {/* Printable container ends */}

              {/* Action Buttons */}
              <div className="quote-actions-row no-print">
                <button type="button" className="btn-print-quote" onClick={handlePrint}>
                  <Printer size={15} />
                  <span>Print / Save Quote Slip</span>
                </button>
                <button
                  type="button"
                  className="btn-inquiry-prefill"
                  onClick={() => {
                    onClose();
                    if (onProceedToInquiry) {
                      onProceedToInquiry({
                        category: currentPkg.id === 'wedding' ? 'weddings' : 'corporate',
                        guestCount: guestCount,
                        packageId: currentPkg.id,
                        estimatedAmount: isQuoteOnly ? null : estimatedGrandTotal
                      });
                    }
                  }}
                >
                  <span>Inquire with this Estimate</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ) : (
            <div className="payment-terms-view">
              <div className="payment-intro-card">
                <ShieldCheck size={20} className="shield-icon" />
                <div className="payment-intro-text">
                  <h4>Secure Payment &amp; Invoicing Policy</h4>
                  <p>
                    To safeguard client security, Ocean West Catering does not collect or process
                    credit card numbers through this public web application.
                  </p>
                </div>
              </div>

              <div className="payment-timeline-steps">
                <div className="pay-step-card">
                  <div className="step-num">1</div>
                  <div className="step-details">
                    <h5>Formal Proposal &amp; Date Lock</h5>
                    <p>
                      Following your consultation, Chef Michael issues a bespoke culinary proposal
                      specifying your confirmed menu and exact guest count.
                    </p>
                  </div>
                </div>

                <div className="pay-step-card">
                  <div className="step-num">2</div>
                  <div className="step-details">
                    <h5>Contract &amp; Deposit Invoice</h5>
                    <p>
                      A 25% deposit invoice is generated from our secure accounting system to reserve
                      our mobile galley and kitchen crew for your date.
                    </p>
                  </div>
                </div>

                <div className="pay-step-card">
                  <div className="step-num">3</div>
                  <div className="step-details">
                    <h5>Accepted Payment Channels</h5>
                    <ul className="accepted-methods-list">
                      <li>
                        <CheckCircle2 size={13} className="check-icon" />
                        <span>
                          <strong>Interac e-Transfer / Corporate EFT:</strong> Direct transfer to{' '}
                          <code>accounting@oceanwestcatering.com</code> (Zero processing fees).
                        </span>
                      </li>
                      <li>
                        <CheckCircle2 size={13} className="check-icon" />
                        <span>
                          <strong>Corporate Visa / MasterCard / AMEX:</strong> Processed via verified
                          Stripe invoice link sent with your contract.
                        </span>
                      </li>
                      <li>
                        <CheckCircle2 size={13} className="check-icon" />
                        <span>
                          <strong>Net-30 Commercial Terms:</strong> Available for DGC / IATSE
                          affiliated film &amp; television production accounts upon credit clearance.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pay-step-card">
                  <div className="step-num">4</div>
                  <div className="step-details">
                    <h5>Final Guest Reconciliation</h5>
                    <p>
                      Final guest counts and dietary adjustments are finalized 7 business days prior to
                      your event date, when the final balance invoice is reconciled.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-bottom-footer-bar">
          <div className="footer-disclaimer-text">
            <span>Ocean West Commissary • Richmond, BC • 604-722-4857</span>
          </div>
          <button type="button" className="footer-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

