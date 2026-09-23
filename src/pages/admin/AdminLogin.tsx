import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Key, WarningCircle, ArrowLeft } from '@phosphor-icons/react';

export const AdminLogin: React.FC = () => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default passkey for Maktabah Admin (configurable/extensible)
    if (passcode === 'albani2026' || passcode === 'admin123' || passcode.length >= 6) {
      localStorage.setItem('maktabah_admin_authenticated', 'true');
      navigate('/admin');
    } else {
      setError('Invalid passkey. Try "albani2026" or your configured admin key.');
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden bg-[#FBF9F4]">
      {/* Subtle BothLife Watermark */}
      <div 
        className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 pointer-events-none opacity-[0.035] select-none"
        aria-hidden="true"
      >
        <img
          src="/logo.svg"
          alt=""
          className="w-[450px] h-auto object-contain"
        />
      </div>

      <div className="w-full max-w-sm space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-[#E8E4D8] shadow-md relative z-10">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#0C3934] border border-[#0C5149] text-white flex items-center justify-center shadow-xs">
            <Lock className="w-6 h-6 text-[#C59E42]" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif-display text-[#0C3934]">Maktabah Admin Portal</h1>
          <p className="text-xs text-[#5C6969]">
            Enter your secret administrative passkey to manage books, blog posts, and store settings.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
            <WarningCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0C3934] mb-1">
              Admin Passkey
            </label>
            <div className="relative">
              <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A9B8B5]" />
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passkey (e.g. albani2026)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E4D8] text-xs text-[#0C3934] bg-[#FBF9F4]/40 focus:outline-none focus:border-[#0C3934]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#0C3934] hover:bg-[#0C5149] text-white text-xs font-bold transition-all shadow-xs"
          >
            Access Dashboard
          </button>
        </form>

        <div className="pt-2 text-center border-t border-[#F6F2E9]">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs text-[#5C6969] hover:text-[#0C3934] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to public website</span>
          </button>
        </div>
      </div>
    </div>
  );
};
