import { useContext, useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import s from './Slider.module.css'
import StarRating from '../starRating/StarRating'
import { NavLink } from 'react-router-dom'
import { getSliderBooks } from '../../utility/AxiosService'
import { toast } from 'react-toastify'
import { getHistoryTitleText, getLiteratureTitleText } from './translatedText/translatedText'
import { UserContext } from '../../App'
import { AUTHOR, PROTOCOL_HOSTNAME_PORT, TITLE } from '../../utility/Constants'
import { book, UserContextInterface } from '../../utility/commonTypes'
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

    const initialBooks: book[] = [
        initialBook, 
        {...initialBook, _id: '2'}, 
        {...initialBook, _id: '3'}, 
        {...initialBook, _id: '4'}, 
        {...initialBook, _id: '5'}, 
        {...initialBook, _id: '6'}
    ]

    const { language } = useContext<UserContextInterface>(UserContext)
    const [books, setBooks] = useState<book[]>(initialBooks)
    
    const prevRef = useRef<HTMLButtonElement>(null)
    const nextRef = useRef<HTMLButtonElement>(null)
    const swiperRef = useRef<SwiperType | null>(null)

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

    const handleSwiperInit = (swiper: SwiperType): void => {
        if (prevRef.current && nextRef.current) {
            swiper.params.navigation = {
                prevEl: prevRef.current,
                nextEl: nextRef.current,
                enabled: true,
            } as any
            swiper.navigation.destroy()
            swiper.navigation.init()
            swiper.navigation.update()
        }
    }

    return (
        <section className={`${s.sliderSection} ${!isBlackFont ? s.darkTheme : ''}`}>
            <div className={s.container}>
                <h2 className={s.sectionTitle}>
                    {isBlackFont ? getHistoryTitleText(language) : getLiteratureTitleText(language)}
                </h2>

                <div className={s.sliderWrapper}>
                    <button 
                        ref={prevRef} 
                        className={`${s.navigationButton} ${s.prevButton}`}
                        aria-label="Previous slide"
                    >
                        <svg 
                            width="32" 
                            height="32" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="m15 18-6-6 6-6"/>
                        </svg>
                    </button>

                    <Swiper
                        className={s.swiper}
                        modules={[Navigation, Pagination, Autoplay]}
                        loop={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: true,
                            pauseOnMouseEnter: true
                        }}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        spaceBetween={20}
                        slidesPerView={5}
                        slidesPerGroup={5}
                        speed={600}
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                                slidesPerGroup: 2,
                                spaceBetween: 12,
                            },
                            480: {
                                slidesPerView: 3,
                                slidesPerGroup: 3,
                                spaceBetween: 16,
                            },
                            768: {
                                slidesPerView: 4,
                                slidesPerGroup: 4,
                                spaceBetween: 16,
                            },
                            1024: {
                                slidesPerView: 5,
                                slidesPerGroup: 5,
                                spaceBetween: 20,
                            },
                            1440: {
                                slidesPerView: 6,
                                slidesPerGroup: 6,
                                spaceBetween: 24,
                            }
                        }}
                        onInit={handleSwiperInit}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper
                        }}
                    >
                        {books.map(book => (
                            <SwiperSlide key={book._id} className={s.slide}>
                                <div className={s.bookCard}>
                                    <NavLink 
                                        to={`/book/${book._id}`} 
                                        className={s.bookImageLink}
                                        title={book[titleKey] as string}
                                    >
                                        {book.linkImage ? (
                                            <img 
                                                className={s.bookImage} 
                                                src={PROTOCOL_HOSTNAME_PORT + book.linkImage} 
                                                alt={book[titleKey] as string} 
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className={s.bookImagePlaceholder}></div>
                                        )}
                                    </NavLink>

                                    <div className={s.bookInfo}>
                                        <StarRating book={book} books={books} setBooks={setBooks} />
                                        
                                        <NavLink 
                                            to={`/book/${book._id}`} 
                                            className={s.bookTitle}
                                            title={book[titleKey] as string}
                                        >
                                            {book[titleKey]}
                                        </NavLink>
                                        
                                        <p className={s.bookAuthor}>{book[authorKey]}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button 
                        ref={nextRef} 
                        className={`${s.navigationButton} ${s.nextButton}`}
                        aria-label="Next slide"
                    >
                        <svg 
                            width="32" 
                            height="32" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="m9 18 6-6-6-6"/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    )
}

interface Props {
	isBlackFont: boolean
}

export default Slider
