import { useState, useEffect } from "react";

/**
 * Custom hook for synchronized localStorage persistence with React state.
 *
 * Requirements satisfied:
 * 1. Uses key 'focusboard_tasks'.
 * 2. Lazy initializer to prevent re-reading storage or overwriting data on re-renders.
 * 3. Uses sample data ONLY when storage item is null (first launch).
 * 4. Preserves intentionally empty arrays [] (does not restore sample tasks if deleted).
 * 5. Handles malformed JSON and private browsing restrictions safely.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        // No prior data saved: initialize with initialValue (sampleTasks)
        return initialValue;
      }

      const parsed = JSON.parse(item);
      // Ensure the parsed item is valid array/data
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return parsed !== undefined ? parsed : initialValue;
    } catch (error) {
      console.warn(`FocusBoard: Error reading localStorage key "${key}":`, error);
      // In case of corrupted JSON, fallback gracefully to initial value
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`FocusBoard: Error writing to localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
