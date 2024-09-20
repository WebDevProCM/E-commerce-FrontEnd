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
          
          <div className={classes.ordHead}>
            <p>Status</p>
            <p>{order.status}</p>
          </div>

          <div className={classes.ordHead}>
            <p>Delivery Date</p>
            <p>{order?.deliveryDate?.slice(0, 10)}</p>
          </div>
        </header>

        {order.products.map((orderItem) =>{
          return <OrderItem key={orderItem.prodId} item={orderItem} />
        })}

        <div className={classes.ordFooter}>
        <p>Total: ${order.totalAmount}</p>
        <button type="button" className="btn btn-outline-primary btn-sm">Details</button>
        </div>
    </section>
  )
}

export default AllOrders