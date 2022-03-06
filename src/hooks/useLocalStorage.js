import { useState } from "react";
import { useCallback } from "react";
import { getItem, saveItem } from "../heplers/LocalStorage";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = getItem(key);
      return value ? value : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (newValue) => {
      try {
        const valueSet =
          newValue instanceof Function ? newValue(storedValue) : newValue;
        setStoredValue(valueSet);
        saveItem(key, valueSet);
      } catch (error) {}
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
};
