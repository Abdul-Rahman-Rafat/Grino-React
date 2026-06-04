import { memo, useCallback } from "react";
import { useStore } from "../context/store";
import { useToast } from "../context/toast";
import { formatPrice, getDiscountedPrice } from "../utils/priceUtils";

function FavoritesPage() {
  const { state, dispatch } = useStore();
  const { showToast } = useToast();

  const handleRemove = useCallback(
    (product) => {
      dispatch({ type: "TOGGLE_FAVORITE", payload: product });
    },
    [dispatch],
  );

  const handleAddToCart = useCallback(
    (product) => {
      dispatch({ type: "ADD_TO_CART", payload: product });
      showToast("cart");
    },
    [dispatch, showToast],
  );

  return (
    <>
      <div className="popup-overlay1"></div>
      <h1 className="heading">My Wishlist</h1>
      <div className="favorites-container">
        <div className="favorites-header">
          <div className={`header ${state.favorites.length === 0 ? "hide_head" : ""}`}>
            <h3>PRODUCT</h3>
            <h3>PRICE</h3>
            <h3>STOCK STATUS</h3>
          </div>
        </div>

        <div id="favorite-items-container" className="favorite-items">
          {state.favorites.length === 0 ? (
            <div className="no-favs">
              <img
                className="not-found-img"
                src="images/fav-not-found.webp"
                alt="No favorites"
              />
              <p>No Favorites Yet</p>
            </div>
          ) : (
            state.favorites.map((product) => {
              const newPrice = getDiscountedPrice(product);

              return (
                <div className="favorite-item" data-id={product.id} key={product.id}>
                  <div className="item-img-name">
                    <i
                      className="ri-close-circle-line"
                      onClick={() => handleRemove(product)}
                    ></i>
                    <img
                      className="fav-img"
                      src={product.thumbnail}
                      alt={product.title}
                    />
                    <h2>{product.title}</h2>
                  </div>
                  <p>
                    {formatPrice(newPrice)}{" "}
                    <del>{formatPrice(product.price)}</del>
                  </p>
                  <span className="stock">In Stock</span>
                  <button
                    className="add-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      <section id="contact" className="contact-information-cover">
        <div className="contact-information">
          <div className="contact-information-card-container">
            <div className="contact-information-card3 card">
              <i className="ri-mail-line"></i>
              <div className="contact-txt">
                <h3>SUBSCRIBE NEWSLTTER</h3>
                <div className="email-address-container">
                  <input
                    className="email-field"
                    type="text"
                    placeholder="Your email address"
                  />
                  <button className="subscribe-btn">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(FavoritesPage);
