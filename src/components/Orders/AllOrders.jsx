import classes from "./AllOrders.module.css";
import OrderItem from "./OrderItem";

function AllOrders({order}) {
  return (
    <section className={classes.ordContainer}>
        <header className={classes.ordHeadCont}>
          <div className={classes.ordHead}>
            <p>Order ID</p>
            <p>{order.ordId}</p>
          </div>
        </header>

          <div className="progress-stacked">
            <div className="progress" role="progressbar" aria-label="Segment one" aria-valuenow="33.3" aria-valuemin="0" aria-valuemax="100" style={{width: "33.3%"}}>
              <div className="progress-bar bg-success">Order Confirmed</div>
            </div>
            <div className="progress" role="progressbar" aria-label="Segment two" aria-valuenow="33.3" aria-valuemin="0" aria-valuemax="100" style={{width: order.status === "preparing"? "0":"33.3"}}>
              <div className="progress-bar bg-success">Shipped {order.status}</div>
            </div>
            <div className="progress" role="progressbar" aria-label="Segment three" aria-valuenow="33.3" aria-valuemin="0" aria-valuemax="100" style={{width: order.status === "delivered"? "33.3":"0"}}>
              <div className="progress-bar bg-success">Delivered</div>
            </div>
          </div>

        {order.products.map((orderItem) =>{
          return <OrderItem key={orderItem.prodId} item={orderItem} />
        })}
        <p className="fw-semibold">Total: ${order.totalAmount}</p>
    </section>
  )
}

export default AllOrders