import React from "react";
import './CartTotal.css'

const CartTotal = () =>{
    return (
        <div className="cart-total">
            <div className="total">
                <h4>Cart Totals</h4>
                <div className="total-cal">
                    <div className="total-cal-sub">
                        <p>Subtotal</p>
                        <p>$600</p>
                    </div>
                    <div className="total-cal-sub">
                        <p>Shipping Fee</p>
                        <p>$60</p>
                    </div>
                    <div className="total-cal-sub" style={{border:"none"}}>
                        <p>Total</p>
                        <p>$660</p>
                    </div>
                </div>
                <button type="button" className="btn btn-outline-danger">CheckOut</button>
            </div>
            <div className="coupon">
                <p>Enter your promo code.</p>
                <input type="text" name="couponId" id="couponId" />
                <button type="submit" className="btn btn-dark">Submit</button>
            </div>
        </div>
    )
}

export default CartTotal