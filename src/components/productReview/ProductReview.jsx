import React, { useEffect, useState } from "react";
import {Rating} from 'react-simple-star-rating';
import {toast } from 'react-toastify';
import classes from './ProductReview.module.css'
import { useSelector } from "react-redux";
import apiClient from "../../utilis/apiClient";

const ProductReview = (props) =>{
    const user = useSelector((state) => state.auth.user);
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [description, setDescription] = useState('');
    // const {user, setUser} = useContext(CurrentUserContext);

    const handleRating = (rate) => {
        setRating(rate)
    }

    //submitting user review about the product
    const submitHandler = async (e) =>{
        e.preventDefault();
        try{
            //checking user is authenticated or not.
            if(!user){
                return toast.error("Please Log In!");
            }
            const data = {
                product: props.id,
                stars: rating,
                description: description
            }
            const response = await apiClient.post(`/api/review`, data);

            const newReview = response.data;
            if(newReview.error){
                return toast.error(newReview.error);
            }
            toast.success("Review Submitted!");
            //after successfully submitting the reviews, upadte the page with new reviews
            setReviews( (prev) => [newReview, ...prev]);
        }catch(error){
            if(error?.response?.data){
                return toast.error(error.response.data.error);
            }
            toast.error("Something went wrong!");
        }finally{
            setRating(0)
            setDescription('')
        }
    }

    //fetching users review during initial page loading
    useEffect(() =>{
        const fetchReviews =async () =>{
            try{
                const response = await apiClient.get(`/api/review`);
                const allReviews = response.data;
                if(allReviews.error){
                    return toast.error(allReviews.error);
                }
                setReviews(allReviews);
            }catch(error){
                if(error?.response?.data){
                    return toast.error(error.response.data.error);
                }
                toast.error("Something went wrong!");
            }
        }
        fetchReviews();
    }, [])

    return (
        <div className={classes.review}>
            <h3>Reviews</h3>
            <form onSubmit={submitHandler}>
                <div className={`mb-3 form-check`}>
                    <label htmlFor="review">Type your review</label>
                    <textarea className={`form-control`} id="review" rows="3" value={description} onChange={(e) => {setDescription(e.target.value)}}></textarea>
                </div>
                <Rating className={classes.stars} onClick={handleRating} />
                <button type="submit" className={`btn btn-dark`}>Submit</button>
            </form>
            
            {/*if there are reviews rendering them all otherwise return null */}
            {reviews.map((review) =>{
                if(review.product._id === props.id){
                    return( 
                    <div key={review._id} className={`${classes.card} card`} style={{width: '100%'}}>
                        <div className={`${classes["card-header"]} card-header`}>
                            {review.user.name}
                        </div>
                        <div className={`${classes["card-body"]} card-body`}>
                            <blockquote className={`${classes.blockquote} blockquote mb-0`}>
                            <p>{review.description}</p>
                            <footer className={`blockquote-footer`}>
                                <Rating initialValue={review.stars} readonly={true}/>
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
