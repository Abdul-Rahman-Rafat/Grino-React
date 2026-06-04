import { useEffect } from "react";
import { useStore } from "../context/store";

export function useProducts() {
  const { dispatch } = useStore();

  useEffect(() => {
    async function fetchProducts() {
      dispatch({ type: "FETCH_PRODUCTS_START" });
      try {
        const response = await fetch(
          "https://dummyjson.com/products/category/groceries",
        );
        if (!response.ok) {
          throw new Error("Unable to fetch products");
        }
        const data = await response.json();
        dispatch({
          type: "FETCH_PRODUCTS_SUCCESS",
          payload: data.products ?? [],
        });
      } catch (error) {
        dispatch({ type: "FETCH_PRODUCTS_ERROR", payload: error.message });
      }
    }

    fetchProducts();
  }, [dispatch]);
}
