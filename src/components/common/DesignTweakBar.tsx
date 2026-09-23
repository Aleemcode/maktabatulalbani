import React, { useState } from 'react';
import {
  SlidersHorizontal,
  X,
  Check,
  RotateCcw,
  Sparkles,
  BookOpen,
  Feather,
  Layout,
  Type,
  ShoppingBag
} from 'lucide-react';
import {
  BookBookmark as PhBookBookmark,
  Compass as PhCompass,
  ChatCircleText as PhChatCircleText,
  ShoppingBag as PhShoppingBag
} from '@phosphor-icons/react';
import { useDesignSystem, FONT_PRESETS } from '../../context/DesignSystemContext';

export const DesignTweakBar: React.FC = () => {
  const {
    displayFont,
    bodyFont,
    arabicFont,
    iconStyle,
    activePresetId,
    applyPreset,
    setDisplayFont,
    setBodyFont,
    setArabicFont,
    setIconStyle,
    isTweakBarOpen,
    setIsTweakBarOpen
  } = useDesignSystem();

  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');

  const displayOptions = [
    { label: 'Cormorant Garamond (Classical Venetian)', value: "'Cormorant Garamond', Georgia, serif" },
    { label: 'Fraunces (Warm Tactile Ink-Traps)', value: "'Fraunces', Georgia, serif" },
    { label: 'Cinzel (Monumental Roman / Chiseled)', value: "'Cinzel', Georgia, serif" },
    { label: 'Playfair Display (High-Contrast Editorial)', value: "'Playfair Display', Georgia, serif" },
    { label: 'Plus Jakarta Sans (Contemporary Swiss)', value: "'Plus Jakarta Sans', sans-serif" }
  ];

  const bodyOptions = [
    { label: 'Inter (Neutral Clean Workhorse)', value: "'Inter', sans-serif" },
    { label: 'Newsreader (True Bookish Editorial)', value: "'Newsreader', Georgia, serif" },
    { label: 'EB Garamond (Classical Literary Press)', value: "'EB Garamond', Georgia, serif" },
    { label: 'DM Sans (Warm Humanist Sans)', value: "'DM Sans', sans-serif" },
    { label: 'Lora (Contemporary Brushed Serif)', value: "'Lora', Georgia, serif" }
  ];

  const arabicOptions = [
    { label: 'Amiri (Classical Scholarly Naskh)', value: "'Amiri', serif" },
    { label: 'Noto Naskh Arabic (Balanced Standard)', value: "'Noto Naskh Arabic', serif" },
    { label: 'Cairo (Modern Architectural Kufic)', value: "'Cairo', sans-serif" }
  ];

  const iconOptions: Array<{ label: string; value: 'lucide' | 'phosphor-regular' | 'phosphor-duotone'; desc: string }> = [
    {
      label: 'Phosphor Icons (Regular / Literary)',
      value: 'phosphor-regular',
      desc: 'Bespoke curved terminals with humanist editorial warmth'
    },
    {
      label: 'Phosphor Icons (Duotone Accent)',
      value: 'phosphor-duotone',
      desc: 'Two-tone optical depth with soft brand tinted fills'
    },
    {
      label: 'Lucide Icons (Technical Crisp Line)',
      value: 'lucide',
      desc: 'Precise 24px geometric stroke weight, minimal and utilitarian'
    }
  ];

  return (
    <>
      {/* Floating Trigger Pill */}
      {!isTweakBarOpen && (
        <button
          onClick={() => setIsTweakBarOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0C3934] text-white shadow-2xl border border-[#C59E42] hover:bg-[#0C5149] transition-all hover:scale-105 active:scale-95 group backdrop-blur-md"
          title="Open Typography & Icon Customizer"
        >
          <div className="w-5 h-5 rounded-full bg-[#C59E42]/20 flex items-center justify-center text-[#C59E42]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold tracking-wide">
            Typography & Icons
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C59E42] text-[#0C3934] font-bold">
            Live
          </span>
        </button>
      )}

      {/* Expanded Tweak Bar Floating Drawer / Dock */}
      {isTweakBarOpen && (
        <div className="fixed bottom-0 sm:bottom-6 sm:right-6 z-50 w-full sm:max-w-lg bg-[#FBF9F4] border sm:border border-[#E8E4D8] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-200">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#0C3934] text-white flex items-center justify-between border-b border-[#0C5149]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0C5149] border border-[#C59E42]/40 flex items-center justify-center text-[#C59E42]">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white font-serif-display">
                  Typography & Icon Studio
                </h3>
                <p className="text-[10px] text-emerald-200/70">
                  Live real-time testing for Maktabah Imam Albani
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsTweakBarOpen(false)}
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-[#0C5149] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Sub-navigation tabs */}
          <div className="flex items-center border-b border-[#E8E4D8] bg-[#F6F2E9] px-4 pt-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('presets')}
              className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'presets'
                  ? 'border-[#0C3934] text-[#0C3934]'
                  : 'border-transparent text-[#5C6969] hover:text-[#0C3934]'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Curated Presets</span>
            </button>

            <button
              onClick={() => setActiveTab('custom')}
              className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'custom'
                  ? 'border-[#0C3934] text-[#0C3934]'
                  : 'border-transparent text-[#5C6969] hover:text-[#0C3934]'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Custom Combinations</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-1">
            {activeTab === 'presets' && (
              <div className="space-y-3">
                <p className="text-xs text-[#5C6969] leading-relaxed">
                  Select a curated typographic harmony designed specifically for authentic classical literature and modern book commerce:
                </p>

                <div className="grid grid-cols-1 gap-2.5">
                  {FONT_PRESETS.map((preset) => {
                    const isSelected = activePresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => applyPreset(preset.id)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-white border-[#C59E42] shadow-sm ring-1 ring-[#C59E42]'
                            : 'bg-white/60 border-[#E8E4D8] hover:border-[#0C3934]/40 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-[#0C3934]">
                            {preset.name}
                          </span>
                          {isSelected && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0C3934] text-white text-[9px] font-bold">
                              <Check className="w-2.5 h-2.5 text-[#C59E42]" />
                              <span>Active</span>
                            </span>
                          )}
                        </div>

                        <span className="text-[11px] font-medium text-[#C59E42] mb-1.5">
                          {preset.tagline}
                        </span>

                        <p className="text-[11px] text-[#5C6969] leading-relaxed">
                          {preset.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'custom' && (
              <div className="space-y-4">
                {/* Display Font */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#0C3934]">
                    Display Headline Font (Titles & Big Headings)
                  </label>
                  <select
                    value={displayFont}
                    onChange={(e) => setDisplayFont(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E8E4D8] bg-white text-xs text-[#0C3934] font-medium focus:outline-none focus:border-[#0C3934]"
                  >
                    {displayOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Body Font */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#0C3934]">
                    Body Text Font (Paragraphs, Specs & Buttons)
                  </label>
                  <select
                    value={bodyFont}
                    onChange={(e) => setBodyFont(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E8E4D8] bg-white text-xs text-[#0C3934] font-medium focus:outline-none focus:border-[#0C3934]"
                  >
                    {bodyOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Arabic Font */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#0C3934]">
                    Arabic Calligraphy & Script
                  </label>
                  <select
                    value={arabicFont}
                    onChange={(e) => setArabicFont(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E8E4D8] bg-white text-xs text-[#0C3934] font-medium focus:outline-none focus:border-[#0C3934]"
                  >
                    {arabicOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Icon Library Selector */}
                <div className="space-y-2 pt-2 border-t border-[#E8E4D8]">
                  <label className="block text-xs font-bold text-[#0C3934]">
                    Icon System & Style Weight
                  </label>
                  <div className="space-y-2">
                    {iconOptions.map((opt) => (
                      <label
                        key={opt.value}
                        onClick={() => setIconStyle(opt.value)}
                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          iconStyle === opt.value
                            ? 'bg-white border-[#C59E42] ring-1 ring-[#C59E42]'
                            : 'bg-white/50 border-[#E8E4D8] hover:border-[#0C3934]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="iconStyle"
                          checked={iconStyle === opt.value}
                          onChange={() => setIconStyle(opt.value)}
                          className="mt-0.5 text-[#0C3934] accent-[#0C3934]"
                        />
                        <div>
                          <span className="block text-xs font-bold text-[#0C3934]">
                            {opt.label}
                          </span>
                          <span className="block text-[11px] text-[#5C6969] mt-0.5">
                            {opt.desc}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Live Specimen Strip inside the tweak bar */}
            <div className="p-4 rounded-2xl bg-white border border-[#E8E4D8] space-y-2">
              <span className="text-[10px] font-bold text-[#C59E42] uppercase tracking-wider block">
                Live Specimen Preview
              </span>
              <h4 className="text-base font-bold font-serif-display text-[#0C3934] leading-tight">
                التبيان في آداب حملة القرآن
              </h4>
              <p className="text-xs text-[#5C6969] leading-relaxed">
                Foundational scholarly literature upon the Quran and authentic Sunnah.
              </p>

              {/* Sample icons rendered live */}
              <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-[#0C3934] border-t border-[#F6F2E9]">
                <div className="flex items-center gap-1.5">
                  {iconStyle === 'lucide' ? (
                    <BookOpen className="w-4 h-4 text-[#0C5149]" />
                  ) : (
                    <PhBookBookmark
                      size={18}
                      weight={iconStyle === 'phosphor-duotone' ? 'duotone' : 'regular'}
                      className="text-[#0C5149]"
                    />
                  )}
                  <span>Catalogue</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {iconStyle === 'lucide' ? (
                    <Feather className="w-4 h-4 text-[#C59E42]" />
                  ) : (
                    <PhCompass
                      size={18}
                      weight={iconStyle === 'phosphor-duotone' ? 'duotone' : 'regular'}
                      className="text-[#C59E42]"
                    />
                  )}
                  <span>Deals</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {iconStyle === 'lucide' ? (
                    <ShoppingBag className="w-4 h-4 text-[#0C5149]" />
                  ) : (
                    <PhShoppingBag
                      size={18}
                      weight={iconStyle === 'phosphor-duotone' ? 'duotone' : 'regular'}
                      className="text-[#0C5149]"
                    />
                  )}
                  <span>Cart</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {iconStyle === 'lucide' ? (
                    <Sparkles className="w-4 h-4 text-[#25D366]" />
                  ) : (
                    <PhChatCircleText
                      size={18}
                      weight={iconStyle === 'phosphor-duotone' ? 'duotone' : 'regular'}
                      className="text-[#25D366]"
                    />
                  )}
                  <span>WhatsApp</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Reset */}
          <div className="p-3 bg-[#F6F2E9] border-t border-[#E8E4D8] flex items-center justify-between">
            <button
              onClick={() => applyPreset(FONT_PRESETS[0].id)}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#5C6969] hover:text-[#0C3934]"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset to Classical Default</span>
            </button>

            <button
              onClick={() => setIsTweakBarOpen(false)}
              className="px-4 py-1.5 rounded-lg bg-[#0C3934] text-white text-xs font-bold hover:bg-[#0C5149] transition-colors"
            >
              Done Testing
            </button>
          </div>
        </div>
      )}
    </>
  );
};
