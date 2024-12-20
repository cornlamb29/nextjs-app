"use client";

import { useEffect } from "react";
import { useThemeStore } from "../store/theme";

/**
 * Theme class
 */
export default function useTheme() {
  const [theme, setTheme] = useThemeStore();

  // if users system scheme is not set will choose theme based on global storage
  useEffect(() => {
    if (!theme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.classList.toggle("light", theme === "dark");
      document.documentElement.classList.toggle("dark", theme === "light");
    }
  }, [theme, setTheme]);
}
