import { memo, useCallback, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import { useStore } from "../context/store";
import { useTimer } from "../hooks/useTimer";
import { getDiscountedPrice } from "../utils/priceUtils";
import SearchBar from "../components/Navbar/SearchBar";

const categoryGroups = [
  [["all", "all-Categories-btn", "All Categories"]],
  [
    ["vegetables", "vegetables-btn", "Vegetables"],
    ["desserts", "desserts-btn", "Desserts"],
  ],
  [
    ["fruits", "fruits-btn", "Fruits"],
    ["beverages", "beverages-btn", "Beverages"],
  ],
  [
    ["health supplements", "health-supplements-btn", "Health Supplements"],
    ["grains", "grains-btn", "Grains"],
  ],
  [
    ["seafood", "seafood-btn", "Seafood"],
    [
      "household essentials",
      "household-essentials-btn",
      "Household Essentials",
    ],
  ],
  [
    ["pet supplies", "pet-food-btn", "Pet Supplies"],
    ["dairy", "diary-btn", "Dairy"],
    ["meat", "meat-btn", "Meat"],
  ],
  [["condiments", "condiments-btn", "Condiments"]],
];

const ratingOptions = [5, 4, 3, 2, 1];

function TimeBlock({ value, label, id }) {
  return (
    <div>
      <h1 id={id}>{String(value).padStart(2, "0")}</h1>
      <p>{label}</p>
    </div>
  );
}

function ProductsPage() {
  const { state, dispatch } = useStore();
  const timer = useTimer();
  const [sortBy, setSortBy] = useState("latest-products");

  const filteredProducts = useMemo(() => {
    const filtered = state.products.filter((product) => {
      const category = product.tags?.[0] ?? product.category;
      const price = getDiscountedPrice(product);
      const matchesCategory =
        state.selectedCategory === "all" || category === state.selectedCategory;
      const matchesPrice =
        price >= state.priceRange.min && price <= state.priceRange.max;
      // round the product.rating to the nearest integer for comparison
      const matchesRating =
        state.selectedRating === 0 ||
        Math.round(product.rating) >= state.selectedRating;

      return matchesCategory && matchesPrice && matchesRating;
    });

    return [...filtered].sort((first, second) => {
      if (sortBy === "oldest-products") {
        return first.id - second.id;
      }
      return second.id - first.id;
    });
  }, [
    sortBy,
    state.priceRange.max,
    state.priceRange.min,
    state.products,
    state.selectedCategory,
    state.selectedRating,
  ]);

  const handleCategory = useCallback(
    (category) => {
      dispatch({ type: "SET_CATEGORY", payload: category });
    },
    [dispatch],
  );

  const handleMinRange = useCallback(
    (event) => {
      const min = Math.min(Number(event.target.value), state.priceRange.max);
      dispatch({
        type: "SET_PRICE_RANGE",
        payload: { ...state.priceRange, min },
      });
    },
    [dispatch, state.priceRange],
  );

  const handleMaxRange = useCallback(
    (event) => {
      const max = Math.max(Number(event.target.value), state.priceRange.min);
      dispatch({
        type: "SET_PRICE_RANGE",
        payload: { ...state.priceRange, max },
      });
    },
    [dispatch, state.priceRange],
  );

  const handleRating = useCallback(
    (rating) => {
      dispatch({
        type: "SET_RATING_FILTER",
        payload: state.selectedRating === rating ? 0 : rating,
      });
    },
    [dispatch, state.selectedRating],
  );

  const handleSort = useCallback((event) => {
    setSortBy(event.target.value);
  }, []);

  const rangeStyle = {
    "--left": `${(state.priceRange.min / 30) * 100}%`,
    "--right": `${100 - (state.priceRange.max / 30) * 100}%`,
  };

  return (
    <>
      <div className="popup-overlay1"></div>

      <section className="products-offer-banner">
        <div className="products-banner">
          <div className="banner-TXT">
            <p>Best Deals</p>
            <h2>Sale of the Month</h2>
          </div>
          <div className="timer">
            <TimeBlock id="days-id" value={0} label="DAYS" />
            <TimeBlock id="hours-id" value={timer.hours} label="HOURS" />
            <TimeBlock id="mins-id" value={timer.minutes} label="MINS" />
            <TimeBlock id="secs-id" value={timer.seconds} label="SECS" />
          </div>
          <div>
            <button className="shop-now">
              Shop Now &nbsp; <i className="fas fa-arrow-right-long"></i>
            </button>
          </div>
        </div>
      </section>

      <section id="shop" className="popular-products-container">
        <aside id="filters" className="filter-category-container">
          <div className="all-filters-container">
            <div className="filter-all-categories">
              <h2>All Categories</h2>
              <div className="categories-btns">
                {categoryGroups.map((group) =>
                  group.length === 1 ? (
                    <button
                      className={`${group[0][1]} ${
                        state.selectedCategory === group[0][0]
                          ? "active_category"
                          : ""
                      }`}
                      data-category={group[0][0]}
                      key={group[0][0]}
                      onClick={() => handleCategory(group[0][0])}
                    >
                      {group[0][2]}
                    </button>
                  ) : (
                    <div key={group.map(([category]) => category).join("-")}>
                      {group.map(([category, className, label]) => (
                        <button
                          className={`${className} ${
                            state.selectedCategory === category
                              ? "active_category"
                              : ""
                          }`}
                          data-category={category}
                          key={category}
                          onClick={() => handleCategory(category)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="filter-price">
              <div className="price-filter">
                <h2>Price</h2>
                <div className="range-container" style={rangeStyle}>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={state.priceRange.min}
                    id="minRange"
                    onChange={handleMinRange}
                  />
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={state.priceRange.max}
                    id="maxRange"
                    onChange={handleMaxRange}
                  />
                </div>
                <p className="price-text">
                  Price: <span id="minPrice">{state.priceRange.min}</span> -{" "}
                  <span id="maxPrice">{state.priceRange.max}</span>
                </p>
              </div>
            </div>

            <div className="filter-rating">
              <h2>Rating</h2>
              {ratingOptions.map((rating) => (
                <div
                  className={`rating${rating}-filter starsFilter`}
                  key={rating}
                >
                  <input
                    type="checkbox"
                    name="rating-filter"
                    id={`rating${rating}`}
                    data-rating={rating}
                    checked={state.selectedRating === rating}
                    onChange={() => handleRating(rating)}
                  />
                  <div>
                    {Array.from({ length: rating }, (_, index) => (
                      <i className="ri-star-fill" key={index}></i>
                    ))}
                  </div>
                  <label htmlFor={`rating${rating}`}>
                    {rating === 5 ? " 5.0" : ` ${rating}.0 & up`}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="sort-products-container">
          <SearchBar />
          <div className="title-sort">
            <div className="sort">
              <h4 className="sort-by-title">Sort by </h4>
              <select
                name="sorting"
                id="products-sort-select"
                value={sortBy}
                onChange={handleSort}
              >
                <option value="latest-products">Latest</option>
                <option value="oldest-products">Oldest</option>
              </select>
            </div>
            <p className="sort-by-result">
              <span>{filteredProducts.length}</span> Products
            </p>
          </div>
          <div id="products" className="products">
            {state.loading && <p>Loading products...</p>}
            {state.error && <p>{state.error}</p>}
            {!state.loading &&
              !state.error &&
              filteredProducts.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
          </div>
        </div>
      </section>

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

export default memo(ProductsPage);
