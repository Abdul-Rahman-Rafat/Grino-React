import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const openExternal = useCallback((url) => {
    window.open(url, "_blank");
  }, []);

  const handleCart = useCallback(() => {
    navigate("/cart");
  }, [navigate]);

  const handleFavorites = useCallback(() => {
    navigate("/favorites");
  }, [navigate]);

  const handleProducts = useCallback(() => {
    navigate("/products");
  }, [navigate]);

  return (
    <footer id="about" className="footer-container">
      <img className="leaf-1" src="images/leaf.webp" alt="" />
      <div className="footer">
        <div className="company">
          <div className="logo-container">
            <i className="fas fa-solid fa-seedling"></i>
            <h1>Grino</h1>
          </div>
          <p className="footer-summery">
            Your Trusted Store for Fresh & Organic Food We provide high-quality
            organic fruits, vegetables, and healthy products delivered fresh to
            your doorstep. Eat clean, live healthy.
          </p>
          <div className="social-media">
            <i className="ri-facebook-fill" onClick={() => openExternal("https://www.facebook.com/abdelrahmanrafat477/")}></i>
            <i className="ri-linkedin-fill" onClick={() => openExternal("https://www.linkedin.com/in/abdul-rahman-rafat-b571a4361/")}></i>
            <i className="ri-whatsapp-fill" onClick={() => openExternal("https://wa.me/201011223344?text=Hello%20I%20want%20to%20contact%20you")}></i>
            <i className="ri-twitter-x-line"></i>
            <i className="ri-instagram-line"></i>
          </div>
        </div>
        <div className="myaccount">
          <h2 className="links-title">My Account</h2>
          <hr />
          <ul className="footer-links">
            <li>My Account</li>
            <li>Order History</li>
            <li onClick={handleCart}>Shopping cart</li>
            <li onClick={handleFavorites}>Wishlist</li>
          </ul>
        </div>
        <div className="help">
          <h2 className="links-title">Helps</h2>
          <hr />
          <ul className="footer-links">
            <li onClick={() => openExternal("https://wa.me/201011223344?text=Hello%20I%20want%20to%20contact%20you")}>Contact</li>
            <li>Faqs</li>
            <li>Terms & Condition</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="proxy">
          <h2 className="links-title">Proxy</h2>
          <hr />
          <ul className="footer-links">
            <li>About</li>
            <li onClick={handleProducts}>Shop</li>
            <li onClick={handleProducts}>Product</li>
            <li>Track Order</li>
          </ul>
        </div>
        <div className="download-mobile-app">
          <h2 className="links-title">Download Mobile App</h2>
          <hr />
          <div className="download-container">
            <div className="download">
              <i className="ri-apple-fill"></i>
              <div>
                <p>Download on the</p>
                <h2>App Store</h2>
              </div>
            </div>
            <div className="download">
              <i className="ri-google-play-fill"></i>
              <div>
                <p>Download on the</p>
                <h2>Google play</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-container">
        <div className="copyright">
          <p className="copyright-txt">
            (c) Grino eCommerce 2025 - Built by Abdul Rahman Rafat All Rights Reserved
          </p>
          <p className="front-developer">coded by Abdulrahman-R</p>
          <div className="payment-methods">
            <i className="ri-apple-fill">pay</i>
            <i className="ri-paypal-fill"></i>
            <i className="ri-visa-line"></i>
            <i className="ri-mastercard-fill"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
