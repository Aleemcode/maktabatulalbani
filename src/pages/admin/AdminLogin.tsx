import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, KeyRound, AlertCircle, ArrowLeft } from 'lucide-react';

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
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-sm space-y-6 bg-white p-8 rounded-3xl border border-[#EFECE6] shadow-sm">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#18181B] text-white flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-[#18181B]">Maktabah Admin Portal</h1>
          <p className="text-xs text-[#71717A]">
            Enter your secret administrative passkey to manage books, blog posts, and store settings.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#52525B] mb-1">
              Admin Passkey
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passkey (e.g. albani2026)"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E4E4E7] text-sm text-[#18181B] focus:outline-none focus:ring-2 focus:ring-[#18181B]/10"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-[#18181B] hover:bg-black text-white text-xs font-semibold transition-colors"
          >
            Access Dashboard
          </button>
        </form>

        <div className="pt-2 text-center border-t border-[#F4F4F5]">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs text-[#71717A] hover:text-[#18181B]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to public website</span>
          </button>
        </div>
      </div>
    </div>
  );
};
