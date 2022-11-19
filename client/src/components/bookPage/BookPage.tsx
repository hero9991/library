import { useState, useEffect, useContext, useRef } from 'react'
import s from './BookPage.module.css'
import Reader from '../reader/Reader'
import { useLocation } from 'react-router'
import { toast } from 'react-toastify'
import { Triangle } from 'react-loader-spinner'
import { getBook, incrementBookView } from '../../utility/AxiosService'
import { AUTHOR, CONTAINER, DELETE, DESCRIPTION, DOWNLOAD, OPEN, PROTOCOL_HOSTNAME_PORT, TITLE, UPLOAD } from '../../utility/Constants'
import { UserContext } from '../../App'
import ReaderModal from '../readerModal/ReaderModal'
import { actionTypes, book, bookFormats, UserContextInterface } from '../../utility/commonTypes'
import UpdateBook from '../updateBook/UpdateBook'
import { getDeleteBookText, getDownloadText, getReadNowText, getShowFullDescriptionText, getUploadBookText } from './translatedText/translatedText'
import CommentSection from '../commentSection/CommentSection'
import ReactGA from 'react-ga'

function BookPage() {
    const descriptionRef: any = useRef(null);
    const { user, language } = useContext<UserContextInterface>(UserContext)
    const [currentBook, setCurrentBook] = useState<book | null>(null)
    const [isReaderModal, setIsReaderModal] = useState<boolean>(false)
    const [actionType, setActionType] = useState<actionTypes | null>(null)
    const [bookFormat, setBookFormat] = useState<bookFormats | ''>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isEclipseApplied, setIsEclipseApplied] = useState<boolean>(false)
    const bookId: string = useLocation().pathname.split('/').pop()

    const authorKey = (AUTHOR + language) as keyof book
    const titleKey = (TITLE + language) as keyof book
    const descriptionKey = (DESCRIPTION + language) as keyof book
    const bookFormatKey = bookFormat as keyof book
    const isOpen = actionType === OPEN

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
        (async function () {
            try {
                setIsLoading(true)
                const book = (await getBook(bookId)).data.book
                setCurrentBook(book)
                setIsLoading(false)
                await incrementBookView(bookId, book.viewCount)
            } catch (error) {
                toast.error(`Error ${error}`)
            }
        })()
    }, [bookId])

    const openReaderModal = (e: any) => {
        setIsReaderModal(true)
        setActionType(e.target.dataset.type)
    }

    const showFullDescriptionButton = (e: any) => {
        setIsEclipseApplied(e.target.offsetHeight < e.target.scrollHeight)
    }
    const hideFullDescriptionButton = () => {
        setIsEclipseApplied(false)
    }

    const showFullDescription = () => {
        descriptionRef.current.style.display = 'block'
        setIsEclipseApplied(false)
    }

    return (
        <section className={s.bookPage}>
            <div className={CONTAINER}>
            {!isLoading 
                ? <div className={s.content}>
                    {currentBook && <div className={s.mainContent}>
                        <div className={s.image}>
                            <img src={PROTOCOL_HOSTNAME_PORT + currentBook.linkImage} alt=''></img>
                        </div>
                        <div className={s.text}>
                            <div className={s.blackBand}>
                                <p className={s.title}>{currentBook[titleKey]}</p>
                                <p className={s.author}>{currentBook[authorKey]}</p>
                            </div>
                            <p onMouseEnter={showFullDescriptionButton} onMouseLeave={hideFullDescriptionButton} ref={descriptionRef} className={s.description}>
                                {currentBook[descriptionKey]}
                                {isEclipseApplied && <button className={s.showDescriptionButton} onClick={showFullDescription}>{getShowFullDescriptionText(language)}</button>}
                            </p>
                        </div>
                    </div>}
                    <div className={s.buttons}>
                        <button onClick={openReaderModal} data-type={DOWNLOAD}>{getDownloadText(language)}</button>
                        <button onClick={openReaderModal} data-type={OPEN}>{getReadNowText(language)}</button>
                    </div>    
                    {user?.isAdmin && <div className={`${s.buttons} ${s.adminButtons}`}>
                        <button onClick={openReaderModal} data-type={DELETE}>{getDeleteBookText(language)}</button>
                        <button onClick={openReaderModal} data-type={UPLOAD}>{getUploadBookText(language)}</button>
                    </div>}

                    <CommentSection bookId={bookId}/>

                    <ReaderModal isReaderModal={isReaderModal} setIsReaderModal={setIsReaderModal} setBookFormat={setBookFormat} currentBook={currentBook as book} actionType={actionType} setCurrentBook={setCurrentBook}/>
                    {currentBook && isOpen && bookFormatKey && <Reader bookUrl={currentBook[bookFormatKey]} setBookFormat={setBookFormat}/>}
                    {user?.isAdmin && <UpdateBook bookId={bookId} setCurrentBook={setCurrentBook}/>}
                </div>
                : <div className={s.loader}><Triangle height={380} width={300} color='#1c1c1c' /></ div>}
            </div>
        </section>
    )
}

export default BookPage