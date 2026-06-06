import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/store";
import { useToast } from "../../context/toast";
import { formatPrice, getDiscountedPrice } from "../../utils/priceUtils";
import StarRating from "../StarRating/StarRating";

function ProductCard({ product }) {
  const { state, dispatch } = useStore();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const cartItem = state.cart.find((item) => item.id === product.id);
  const isInCart = Boolean(cartItem);
  const isFavorite = state.favorites.some((fav) => fav.id === product.id);
  const newPrice = getDiscountedPrice(product);
  const discount = product.discountPercentage.toFixed(0);
  const category = product.tags?.[0] ?? product.category;

  const handleToggleFavorite = useCallback(() => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: product });
    if (!isFavorite) {
      showToast("favorite");
    }
  }, [dispatch, isFavorite, product, showToast]);

  const handleAddToCart = useCallback(() => {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity: 1 } });
    showToast("cart");
  }, [dispatch, product, showToast]);

  const handleIncrement = useCallback(() => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: product.id });
  }, [dispatch, product.id]);

  const handleDecrement = useCallback(() => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: product.id });
  }, [dispatch, product.id]);

  const handleRemove = useCallback(() => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product.id });
  }, [dispatch, product.id]);

  const handleNavigate = useCallback(() => {
    navigate(`/product/${product.id}`);
  }, [navigate, product.id]);

  return (
    <div
      className="product-card"
      data-category={category}
      data-id={product.id}
      data-price={newPrice.toFixed(2)}
      data-rating={Math.round(product.rating)}
    >
      <span className="product-sale">Sale {discount}%</span>
      <div className="fav-eye">
        <i
          className={`${isFavorite ? "ri-heart-fill active_color" : "ri-heart-line"} fav-icon favorite`}
          data-id={product.id}
          onClick={handleToggleFavorite}
        ></i>
        <i
          className="eye-icon ri-eye-line"
          data-id={product.id}
          onClick={handleNavigate}
        ></i>
      </div>
      <div className="product-img" onClick={handleNavigate}>
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
      </div>
      <div className="product">
        <div className="product-info">
          <p className="product-name">{product.title}</p>
          <h4 className="product-price">
            {formatPrice(newPrice)}{" "}
            <del className="old-price">{formatPrice(product.price)}</del>
          </h4>
          <div className="product-rating">
            <StarRating rating={product.rating} />
          </div>
        </div>
        <div className={`buy-icon ${isInCart ? "hide_buy" : ""}`}>
          <i
            className="ri-shopping-bag-line buy"
            data-id={product.id}
            onClick={handleAddToCart}
          ></i>
        </div>
        <div className={`add-minus-trash ${isInCart ? "show_options" : ""}`}>
          <div className="quantity-trash">
            <i
              className="ri-add-line btn-quantityCard"
              onClick={handleIncrement}
            ></i>
            <span className="item_quan_count">{cartItem?.quantity ?? 0}</span>
            <i
              className="ri-subtract-line btn-quantityCard"
              onClick={handleDecrement}
            ></i>
            <i className="ri-delete-bin-line" onClick={handleRemove}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
