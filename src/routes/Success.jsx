import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from 'react-lottie';
import successAnimation from '../lotties/payment_successful.json';
import classes from "./css/success.module.css"

const Success = () => {
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  useEffect(() => {
    
    setTimeout(() => {
      navigate("/");
    }, 5000);

  }, [navigate]);

  return (
    <div className={classes.success}>
      <Lottie 
	      options={defaultOptions}
        height={350}
        width={350}
      />
      <p>Thank you for your purchase!</p>
      <p>Redirecting you back to the homepage...</p>
    </div>
  );
};

export default Success;
