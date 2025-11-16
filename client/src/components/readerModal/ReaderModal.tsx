import { RU as RU_FLAG, AM as AM_FLAG, GB as GB_FLAG } from 'country-flag-icons/react/3x2'
import { DOWNLOAD, OPEN, UPLOAD, DELETE, SUBMIT, PROTOCOL_HOSTNAME_PORT } from '../../utility/Constants'
import s from './ReaderModal.module.css'
import { actionTypes, book, bookFormats } from '../../utility/commonTypes'
import { useState } from 'react'
import { AiOutlineCloudDownload, AiOutlineBook, AiOutlineDelete, AiOutlineUpload } from 'react-icons/ai'
import { postAddingOfBookFile, postDeletionOfBookFile } from './ReaderModalService'
import ReactGA from 'react-ga4'

const UploadFormModal = ({ setIsUploadFormModal, isUploadFormModal, currentBookId, bookFormat, setCurrentBook }: ChildProps) => {
    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (!e.target[0].files[0]) {
            return
        }

        const formData = new FormData()
        formData.append('book', e.target[0].files[0])
        formData.append('bookId', currentBookId)
        formData.append('bookFormat', bookFormat)

        const book = await postAddingOfBookFile(formData)

        setCurrentBook(book.data.updatedBook)
        setIsUploadFormModal(false)
    }

    return (
        <div onClick={() => setIsUploadFormModal(false)} className={isUploadFormModal ? `${s.readerModal} ${s.active}` : s.readerModal}>
            <div onClick={e => e.stopPropagation()} className={isUploadFormModal ? `${s.readerModalContent} ${s.active}` : s.readerModalContent}>
                <div className={s.modalHeader}>
                    <h2 className={s.modalTitle}>Upload Book File</h2>
                    <p className={s.modalDescription}>Select an EPUB or PDF file to upload</p>
                    <button className={s.closeButton} onClick={() => setIsUploadFormModal(false)}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type='file' accept='application/epub+zip, application/pdf' />
                    <button className={s.uploadButton} type={SUBMIT}>Upload Book</button>
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
    
    const formats = [
        { key: 'epubRU', lang: 'Russian', flag: RU_FLAG, type: 'EPUB' },
        { key: 'epubAM', lang: 'Armenian', flag: AM_FLAG, type: 'EPUB' },
        { key: 'epubEN', lang: 'English', flag: GB_FLAG, type: 'EPUB' },
        { key: 'pdfRU', lang: 'Russian', flag: RU_FLAG, type: 'PDF' },
        { key: 'pdfAM', lang: 'Armenian', flag: AM_FLAG, type: 'PDF' },
        { key: 'pdfEN', lang: 'English', flag: GB_FLAG, type: 'PDF' },
    ]
    
    const handleBook = (format: bookFormats) => {
        ReactGA.event({
            category: 'Book',
            action: isDownload ? 'Downloaded' : isOpen ? 'Opened' : 'Admin interaction',
            label: `Format: ${format}, Id: ${currentBook._id}`
        })
        setCurrentBookFormat(format)

        if (isOpen && format.includes('epub')) {
            openEpubReader(format)
        } else if (isDelete) {
            deleteBook(format)
        } else if (isUpload) {
            addBook()
        }
    }

    const openEpubReader = (format: bookFormats) => {
        setIsReaderModal(false)
        setBookFormat(format)
    }

    const deleteBook = async (format: bookFormats) => {
        const book = await postDeletionOfBookFile(currentBook._id, format)
        setCurrentBook(book.data.updatedBook)
    }
    
    const addBook = async () => {
        setIsUploadFormModal(true)
    }

    const getActionTitle = () => {
        if (isDownload) return 'Download Book'
        if (isOpen) return 'Read Book'
        if (isUpload) return 'Upload Book'
        if (isDelete) return 'Delete Book'
        return 'Select Format'
    }

    const getActionDescription = () => {
        if (isDownload) return 'Choose your preferred format and language to download'
        if (isOpen) return 'Select a format and language to start reading'
        if (isUpload) return 'Choose which format to upload'
        if (isDelete) return 'Select format to delete'
        return ''
    }

    const isFormatAvailable = (format: string) => {
        return currentBook && currentBook[format as keyof book]
    }

    const isFormatClickable = (format: string) => {
        const available = isFormatAvailable(format)
        return (isUpload && !available) || (!isUpload && available)
    }

    return (
        <div onClick={() => setIsReaderModal(false)} className={isReaderModal ? `${s.readerModal} ${s.active}` : s.readerModal}>
            {currentBook && <div onClick={e => e.stopPropagation()} className={isReaderModal ? `${s.readerModalContent} ${s.active}` : s.readerModalContent}>
                <div className={s.modalHeader}>
                    <h2 className={s.modalTitle}>{getActionTitle()}</h2>
                    <p className={s.modalDescription}>{getActionDescription()}</p>
                    <button className={s.closeButton} onClick={() => setIsReaderModal(false)}>×</button>
                </div>
                <div className={s.formatsGrid}>
                    {formats.map((format) => {
                        const FormatFlag = format.flag
                        const isAvailable = isFormatAvailable(format.key)
                        const isClickable = isFormatClickable(format.key)
                        
                        // For download action, wrap the entire card in an anchor tag
                        if (isDownload && isClickable) {
                            return (
                                <a
                                    key={format.key}
                                    href={PROTOCOL_HOSTNAME_PORT + currentBook[format.key as keyof book]}
                                    target='_blank'
                                    rel='noreferrer'
                                    download
                                    className={`${s.formatCard} ${s.active} ${s.downloadCard}`}
                                    onClick={() => handleBook(format.key as bookFormats)}
                                >
                                    <div className={s.formatFlag}>
                                        <FormatFlag />
                                    </div>
                                    <div className={s.formatInfo}>
                                        <span className={s.formatType}>{format.type}</span>
                                        <span className={s.formatLang}>{format.lang}</span>
                                    </div>
                                    <AiOutlineCloudDownload className={s.actionIcon} />
                                </a>
                            )
                        }
                        
                        // For PDF opening, wrap in anchor tag
                        if (isOpen && isClickable && format.type === 'PDF') {
                            return (
                                <a
                                    key={format.key}
                                    href={PROTOCOL_HOSTNAME_PORT + currentBook[format.key as keyof book]}
                                    target='_blank'
                                    rel='noreferrer'
                                    className={`${s.formatCard} ${s.active} ${s.downloadCard}`}
                                    onClick={() => handleBook(format.key as bookFormats)}
                                >
                                    <div className={s.formatFlag}>
                                        <FormatFlag />
                                    </div>
                                    <div className={s.formatInfo}>
                                        <span className={s.formatType}>{format.type}</span>
                                        <span className={s.formatLang}>{format.lang}</span>
                                    </div>
                                    <AiOutlineBook className={s.actionIcon} />
                                </a>
                            )
                        }
                        
                        // For all other cases (EPUB opening, upload, delete)
                        return (
                            <div
                                key={format.key}
                                className={`${s.formatCard} ${isClickable ? s.active : ''} ${!isAvailable && !isUpload ? s.disabled : ''}`}
                                onClick={isClickable ? () => handleBook(format.key as bookFormats) : undefined}
                            >
                                <div className={s.formatFlag}>
                                    <FormatFlag />
                                </div>
                                <div className={s.formatInfo}>
                                    <span className={s.formatType}>{format.type}</span>
                                    <span className={s.formatLang}>{format.lang}</span>
                                </div>
                                {isOpen && isClickable && (
                                    <AiOutlineBook className={s.actionIcon} />
                                )}
                                {isUpload && isClickable && (
                                    <AiOutlineUpload className={s.actionIcon} />
                                )}
                                {isDelete && isClickable && (
                                    <AiOutlineDelete className={s.actionIcon} />
                                )}
                                {!isAvailable && !isUpload && (
                                    <span className={s.notAvailable}>Not Available</span>
                                )}
                            </div>
                        )
                    })}
                </div>
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