import classes from "./OrderItem.module.css";

function OrderItem({item}) {
  return (
    <section className={classes.ordItem}>
        <div className={classes.ordItemBody}>
        <img src={item.image.startsWith("https")?`${item.image}` : `/images/${item.image}.webp`} alt="perfume img" />
        <div>
            <p>Name: {item.name}</p>
        </div>
        </div>

        <div className={classes.ordItemQuan}>
        <p>Unit price: ${item.price}</p>
        <p>Quantity: {item.quantity}</p>
        </div>
  </section>
  )
}

export default OrderItem