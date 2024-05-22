import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../routes/Layout";
import {Rating} from 'react-simple-star-rating';
import {toast } from 'react-toastify';
import './ProductReview.css'
import axios from "axios";

const ProductReview = (props) =>{
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [description, setDescription] = useState('');
    const {user, setUser} = useContext(CurrentUserContext);

    const handleRating = (rate) => {
        setRating(rate)
        console.log(rating)
    }

    const submitHandler = async (e) =>{
        try{
            e.preventDefault();
            if(!user){
                return toast.error("Please Log In!");
            }
            const data = {
                product: props.id,
                stars: rating,
                description: description
            }
            const response = await axios.post("http://localhost:3000/api/review", data, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

            const newReview = response.data;
            if(newReview.error){
                return toast.error(newReview.error);
            }
            toast.success("Review Submitted!");
            setReviews([newReview, ...reviews]);
        }catch(error){
            console.log(error);
            toast.error("Something went wrong!");
        }finally{
            setRating(0)
            setDescription('')
        }
    }

    useEffect(() =>{
        const fetchReviews =async () =>{
            try{
                const response = await axios.get("http://localhost:3000/api/review", {withCredentials: true});
                const allReviews = response.data;
                if(allReviews.error){
                    return toast.error(allReviews.error);
                }
                setReviews(allReviews);
            }catch(error){
                console.log(error);
                toast.error("Something went wrong!");
            }
        }
        fetchReviews();
    }, [])

    return (
        <div className="review">
            <h3>Reviews</h3>
            <form onSubmit={submitHandler}>
                <div className="mb-3 form-check">
                    <label htmlFor="review">Type your review</label>
                    <textarea className="form-control" id="review" rows="3" value={description} onChange={(e) => {setDescription(e.target.value)}}></textarea>
                </div>
                <Rating className="stars" onClick={handleRating} />
                <button type="submit" className="btn btn-dark">Submit</button>
            </form>
            {reviews.map((review) =>{
                if(review.product._id === props.id){
                    return( 
                    <div key={review._id} className="card" style={{width: '100%'}}>
                        <div className="card-header">
                            {review.user.name}
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                            <p>{review.description}</p>
                            <footer className="blockquote-footer">
                                <Rating initialValue={review.stars} readonly={true}/>
                              {/* <span className="material-symbols-outlined">star</span> */}
                            </footer>
                            </blockquote>
                        </div>
                    </div> )
                }else{
                    return null;
                }
            })}
        </div>
    )
}

export default ProductReview
