import { useContext, useState } from 'react'
import s from './StarRating.module.css'
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'
import { UserContext } from '../../App';
import { toast } from 'react-toastify';
import { postBookRating } from './StarRatingService';
import { book, UserContextInterface } from '../../utility/commonTypes';

const StarRating = ({ book, books, setBooks }: Props) => {
    const { user, setUser } = useContext<UserContextInterface>(UserContext)
    const [hover, setHover] = useState<number | null>(null);

    const setRating = async (ratingValue: number) => {
        if (!user) return toast.warning('Firstly you need to authorize')
        
        const ratingData = await postBookRating(book._id, user._id, ratingValue) 
        setUser({ ...user, bookRatings: { ...user.bookRatings, [book._id]: ratingValue } })
        setBooks(books.map(bookItem => bookItem._id === book._id
            ? { ...bookItem, rating: ratingData.data.rating, ratingCount: ratingData.data.ratingCount }
            : bookItem))
    }

    const setHoverStar = (ratingValue: number | null) => {
        if (ratingValue) return setHover(ratingValue)
        if (hover) return setHover(null)
    }

    const isHalfStar = (ratingValue: number): boolean => {
        if (hover) return false
        if (user?.bookRatings?.[book._id]) return user?.bookRatings?.[book._id] - ratingValue > 0.25
            && user?.bookRatings?.[book._id] - ratingValue < 0.75
        if (book?.rating) return ratingValue - book?.rating > 0.25
            && ratingValue - book?.rating < 0.75
        return false
    }
    const isFullStar = (ratingValue: number): boolean => !isHalfStar(ratingValue)
        && (ratingValue <= (hover || Math.round(user?.bookRatings?.[book._id]) || Math.round(book?.rating)))

    const getStarClassName = (isActive: boolean): string => isActive
        ? (hover || user?.bookRatings?.[book._id] ? `${s.starItem} ${s.active}` : s.starItem)
        : `${s.starItem} ${s.inactive}`

    return (
        <div className={s.starRating} >
            {[...Array(5)].map((star, index) => {
                const ratingValue: number = index + 1;
                return (
                    <label key={index} onMouseEnter={() => setHoverStar(ratingValue)} onMouseLeave={() => setHoverStar(null)}>
                        <input type='radio' name='rating' value={book?.rating} onClick={() => setRating(ratingValue)} />
                        <FaStar className={getStarClassName(isFullStar(ratingValue))} />
                        <FaRegStar className={getStarClassName(!isFullStar(ratingValue) && !isHalfStar(ratingValue))} />
                        <FaStarHalfAlt className={getStarClassName(isHalfStar(ratingValue))} />
                    </label>
                )
            })}
        </div>
    )
}

interface Props {
    book: book
    books: book[]
    setBooks: any
}

export default StarRating