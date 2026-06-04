import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import SubscribePopup from "../components/SubscribePopup/SubscribePopup";
import SuccessToast from "../components/SuccessToast/SuccessToast";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <SubscribePopup />
      <SuccessToast />
    </>
  );
}

export default MainLayout;
