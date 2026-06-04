import { memo, useCallback, useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../../context/store";
import {
  formatPrice,
  getCartItemsCount,
  getCartTotal,
} from "../../utils/priceUtils";
import CartPopup from "../CartPopup/CartPopup";
import SearchBar from "./SearchBar";

function Navbar() {
  const { state } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemsCount = useMemo(() => getCartItemsCount(state.cart), [state.cart]);
  const cartTotal = useMemo(() => getCartTotal(state.cart), [state.cart]);

  const handleToggleCart = useCallback(() => {
    setIsCartOpen((current) => !current);
  }, []);

  const handleCloseCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const handleFavorites = useCallback(() => {
    navigate("/favorites");
  }, [navigate]);

  const handleToggleMenu = useCallback(() => {
    setIsMenuOpen((current) => !current);
  }, []);

  const handleHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const routeTrail = useMemo(() => {
    if (location.pathname === "/products") {
      return [{ to: "/products", label: "Products" }];
    }

    if (location.pathname === "/favorites") {
      return [
        { to: "/products", label: "Products" },
        { to: "/favorites", label: "Favorites" },
      ];
    }

    if (location.pathname === "/cart") {
      return [{ to: "/cart", label: "Shopping Cart" }];
    }

    if (location.pathname === "/checkout") {
      return [{ to: "/checkout", label: "Checkout" }];
    }

    if (location.pathname.startsWith("/product/")) {
      return [
        { to: "/products", label: "Products" },
        { to: location.pathname, label: "Product Details" },
      ];
    }

    return [];
  }, [location.pathname]);

  return (
    <>
      <header className="Navigation">
        <div className="small-one">
          <div className="contact">
            <i className="fas fa-map-marker-alt"></i>
            <p>11.New ST. Shobra, Cairo , Egypt</p>
          </div>
          <div className="links">
            <select className="language" defaultValue="en">
              <option value="en">Eng</option>
              <option value="ar">Ar</option>
            </select>
            <select className="currency" defaultValue="usd">
              <option value="usd">USD</option>
              <option value="egp">EGP</option>
            </select>
            <span className="divider">|</span>
            <div className="account">
              <Link to="/">Sign In</Link> / <Link to="/">Sign Up</Link>
            </div>
          </div>
        </div>

        <div className="middle">
          <Link className="Logo" to="/">
            <i className="fas fa-solid fa-seedling"></i>
            <i className="ri-seedling-fill"></i>
            <h1>Grino</h1>
          </Link>
          <SearchBar />
          <div className="icons">
            <i className="ri-heart-line favs" onClick={handleFavorites}></i>
            <span className="divider">|</span>
            <div className="shopping" onClick={handleToggleCart}>
              <div className="cart">
                <i className="ri-shopping-cart-line"></i>
                <span className="items-count">{itemsCount}</span>
              </div>
              <div className="info">
                <p className="shopping-txt">Shopping Cart:</p>
                <span className="cart-price">{formatPrice(cartTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="nav-links">
          <ul className="links-list">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products">Shop</NavLink>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>
          <ul
            id="ul-mob"
            className={`links-list ${isMenuOpen ? "active" : ""}`}
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products">Shop</NavLink>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
            <div id="call-mob" className="call-now">
              <i className="ri-phone-line"></i>
              <div>
                <p>Call Now</p>
                <h3>(+20) 111-3545-007</h3>
              </div>
            </div>
            <div id="icons-mob" className="icons">
              <i className="ri-heart-line favs" onClick={handleFavorites}></i>
              <span className="divider">|</span>
              <div className="shopping" onClick={handleToggleCart}>
                <div className="cart">
                  <i className="ri-shopping-cart-line"></i>
                  <span className="items-count items-count-mob">
                    {itemsCount}
                  </span>
                </div>
                <div className="info">
                  <p className="shopping-txt">Shopping Cart:</p>
                  <span className="cart-price cart-price-mob">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>
            </div>
          </ul>
          <i
            id="burger-menu"
            className="fa-solid fa-bars"
            onClick={handleToggleMenu}
          ></i>
          <div className="call-now">
            <i className="ri-phone-line"></i>
            <div>
              <p>Call Now</p>
              <h3>(+20) 111-3545-007</h3>
            </div>
          </div>
        </div>
        {routeTrail.length > 0 && (
          <div className="nav-pages">
            <i className="fas fa-regular fa-house" onClick={handleHome}></i>
            {routeTrail.map((item) => (
              <span className="nav-page-part" key={item.to}>
                <i className="fa-solid fa-angle-right"></i>
                <Link to={item.to}>{item.label}</Link>
              </span>
            ))}
          </div>
        )}
      </header>
      <CartPopup isOpen={isCartOpen} onClose={handleCloseCart} />
    </>
  );
}

export default memo(Navbar);
