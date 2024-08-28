import { useEffect, useState } from "react";

export default function useDebounce({
  value,
  delay = 500,
}: {
  value: string;
  delay: number;
}) {
  const [newValue, setNewValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNewValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, value]);

  return newValue;
}
