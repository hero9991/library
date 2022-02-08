import React, { useState, useEffect } from 'react'
import s from './BookPage.module.css'
import Reader from '../reader/Reader'
import { useLocation } from 'react-router'
import { toast } from 'react-toastify'
import { Triangle } from 'react-loader-spinner'
import { getBook, incrementBookView } from '../../utility/AxiosService'

function BookPage() {
    const [currentBook, setCurrentBook] = useState(null)
    const [isReaderModal, setIsReaderModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const bookId = useLocation().pathname.split('/').pop()

    useEffect(() => {
        (async function () {
            try {
                setIsLoading(true)
                const book = (await getBook(bookId)).data.book
                setCurrentBook(book)
                setIsLoading(false)
                await incrementBookView(bookId, book.viewCount)
            } catch (e) {
                toast.error('temp error')
            }
        })()
    }, [bookId])

    return (
        <section className={s.bookPage}>
            <div className='container'>
                <div className={s.content}>
                    <div className={s.mainContent}>
                        <div className={s.image}>
                            {currentBook && <img src={require(`../../assets/booksCover/${currentBook.cover}.jpeg`).default} alt=''></img>}
                        </div>
                        <div className={s.text}>
                            <div className={s.blackBand}>
                                <p className={s.title}>{currentBook?.title}</p>
                                <p className={s.author}>{currentBook?.author}</p>
                            </div>
                            <p>{currentBook?.description}</p>
                        </div>
                    </div>

                    <div className={s.buttons}>
                        <button>Download</button>
                        <button onClick={() => setIsReaderModal(true)}>Read Now</button>
                    </div>
                    {/* <iframe title='book' src={book} width="100%" height="500px"></iframe> */}
                    {/* <embed src={book} type='application/pdf' position='absolute' width='100%' height='660px'></embed> */}
                    <Reader isReaderModal={isReaderModal} setIsReaderModal={setIsReaderModal} currentBook={currentBook} />
                    {isLoading && <div className={s.loader}><Triangle height={380} width={300} color='#1c1c1c' /></ div>}
                </div>

            </div>
        </section>
    )
}

export default BookPage