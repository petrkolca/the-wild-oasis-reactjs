// src/context/UseDarkMode.js
import { useContext } from 'react';
import { DarkModeContext } from './DarkModeContext';

export function UseDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('UseDarkMode must be used within a DarkModeProvider');
  }
  return context;
}
