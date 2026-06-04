import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/store";
import { formatPrice, getCartItemsCount, getCartTotal, getDiscountedPrice } from "../../utils/priceUtils";

function CartPopup({ isOpen, onClose }) {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const itemsCount = getCartItemsCount(state.cart);

  const handleCheckout = useCallback(() => {
    onClose();
    navigate("/checkout");
  }, [navigate, onClose]);

  const handleCart = useCallback(() => {
    onClose();
    navigate("/cart");
  }, [navigate, onClose]);

  const handleRemove = useCallback(
    (productId) => {
      dispatch({ type: "REMOVE_FROM_CART", payload: productId });
    },
    [dispatch],
  );

  return (
    <section className={`pop-shopping-cart ${isOpen ? "show-pop" : ""}`}>
      <div className="title-X">
        <h2>
          Shopping Cart ( <span className="pop-shop-items-count1">{itemsCount}</span> )
        </h2>
        <i className="fa-solid fa-xmark" onClick={onClose}></i>
      </div>
      <div id="cart-items-id" className="cart-items">
        {state.cart.map((item) => (
          <div className="cart-item" data-id={item.id} key={item.id}>
            <img src={item.thumbnail} alt={item.title} />
            <div>
              <h4>{item.title}</h4>
              <p>
                {item.quantity} x {formatPrice(getDiscountedPrice(item))}
              </p>
            </div>
            <i
              className="ri-delete-bin-line"
              onClick={() => handleRemove(item.id)}
            ></i>
          </div>
        ))}
      </div>
      <div className="sub-checkout">
        <div className="sub-total-count">
          <span className="cart-items-count">
            <span className="pop-shop-items-count2">{itemsCount}</span> Items
          </span>
          <span className="sub-total-price">{formatPrice(getCartTotal(state.cart))}</span>
        </div>
        <div className="btn-checkout-cart">
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
          <button className="go-cart-btn" onClick={handleCart}>
            Go To Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default memo(CartPopup);
