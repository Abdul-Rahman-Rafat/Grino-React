import { Link } from "react-router-dom";
import { useStore } from "../context/store";
import { formatPrice, getDiscountedPrice } from "../utils/priceUtils";
import emptyCartImg from "../styles/images/empty_cart.webp";
import "../styles/shoppingCart.css";

function ShoppingCartPage() {
  const { state, dispatch } = useStore();
  const cart = state.cart ?? [];

  const subtotal = cart.reduce(
    (s, item) => s + getDiscountedPrice(item) * (item.quantity ?? 1),
    0,
  );

  const handleInc = (id) =>
    dispatch({ type: "INCREMENT_QUANTITY", payload: id });
  const handleDec = (id) =>
    dispatch({ type: "DECREMENT_QUANTITY", payload: id });
  const handleRemove = (id) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });

  return (
    <main style={{ minHeight: "40vh", padding: "4rem 10%" }}>
      <h1 className="heading">My Shopping Cart</h1>

      <section className="shopping-cart-section">
        <div className="shopping-cart-container">
          <div
            className={`shopping-items-cart-container ${cart.length === 0 ? "hide_container" : ""}`}
          >
            <div className="shopping-cart-header">
              <div className="header">
                <h4>PRODUCT</h4>
                <h4>PRICE</h4>
                <h4>QUANTITY</h4>
                <h4>SUB TOTAL</h4>
              </div>
              <hr />
            </div>

            <div className="cart-items">
              {cart.map((item) => (
                <div className="item-container" key={item.id}>
                  <div className="item-img-name">
                    <img src={item.thumbnail} alt={item.title} />
                    <div>
                      <p className="product-name">{item.title}</p>
                    </div>
                  </div>
                  <div className="price">
                    {formatPrice(getDiscountedPrice(item))}
                  </div>
                  <div className="quantity-cart">
                    <button
                      className="btn-quantity-cart"
                      onClick={() => handleInc(item.id)}
                    >
                      +
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn-quantity-cart"
                      onClick={() => handleDec(item.id)}
                    >
                      -
                    </button>
                  </div>
                  <div className="subtotal">
                    {formatPrice(getDiscountedPrice(item) * item.quantity)}
                  </div>
                  <div className="remove">
                    <i
                      className="ri-close-circle-line"
                      onClick={() => handleRemove(item.id)}
                    ></i>
                  </div>
                </div>
              ))}

              <div className="return-update-btn">
                <Link to="/products">
                  <button className="return-btn">Return To Shop</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="cart-total-container">
            <h2>Cart Total</h2>
            <hr />
            <div className="sub-subtotal">
              <p>Subtotal:</p>{" "}
              <span className="sub-subtotal-value">
                {formatPrice(subtotal)}
              </span>
            </div>
            <hr />
            <div className="ship-fess">
              <p>Shipping:</p> <span>Free</span>
            </div>
            <hr />
            <div className="total">
              <p> Total:</p>{" "}
              <span className="total-value">{formatPrice(subtotal)}</span>
            </div>
            <Link to="/checkout">
              <button className="checkout-proceed-btn">
                Proceed to checkout{" "}
              </button>
            </Link>
          </div>
        </div>

        {cart.length === 0 && (
          <div className="no-items">
            <img className="not-found-img" src={emptyCartImg} alt="empty" />
            <p>
              No Items <i className="fa-regular fa-face-tired"></i>
            </p>
          </div>
        )}

        <div className="coupon-container">
          <h2>Coupon Code</h2>
          <div className="input-apply">
            <input type="text" placeholder="Enter code" />
            <button>Apply Coupon</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ShoppingCartPage;
