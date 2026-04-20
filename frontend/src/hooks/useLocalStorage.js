/**
 * useLocalStorage.js — Custom React Hook
 *
 * A thin wrapper around localStorage that keeps React state in sync
 * with persisted browser storage. This is safer than calling
 * localStorage.getItem() directly inside components.
 *
 * Usage:
 *   import { useLocalStorage } from "../hooks/useLocalStorage";
 *
 *   const [token, setToken] = useLocalStorage("token", null);
 *   const [theme, setTheme] = useLocalStorage("theme", "light");
 *
 * Contributed by: Chetan Chauhan
 */

import { useState, useEffect } from "react";

/**
 * @template T
 * @param {string} key - localStorage key
 * @param {T} initialValue - Default value if key doesn't exist
 * @returns {[T, (value: T) => void]} - State + setter (same API as useState)
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.warn(`[useLocalStorage] Failed to read key "${key}":`, err);
      return initialValue;
    }
  });

  // Sync to localStorage whenever the stored value changes
  useEffect(() => {
    try {
      if (storedValue === null || storedValue === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (err) {
      console.warn(`[useLocalStorage] Failed to write key "${key}":`, err);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
