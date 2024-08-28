import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initValue: T | (() => T)
) {
  const [value, setValue] = useState<T>(() => {
    const localValue = localStorage.getItem(key);
    if (localValue) {
      return JSON.parse(localValue);
    }
    if (typeof initValue === "function") return (initValue as () => T)();

    return initValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
