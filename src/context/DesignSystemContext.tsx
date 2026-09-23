import React, { createContext, useContext, useState, useEffect } from 'react';

export interface FontPreset {
  id: string;
  name: string;
  tagline: string;
  displayFont: string;
  bodyFont: string;
  arabicFont: string;
  iconStyle: 'lucide' | 'phosphor-regular' | 'phosphor-duotone';
  description: string;
}

export const FONT_PRESETS: FontPreset[] = [
  {
    id: 'scholarly-classical',
    name: 'Classical Scholarly',
    tagline: 'Cormorant + Inter + Amiri',
    displayFont: "'Cormorant Garamond', Georgia, serif",
    bodyFont: "'Inter', sans-serif",
    arabicFont: "'Amiri', serif",
    iconStyle: 'phosphor-regular',
    description: 'Venetian academic dignity with crisp Swiss body readability. Reverent, disciplined, and authentic.'
  },
  {
    id: 'literary-press',
    name: "Scholar's Literary Press",
    tagline: 'Cormorant + Newsreader + Amiri',
    displayFont: "'Cormorant Garamond', Georgia, serif",
    bodyFont: "'Newsreader', Georgia, serif",
    arabicFont: "'Amiri', serif",
    iconStyle: 'phosphor-duotone',
    description: 'Full literary book setting. Long-form reading comfort with serif body prose and duotone icons.'
  },
  {
    id: 'monumental-heritage',
    name: 'Monumental Traditional',
    tagline: 'Cinzel + EB Garamond + Noto Naskh',
    displayFont: "'Cinzel', Georgia, serif",
    bodyFont: "'EB Garamond', Georgia, serif",
    arabicFont: "'Noto Naskh Arabic', serif",
    iconStyle: 'phosphor-regular',
    description: 'Chiseled classical headings with traditional naskh script. Evokes historic manuscripts and formal presses.'
  },
  {
    id: 'warm-humanist',
    name: 'Warm Ink & Paper',
    tagline: 'Fraunces + DM Sans + Amiri',
    displayFont: "'Fraunces', Georgia, serif",
    bodyFont: "'DM Sans', sans-serif",
    arabicFont: "'Amiri', serif",
    iconStyle: 'phosphor-duotone',
    description: 'Organic ink-traps and warm humanist curves. Tactile, approachable, and richly textured.'
  },
  {
    id: 'modern-maktabah',
    name: 'Contemporary Maktabah',
    tagline: 'Plus Jakarta + Inter + Cairo',
    displayFont: "'Plus Jakarta Sans', sans-serif",
    bodyFont: "'Inter', sans-serif",
    arabicFont: "'Cairo', sans-serif",
    iconStyle: 'lucide',
    description: 'High-clarity Swiss geometric minimalism with bold modern Kufic Arabic.'
  },
  {
    id: 'editorial-journal',
    name: 'Editorial Journal',
    tagline: 'Playfair Display + Lora + Cairo',
    displayFont: "'Playfair Display', Georgia, serif",
    bodyFont: "'Lora', Georgia, serif",
    arabicFont: "'Cairo', sans-serif",
    iconStyle: 'phosphor-duotone',
    description: 'High-contrast luxury publication styling with brushed curves and contemporary accents.'
  }
];

interface DesignSystemContextType {
  displayFont: string;
  bodyFont: string;
  arabicFont: string;
  iconStyle: 'lucide' | 'phosphor-regular' | 'phosphor-duotone';
  activePresetId: string;
  applyPreset: (presetId: string) => void;
  setDisplayFont: (font: string) => void;
  setBodyFont: (font: string) => void;
  setArabicFont: (font: string) => void;
  setIconStyle: (style: 'lucide' | 'phosphor-regular' | 'phosphor-duotone') => void;
  isTweakBarOpen: boolean;
  setIsTweakBarOpen: (open: boolean) => void;
}

const DesignSystemContext = createContext<DesignSystemContextType | undefined>(undefined);

const STORAGE_KEY = 'bothlife_typography_config_v1';

export const DesignSystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const defaultPreset = FONT_PRESETS[0];

  const [activePresetId, setActivePresetId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).activePresetId || defaultPreset.id : defaultPreset.id;
  });

  const [displayFont, setDisplayFontState] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).displayFont || defaultPreset.displayFont : defaultPreset.displayFont;
  });

  const [bodyFont, setBodyFontState] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).bodyFont || defaultPreset.bodyFont : defaultPreset.bodyFont;
  });

  const [arabicFont, setArabicFontState] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).arabicFont || defaultPreset.arabicFont : defaultPreset.arabicFont;
  });

  const [iconStyle, setIconStyleState] = useState<'lucide' | 'phosphor-regular' | 'phosphor-duotone'>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).iconStyle || defaultPreset.iconStyle : defaultPreset.iconStyle;
  });

  const [isTweakBarOpen, setIsTweakBarOpen] = useState(false);

  // Apply to document root CSS variables immediately
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--font-serif', displayFont);
    root.style.setProperty('--font-sans', bodyFont);
    root.style.setProperty('--font-arabic', arabicFont);
    document.body.style.fontFamily = bodyFont;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        activePresetId,
        displayFont,
        bodyFont,
        arabicFont,
        iconStyle
      })
    );
  }, [displayFont, bodyFont, arabicFont, iconStyle, activePresetId]);

  const applyPreset = (presetId: string) => {
    const target = FONT_PRESETS.find((p) => p.id === presetId);
    if (!target) return;
    setActivePresetId(target.id);
    setDisplayFontState(target.displayFont);
    setBodyFontState(target.bodyFont);
    setArabicFontState(target.arabicFont);
    setIconStyleState(target.iconStyle);
  };

  const setDisplayFont = (font: string) => {
    setDisplayFontState(font);
    setActivePresetId('custom');
  };

  const setBodyFont = (font: string) => {
    setBodyFontState(font);
    setActivePresetId('custom');
  };

  const setArabicFont = (font: string) => {
    setArabicFontState(font);
    setActivePresetId('custom');
  };

  const setIconStyle = (style: 'lucide' | 'phosphor-regular' | 'phosphor-duotone') => {
    setIconStyleState(style);
    setActivePresetId('custom');
  };

  return (
    <DesignSystemContext.Provider
      value={{
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
      }}
    >
      {children}
    </DesignSystemContext.Provider>
  );
};

export const useDesignSystem = () => {
  const ctx = useContext(DesignSystemContext);
  if (!ctx) {
    throw new Error('useDesignSystem must be used within a DesignSystemProvider');
  }
  return ctx;
};
