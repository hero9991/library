import React, { memo, useContext } from 'react'
import s from './BookItem.module.css'
import StarRating from '../starRating/StarRating'
import { Link } from 'react-router-dom'
import { BsBookmarkCheckFill, BsFillBookmarkPlusFill, BsBookmark } from 'react-icons/bs'
import { UserContext } from '../../App'
import { toast } from 'react-toastify'
import { postAddOrRemoveBook } from './BookItemService'
import { AUTHOR, BOOK_URL, DESCRIPTION, PROTOCOL_HOSTNAME_PORT, TITLE } from '../../utility/Constants'
import { getReadNowText, getUnauthorizedWarningText } from './translatedText/translatedText'
import { book, UserContextInterface } from '../../utility/commonTypes'

const BookItem = memo(({ isSecond, bookItem, books, setBooks }: Props) => {
    const { user, setUser, language } = useContext<UserContextInterface>(UserContext)
    const isBookAdded = user?.books.find((bookId: string) => bookId === bookItem._id)

    const addOrRemove = async () => {
        if (!user) return toast.warning(getUnauthorizedWarningText(language))

        const response = await postAddOrRemoveBook(bookItem, user, language)

        setUser({ ...user, books: response.data })
    }

    return (
        <div className={`${s.item} ${isSecond ? s.secondItem : s.firstItem}`}>
            <Link to={BOOK_URL + bookItem._id}><img src={PROTOCOL_HOSTNAME_PORT + bookItem.linkImage} alt='' /></Link >
            <div className={s.textContent}>
                <p className={s.title}><Link to={BOOK_URL + bookItem._id}>{bookItem[(TITLE + language) as keyof book]}</Link ></p>
                <p className={s.author}>{bookItem[(AUTHOR + language) as keyof book]} </p>
                <div className={s.ratingWrapper}>
                    <StarRating book={bookItem} books={books} setBooks={setBooks} />
                    <p>av: {bookItem.rating}</p>
                </div>
                <Link to={BOOK_URL + bookItem._id}>{getReadNowText(language)}</Link >
                <button onClick={addOrRemove} >
                    {isBookAdded ? <BsBookmarkCheckFill className={`${s.bookmark} ${isBookAdded ? s.bookmarkAdded : undefined}`} /> : <BsBookmark className={s.bookmark} />}
                    {!isBookAdded && <BsFillBookmarkPlusFill className={s.bookmarkToAdd} />}
                </button>
                <p className={s.text}>{bookItem[(DESCRIPTION + language) as keyof book]}</p>
            </div>
        </div>
    )
}, (previousProps: any, currentProps: any) => previousProps.books.length === currentProps.books.length && previousProps.books.every((value: any, index: number) => value === currentProps.books[index]))

interface Props {
	isSecond: boolean
    bookItem: book
    books: book[]
    setBooks: any
}

export default BookItem