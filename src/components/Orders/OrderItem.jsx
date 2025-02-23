import classes from "./OrderItem.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

function OrderItem({item}) {
  return (
    <div className={`${classes.ordItem} card mb-3 border-light`}>
      <div className="row g-0">
        <div className="col-4">
          {/* <img src={item.image.startsWith("https")?`${item.image}` : `/images/${item.image}.webp`} class="img-fluid rounded-start" alt="perfume img" /> */}
            <LazyLoadImage
              className="img-fluid rounded-start"
              src={item.image.startsWith("https")?`${item.image}` : `/images/${item.image}.webp`}
              alt="perfume img"
              effect="opacity"
              width="100%"
              height="auto"
            />
        </div>
        <div className="col align-items-start">
          <div className="card-body p-0 ps-3 fs-6">
            <h5 className="card-titl">{item.name}</h5>
            <p className="card-text" style={{fontSize:"13px"}}>${item.price}</p>
            <p className="card-text" style={{display:"block", fontSize:"13px"}}>
              Quantity: <small className="text-body-secondary fw-semibold">{item.quantity}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderItem