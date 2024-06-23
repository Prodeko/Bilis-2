import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

function useDebounce<T>(
  value: T,
  delay?: number,
): [T, Dispatch<SetStateAction<T>>] {
  const [actualValue, setActualValue] = useState<T>(value);
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(actualValue), delay);
    return () => {
      clearTimeout(timer);
    };
  }, [actualValue, delay]);

  return [debouncedValue, setActualValue];
}

export default useDebounce;
