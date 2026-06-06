import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
import BlogPage from "./BlogPage";
import { useStore } from "../context/store";
import { useTimer } from "../hooks/useTimer";

const categories = [
  ["fruits", "images/Fresh-Fruit.webp", "Fresh Fruit"],
  ["vegetables", "images/Fresh-Vegatables.webp", "Fresh Vegatables"],
  ["meat", "images/Meat.webp", "Meat"],
  ["desserts", "images/desserts.webp", "Desserts"],
  ["beverages", "images/Beverages.webp", "Beverages"],
  ["health supplements", "images/Beauty-Health.webp", "Health supplements"],
  ["grains", "images/grains.webp", "Grains"],
  ["condiments", "images/condiments.webp", "Condiments"],
  ["cooking essentials", "images/Cooking.webp", "Cooking"],
  ["pet supplies", "images/pet-food.webp", "Pet Food"],
  [
    "household essentials",
    "images/Dish Detergents.webp",
    "Household Essentials",
  ],
  ["seafood", "images/seafood.webp", "Seafood"],
];

const features = [
  ["ri-truck-line", "Free Shipping", "Free shipping on all your order"],
  [
    "ri-customer-service-2-line",
    "Customer Support 24/7",
    "Instant access to Support",
  ],
  [
    "fa-regular fa-credit-card",
    "100% Secure Payment",
    "We ensure your money is save",
  ],
  ["ri-refresh-line", "Money-Back Guarantee", "30 Days Money-Back Guarantee"],
];

const bannerSlides = [
  {
    image: "images/caro1img2.png",
  },

  {
    image: "images/caro2img.png",
  },
  {
    image: "images/caro3img.png",
  },
];

const testimonials = [
  [
    "images/customer1.webp",
    "Robert Fox",
    "Customer",
    "The service exceeded my expectations. Everything was delivered on time and with outstanding quality. I'll definitely be coming back again.",
  ],
  [
    "https://i.ibb.co/Lz51QhCV/me.jpg",
    "AbdulRahman",
    "Owner",
    "The shopping experience was incredibly smooth and convenient. The product quality exceeded my expectations, and delivery was fast and reliable..",
  ],
  [
    "images/customer3.webp",
    "Eleanor Pena",
    "Customer",
    "Great results and excellent support. I felt valued as a customer, and the final outcome was exactly what I was looking for.",
  ],
];

function TimeBlock({ value, label, id }) {
  return (
    <div>
      <h1 id={id}>{String(value).padStart(2, "0")}</h1>
      <p>{label}</p>
    </div>
  );
}

function HomePage() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const timer = useTimer();

  const popularProducts = useMemo(
    () => state.products.slice(0, 10),
    [state.products],
  );

  const handleShopNow = useCallback(() => {
    navigate("/products");
  }, [navigate]);

  const handleCategoryClick = useCallback(
    (category) => {
      dispatch({ type: "SET_CATEGORY", payload: category });
      navigate("/products");
    },
    [dispatch, navigate],
  );

  const handleViewAll = useCallback(
    (event) => {
      event.preventDefault();
      navigate("/products");
    },
    [navigate],
  );

  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveBanner((current) => (current + 1) % bannerSlides.length);
    }, 6000);
    return () => window.clearInterval(intervalId);
  }, []);

  const handlePrevBanner = useCallback(() => {
    setActiveBanner(
      (current) => (current - 1 + bannerSlides.length) % bannerSlides.length,
    );
  }, []);

  const handleNextBanner = useCallback(() => {
    setActiveBanner((current) => (current + 1) % bannerSlides.length);
  }, []);

  const handleTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <section id="home" className="banner carousel-banner">
        <div className="carousel-track">
          {bannerSlides.map((slide, index) => (
            <article
              key={slide.image}
              className={`banner-slide ${index === activeBanner ? "active" : ""}`}
            >
              <div className="banner-slide-content">
                <img src={slide.image} alt={`Slide ${index + 1}`} />
              </div>
            </article>
          ))}
          <div className="banner-slide-copy">
            <p className="welcomeP">WELCOME TO Nutra</p>
            <h1 className="banner-slide-title">
              Fresh & Healthy
              <br />
              Organic Food
            </h1>
            <p className="banner-slide-subtitle">
              Sale up to <span className="OFF">30% OFF</span>
            </p>
            <p className="banner-slide-description">
              Free shipping on all your order. we deliver, you enjoy.
            </p>
            <div>
              <button className="shop-now" onClick={handleShopNow}>
                Shop now &nbsp; <i className="fas fa-arrow-right-long"></i>
              </button>
            </div>
          </div>
        </div>

        <button className="carousel-arrow prev" onClick={handlePrevBanner}>
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <button className="carousel-arrow next" onClick={handleNextBanner}>
          <i class="fa-solid fa-arrow-right"></i>
        </button>

        <div className="carousel-dots">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === activeBanner ? "active" : ""}`}
              onClick={() => setActiveBanner(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="features-container">
        {features.map(([icon, title, text]) => (
          <div className="feature-container" key={title}>
            <div className="feature-img">
              <i className={icon}></i>
            </div>
            <div className="feature-txt">
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="popular-categories">
        <h1>Popular Categories</h1>
        <div className="categories">
          {categories.map(([category, image, title]) => (
            <div
              className="category"
              data-category={category}
              key={category}
              onClick={() => handleCategoryClick(category)}
            >
              <img src={image} alt={title} loading="lazy" />
              <h4>{title}</h4>
            </div>
          ))}
        </div>
      </section>

      <div className="popup-overlay1"></div>
      <section id="shop" className="popular-products">
        <div className="title-viewAll">
          <h1>Popular Products</h1>
          <a href="/products" onClick={handleViewAll}>
            View All &nbsp; <i className="fas fa-arrow-right-long"></i>
          </a>
        </div>
        <div id="products" className="products">
          {state.loading && <p>Loading products...</p>}
          {state.error && <p>{state.error}</p>}
          {popularProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>

      <section className="offer-banner">
        <div className="left-banner">
          <p>Best Deals</p>
          <h3>Sale of the Month</h3>
          <div className="timer">
            <TimeBlock id="days-id" value={0} label="DAYS" />
            <TimeBlock id="hours-id" value={timer.hours} label="HOURS" />
            <TimeBlock id="mins-id" value={timer.minutes} label="MINS" />
            <TimeBlock id="secs-id" value={timer.seconds} label="SECS" />
          </div>
          <div>
            <button className="shop-now" onClick={handleShopNow}>
              Shop Now &nbsp; <i className="fas fa-arrow-right-long"></i>
            </button>
          </div>
        </div>
        <div className="mid-banner">
          <p>85% Fat Free</p>
          <h3>Low-Fat Meat</h3>
          <div className="start-offer">
            Started at <span className="start-value">$79.99</span>
          </div>
          <div>
            <button className="shop-now" onClick={handleShopNow}>
              Shop Now &nbsp; <i className="fas fa-arrow-right-long"></i>
            </button>
          </div>
        </div>
        <div className="right-banner">
          <p>Winter Sale</p>
          <h3>100% Fresh Fruit</h3>
          <div className="up-to-offer">
            Up to <span className="up-to-value">64% OFF</span>
          </div>
          <div>
            <button className="shop-now" onClick={handleShopNow}>
              Shop Now &nbsp; <i className="fas fa-arrow-right-long"></i>
            </button>
          </div>
        </div>
      </section>

      <section className="trust-banner">
        <img className="leaf leaf-1" src="images/leaf.webp" alt="leaf1" />
        <img className="leaf leaf-2" src="images/leaf.webp" alt="leaf2" />
        <img className="leaf leaf-3" src="images/leaf.webp" alt="leaf3" />
        <img className="leaf leaf-4" src="images/long-leaf.webp" alt="leaf4" />
        <div className="old-man-banner">
          <img
            className="old-man"
            src="images/man-hold-apple-pack.webp"
            alt="man-hold-apple-pack"
          />
        </div>
        <div className="young-man-banner">
          <img
            className="young-man"
            src="images/man-pick-apple.webp"
            alt="man-pick-apple"
          />
        </div>
        <div className="trust-container">
          <h2 className="trust-title">
            100% Trusted <br /> Organic Food Store
          </h2>
          <div className="trust-p">
            <div className="trust-p-title">
              <i className="ri-checkbox-circle-fill"></i>
              <h4>Healthy & natural food for lovers of healthy food.</h4>
            </div>
            <p>
              We believe that real health starts with real food. That's why{" "}
              <br />
              Every product we offer is carefully selected to ensure it's <br />
              Free from harmful chemicals, preservatives, and artificial
              additives <br />
              Giving you the clean, natural nutrition your body deserves.
            </p>
          </div>
          <div className="trust-p">
            <div className="trust-p-title">
              <i className="ri-checkbox-circle-fill"></i>
              <h4>Every day fresh and quality products for you.</h4>
            </div>
            <p>
              Quality isn't just a promise - it's our daily commitment. <br />
              Every fruit, vegetable, and organic product is checked, <br />
              Sorted, and handled with care to ensure you get clean, <br />
              Safe, and nutritious food every day.
            </p>
            <button className="shop-now" onClick={handleShopNow}>
              Shop Now &nbsp; <i className="fas fa-arrow-right-long"></i>
            </button>
          </div>
        </div>
      </section>

      <section className="records">
        <img className="record-branch" src="images/branch.webp" alt="branch" />
        {[
          "37+|Years of Hard Work",
          "500k+|Happy Customer",
          "28|Qualified Team Member",
          "750k+|Monthly Orders",
        ].map((record) => {
          const [value, text] = record.split("|");
          return (
            <div className="record-card" key={text}>
              <h1 className="record-value">{value}</h1>
              <p className="record-desc">{text}</p>
            </div>
          );
        })}
      </section>

      <BlogPage />

      <section className="testimonial-cover">
        <div className="testimonial">
          <h3 className="testimonial-title">Testimonial</h3>
          <div className="cust-nav">
            <h1>What Our Customer Says</h1>
            <div className="testimonial-arrows">
              <button className="back-arrow arrow">
                <i className="fas fa-arrow-left-long"></i>
              </button>
              <button className="next-arrow arrow">
                <i className="fas fa-arrow-right-long"></i>
              </button>
            </div>
          </div>
          <div className="customer-card-container">
            {testimonials.map(([image, name, title, opinion]) => (
              <div className="customer-testimonial-card" key={name}>
                <i className="ri-double-quotes-r"></i>
                <p className="opinon">{opinion}</p>
                <div className="customer-card">
                  <div className="customer-info">
                    <div className="customer-name-img">
                      <img src={image} alt="" />
                      <div className="name-title">
                        <h3>{name}</h3>
                        <h5>{title}</h5>
                      </div>
                    </div>
                    <div className="rating">
                      {Array.from({ length: 5 }, (_, index) => (
                        <i className="ri-star-s-fill" key={index}></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-information-cover">
        <div className="contact-information">
          <div className="contact-information-card-container">
            <div className="contact-information-card1 card">
              <i className="ri-map-pin-line"></i>
              <div className="contact-txt">
                <h3>Our Location</h3>
                <p>11.New ST. Shobra, Cairo , Egypt</p>
              </div>
            </div>
            <div className="contact-information-card2 card">
              <i className="ri-phone-line"></i>
              <div className="contact-txt">
                <h3>Call Us 24/7</h3>
                <h2>(+20) 111-3545-007</h2>
              </div>
            </div>
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

      <section className="success_pop_section">
        <div>
          <i className="fa-regular fa-circle-check"></i>
          <p>Added To Favorites Successfully</p>
        </div>
        <div className="link-fav">
          <a onClick={() => navigate("/favorites")}>
            Visit Your Wishlist &nbsp;{" "}
            <i className="fas fa-arrow-right-long"></i>
          </a>
        </div>
      </section>
      <section className="success_pop_section2">
        <div>
          <i className="fa-regular fa-circle-check"></i>
          <p>Added To Cart Successfully</p>
        </div>
        <div className="link-fav">
          <a onClick={() => navigate("/cart")}>
            Visit Shopping Cart &nbsp;{" "}
            <i className="fas fa-arrow-right-long"></i>
          </a>
        </div>
      </section>

      <div className="up-home-arrow" onClick={handleTop}>
        <i className="ri-arrow-up-s-line"></i>
      </div>
    </>
  );
}

export default memo(HomePage);
