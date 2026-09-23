import React, { useState } from 'react';
import { Save, RefreshCw, CheckCircle2, MessageCircle } from 'lucide-react';
import { useCatalogue } from '../../context/CatalogueContext';
import { StoreSettings } from '../../types';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, resetToDefault } = useCatalogue();
  const [formData, setFormData] = useState<StoreSettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm('Reset all catalogue data, categories, and settings back to default seed?')) {
      resetToDefault();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#18181B]">Store & WhatsApp Settings</h1>
        <p className="text-xs text-[#71717A] mt-0.5">Configure your conversion phone number, store details, and currency format.</p>
      </div>

      {savedSuccess && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Settings successfully updated and saved!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E4E4E7] space-y-6">
        {/* WhatsApp Conversion Section */}
        <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            <h2 className="text-sm font-bold text-[#18181B]">WhatsApp Conversion Channel</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#52525B] mb-1">
                WhatsApp Business Number (with country code, no + or spaces) *
              </label>
              <input
                type="text"
                name="whatsapp_number"
                value={formData.whatsapp_number}
                onChange={handleChange}
                placeholder="2348012345678"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] bg-white text-xs font-mono font-bold text-[#18181B] focus:outline-none"
                required
              />
              <span className="text-[11px] text-[#71717A] mt-1 block">
                All order inquiry buttons across the catalogue will open chat with this number.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#52525B] mb-1">
                Default General Greeting Message
              </label>
              <input
                type="text"
                name="whatsapp_default_message"
                value={formData.whatsapp_default_message}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] bg-white text-xs text-[#18181B] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* General Store Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#52525B] mb-1">Store Name *</label>
            <input
              type="text"
              name="store_name"
              value={formData.store_name}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#52525B] mb-1">Tagline</label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] focus:outline-none"
            />
          </div>
        </div>

        {/* Currency and Announcement Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#52525B] mb-1">Currency Symbol</label>
            <input
              type="text"
              name="currency_symbol"
              value={formData.currency_symbol}
              onChange={handleChange}
              placeholder="₦"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#52525B] mb-1">
              Top Announcement Banner Text
            </label>
            <input
              type="text"
              name="announcement_banner"
              value={formData.announcement_banner || ''}
              onChange={handleChange}
              placeholder="e.g. Nationwide Delivery Available Across Nigeria via WhatsApp"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] focus:outline-none"
            />
          </div>
        </div>

        {/* About store summary */}
        <div>
          <label className="block text-xs font-semibold text-[#52525B] mb-1">About Store Summary</label>
          <textarea
            name="about_text"
            rows={4}
            value={formData.about_text || ''}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] focus:outline-none leading-relaxed"
          />
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-[#E4E4E7] flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-red-600 hover:bg-red-50 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo to Defaults</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#18181B] hover:bg-black text-white text-xs font-semibold transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
