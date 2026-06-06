import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import SubscribePopup from "../components/SubscribePopup/SubscribePopup";
import SuccessToast from "../components/SuccessToast/SuccessToast";
import { useEffect, useCallback } from "react";

function MainLayout() {
  const handleTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    const arrow = document.querySelector(".up-home-arrow");
    if (!arrow) return;

    const handleScroll = () => {
      if (window.scrollY > 300) {
        arrow.style.display = "flex";
      } else {
        arrow.style.display = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <SubscribePopup />
      <SuccessToast />
      <div className="up-home-arrow" onClick={handleTop}>
        <i className="ri-arrow-up-s-line"></i>
      </div>
    </>
  );
}

export default MainLayout;
