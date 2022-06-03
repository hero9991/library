import { useState, useEffect, useContext } from 'react'
import s from './BookPage.module.css'
import Reader from '../reader/Reader'
import { useLocation } from 'react-router'
import { toast } from 'react-toastify'
import { Triangle } from 'react-loader-spinner'
import { getBook, incrementBookView } from '../../utility/AxiosService'
import { AUTHOR, CONTAINER, DESCRIPTION, PROTOCOL_HOSTNAME_PORT, TITLE } from '../../utility/Constants'
import { UserContext } from '../../App'
import ReaderModal from '../readerModal/ReaderModal'
import { book, bookFormats, UserContextInterface } from '../../utility/commonTypes'


function BookPage() {
    const { language } = useContext<UserContextInterface>(UserContext)
    const [currentBook, setCurrentBook] = useState<book | null>(null)
    const [isReaderModal, setIsReaderModal] = useState<boolean>(false)
    const [isDownload, setIsDownload] = useState<boolean>(false)
    const [bookFormat, setBookFormat] = useState<bookFormats | ''>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const bookId: string = useLocation().pathname.split('/').pop()

    const authorKey = (AUTHOR + language) as keyof book
    const titleKey = (TITLE + language) as keyof book
    const descriptionKey = (DESCRIPTION + language) as keyof book
    const bookFormatKey = bookFormat as keyof book

    useEffect(() => {
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
        setIsDownload(e.target.dataset.download)
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
                            <p>{currentBook[descriptionKey]}</p>
                        </div>
                    </div>}

                    <div className={s.buttons}>
                        <button onClick={openReaderModal} data-download={true}>Download</button>
                        <button onClick={openReaderModal}>Read Now</button>
                    </div>    
                    
                    <ReaderModal isReaderModal={isReaderModal} setIsReaderModal={setIsReaderModal} setBookFormat={setBookFormat} currentBook={currentBook} isDownload={isDownload}/>
                    {currentBook && !isDownload && <Reader bookUrl={currentBook[bookFormatKey]} setBookFormat={setBookFormat}/>}
                </div>
                : <div className={s.loader}><Triangle height={380} width={300} color='#1c1c1c' /></ div>}
            </div>
        </section>
    )
}

export default BookPage