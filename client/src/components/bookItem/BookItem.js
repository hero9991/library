import React from 'react'
import s from './BookItem.module.css'
import StarRating from '../starRating/StarRating'
import { Link } from 'react-router-dom'

function BookItem({second, bookItem}) {
    return (
        <div className='container'>
            <div className={`${s.item} ${second ? s.secondItem : s.firstItem}`}>
                <img src={bookItem.cover} alt='' />
                <div className={s.textContent}>
                    <p className={s.title}>{bookItem.title}</p>
                    <p className={s.author}>{bookItem.author}</p>
                    <StarRating />
                    <Link to='/thisbBok'>Read Now</Link >
                    <p className={s.text}>{bookItem.description}</p>
                </div>
            </div>
        </div>
    )
}

export default BookItem