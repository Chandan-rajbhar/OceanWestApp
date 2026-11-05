import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Mail, Lock, User, Sparkles, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal = ({ isOpen, onClose }) => {
  const { login, signup, authMode, setAuthMode } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      login(email);
    } else {
      signup({ firstName, lastName, email });
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={authMode === 'login' ? 'Sign In to Ocean West' : 'Create Customer Account'}
      subtitle="Demo mobile authentication session"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="p-2.5 bg-blue-50/70 border border-blue-200/60 rounded-xl flex items-center gap-2 text-[11px] text-slate-700">
          <ShieldCheck className="w-4 h-4 text-[#4A2373] shrink-0" />
          <span>Frontend demo authentication. Enter any credentials to simulate login.</span>
        </div>

        {authMode === 'signup' && (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First"
                className="w-full bg-white text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last"
                className="w-full bg-white text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:outline-none"
                required
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. planner@vancouver.ca"
              className="w-full bg-white text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-[#4A2373] focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="pt-2">
          <Button variant="primary" fullWidth size="md" type="submit">
            {authMode === 'login' ? 'Sign In' : 'Create Demo Account'}
          </Button>
        </div>

        <div className="text-center mt-1">
          <button
            type="button"
            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            className="text-xs text-[#4A2373] font-semibold hover:underline"
          >
            {authMode === 'login'
              ? "Don't have an account? Sign Up"
              : 'Already have an account? Sign In'}
          </button>
        </div>
      </form>
    </Modal>
  );
};


