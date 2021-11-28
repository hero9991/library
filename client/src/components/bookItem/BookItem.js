import React, { useState } from 'react'
import s from './BookItem.module.css'
import StarRating from '../starRating/StarRating'
import { Link } from 'react-router-dom'
import { BsBookmarkCheckFill, BsFillBookmarkPlusFill, BsBookmark } from 'react-icons/bs'

function BookItem({ second, bookItem }) {
    const [isAdded, setIsAdded] = useState(false);

    return (
        <div className={`${s.item} ${second ? s.secondItem : s.firstItem}`}>
            <img src={require(`../../assets/booksCover/${bookItem.cover}.jpeg`).default} alt='' />
            <div className={s.textContent}>
                <p className={s.title}>{bookItem.title}</p>
                <p className={s.author}>{bookItem.author} {bookItem.yearsOfLife}</p>
                <StarRating />
                <Link to='/book'>Read Now</Link >
                <button onClick={() => setIsAdded(!isAdded)}>
                    {isAdded ? <BsBookmarkCheckFill className={`${s.bookmark} ${isAdded ? s.bookmarkAdded : undefined}`}/> : <BsBookmark className={s.bookmark}/>}
                    {!isAdded && <BsFillBookmarkPlusFill className={s.bookmarkToAdd}/>}
                </button>
                <p className={s.text}>{bookItem.description}</p>
            </div>
        </div>
    )
}

export default BookItem