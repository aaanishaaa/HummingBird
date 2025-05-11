import { createContext, useContext, useEffect, useState } from 'react';

const initialState = {
  theme: 'light',
  setTheme: () => null,
};

const ThemeProviderContext = createContext(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'vite-ui-theme',
  ...props
}) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove existing theme classes and add the current theme
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Save the theme to localStorage
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const value = {
    theme,
    setTheme: (newTheme) => setTheme(newTheme),
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
