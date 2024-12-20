"use client";

import { atom, useRecoilState } from "recoil";
import { localStorageStore } from "../localStorage";

const themeState = atom({
  key: 'theme',
  default: null,
  effects: [
    localStorageStore('web-app-theme'),
  ]
});

/**
 * Set current theme
 */
export const useThemeStore = () => useRecoilState(themeState);
