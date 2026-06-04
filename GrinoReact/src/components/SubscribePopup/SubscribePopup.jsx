import { memo, useCallback, useEffect, useState } from "react";

function SubscribePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hideAgain, setHideAgain] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("hideSubscribePopup") === "true") {
      return;
    }
    const timerId = setTimeout(() => {
      setIsOpen(true);
    }, 1200);
    return () => clearTimeout(timerId);
  }, []);

  const handleClose = useCallback(() => {
    if (hideAgain) {
      localStorage.setItem("hideSubscribePopup", "true");
    }
    setIsOpen(false);
  }, [hideAgain]);

  const handleCheckbox = useCallback(() => {
    setHideAgain((current) => !current);
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    event.currentTarget.reset();
  }, []);

  return (
    <>
      <div className={`popup-overlay ${isOpen ? "active" : ""}`} onClick={handleClose}></div>
      <section className={`pop-subscribe ${isOpen ? "active" : ""}`}>
        <img className="image-pop" src="images/pop-man.webp" alt="pop" />
        <div className="pop-subscribe-txt">
          <h1>
            Subcribe to Our <br />
            <span>Newsletter</span>
          </h1>
          <div className="sub">
            <p>
              Subscribe to our newlletter and Save your
              <span className="pop-offer-value">20% </span>
            </p>
            <br />
            <p><span> money</span> with discount code today.</p>
          </div>
          <div className="email-address-container pop-email-container">
            <form name="submit-to-google-sheet" onSubmit={handleSubmit}>
              <input
                name="Email"
                className="email-field"
                id="email-field-id"
                type="email"
                placeholder="Your email address"
              />
              <button className="subscribe-btn" type="submit">Subscribe</button>
            </form>
          </div>
          <div className="check-box-container">
            <i
              className={hideAgain ? "ri-checkbox-fill check-box" : "ri-checkbox-blank-line check-box"}
              onClick={handleCheckbox}
            ></i>
            Do not show this window
          </div>
        </div>
        <i className="fa-solid fa-xmark" onClick={handleClose}></i>
      </section>
    </>
  );
}

export default memo(SubscribePopup);
