import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/contact.css";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: "", email: "", subject: "", message: "" });
    alert("Message sent successfully!");
  };

  return (
    <main style={{ minHeight: "40vh", padding: "4rem 10%" }}>
      {/* <div className="nav-pages-about">
        <Link to="/">
          <i className="fas fa-regular fa-house"></i>
        </Link>
        <i className="fa-solid fa-angle-right"></i>
        <span>Contact</span>
      </div> */}

      <section className="contact-page-section">
        <div className="contact-page-grid">
          <div className="contact-details-card">
            <div className="contact-detail-box">
              <i className="ri-map-pin-line"></i>
              <div>
                <h3>Our Location</h3>
                <p>11.New ST. Shobra, Cairo , Egypt</p>
              </div>
            </div>
            <div className="contact-detail-box">
              <i className="ri-mail-line"></i>
              <div>
                <h3>Email Us</h3>
                <p>Nutra@Nutra.com</p>
              </div>
            </div>
            <div className="contact-detail-box">
              <i className="ri-phone-line"></i>
              <div>
                <h3>Call Us 24/7</h3>
                <p>(+20) 111-3545-007</p>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                required
              />
              <button type="submit" className="contact-submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="contact-map-section">
        <iframe
          title="Nutra Location"
          src="https://maps.google.com/maps?q=11%20New%20ST.%20Shobra%2C%20Cairo%2C%20Egypt&t=&z=13&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </main>
  );
}

export default ContactPage;
