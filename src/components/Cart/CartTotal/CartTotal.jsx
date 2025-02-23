import React from 'react';
import classes from './CartTotal.module.css';

const CartTotal = ({ total, clickHandler, btnDisabled }) => {
    const subtotal = parseFloat(total).toFixed(2);
    const shippingFee = parseFloat(0).toFixed(2);

    return (
        <div className={classes.cartTotal}>
            {/* Checkout Section */}
            <section className={classes.checkout}>
                <h3 className={classes.title}>The total amount of</h3>
                <div className={classes.total}>
                    <TotalDetail label="The subtotal" value={`$${subtotal}`} />
                    <TotalDetail label="The Shipping Fee" value={`$${shippingFee}`} />
                    <TotalDetail label="The total amount:" value={`$${subtotal}`} />
                    <button
                        type="button"
                        onClick={clickHandler}
                        className="btn btn-primary"
                        disabled={btnDisabled}
                    >
                        Go To Checkout
                        {btnDisabled && 
                        <div className="spinner-border spinner-border-sm" role="status" />
                        }
                    </button>
                </div>
            </section>

            {/* Promo Code Section */}
            <section className={classes.promo}>
                <PromoForm />
            </section>
        </div>
    );
};

//TotalDetail Component
const TotalDetail = ({ label, value }) => (
    <div className={classes.totalDetails}>
        <p>{label}</p>
        <p>{value}</p>
    </div>
);

//PromoForm Component
const PromoForm = () => (
    <form>
        <label htmlFor="promoInput">Apply Promo Code</label>
        <input type="text" name="promo" id="promoInput" />
        <button type="button" className="btn btn-dark">
            Apply
        </button>
    </form>
);

export default CartTotal;
