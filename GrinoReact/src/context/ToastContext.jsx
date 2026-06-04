import { useCallback, useMemo, useRef, useState } from "react";
import { ToastContext } from "./toast";

export function ToastProvider({ children }) {
  const [activeToast, setActiveToast] = useState(null);
  const timeoutRef = useRef(null);

  const showToast = useCallback((type) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setActiveToast(type);
    timeoutRef.current = setTimeout(() => {
      setActiveToast(null);
    }, 3000);
  }, []);

  const value = useMemo(
    () => ({
      activeToast,
      showToast,
    }),
    [activeToast, showToast],
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}
