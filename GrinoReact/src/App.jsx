import { Route, Routes } from "react-router-dom";
import { useProducts } from "./hooks/useProducts";
import MainLayout from "./layouts/MainLayout";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import PlaceholderPage from "./pages/PlaceholderPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductsPage from "./pages/ProductsPage";
import ProductInfoPage from "./pages/ProductInfoPage";
import "./App.css";

function App() {
  useProducts();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductInfoPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
}

export default App;
