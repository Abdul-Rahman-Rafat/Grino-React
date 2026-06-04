import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/toast";

function SuccessToast() {
  const { activeToast } = useToast();
  const navigate = useNavigate();

  return (
    <>
      <section
        className={`success_pop_section ${
          activeToast === "favorite" ? "added" : ""
        }`}
      >
        <div>
          <i className="fa-regular fa-circle-check"></i>
          <p>Added To Favorites Successfully</p>
        </div>
        <div className="link-fav">
          <a onClick={() => navigate("/favorites")}>
            Visit Your Wishlist &nbsp; <i className="fas fa-arrow-right-long"></i>
          </a>
        </div>
      </section>

      <section
        className={`success_pop_section2 ${
          activeToast === "cart" ? "added_cart_item" : ""
        }`}
      >
        <div>
          <i className="fa-regular fa-circle-check"></i>
          <p>Added To Cart Successfully</p>
        </div>
        <div className="link-fav">
          <a onClick={() => navigate("/cart")}>
            Visit Shopping Cart &nbsp; <i className="fas fa-arrow-right-long"></i>
          </a>
        </div>
      </section>
    </>
  );
}

export default memo(SuccessToast);
