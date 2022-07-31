import ReactCountryFlag from 'react-country-flag'
import { AM, GB, RU, DOWNLOAD, OPEN, UPLOAD, DELETE, SUBMIT } from '../../utility/Constants'
import s from './ReaderModal.module.css'
import { actionTypes, book, bookFormats } from '../../utility/commonTypes'
import { useState } from 'react'
import FigureItem from './figureItem/FigureItem'
import { postAddingOfBookFile, postDeletionOfBookFile } from './ReaderModalService'

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
        console.log(e.target.dataset.format)
        if (isDownload) return
        setCurrentBookFormat(e.target.dataset.format)

        isOpen && currentBookFormat && currentBookFormat.includes('epub') && openEpubReader()
        isDelete && deleteBook()
        isUpload && addBook()
    }

    const openEpubReader = () => {
        setIsReaderModal(false)
        setBookFormat(currentBookFormat)
    }

    const deleteBook = async () => {
            console.log(currentBook)
            console.log(currentBookFormat)
            if (!currentBookFormat) return
            const book = await postDeletionOfBookFile(currentBook._id, currentBookFormat as bookFormats)
            console.log(book)
            setCurrentBook(book.data.updatedBook)
        
    }
    const addBook = async () => {
        setIsUploadFormModal(true)
    }

    return (
        <div onClick={() => setIsReaderModal(false)} className={isReaderModal ? `${s.readerModal} ${s.active}` : s.readerModal}>
            {currentBook && <div onClick={e => e.stopPropagation()} className={isReaderModal ? `${s.readerModalContent} ${s.active}` : s.readerModalContent}>
                <div></div>
                <div><ReactCountryFlag countryCode={RU} style={{ fontSize: '2em' }} /></div>
                <div><ReactCountryFlag countryCode={AM} style={{ fontSize: '2em' }} /></div>
                <div><ReactCountryFlag countryCode={GB} style={{ fontSize: '2em' }} /></div>
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