import { useEffect } from "react";

export default function useDebounce(
  effect: any,
  dependencies: any,
  delay: number
) {
  useEffect(() => {
    const timeout = setTimeout(effect, delay);
    return () => clearTimeout(timeout);
  }, [effect, delay, ...dependencies]);
}
