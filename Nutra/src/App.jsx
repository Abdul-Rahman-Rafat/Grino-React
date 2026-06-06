import { Route, Routes } from "react-router-dom";
import { useProducts } from "./hooks/useProducts";
import MainLayout from "./layouts/MainLayout";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import ProductsPage from "./pages/ProductsPage";
import ProductInfoPage from "./pages/ProductInfoPage";
import "./App.css";
import BlogPage from "./pages/BlogPage";

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
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="*"
          element={
            <h1 style={{ textAlign: "center", marginTop: "4rem" }}>
              404 Not Found
            </h1>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
