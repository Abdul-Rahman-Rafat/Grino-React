import { createContext, useContext } from "react";
import { getFromStorage } from "../utils/localStorage";

export const initialState = {
  products: [],
  loading: false,
  error: null,
  cart: getFromStorage("cart_storage", []),
  favorites: getFromStorage("favorites_storage", []),
  searchTerm: "",
  selectedCategory: "all",
  priceRange: { min: 0, max: 30 },
  selectedRating: 0,
};

export function storeReducer(state, action) {
  switch (action.type) {
    case "FETCH_PRODUCTS_START":
      return { ...state, loading: true, error: null };
    case "FETCH_PRODUCTS_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_PRODUCTS_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "ADD_TO_CART": {
      const exists = state.cart.find((item) => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }
    case "INCREMENT_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };
    case "DECREMENT_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "TOGGLE_FAVORITE": {
      const exists = state.favorites.some((fav) => fav.id === action.payload.id);
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter((fav) => fav.id !== action.payload.id)
          : [...state.favorites, action.payload],
      };
    }
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.payload };
    case "SET_RATING_FILTER":
      return { ...state, selectedRating: action.payload };
    default:
      return state;
  }
}

export const StoreContext = createContext(null);

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }
  return context;
}
