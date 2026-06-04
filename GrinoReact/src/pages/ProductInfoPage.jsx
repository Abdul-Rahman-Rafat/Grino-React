import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../context/store";
import { useToast } from "../context/toast";
import { formatPrice, getDiscountedPrice } from "../utils/priceUtils";
import StarRating from "../components/StarRating/StarRating";
import "../styles/productInfo.css";

function timeAgo(date) {
  const now = new Date();
  const diffMs = now - new Date(date);
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
}

function buildDefaultReviews(product) {
  const baseRating = Math.round(product.rating || 4);
  return [
    {
      reviewerName: "Amir Hassan",
      rating: Math.max(Math.min(baseRating, 5), 3),
      comment:
        "Great quality and fresh product. I felt the taste was exactly as described.",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    },
    {
      reviewerName: "Mariam Adel",
      rating: Math.max(Math.min(baseRating - 1, 5), 3),
      comment: "Fast delivery and good packaging. I will order again.",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    },
    {
      reviewerName: "Omar Nabil",
      rating: Math.max(Math.min(baseRating - 2, 5), 2),
      comment:
        "Product was fresh and arrived on time. Great shopping experience overall.",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    },
  ];
}

function ProductInfoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const product = useMemo(
    () => state.products.find((productItem) => productItem.id === Number(id)),
    [state.products, id],
  );

  useEffect(() => {
    if (product?.images?.[0]) {
      setSelectedImage(product.images[0]);
    } else if (product?.thumbnail) {
      setSelectedImage(product.thumbnail);
    }
  }, [product]);

  useEffect(() => {
    if (!state.loading && state.products.length > 0 && !product) {
      navigate("/products", { replace: true });
    }
  }, [navigate, product, state.loading, state.products.length]);

  const reviews = useMemo(
    () =>
      product?.reviews?.length
        ? product.reviews
        : product
          ? buildDefaultReviews(product)
          : [],
    [product],
  );

  const inCartItem = useMemo(
    () => state.cart.find((item) => item.id === product?.id),
    [state.cart, product],
  );

  const isFavorite = useMemo(
    () => state.favorites.some((fav) => fav.id === product?.id),
    [state.favorites, product],
  );

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
    showToast("cart");
  }, [dispatch, product, quantity, showToast]);

  const handleToggleFavorite = useCallback(() => {
    if (!product) return;
    dispatch({ type: "TOGGLE_FAVORITE", payload: product });
    if (!isFavorite) {
      showToast("favorite");
    }
  }, [dispatch, isFavorite, product, showToast]);

  const handleImageClick = useCallback((image) => {
    setSelectedImage(image);
  }, []);

  const handleBackToProducts = useCallback(() => {
    navigate("/products");
  }, [navigate]);

  const handleQuantityChange = useCallback((amount) => {
    setQuantity((current) => Math.max(1, current + amount));
  }, []);

  if (!product) {
    return (
      <main className="product-info-page">
        <div className="empty-state">
          {state.loading ? (
            <p>Loading product...</p>
          ) : (
            <p>Product not found.</p>
          )}
          <button className="shop-now" onClick={handleBackToProducts}>
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  const discountedPrice = getDiscountedPrice(product);
  const availability = product.stock > 0 ? "In Stock" : "Out of stock";
  const weight = product.weight ? `${product.weight}` : "0.5 kg";
  const category = product.tags?.[0] ?? product.category ?? "General";
  const brand = product.brand ?? "Green Life";
  const sku = `GRO-BRD-${String(product.id).padStart(3, "0")}-${product.title
    .slice(0, 3)
    .toUpperCase()}`;
  const minimumOrderQuantity = 1;
  const shippingInformation = "Free shipping on orders over $50.";
  const warrantyInformation = "1 Year Warranty";
  const returnPolicy = "30 Days Return Policy";

  return (
    <main className="product-info-page">
      {/* <section className="product-breadcrumbs">
        <button className="breadcrumb-home" onClick={handleBackToProducts}>
          <i className="fas fa-house"></i>
        </button>
        <span>Product Info</span>
      </section> */}

      <section className="product-details-cover">
        <div className="product-card-preview">
          <img
            className="product-main-image"
            src={selectedImage || product.thumbnail}
            alt={product.title}
          />
          <div className="product-thumbnails">
            {(product.images || [product.thumbnail])
              .slice(0, 4)
              .map((image) => (
                <button
                  key={image}
                  type="button"
                  className={`thumb-button ${selectedImage === image ? "active" : ""}`}
                  onClick={() => handleImageClick(image)}
                >
                  <img src={image} alt={product.title} loading="lazy" />
                </button>
              ))}
          </div>
        </div>

        <div className="product-details-info">
          <div className="details-header">
            <h1>{product.title}</h1>
            <span
              className={`stock-badge ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}
            >
              {availability}
            </span>
          </div>

          <div className="details-meta">
            <div className="rating-row">
              <StarRating rating={product.rating} />
              <span>{product.rating.toFixed(1)}</span>
            </div>
            <div className="sku-discount">
              <span>SKU: {sku}</span>
            </div>
          </div>

          <div className="details-price">
            <div>
              <span className="price-old">{formatPrice(product.price)}</span>
              <span className="price-new">{formatPrice(discountedPrice)}</span>
              <span
                className="discount-chip "
                style={{
                  display:
                    product.discountPercentage > 0 ? "inline-block" : "none",
                  marginLeft: "20px",
                }}
              >
                {product.discountPercentage.toFixed(0)}% off
              </span>
            </div>
          </div>

          <p className="details-description">{product.description}</p>

          <div className="details-brand">
            <span>Brand:</span> <strong>{brand}</strong>
          </div>

          <div className="actions-row">
            <div className="quantity-control">
              <button type="button" onClick={() => handleQuantityChange(-1)}>
                -
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={() => handleQuantityChange(1)}>
                +
              </button>
            </div>
            <button className="shop-now" onClick={handleAddToCart}>
              {isMobile ? (
                <i className="ri-shopping-bag-line"></i>
              ) : (
                "Add to Cart"
              )}
            </button>
            <button
              type="button"
              className={`fav-toggle ${isFavorite ? "active_color" : ""}`}
              onClick={handleToggleFavorite}
            >
              <i className={isFavorite ? "ri-heart-fill" : "ri-heart-line"}></i>
            </button>
          </div>

          <div className="details-tags">
            <span>category: {product.category}</span>
            <span>tag: {category}</span>
          </div>
        </div>
      </section>

      <section className="clicked-product-section">
        <nav className="product-links">
          <ul className="product-links-list">
            <li
              className={activeTab === "description" ? "active" : ""}
              onClick={() => setActiveTab("description")}
            >
              Descriptions
            </li>
            <li
              className={activeTab === "additional" ? "active" : ""}
              onClick={() => setActiveTab("additional")}
            >
              Additional Information
            </li>
            <li
              className={activeTab === "feedback" ? "active" : ""}
              onClick={() => setActiveTab("feedback")}
            >
              Customer Feedback
            </li>
          </ul>
        </nav>

        <div className="link-content">
          <div
            className={`Descriptions-link link ${activeTab !== "description" ? "hide" : ""}`}
          >
            <div>
              <p>Description:</p>
              <span>{product.description}</span>
            </div>
            <div>
              <p>Minimum Order Quantity:</p>
              <span>{minimumOrderQuantity}</span>
            </div>
            <div>
              <p>Return Policy:</p>
              <span>{returnPolicy}</span>
            </div>
          </div>

          <div
            className={`Additional-Information-link link ${activeTab !== "additional" ? "hide" : ""}`}
          >
            <div>
              <p>Weight:</p>
              <span>{weight}</span>
            </div>
            <div>
              <p>Availability Status:</p>
              <span>{availability}</span>
            </div>
            <div>
              <p>Shipping Information:</p>
              <span>{shippingInformation}</span>
            </div>
            <div>
              <p>Warranty Information:</p>
              <span>{warrantyInformation}</span>
            </div>
          </div>

          <div
            className={`Customer-Feedback-link link ${activeTab !== "feedback" ? "hide" : ""}`}
          >
            {reviews.map((review) => (
              <div
                className="customer-opiopn-card"
                key={`${review.reviewerName}-${review.date}`}
              >
                <div className="customer-card">
                  <div className="customer-onion-info">
                    <div className="customer-name-img">
                      <img
                        src="images/user_customer.webp"
                        alt={review.reviewerName}
                      />
                      <div className="name-title">
                        <h3>{review.reviewerName}</h3>
                        <span className="comment-date">
                          {timeAgo(review.date)}
                        </span>
                      </div>
                    </div>
                    <div className="rating">
                      {Array.from({ length: 5 }, (_, index) => (
                        <i
                          key={index}
                          className={
                            index < review.rating
                              ? "ri-star-s-fill"
                              : "ri-star-s empty"
                          }
                        ></i>
                      ))}
                    </div>
                  </div>
                  <p className="opinon">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductInfoPage;
