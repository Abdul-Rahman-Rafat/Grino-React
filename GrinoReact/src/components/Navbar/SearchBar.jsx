import { memo, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/store";

function SearchBar() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();

  const results = useMemo(() => {
    const term = state.searchTerm.trim().toLowerCase();
    if (!term) {
      return [];
    }
    return state.products
      .filter((product) => product.title.toLowerCase().includes(term))
      .slice(0, 5);
  }, [state.products, state.searchTerm]);

  const handleChange = useCallback(
    (event) => {
      dispatch({ type: "SET_SEARCH_TERM", payload: event.target.value });
    },
    [dispatch],
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      navigate("/products");
    },
    [navigate],
  );

  const handleResultClick = useCallback(
    (productId) => {
      dispatch({ type: "SET_SEARCH_TERM", payload: "" });
      navigate(`/product/${productId}`);
    },
    [dispatch, navigate],
  );

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="search-bar">
        <i className="ri-search-line"></i>
        <input
          className="search-area"
          type="text"
          placeholder="Search"
          value={state.searchTerm}
          onChange={handleChange}
        />
        <div className="search-results">
          {results.map((product) => (
            <button
              className="search-result"
              key={product.id}
              type="button"
              onClick={() => handleResultClick(product.id)}
            >
              <img src={product.thumbnail} alt={product.title} />
              <span>{product.title}</span>
              <span className="result-price">{`$${product.price.toFixed(2)}`}</span>
            </button>
          ))}
        </div>
      </div>
      <button className="search-btn" type="submit">
        Search
      </button>
    </form>
  );
}

export default memo(SearchBar);
