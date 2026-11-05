import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { User, Mail, Phone, Building, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BUSINESS_INFO } from '../../data/faqs';

export const EditProfileModal = ({ isOpen, onClose }) => {
  const { user, updateUser } = useApp();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    city: user?.city || 'Richmond'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Customer Profile" subtitle="Manage your coordinator information">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full bg-white text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full bg-white text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-white text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">Company / Organization</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full bg-white text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">Primary Lower Mainland City</label>
          <select
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full bg-white text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:outline-none font-medium"
          >
            {BUSINESS_INFO.serviceAreas.map((city) => (
              <option key={city} value={city}>
                {city}, BC
              </option>
            ))}
          </select>
        </div>

        <div className="pt-2 flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit">
            Save Profile
          </Button>
        </div>
      </form>
    </Modal>
  );
};


