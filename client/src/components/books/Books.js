import React, { useContext, useEffect, useState } from 'react'
import BookItem from '../bookItem/BookItem'
import s from './Books.module.css'
import { useLocation } from 'react-router-dom'
import { getBooks, getBooksBySearch, getMyBooks } from '../../utility/AxiosService'
import { UserContext } from '../../App'
import { toast } from 'react-toastify'
import { Triangle } from 'react-loader-spinner'
import SortingLiterature from './Sorting/SortingLiterature'
import SortingHistory from './Sorting/SortingHistory'
import { getEmptyMyBooksText, getUnauthorizedMyBooksText, getViewMoreText } from './translatedText/translatedText'
import { BOOKS, CONTAINER, HISTORY, LITERATURE } from '../../utility/Constants'

function Books() {
    const [books, setBooks] = useState([])
    const [currentChunk, setCurrentChunk] = useState(1)
    const [numberOfChunk, setNumberOfChunk] = useState(1)
    const [isReversed, setIsReversed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const { user, language } = useContext(UserContext)
    const location = useLocation()
    const currentRoute = location.pathname.split('/').pop()
    const currentSort = new URLSearchParams(location.search).get('sort');
    const currentTopic = new URLSearchParams(location.search).get('topic');
    const value = new URLSearchParams(location.search).get('value');

    useEffect(() => {
        const stickBackground = () => {
            if (!document.querySelector(('.' + s.books))) return
            if (document.body.offsetHeight - window.innerHeight - window.scrollY <= 70) {
                document.querySelector(('.' + s.books)).style.backgroundPosition = 'right 0 bottom ' + (window.innerHeight + window.scrollY + 70 - document.body.offsetHeight) + 'px'
            } else if (document.querySelector(('.' + s.books)).style.backgroundPosition !== 'right bottom') {
                document.querySelector(('.' + s.books)).style.backgroundPosition = 'right bottom'
            }
        }
        window.addEventListener('scroll', stickBackground)
        return () => window.removeEventListener('scroll', stickBackground)
    }, [])

    useEffect(() => {
        setCurrentChunk(1);
        // setNumberOfChunk(1)
        (async function () {
            try {
                switch (currentRoute) {
                    case LITERATURE:
                        setBooks([])
                        setIsLoading(true)
                        // if (books.length > 0) return//there is a problem without  обновляется стар ржйтинг
                        await requestBooks(1, true)
                        break
                    case HISTORY:
                        setBooks([])
                        setIsLoading(true)
                        // if (books.length > 0) return//there is a problem without  обновляется стар ржйтинг
                        await requestBooks(1, true)
                        break
                    case 'search':
                        setBooks([])
                        setIsLoading(true)
                        // if (books.length > 0) return//there is a problem without  обновляется стар ржйтинг
                        // requestBooks(1, true)
                        await getBooksBySearch(value).then(data => {
                            setBooks(data.data.books)
                        })
                        break
                    case BOOKS:
                        setBooks([])
                        if (!user?._id) return
                        setIsLoading(true)
                        await getMyBooks(user._id)
                            .then(data => {
                                setBooks(data.data)
                            })
                        break
                    default:
                        break
                }
            } catch (e) {
                toast.error('temp error')
            } finally {
                setIsLoading(false)
            }
        })()


        // return () => setBooks([])

    }, [user?._id, user?.books, currentRoute, currentTopic, currentSort, value, isReversed]) //temp changes

    const getBookChunk = async () => {
        const error = await requestBooks(currentChunk + 1, false)
        if (error) return

        document.querySelector(('.' + s.books)).style.backgroundPosition = 'right bottom'
    }

    const requestBooks = async (chunk, isFirstChunk) => {
        let id
        try {
            id = toast.loading("Please wait...")

            const response = await getBooks(currentRoute, chunk, currentSort, currentTopic, isReversed)

            isFirstChunk ? setBooks([...response.data.books]) : setBooks([...books, ...response.data.books])
            setCurrentChunk(response.data.currentChunk)
            setNumberOfChunk(response.data.numberOfChunk)
            return false
        } catch (error) {
            return toast.error(error.message)
        } finally {
            toast.dismiss(id);
        }
    }

    return (
        <section className={s.books}>
            {currentRoute === LITERATURE && <SortingLiterature currentSort={currentSort} currentTopic={currentTopic} language={language} isReversed={isReversed} setIsReversed={setIsReversed} />}
            {currentRoute === HISTORY && <SortingHistory currentSort={currentSort} currentTopic={currentTopic} language={language} isReversed={isReversed} setIsReversed={setIsReversed} />}
            <div className={CONTAINER}>
                {user && currentRoute === BOOKS && books.length === 0 && <p className={s.emptyBooks}>{getEmptyMyBooksText(language)}</p>}
                {!user && currentRoute === BOOKS && <p className={s.emptyBooks}>{getUnauthorizedMyBooksText(language)}</p>}
                {books.map((item, index) => index % 2
                    ? <BookItem second={true} bookItem={item} key={index} books={books} setBooks={setBooks} />
                    : <BookItem second={false} bookItem={item} key={index} books={books} setBooks={setBooks} />)}
                {currentChunk < numberOfChunk && currentRoute !== BOOKS && <button onClick={getBookChunk} className={s.viewMoreButton}>{getViewMoreText(language)}</button>}
                {isLoading && <div className={s.loader}><Triangle height={380} width={300} color='#1c1c1c' /></ div>}
            </div>
        </section>
    )
}

export default Books