import { useContext, useEffect, useRef, useState } from 'react'
import BookItem from '../bookItem/BookItem'
import s from './Books.module.css'
import { useLocation } from 'react-router-dom'
import { getBooks, getBooksBySearch, getMyBooks } from '../../utility/AxiosService'
import { UserContext } from '../../App'
import { toast } from 'react-toastify'
import { Triangle } from 'react-loader-spinner'
import Sorting from './Sorting/Sorting'
import { getEmptyMyBooksText, getEmptyBooksSearchText, getUnauthorizedMyBooksText, getViewMoreText, getEmptyArticlesText } from './translatedText/translatedText'
import { ARTICLE, BOOKS, CONTAINER, HISTORY, LITERATURE, SEARCH } from '../../utility/Constants'
import { book } from '../../utility/commonTypes'
import ReactGA from 'react-ga4'

function Books() {
    const { user, language } = useContext(UserContext)

    const [books, setBooks] = useState<book[]>([])
    const [currentChunk, setCurrentChunk] = useState<number>(1)
    const [numberOfChunk, setNumberOfChunk] = useState<number>(1)
    const [isReversed, setIsReversed] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const prevBooksCount = useRef(user?.books.length)

    const location = useLocation()

    const currentRoute: string = location.pathname.split('/').pop()
    const currentSort: string | null = new URLSearchParams(location.search).get('sort')
    const currentTopic: string | null = new URLSearchParams(location.search).get('topic')
    const searchValue: string | null = new URLSearchParams(location.search).get('value')

    useEffect(() => {
        const stickBackground = () => {
            const backgroundMountains = document.querySelector(('.' + s.books)) as HTMLElement
            if (!backgroundMountains) return
            if (document.body.offsetHeight - window.innerHeight - window.scrollY <= 70) {
                backgroundMountains.style.backgroundPosition = 'right 0 bottom ' + (window.innerHeight + window.scrollY + 70 - document.body.offsetHeight) + 'px'
            } else if (backgroundMountains.style.backgroundPosition !== 'right bottom') {
                backgroundMountains.style.backgroundPosition = 'right bottom'
            }
        }
        window.addEventListener('scroll', stickBackground)
        return () => window.removeEventListener('scroll', stickBackground)
    }, [])

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
        (async function () {
            try {
                if (user?.books && user?.books.length !== prevBooksCount.current) return
                switch (currentRoute) {
                    case LITERATURE :case HISTORY :case ARTICLE :case SEARCH:
                        setIsLoading(true) 
                        await requestBooks(1, true)
                        break
                    case BOOKS:
                        if (!user?._id) return setBooks([])
                        setIsLoading(true)
                        await getMyBooks(user._id)
                            .then(data => {
                                setBooks(data.data)
                            })
                        break
                    default:
                        break
                }
            } catch (error) {
                toast.error(`Error ${error}`)
            } finally {                
                if (user?.books) prevBooksCount.current = user?.books?.length
                setIsLoading(false)
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?._id, user?.books, currentRoute, currentTopic, currentSort, searchValue, isReversed])

    const getBookChunk = async () => {
        const error = await requestBooks(currentChunk + 1, false)
        if (error) return

        const backgroundMountains = document.querySelector(('.' + s.books)) as HTMLElement
        backgroundMountains.style.backgroundPosition = 'right bottom'
    }

    const requestBooks = async (chunk: number, isFirstChunk: boolean) => {
        if ((currentRoute === LITERATURE || currentRoute === HISTORY || currentRoute === ARTICLE) 
            && (!currentRoute || !currentTopic || !currentSort)) return
        if (currentRoute === SEARCH 
            && !searchValue) return
        let id
        try {
            if (!isFirstChunk) id = toast.loading("Please wait...")
            const response = currentRoute === SEARCH ? await getBooksBySearch(searchValue as string, chunk)
                                                     : await getBooks(currentRoute as string, chunk, currentSort as string, 
                                                                      currentTopic as string, isReversed, language)
            isFirstChunk ? setBooks([...response.data.books]) : setBooks([...books, ...response.data.books])
            setCurrentChunk(response.data.currentChunk)
            setNumberOfChunk(response.data.numberOfChunk)
            return false
        } catch (error: any) {
            return toast.error(error.message)
        } finally {
            if (!isFirstChunk) toast.dismiss(id)
        }
    }

    return (
        <section className={s.books}>
            {(currentRoute === HISTORY || currentRoute === LITERATURE || currentRoute === ARTICLE) && <Sorting currentSort={currentSort} currentTopic={currentTopic} language={language} isReversed={isReversed} setIsReversed={setIsReversed} isLiterature={currentRoute === LITERATURE} isArticle={currentRoute === ARTICLE}/>}
            {!isLoading 
                ? <div className={CONTAINER}>
                    {user && currentRoute === BOOKS && books.length === 0 && <p className={s.emptyBooks}>{getEmptyMyBooksText(language)}</p>}
                    {!user && currentRoute === BOOKS && <p className={s.emptyBooks}>{getUnauthorizedMyBooksText(language)}</p>}
                    {currentRoute === SEARCH && books.length === 0 && <p className={s.emptyBooks}>{getEmptyBooksSearchText(language)}</p>}
                    {currentRoute === ARTICLE && books.length === 0 && <p className={s.emptyBooks}>{getEmptyArticlesText(language)}</p>}

                    {books.map((item, index) => <BookItem isSecond={!!(index % 2)} bookItem={item} key={index} books={books} setBooks={setBooks} currentRoute={currentRoute} />)}

                    {currentChunk < numberOfChunk && currentRoute !== BOOKS && <button onClick={getBookChunk} className={s.viewMoreButton}>{getViewMoreText(language)}</button>}
                </div>
                : <div className={s.loader}><Triangle height={380} width={300} color='#1c1c1c'/></ div>}
        </section>
    )
}

export default Books