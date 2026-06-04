import { memo, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
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

const newsCards = [
  [
    "images/orange-slices.webp",
    "orange-slices",
    "4",
    "MAR",
    "85 Comments",
    "Experience the refreshing taste of fresh citrusto energize your day naturally.",
  ],
  [
    "images/cooked-egg.webp",
    "cooked-egg",
    "18",
    "JAN",
    "49 Comments",
    "combination of avocado and eggs, creating the perfect balanced breakfast",
  ],
  [
    "images/salad.webp",
    "salad",
    "11",
    "SEP",
    "65 Comments",
    "A colorful mix of fresh vegetables crafted into a nourishing salad bowl",
  ],
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

  const handleTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <section id="home" className="banner">
        <div className="big-banner">
          <div className="title">
            <h1>Fresh & Healthy</h1>
            <h1 className="">Organic Food</h1>
          </div>
          <div className="discount">
            <p>
              Sale up to <span className="discount-percent">30% OFF</span>
            </p>
            <p className="free-ship">Free shipping on all your order.</p>
          </div>
          <div>
            <button className="shop-now" onClick={handleShopNow}>
              Shop Now &nbsp; <i className="fas fa-arrow-right-long"></i>
            </button>
          </div>
        </div>
        <div className="small-banner">
          <div className="up-banner Smallbanner">
            <p className="sale">WINTER SALE</p>
            <h1>75% OFF</h1>
            <p className="only">Only Fruit & Vegetable</p>
            <button className="shop-now" onClick={handleShopNow}>
              Shop Now &nbsp; <i className="fas fa-arrow-right-long"></i>
            </button>
          </div>
          <div className="low-banner Smallbanner">
            <p>BEST DEAL</p>
            <h1 className="p-of-low-banner">
              Special Products <br /> Deal of the Month
            </h1>
            <button className="shop-now" onClick={handleShopNow}>
              Shop Now &nbsp; <i className="fas fa-arrow-right-long"></i>
            </button>
          </div>
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

      <section id="blog" className="latest-cover">
        <img
          className="latest-cover-leaf1 leaf"
          src="images/leaf.webp"
          alt="leaf3"
        />
        <img
          className="latest-cover-leaf2 leaf"
          src="images/leaf.webp"
          alt="leaf3"
        />
        <img
          className="latest-cover-leaf3 leaf"
          src="images/leaf.webp"
          alt="leaf3"
        />
        <div className="latest-news">
          <h3 className="blog-title" id="blog-title">
            Blog
          </h3>
          <h1 className="latest-news-title">Latest News</h1>
          <div className="latest-news-cards-container">
            {newsCards.map(([image, alt, day, month, comments, content]) => (
              <div className="latest-news-card" key={image}>
                <div className="latest-news-card-image-container">
                  <img
                    className="latest-news-card-image"
                    src={image}
                    alt={alt}
                  />
                  <div className="news-date">
                    <h1>{day}</h1>
                    <p>{month}</p>
                  </div>
                </div>
                <div className="latest-news-card-info">
                  <div className="latest-news-card-info-desc">
                    <div className="latest-news-card-info-title">
                      <span className="latest-news-card-info-desc-category">
                        <i className="ri-price-tag-3-line"></i> Food
                      </span>
                      <span className="latest-news-card-info-desc-user">
                        <i className="ri-user-line"></i> By Admin
                      </span>
                      <span className="latest-news-card-info-desc-comments">
                        <i className="ri-chat-2-line"></i> {comments}
                      </span>
                    </div>
                    <p className="latest-news-card-info-content">{content}</p>
                  </div>
                  <button className="latest-news-card-info-btn">
                    Read More &nbsp; <i className="fas fa-arrow-right-long"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
