import React, { useState } from 'react';
import { FloppyDisk, ArrowsClockwise, CheckCircle, WhatsappLogo } from '@phosphor-icons/react';
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
        <h1 className="text-xl sm:text-3xl font-bold font-serif-display text-[#0C3934]">Store & WhatsApp Settings</h1>
        <p className="text-xs text-[#5C6969] mt-0.5">Configure your conversion phone number, store details, and currency format.</p>
      </div>

      {savedSuccess && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs border border-emerald-200">
          <CheckCircle className="w-4 h-4 text-[#0C5149]" />
          <span>Settings successfully updated and saved to cloud database!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-8 rounded-2xl border border-[#E8E4D8] space-y-5 sm:space-y-6 shadow-xs">
        {/* WhatsApp Conversion Section */}
        <div className="p-5 rounded-2xl bg-[#F6F2E9] border border-[#E8E4D8] space-y-4">
          <div className="flex items-center gap-2">
            <WhatsappLogo size={20} weight="fill" className="text-[#25D366]" />
            <h2 className="text-sm font-bold text-[#0C3934]">WhatsApp Conversion Channel</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0C3934] mb-1">
                WhatsApp Business Number (with country code, no + or spaces) *
              </label>
              <input
                type="text"
                name="whatsapp_number"
                value={formData.whatsapp_number}
                onChange={handleChange}
                placeholder="2348012345678"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4D8] bg-white text-xs font-mono font-bold text-[#0C3934] focus:outline-none focus:border-[#0C3934]"
                required
              />
              <span className="text-[11px] text-[#5C6969] mt-1 block">
                All order inquiry buttons across the catalogue will open chat with this number.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0C3934] mb-1">
                Default General Greeting Message
              </label>
              <input
                type="text"
                name="whatsapp_default_message"
                value={formData.whatsapp_default_message}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4D8] bg-white text-xs text-[#0C3934] focus:outline-none focus:border-[#0C3934]"
              />
            </div>
          </div>
        </div>

        {/* General Store Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#0C3934] mb-1">Store Name *</label>
            <input
              type="text"
              name="store_name"
              value={formData.store_name}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4D8] bg-[#FBF9F4]/40 text-xs text-[#0C3934] focus:outline-none focus:border-[#0C3934]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0C3934] mb-1">Tagline</label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4D8] bg-[#FBF9F4]/40 text-xs text-[#0C3934] focus:outline-none focus:border-[#0C3934]"
            />
          </div>
        </div>

        {/* Currency and Announcement Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#0C3934] mb-1">Currency Symbol</label>
            <input
              type="text"
              name="currency_symbol"
              value={formData.currency_symbol}
              onChange={handleChange}
              placeholder="₦"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4D8] bg-[#FBF9F4]/40 text-xs text-[#0C3934] focus:outline-none focus:border-[#0C3934]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#0C3934] mb-1">
              Top Announcement Banner Text
            </label>
            <input
              type="text"
              name="announcement_banner"
              value={formData.announcement_banner || ''}
              onChange={handleChange}
              placeholder="e.g. Nationwide Delivery Available Across Nigeria via WhatsApp"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4D8] bg-[#FBF9F4]/40 text-xs text-[#0C3934] focus:outline-none focus:border-[#0C3934]"
            />
          </div>
        </div>

        {/* About store summary */}
        <div>
          <label className="block text-xs font-semibold text-[#0C3934] mb-1">About Store Summary</label>
          <textarea
            name="about_text"
            rows={4}
            value={formData.about_text || ''}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4D8] bg-[#FBF9F4]/40 text-xs text-[#0C3934] focus:outline-none focus:border-[#0C3934] leading-relaxed"
          />
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-[#E8E4D8] flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs text-red-500 hover:bg-red-50 transition-colors cursor-pointer w-full sm:w-auto"
          >
            <ArrowsClockwise className="w-3.5 h-3.5" />
            <span>Reset Demo to Defaults</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#0C3934] hover:bg-[#0C5149] text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer w-full sm:w-auto"
          >
            <FloppyDisk className="w-4 h-4 text-[#C59E42]" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
