import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/store";
import { formatPrice, getDiscountedPrice } from "../utils/priceUtils";
import { saveToStorage } from "../utils/localStorage";
import emptyCartImg from "../styles/images/empty_cart.webp";
import "../styles/checkout.css";

function CheckoutPage() {
  const { state, dispatch } = useStore();
  const cart = state.cart ?? [];
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    country: "Egypt",
    state: "Cairo",
    zipCode: "",
    email: "",
    phone: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce(
    (s, item) => s + getDiscountedPrice(item) * (item.quantity ?? 1),
    0,
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.streetAddress &&
      formData.email &&
      formData.phone &&
      formData.zipCode
    );
  };

  const handlePlaceOrder = () => {
    if (validateForm()) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    if (isSuccess) {
      setFormData({
        firstName: "",
        lastName: "",
        companyName: "",
        streetAddress: "",
        country: "Egypt",
        state: "Cairo",
        zipCode: "",
        email: "",
        phone: "",
      });
      // Clear cart from store
      cart.forEach((item) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: item.id });
      });
      // Clear localStorage
      saveToStorage("cart_storage", []);
    }
  };

  if (cart.length === 0) {
    return (
      <main style={{ minHeight: "40vh", padding: "4rem 10%" }}>
        <div className="no-items">
          <img className="not-found-img" src={emptyCartImg} alt="empty" />
          <p>
            No Items <i className="fa-regular fa-face-tired"></i>
          </p>
          <Link to="/products" style={{ marginTop: "20px" }}>
            <button className="return-btn">Continue Shopping</button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "40vh", padding: "4rem 10%" }}>
      <section className="bailling-information-section">
        <div className="bailling-information-container">
          <h2>Billing Information</h2>
          <div className="form-billing-container">
            <form className="form-billing">
              <div className="form-row">
                <div className="name label-input">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Your First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="name label-input">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Your Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="name label-input">
                  <label htmlFor="companyName">
                    Company Name <span className="optional">(optional)</span>
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="address-container label-input">
                  <label htmlFor="streetAddress">Street Address</label>
                  <input
                    id="streetAddress"
                    name="streetAddress"
                    type="text"
                    placeholder="Your Address Exactly"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="label-input">
                  <label htmlFor="country">Country / Region</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="Egypt">Egypt</option>
                    <option value="Palestine">Palestine</option>
                    <option value="Syria">Syria</option>
                  </select>
                </div>

                <div className="label-input">
                  <label htmlFor="state">States</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  >
                    <option value="Cairo">Cairo</option>
                    <option value="Gaza">Gaza</option>
                    <option value="Damascus">Damascus</option>
                  </select>
                </div>

                <div className="label-input">
                  <label htmlFor="zipCode">Zip Code</label>
                  <input
                    id="zipCode"
                    name="zipCode"
                    type="tel"
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="label-input email-phone">
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="label-input email-phone">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="order-total-container">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div className="order-info sec" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <div>
                <p className="order-item-name">
                  {item.title}{" "}
                  <span className="order-times">×{item.quantity}</span>
                </p>
                <p className="order-price">
                  {formatPrice(getDiscountedPrice(item))}
                </p>
              </div>
            </div>
          ))}

          <div className="sub-subtotal sec">
            <p>Subtotal:</p>{" "}
            <span className="sub-subtotal-value">{formatPrice(subtotal)}</span>
          </div>
          <hr />
          <div className="ship-fess sec">
            <p>Shipping:</p> <span>Free</span>
          </div>
          <hr />
          <div className="total sec">
            <p> Total:</p>{" "}
            <span className="total-value">{formatPrice(subtotal)}</span>
          </div>
          <button onClick={handlePlaceOrder} className="order-proceed-btn">
            Place Order
          </button>
        </div>
      </section>

      {showModal && (
        <div className={`success_order ${showModal ? "showMsg" : ""}`}>
          <div className="order-confirmedName-msg">
            {isSuccess ? (
              <>
                <i className="ri-checkbox-circle-line"></i>
                <div className="order-confirmedName">
                  <p>Thank You, {formData.lastName} For Using Our Services</p>
                </div>
                <div className="order-confirmed_P">
                  <p>Your Order Is On Its Way To You</p>
                </div>
              </>
            ) : (
              <>
                <i className="ri-error-warning-fill"></i>
                <div className="order-confirmedName"></div>
                <div className="order-confirmed_P">
                  <p>Please Fill All The Required Fields</p>
                </div>
              </>
            )}
          </div>
          <i
            onClick={closeModal}
            className="fa-regular fa-circle-xmark checkMsgX"
          ></i>
        </div>
      )}

      {showModal && (
        <div
          className="popup-overlay1"
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 900,
          }}
        ></div>
      )}
    </main>
  );
}

export default CheckoutPage;
