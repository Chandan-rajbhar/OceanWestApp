import React, { useState } from 'react';
import {
  X,
  ArrowLeft,
  Calculator,
  Download,
  FileText,
  CreditCard,
  Building,
  CheckCircle2,
  Lock,
  Clock,
  Sparkles,
  Phone
} from 'lucide-react';

export default function QuotationPaymentModal({
  isOpen,
  onClose,
  initialGuestCount = 100,
  onProceedToInquiry
}) {
  const [activeTab, setActiveTab] = useState('quotation'); // 'quotation' | 'payment'
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handlePayNow = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      onClose();
    }, 2800);
  };

  return (
    <div
      className="modal-overlay-backdrop active"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Your Quotation & Payment"
      style={{ zIndex: 1100 }}
    >
      <div
        className="modal-content-box quotation-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="modal-top-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              className="modal-back-arrow-btn"
              onClick={activeTab === 'payment' ? () => setActiveTab('quotation') : onClose}
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>
            <h2 className="modal-headline" style={{ fontSize: '1.25rem', margin: 0 }}>
              {activeTab === 'quotation' ? 'Your Quotation' : 'Make Payment'}
            </h2>
          </div>
          <button
            type="button"
            className="modal-close-round-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="quotation-tab-pills-row" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'quotation'}
            className={`quote-tab-pill ${activeTab === 'quotation' ? 'active' : ''}`}
            onClick={() => setActiveTab('quotation')}
          >
            <FileText size={14} />
            <span>Quotation</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'payment'}
            className={`quote-tab-pill ${activeTab === 'payment' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment')}
          >
            <CreditCard size={14} />
            <span>Payment</span>
          </button>
        </div>

        <div className="modal-scroll-body quotation-modal-body">
          {paymentSuccess ? (
            <div className="payment-success-card">
              <CheckCircle2 size={48} style={{ color: '#2E7D32', margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '1.2rem', color: '#192720', marginBottom: '6px' }}>
                Payment Received
              </h3>
              <p style={{ fontSize: '12px', color: '#636C65', marginBottom: '16px' }}>
                Your advance payment of CAD $3,268.13 has been processed securely. Your booking is confirmed.
              </p>
              <div className="receipt-summary-box">
                <div className="receipt-row">
                  <span>Transaction ID:</span>
                  <strong>TXN-STRIPE-8912</strong>
                </div>
                <div className="receipt-row">
                  <span>Booking Reference:</span>
                  <strong>#Q-1084</strong>
                </div>
              </div>
            </div>
          ) : activeTab === 'quotation' ? (
            /* ================= SCREEN 7: YOUR QUOTATION ================= */
            <div className="screen-quotation-view">
              <div className="quotation-formal-card">
                {/* Quotation Header */}
                <div className="quote-card-top-row">
                  <span className="quote-number-title">Quotation #Q-1084</span>
                  <span className="quote-status-badge pending">Pending</span>
                </div>

                <div className="quote-event-header">
                  <h3 className="quote-event-title">Wedding Catering</h3>
                  <span className="quote-event-meta">Sat, 24 Jan 2026 | 100 Guests</span>
                </div>

                {/* Line Items Table */}
                <div className="quote-line-items-table">
                  <div className="quote-line-item-row">
                    <span className="line-item-desc">Selected Menu (Per Person)</span>
                    <span className="line-item-amt">$95.00</span>
                  </div>
                  <div className="quote-line-item-row">
                    <span className="line-item-desc">Serving Staff (5)</span>
                    <span className="line-item-amt">$750.00</span>
                  </div>
                  <div className="quote-line-item-row">
                    <span className="line-item-desc">Table Setup &amp; Décor</span>
                    <span className="line-item-amt">$1,200.00</span>
                  </div>
                  <div className="quote-line-item-row">
                    <span className="line-item-desc">Beverage Service</span>
                    <span className="line-item-amt">$500.00</span>
                  </div>

                  <div className="quote-table-divider" />

                  <div className="quote-subtotal-row">
                    <span>Subtotal</span>
                    <span>$12,450.00</span>
                  </div>
                  <div className="quote-subtotal-row">
                    <span>GST (5%)</span>
                    <span>$622.50</span>
                  </div>
                  <div className="quote-grand-total-row">
                    <span>Total (CAD)</span>
                    <span className="grand-total-amt">$13,072.50</span>
                  </div>
                </div>

                {/* Expiry Note */}
                <div className="quote-expiry-note">
                  <Clock size={12} />
                  <span>Valid Until: 28 Jan 2026</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="quote-actions-stack">
                <button
                  type="button"
                  className="btn-primary-plum-pill"
                  onClick={() => setActiveTab('payment')}
                >
                  <span>Accept &amp; Pay Advance</span>
                </button>

                <button
                  type="button"
                  className="btn-outline-pill"
                  onClick={onProceedToInquiry || onClose}
                >
                  <span>Request Changes</span>
                </button>

                <button
                  type="button"
                  className="btn-download-pdf-link"
                  onClick={handlePrint}
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ) : (
            /* ================= SCREEN 8: MAKE PAYMENT ================= */
            <div className="screen-payment-view">
              {/* Hero Amount Card */}
              <div className="payment-hero-amount-card">
                <span className="payment-hero-label">Amount to Pay</span>
                <div className="payment-hero-amount">CAD $3,268.13</div>
                <span className="payment-hero-sub">(25% Advance Payment)</span>
              </div>

              {/* Payment Methods */}
              <div className="payment-methods-section">
                <h3 className="payment-section-heading">Select Payment Method</h3>

                <div className="payment-methods-radio-group">
                  {[
                    { id: 'card', label: 'Credit / Debit Card', badges: 'VISA • MC' },
                    { id: 'apple_pay', label: 'Apple Pay', badges: 'Pay' },
                    { id: 'google_pay', label: 'Google Pay', badges: 'GPay' },
                    { id: 'bank', label: 'Bank Transfer', badges: 'E-Transfer' }
                  ].map((pm) => {
                    const isSelected = selectedPaymentMethod === pm.id;
                    return (
                      <label
                        key={pm.id}
                        className={`payment-method-row ${isSelected ? 'selected' : ''}`}
                      >
                        <div className="pm-left">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={isSelected}
                            onChange={() => setSelectedPaymentMethod(pm.id)}
                            className="pm-radio-input"
                          />
                          <span className="pm-label">{pm.label}</span>
                        </div>
                        <span className="pm-badge-logos">{pm.badges}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Pay Now Button */}
              <button
                type="button"
                className="btn-primary-plum-pill"
                onClick={handlePayNow}
                style={{ marginTop: '20px' }}
              >
                <span>Pay Now $3,268.13</span>
              </button>

              {/* Trust Footer */}
              <div className="payment-trust-footer">
                <Lock size={13} />
                <span>Secure payment powered by Stripe</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
