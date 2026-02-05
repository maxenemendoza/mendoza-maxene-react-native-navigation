// ThemeContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeColors {
  background: string;
  text: string;
  card: string;
  border: string;
  primary: string;
  secondary: string;
}

interface ThemeContextType {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const lightColors: ThemeColors = {
  background: '#FFFFFF',
  text: '#000000',
  card: '#F5F5F5',
  border: '#E0E0E0',
  primary: '#6200EE',
  secondary: '#03DAC6',
};

const darkColors: ThemeColors = {
  background: '#121212',
  text: '#FFFFFF',
  card: '#1E1E1E',
  border: '#2C2C2C',
  primary: '#BB86FC',
  secondary: '#03DAC6',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');

  const toggleTheme = (): void => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};