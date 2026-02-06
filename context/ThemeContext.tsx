import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Theme, ThemeContextType } from '../types/index';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const lightTheme: Theme = {
  background: '#F8F9FA',
  cardBackground: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#6C757D',
  primary: '#FF6B6B',
  primaryDark: '#EE5A52',
  success: '#51CF66',
  border: '#E9ECEF',
  shadow: 'rgba(0, 0, 0, 0.1)',
  buttonText: '#FFFFFF',
};

export const darkTheme: Theme = {
  background: '#0F0F23',
  cardBackground: '#1A1A2E',
  text: '#E8E8F0',
  textSecondary: '#9CA3AF',
  primary: '#FF6B6B',
  primaryDark: '#EE5A52',
  success: '#51CF66',
  border: '#2D2D44',
  shadow: 'rgba(0, 0, 0, 0.3)',
  buttonText: '#FFFFFF',
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = (): void => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const value: ThemeContextType = {
    theme,
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};