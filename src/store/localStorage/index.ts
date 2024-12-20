"use client";

import { LocalStorageResult } from "./types";

// used from https://blog.jim-nielsen.com/2024/localstorage-recoil/

/**
 * Given a specific key, this effect will sync the value of the atom into localStorage
 * and react to changes to that localStorage value across other tabs/windows.
 *
 * @param key - The key used in localStorage
 */
export const localStorageStore: LocalStorageResult<any> =
  (key: string)=>
    ({ setSelf, onSet, resetSelf }) => {
      if (typeof window === "undefined") { return }
      // On load, if there's a value in localStorage, set the atom
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      // Subscribe to changes in the atom and update localStorage
      onSet((newValue, _, isReset) => {
        isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
      });

      // When the value changes in localstorage (from another tab), update the atom
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === key) {
          if (event.newValue === null) {
            resetSelf();
          } else {
            const newValue = JSON.parse(event.newValue);
            setSelf(newValue);
          }
        }
      };
      window.addEventListener('storage', handleStorageChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    };