import React, { useContext, useState } from 'react'
import s from './BookItem.module.css'
import StarRating from '../starRating/StarRating'
import { Link } from 'react-router-dom'
import { BsBookmarkCheckFill, BsFillBookmarkPlusFill, BsBookmark } from 'react-icons/bs'
import { UserContext } from '../../App'
import { toast } from 'react-toastify'
import { postAddOrRemoveBook } from './BookItemService'

function BookItem({ second, bookItem, books, setBooks }) {
    const { user, setUser } = useContext(UserContext)
    const isBookAdded = user?.books.find(bookId => bookId === bookItem._id)

    const addOrRemove = async () => {
        if (!user) return toast.warning('Firstly you need to authorize')

        const response = await postAddOrRemoveBook(bookItem, user)

        setUser({ ...user, books: response.data })
    }

    return (
        <div className={`${s.item} ${second ? s.secondItem : s.firstItem}`}>
            <Link to={`/book/${bookItem._id}`}><img src={require(`../../assets/booksCover/${bookItem.cover}.jpeg`).default} alt='' /></Link >
            <div className={s.textContent}>
                <p className={s.title}><Link to={`/book/${bookItem._id}`}>{bookItem.title}</Link ></p>
                <p className={s.author}>{bookItem.author} {bookItem.yearsOfLife}</p>
                <div className={s.ratingWrapper}>
                    <StarRating book={bookItem} books={books} setBooks={setBooks} />
                    {/* {user?.bookRatings?.[bookItem._id] && user?.bookRatings?.[bookItem._id]} */}
                    <p>av: {bookItem.rating}</p>
                </div>
                <Link to={`/book/${bookItem._id}`}>Read Now</Link >
                <button onClick={addOrRemove} >
                    {isBookAdded ? <BsBookmarkCheckFill className={`${s.bookmark} ${isBookAdded ? s.bookmarkAdded : undefined}`} /> : <BsBookmark className={s.bookmark} />}
                    {!isBookAdded && <BsFillBookmarkPlusFill className={s.bookmarkToAdd} />}
                </button>
                <p className={s.text}>{bookItem.description}</p>
            </div>
        </div>
    )
}

export default BookItem