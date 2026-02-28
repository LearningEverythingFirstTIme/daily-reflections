// Theme configuration types
export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    bg: string;
    card: string;
    text: string;
    textMuted: string;
    accent: string;
    accent2: string;
    accent3: string;
    accent4: string;
    border: string;
    headerBg: string;
    buttonPrimary: string;
    buttonSecondary: string;
    shadow: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  borderRadius: string;
  borderWidth: string;
  shadowStyle: string;
}

export const themes: Theme[] = [
  {
    id: 'neobrutalist',
    name: 'Neo-Brutalist',
    description: 'Bold colors, hard shadows, playful aesthetic',
    colors: {
      bg: '#F5F1E8',
      card: '#FFFFFF',
      text: '#1A1A1A',
      textMuted: 'rgba(26, 26, 26, 0.6)',
      accent: '#FF6B6B',
      accent2: '#4ECDC4',
      accent3: '#FFE66D',
      accent4: '#FF8B94',
      border: '#1A1A1A',
      headerBg: '#FF6B6B',
      buttonPrimary: '#FF6B6B',
      buttonSecondary: '#4ECDC4',
      shadow: '#1A1A1A',
    },
    fonts: {
      heading: 'font-heading',
      body: 'font-body',
    },
    borderRadius: '0px',
    borderWidth: '2px',
    shadowStyle: '4px 4px 0px 0px',
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    description: 'Easy on the eyes with subtle accents',
    colors: {
      bg: '#0F0F0F',
      card: '#1A1A1A',
      text: '#E8E8E8',
      textMuted: 'rgba(232, 232, 232, 0.6)',
      accent: '#6366F1',
      accent2: '#8B5CF6',
      accent3: '#10B981',
      accent4: '#F59E0B',
      border: '#2D2D2D',
      headerBg: '#1A1A1A',
      buttonPrimary: '#6366F1',
      buttonSecondary: '#8B5CF6',
      shadow: '#000000',
    },
    fonts: {
      heading: 'font-sans',
      body: 'font-sans',
    },
    borderRadius: '8px',
    borderWidth: '1px',
    shadowStyle: '0px 4px 20px 0px rgba(0,0,0,0.5)',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean, minimal, business-appropriate',
    colors: {
      bg: '#FAFAFA',
      card: '#FFFFFF',
      text: '#1F2937',
      textMuted: 'rgba(31, 41, 55, 0.6)',
      accent: '#2563EB',
      accent2: '#3B82F6',
      accent3: '#10B981',
      accent4: '#EF4444',
      border: '#E5E7EB',
      headerBg: '#2563EB',
      buttonPrimary: '#2563EB',
      buttonSecondary: '#6B7280',
      shadow: 'rgba(0,0,0,0.08)',
    },
    fonts: {
      heading: 'font-sans',
      body: 'font-sans',
    },
    borderRadius: '6px',
    borderWidth: '1px',
    shadowStyle: '0px 1px 3px 0px',
  },
];

export const defaultTheme = themes[0];
