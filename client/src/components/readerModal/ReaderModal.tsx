// import ReactCountryFlag from 'react-country-flag'
// import emojiSupport from 'detect-emoji-support'
import { RU as RU_FLAG, AM as AM_FLAG, GB as GB_FLAG } from 'country-flag-icons/react/3x2'
import { AM, GB, RU, DOWNLOAD, OPEN, UPLOAD, DELETE, SUBMIT } from '../../utility/Constants'
import s from './ReaderModal.module.css'
import { actionTypes, book, bookFormats } from '../../utility/commonTypes'
import { useState } from 'react'
import FigureItem from './figureItem/FigureItem'
import { postAddingOfBookFile, postDeletionOfBookFile } from './ReaderModalService'
import ReactGA from 'react-ga'

const UploadFormModal = ({ setIsUploadFormModal, isUploadFormModal, currentBookId, bookFormat, setCurrentBook }: ChildProps) => {
    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('book', e.target[0].files[0])
        formData.append('bookId', currentBookId)
        formData.append('bookFormat', bookFormat)

        const book = await postAddingOfBookFile(formData)

        setCurrentBook(book.data.updatedBook);
        setIsUploadFormModal(false)
    }

    return (
        <div onClick={() => setIsUploadFormModal(false)} className={isUploadFormModal ? `${s.readerModal} ${s.active}` : s.readerModal}>
            <div onClick={e => e.stopPropagation()} className={isUploadFormModal ? `${s.readerModalContent} ${s.active}` : s.readerModalContent}>
                <form onSubmit={handleSubmit}>
                    <input type='file' accept='application/epub+zip, application/pdf' />
                    <input className={s.uploadButton} type={SUBMIT} value='Upload the book' placeholder='book'/>
                </form>
            </div>
        </div>
    )
}

interface ChildProps {
    isUploadFormModal: boolean
    setIsUploadFormModal: any
    currentBookId: string
    bookFormat: bookFormats
    setCurrentBook: any
}

const ReaderModal = ({ isReaderModal, setIsReaderModal, setBookFormat, currentBook, setCurrentBook, actionType }: Props) => {
    const [isUploadFormModal, setIsUploadFormModal] = useState(false)
    const [currentBookFormat, setCurrentBookFormat] = useState<bookFormats | null>(null)
    const isDownload = actionType === DOWNLOAD
    const isOpen = actionType === OPEN
    const isUpload = actionType === UPLOAD
    const isDelete = actionType === DELETE
    const items = ['epubRU', 'epubAM', 'epubEN', 'pdfRU', 'pdfAM', 'pdfEN']
    
    const handleBook = (e: any) => {
        ReactGA.event({
            category: 'Book',
            action: isDownload ? 'Downloaded' : isOpen ? 'Opened' : 'Admin interaction',
            label: `Format: ${e.currentTarget.dataset.format}, Id: ${currentBook._id}`
        })
        if (isDownload) return
        setCurrentBookFormat(e.currentTarget.dataset.format)

        isOpen && currentBookFormat && currentBookFormat.includes('epub') && openEpubReader()
        isDelete && deleteBook()
        isUpload && addBook()
    }

    const openEpubReader = () => {
        setIsReaderModal(false)
        setBookFormat(currentBookFormat)
    }

    const deleteBook = async () => {
            if (!currentBookFormat) return
            const book = await postDeletionOfBookFile(currentBook._id, currentBookFormat as bookFormats)
            setCurrentBook(book.data.updatedBook)
    }
    const addBook = async () => {
        setIsUploadFormModal(true)
    }
    // const isEmojiSupported = emojiSupport();

    return (
        <div onClick={() => setIsReaderModal(false)} className={isReaderModal ? `${s.readerModal} ${s.active}` : s.readerModal}>
            {currentBook && <div onClick={e => e.stopPropagation()} className={isReaderModal ? `${s.readerModalContent} ${s.active}` : s.readerModalContent}>
                <div></div>
                {/* <div>{isEmojiSupported ? <ReactCountryFlag countryCode={RU} style={{ fontSize: '2em' }} /> : <AM_FLAG className={s.commonFlag} />}</div>
                <div>{isEmojiSupported ? <ReactCountryFlag countryCode={AM} style={{ fontSize: '2em' }} /> : <RU_FLAG className={s.commonFlag} />}</div>
                <div>{isEmojiSupported ? <ReactCountryFlag countryCode={GB} style={{ fontSize: '2em' }} /> : <GB_FLAG className={s.commonFlag} />}</div> */}
                <div><RU_FLAG className={s.commonFlag} /></div>
                <div><AM_FLAG className={s.commonFlag} /></div>
                <div><GB_FLAG className={s.commonFlag} /></div>
                    
                <div>EPUB</div>
                {items.slice(0, 3).map((item, index) => <FigureItem key={item} handleBook={handleBook} figureType={!(index % 2) ? 'circle' : 'rhombus'} 
                    format={item as bookFormats} currentBook={currentBook} isDownload={isDownload} isOpen={isOpen} isUpload={isUpload} isDelete={isDelete} />)}
                <div>PDF</div>
                {items.slice(3).map((item, index) => <FigureItem key={item} handleBook={handleBook} figureType={!(index % 2) ? 'square' : 'circle'} 
                    format={item as bookFormats} currentBook={currentBook} isDownload={isDownload} isOpen={isOpen} isUpload={isUpload} isDelete={isDelete} />)}
            </div>}
            <UploadFormModal isUploadFormModal={isUploadFormModal} setIsUploadFormModal={setIsUploadFormModal} currentBookId={currentBook?._id} bookFormat={currentBookFormat as bookFormats} setCurrentBook={setCurrentBook}/>
        </div>
    )
}

interface Props {
    isReaderModal: boolean
    setIsReaderModal: any
    setBookFormat: any
    currentBook: book
    setCurrentBook: any
    actionType: actionTypes | null
}

export default ReaderModal