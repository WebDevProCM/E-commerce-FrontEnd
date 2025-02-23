import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Lottie from 'react-lottie';
import cancelAnimation from '../lotties/payment_cancel.json';
import clasess from "./css/cancel.module.css"

const Cancel = () => {
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: cancelAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  useEffect(() => {
    sessionStorage.removeItem("paymentInProgress");
    setTimeout(() => {
      navigate("/cart");
    }, 5000);
  }, [navigate]);

  return (
      <div className={clasess.cancel}>
        <Lottie 
          options={defaultOptions}
          height={350}
          width={350}
        />
      <p>You cancelled the payment. Please try again.</p>
      <p>Redirecting you back to the cart...</p>
    </div>
  );
};

export default Cancel;
