import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, HelpCircle, ChevronDown, ChevronUp, Shield, FileText } from 'lucide-react';
import { BUSINESS_INFO, FREQUENT_QUESTIONS } from '../data/faqs';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { useApp } from '../context/AppContext';

export const Contact = () => {
  const { showToast, initiateCall } = useApp();

  const [openFaq, setOpenFaq] = useState(null);
  const [legalModal, setLegalModal] = useState(null); // 'terms' or 'privacy'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [sending, setSending] = useState(false);

  const toggleFaq = (id) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    setSending(true);
    setTimeout(() => {
      setSending(false);
      showToast('Thank you! Your message was sent to our office.', 'success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 700);
  };

  return (
    <div className="flex flex-col pb-16">
      {/* Top Banner */}
      <div className="bg-white/95 px-4 pt-3 pb-3 border-b border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-1.5">
          <Badge variant="galactic" size="sm" icon={Phone}>
            Headquarters &amp; Support
          </Badge>
          <span className="text-[10px] font-bold text-emerald-600">
            Open 7 Days / Week
          </span>
        </div>

        <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
          Contact Ocean West Catering
        </h1>
        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
          Based in Richmond &amp; White Rock, serving British Columbia since 1999.
        </p>
      </div>

      {/* Main Content */}
      <div className="p-4 flex flex-col gap-4">
        {/* Contact Cards Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href="tel:6047224857"
            className="bg-white/95 rounded-2xl p-3 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-[#4A2373] transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-2">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Call / Text Direct</span>
              <span className="text-xs font-bold text-slate-900 group-hover:text-[#4A2373] transition-colors">
                {BUSINESS_INFO.phoneText}
              </span>
            </div>
          </a>

          <a
            href={`mailto:${BUSINESS_INFO.email}`}
            className="bg-white/95 rounded-2xl p-3 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-[#4A2373] transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#4A2373]/10 text-[#4A2373] flex items-center justify-center mb-2">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Inquiries Email</span>
              <span className="text-xs font-bold text-slate-900 group-hover:text-[#4A2373] transition-colors truncate block">
                {BUSINESS_INFO.email}
              </span>
            </div>
          </a>
        </div>

        {/* Office & Address Card */}
        <div className="bg-white/95 rounded-2xl p-3.5 border border-slate-200/80 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#FE8500]/10 text-[#FE8500] flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-900">Commercial Catering Base</h4>
              <p className="text-xs text-slate-700 font-medium mt-0.5 leading-snug">
                {BUSINESS_INFO.address}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Office Dispatch: {BUSINESS_INFO.phoneOffice}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {BUSINESS_INFO.serviceAreas.slice(0, 5).map((city, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                  >
                    {city}
                  </span>
                ))}
                <span className="text-[9px] font-bold text-[#4A2373] px-1 py-0.5">
                  +{BUSINESS_INFO.serviceAreas.length - 5} More Cities
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Inquiry Form */}
        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Send a Quick Inquiry Note
          </h3>
          <p className="text-[11px] text-slate-500 mb-3">
            Questions about menus, availability, or film schedules? Send us a message.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
            <div>
              <input
                type="text"
                placeholder="Your Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:bg-white focus:outline-none"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:bg-white focus:outline-none"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-50 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <textarea
                rows="3"
                placeholder="How can Chef Michael and our catering team help you? *"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-50 text-xs p-3 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:bg-white focus:outline-none"
                required
              />
            </div>
            <Button
              variant="primary"
              fullWidth
              size="sm"
              icon={Send}
              loading={sending}
              type="submit"
              className="text-xs py-2.5 font-bold"
            >
              Send Message to Coordinator
            </Button>
          </form>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#4A2373]" />
            <span>Frequently Asked Questions</span>
          </h3>

          <div className="flex flex-col gap-2">
            {FREQUENT_QUESTIONS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl border border-slate-200/80 overflow-hidden bg-slate-50/70"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-2.5 text-left text-xs font-bold text-slate-800 flex items-center justify-between gap-2"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-3 pb-3 text-xs text-slate-600 leading-relaxed font-normal bg-white border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legal Policies Footer */}
        <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-400 py-2">
          <button
            onClick={() => setLegalModal('privacy')}
            className="hover:text-[#4A2373] transition-colors"
          >
            Privacy Policy
          </button>
          <span>•</span>
          <button
            onClick={() => setLegalModal('terms')}
            className="hover:text-[#4A2373] transition-colors"
          >
            Terms of Catering
          </button>
        </div>
      </div>

      {/* Privacy / Terms Modal */}
      {legalModal && (
        <Modal
          isOpen={Boolean(legalModal)}
          onClose={() => setLegalModal(null)}
          title={legalModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
          subtitle="Ocean West Catering standards"
        >
          <div className="text-xs text-slate-600 leading-relaxed space-y-2.5">
            <p>
              <strong>Ocean West Catering</strong> respects the confidentiality and privacy of our clients, couples, and production coordinators across British Columbia.
            </p>
            <p>
              Inquiries and custom menu selections submitted through this application are processed solely to prepare tailored quote estimates, coordinate event logistics, and assign Teamsters 155 mobile kitchen units.
            </p>
            <p>
              Events require a minimum of 25 guests. Formal event confirmations and deposits are executed via official Ocean West Catering contracts signed with our banquet office.
            </p>
            <div className="pt-2">
              <Button variant="primary" fullWidth size="sm" onClick={() => setLegalModal(null)}>
                Understood
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};


