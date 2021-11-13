import React, { useState } from 'react'
import s from './StarRating.module.css'
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'

function StarRating() {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <div className={s.starRating}>
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <label key={index} onMouseEnter={() => setHover(ratingValue)} onMouseLeave={() =>  setHover(null)}>
                        <input type='radio' name='rating' value={ratingValue} onClick={() => setRating(ratingValue)} />
                        {ratingValue <= (hover || rating) ? <FaStar className={s.starItem} /> : <FaRegStar className={s.starItem} />}
                    </label>
                )
            })}
        </div>
    )
}

export default StarRating