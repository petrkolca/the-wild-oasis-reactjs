import { createContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  let deviceActiveThemeColor = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    deviceActiveThemeColor,
    'isDarkMode',
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((isDark) => !isDark);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
