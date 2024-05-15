import React from "react";
import './ProductReview.css'

const ProductReview = () =>{
    return (
        <div className="review">
            <h3>Reviews</h3>
            <div className="card" style={{width: '100%'}}>
                <div className="card-header">
                    Smith
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                    <p>A well-known quote, contained in a blockquote element.</p>
                    <footer className="blockquote-footer">
                        <span className="material-symbols-outlined">star</span>
                        </footer>
                    </blockquote>
                </div>
            </div>
            <div className="card" style={{width: '100%'}}>
                <div className="card-header">
                    Smith
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                    <p>A well-known quote, contained in a blockquote element.</p>
                    <footer className="blockquote-footer">
                        <span className="material-symbols-outlined">star</span>
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
    )
}

export default ProductReview
