import React from 'react';
import { User, Mail, Phone, Building2, PhoneCall, ShieldCheck } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const CustomerInformation = () => {
  const { formData, updateFormData } = useBooking();

  return (
    <div className="flex flex-col gap-3.5">
      {/* Intro Card */}
      <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-xs">
        <h4 className="text-xs font-bold text-slate-900">Coordinator Contact Details</h4>
        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
          Where should Chef Michael Thomas and our team deliver your custom quote proposal?
        </p>
      </div>

      {/* Name Inputs */}
      <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs">
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[10px] font-bold text-slate-600 mb-1 flex items-center gap-1">
              <User className="w-3 h-3 text-[#4A2373]" />
              <span>First Name *</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Sarah"
              value={formData.firstName}
              onChange={(e) => updateFormData({ firstName: e.target.value })}
              className="w-full bg-slate-50 text-slate-900 text-xs px-2.5 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4A2373]/20 font-medium"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-600 mb-1 flex items-center gap-1">
              <User className="w-3 h-3 text-[#4A2373]" />
              <span>Last Name *</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Miller"
              value={formData.lastName}
              onChange={(e) => updateFormData({ lastName: e.target.value })}
              className="w-full bg-slate-50 text-slate-900 text-xs px-2.5 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4A2373]/20 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Contact Channels */}
      <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs flex flex-col gap-2.5">
        <div>
          <label className="block text-[10px] font-bold text-slate-600 mb-1 flex items-center gap-1">
            <Mail className="w-3 h-3 text-[#FE8500]" />
            <span>Email Address for Proposal *</span>
          </label>
          <input
            type="email"
            placeholder="e.g. sarah.miller@example.com"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className="w-full bg-slate-50 text-slate-900 text-xs px-2.5 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4A2373]/20 font-medium"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-600 mb-1 flex items-center gap-1">
            <Phone className="w-3 h-3 text-[#4A2373]" />
            <span>Phone Number for Logistics *</span>
          </label>
          <input
            type="tel"
            placeholder="e.g. (604) 555-0199"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            className="w-full bg-slate-50 text-slate-900 text-xs px-2.5 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4A2373]/20 font-medium"
          />
        </div>
      </div>

      {/* Organization / Company */}
      <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs">
        <label className="block text-[10px] font-bold text-slate-600 mb-1 flex items-center gap-1">
          <Building2 className="w-3 h-3 text-slate-400" />
          <span>Company, Film Production or Couple Name (Optional)</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Warner Bros. Production, or Sarah & David"
          value={formData.company}
          onChange={(e) => updateFormData({ company: e.target.value })}
          className="w-full bg-slate-50 text-slate-900 text-xs px-2.5 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4A2373]/20 font-medium"
        />
      </div>

      {/* Direct Call Reminder */}
      <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#4A2373]" />
          <span className="text-[11px] text-slate-600 font-medium">Urgent booking inquiry?</span>
        </div>
        <a
          href="tel:6047224857"
          className="text-[11px] font-bold text-[#4A2373] hover:underline"
        >
          Call (604) 722-4857
        </a>
      </div>
    </div>
  );
};
