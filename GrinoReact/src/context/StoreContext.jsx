import { useEffect, useMemo, useReducer } from "react";
import { saveToStorage } from "../utils/localStorage";
import { initialState, StoreContext, storeReducer } from "./store";

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  useEffect(() => {
    saveToStorage("cart_storage", state.cart);
  }, [state.cart]);

  useEffect(() => {
    saveToStorage("favorites_storage", state.favorites);
  }, [state.favorites]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
