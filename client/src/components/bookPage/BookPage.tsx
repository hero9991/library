import React, { useState, useEffect, useContext } from 'react'
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

    useEffect(() => {
        (async function () {
            try {
                setIsLoading(true)
                const book = (await getBook(bookId)).data.book
                setCurrentBook(book)
                console.log(JSON.stringify(book))
                setIsLoading(false)
                await incrementBookView(bookId, book.viewCount)
            } catch (e) {
                toast.error('temp error')
            }
        })()
    }, [bookId])

    return (
        <section className={s.bookPage}>
            <div className={CONTAINER}>
                <div className={s.content}>
                    {currentBook && <div className={s.mainContent}>
                        <div className={s.image}>
                            <img src={PROTOCOL_HOSTNAME_PORT + currentBook.linkImage} alt=''></img>
                        </div>
                        <div className={s.text}>
                            <div className={s.blackBand}>
                                <p className={s.title}>{currentBook[(TITLE + language) as keyof book]}</p>
                                <p className={s.author}>{currentBook[(AUTHOR + language) as keyof book]}</p>
                            </div>
                            <p>{currentBook[(DESCRIPTION + language) as keyof book]}</p>
                        </div>
                    </div>}

                    <div className={s.buttons}>
                        <button onClick={() => {setIsReaderModal(true); setIsDownload(true)}}>Download</button>
                        <button onClick={() => {setIsReaderModal(true); setIsDownload(false)}}>Read Now</button>
                    </div>    
                    
                    <ReaderModal isReaderModal={isReaderModal} setIsReaderModal={setIsReaderModal} setBookFormat={setBookFormat} currentBook={currentBook} isDownload={isDownload}/>
                    {currentBook && !isDownload && <Reader bookUrl={currentBook[bookFormat as keyof book]} setBookFormat={setBookFormat}/>}
                    {isLoading && <div className={s.loader}><Triangle height={380} width={300} color='#1c1c1c' /></ div>}
                </div>

            </div>
        </section>
    )
}

export default BookPage