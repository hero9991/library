import { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import s from './Slider.module.css'
import StarRating from '../starRating/StarRating'
import { NavLink } from 'react-router-dom'
import { getSliderBooks } from '../../utility/AxiosService'
import { toast } from 'react-toastify'
import { getHistoryTitleText, getLiteratureTitleText } from './translatedText/translatedText'
import { UserContext } from '../../App'
import { AUTHOR, PROTOCOL_HOSTNAME_PORT, TITLE } from '../../utility/Constants'
import { book, UserContextInterface } from '../../utility/commonTypes'

SwiperCore.use([Navigation, Pagination, Autoplay])


function Slider({ isBlackFont }: Props) {
    const initialBook = {
        titleRU: '-------',
        titleEN: '-------',
        titleAM: '-------',
        authorRU: 'loading...',
        authorEN: 'loading...',
        authorAM: 'loading...',
        _id: '1'
    } as book

    const initialBooks: book[] = [initialBook, {...initialBook, _id: '2'}, {...initialBook, _id: '3'}, {...initialBook, _id: '4'}, {...initialBook, _id: '5'}, {...initialBook, _id: '6'}]

    const { language } = useContext<UserContextInterface>(UserContext)
    const [books, setBooks] = useState<book[]>(initialBooks)

    const authorKey = (AUTHOR + language) as keyof book
    const titleKey = (TITLE + language) as keyof book

    useEffect(() => {
        (async function() {
            try {
                const currentBlockName = isBlackFont ? 'history' : 'literature'
                const response = await getSliderBooks(currentBlockName)

                setBooks(response.data.books)
            } catch (error) {
                toast.error(`Error ${error}`)
            }
        })()
    }, [isBlackFont])

    const params = {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            clickable: true,
        },
        spaceBetween: 10,
        slidesPerView: 4,
        slidesPerGroup: 4,
        allowTouchMove: true,
        shortSwipes: false,
        longSwipesRatio: 0.1,
        longSwipesMs: 1,
        speed: 500,
        breakpoints: {
            320: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 10,
                allowTouchMove: true
            },
            482: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            640: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            },
            992: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 14,
            },
            1081: {
                spaceBetween: 17
            },
            1200: {
                spaceBetween: 21
            },
            1271: {
                spaceBetween: 24
            },
            1401: {
                spaceBetween: 27
            },
            1601: {
                spaceBetween: 30
            }
        }
    }

    return (
        <div className={`${s.slider} ${isBlackFont ? s.blackFont : s.whiteFont + ' whiteFont'}`}>
            <h2 className={s.topic}>{isBlackFont ? getHistoryTitleText(language) : getLiteratureTitleText(language)}</h2>
            <div className={s.books}>
                <Swiper id='main' wrapperTag='ul' className={s.swiper} {...params}>
                    {books.map(book => <SwiperSlide key={book._id} tag='li'>
                        <NavLink exact to={`/book/${book._id}`} title={book[titleKey]}>
                            {book.linkImage ? <img className={s.bookItem} src={PROTOCOL_HOSTNAME_PORT + book.linkImage} alt='no img' /> : <div className={s.bookItem}></div>}
                        </NavLink>
                        <StarRating book={book} books={books} setBooks={setBooks} />
                        <p className={s.title} title={book[titleKey] as string}><NavLink exact to={`/book/${book._id}`}>{book[titleKey]}</NavLink></p>
                        <p className={s.author}>{book[authorKey]}</p>
                    </SwiperSlide>
                    )}
                    <div className={`swiper-button-prev ${s.prevButton}`}></div>
                    <div className={`swiper-button-next ${s.nextButton}`}></div>
                </Swiper>
            </div>
        </div>
    )
}

interface Props {
	isBlackFont: boolean
}

export default Slider