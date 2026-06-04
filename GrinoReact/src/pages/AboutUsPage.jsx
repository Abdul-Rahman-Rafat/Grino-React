import { Link } from "react-router-dom";
import aboutUsImage from "../styles/images/aboutUs.webp";
import whyChooseImage from "../styles/images/why-choose-.webp";
import "../styles/aboutUs.css";

function AboutUsPage() {
  return (
    <main style={{ minHeight: "40vh", padding: "4rem 10%" }}>
      {/* <div className="nav-pages-about">
        <Link to="/">
          <i className="fas fa-regular fa-house"></i>
        </Link>
        <i className="fa-solid fa-angle-right"></i>
        <span>About Us</span>
      </div> */}

      <section className="aboutUs-container aboutUs-container1">
        <div className="txt-img-container">
          <div className="img-container img-container1">
            <img className="why-choose-img" src={aboutUsImage} alt="about us" />
          </div>
          <div className="txt-container txt-container1">
            <h2 className="ourStory">Who We Are </h2>
            <p className="paragraph">
              We are a dedicated online grocery platform committed to bringing
              you fresh, high-quality, and responsibly sourced products straight
              from trusted farms to your doorstep.
            </p>
            <br />
            <br />
            <br />
            <h2 className="ourStory">Our Mission </h2>
            <p className="paragraph">
              Make healthy living easier by offering a carefully selected range
              of fruits, vegetables, and everyday essentials that meet the
              highest standards of quality and freshness.
            </p>
          </div>
        </div>
      </section>

      <section className="aboutUs-container aboutUs-container2">
        <div className="txt-img-container">
          <div className="txt-container txt-container2">
            <h3 className="ourStory">Our story</h3>
            <h1 className="Trusted-txt">100% Trusted Organic Food Store</h1>
            <p className="paragraph">
              At Grino, our mission is to deliver the best of nature directly
              from the farm to your table. We believe that healthy food is the
              foundation of a happy life. Therefore, we work passionately with
              local farmers who are strictly committed to organic standards,
              ensuring you receive fresh, pesticide-free, and nutritious
              produce. From seed selection to packaging, every step is taken
              with care to provide a clean and healthy environment for all our
              customers.
            </p>
            <div className="feature-about">
              <div>
                <i className="fa-solid fa-check"></i>
                <p>Natural Products</p>
              </div>
              <div>
                <i className="fa-solid fa-check"></i>
                <p>Fresh & Seasonal Produce</p>
              </div>
              <div>
                <i className="fa-solid fa-check"></i>
                <p>Supporting Local Farmers</p>
              </div>
              <div>
                <i className="fa-solid fa-check"></i>
                <p>Fast & Reliable Delivery</p>
              </div>
            </div>
          </div>
          <div className="img-container img-container2">
            <img
              className="why-choose-img"
              src={whyChooseImage}
              alt="why choose"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutUsPage;
