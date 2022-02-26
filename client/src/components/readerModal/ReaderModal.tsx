import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import { AM, GB, RU, PROTOCOL_HOSTNAME_PORT } from '../../utility/Constants'
import { AiOutlineCloudDownload} from 'react-icons/ai'
import s from './ReaderModal.module.css'
import { book } from '../../utility/commonTypes'

const ReaderModal = ({ isReaderModal, setIsReaderModal, setBookFormat, currentBook, isDownload }: Props) => {
    const openReader = (e: any) => {
        setIsReaderModal(false)
        setBookFormat(e.target.dataset.value)
    }

    return (
        <div onClick={() => setIsReaderModal(false)} className={isReaderModal ? `${s.readerModal} ${s.active}` : s.readerModal}>
            {currentBook && <div onClick={e => e.stopPropagation()} className={isReaderModal ? `${s.readerModalContent} ${s.active}` : s.readerModalContent}>
                <div></div>
                <div><ReactCountryFlag countryCode={RU} style={{ fontSize: '2em' }} /></div>
                <div><ReactCountryFlag countryCode={AM} style={{ fontSize: '2em' }} /></div>
                <div><ReactCountryFlag countryCode={GB} style={{ fontSize: '2em' }} /></div>
                <div>EPUB</div>
                <div onClick={openReader} className={currentBook.epubRU ? `${s.figure} ${s.circle} ${s.active}` : `${s.figure} ${s.circle}`} data-value='epubRU'>
                    {isDownload && <a href={PROTOCOL_HOSTNAME_PORT + currentBook.epubRU} target='_blank' rel='noreferrer' download><AiOutlineCloudDownload /></a>}
                </div>
                <div onClick={openReader} className={currentBook.epubAM ? `${s.figure} ${s.rhombus} ${s.active}` : `${s.figure} ${s.rhombus}`} data-value='epubAM'>
                    {isDownload && <a href={PROTOCOL_HOSTNAME_PORT + currentBook.epubAM} target='_blank' rel='noreferrer' download><AiOutlineCloudDownload /></a>}
                </div>
                <div onClick={openReader} className={currentBook.epubEN ? `${s.figure} ${s.circle} ${s.active}` : `${s.figure} ${s.circle}`} data-value='epubEN'>
                    {isDownload && <a href={PROTOCOL_HOSTNAME_PORT + currentBook.epubEN} target='_blank' rel='noreferrer' download><AiOutlineCloudDownload /></a>}
                </div>
                <div>PDF</div>
                <div className={currentBook.pdfRU ? `${s.figure} ${s.square} ${s.active}` : `${s.figure} ${s.square}`}>
                    <a href={PROTOCOL_HOSTNAME_PORT + currentBook.pdfRU} target='_blank' rel='noreferrer' download><AiOutlineCloudDownload /></a>
                </div>
                <div className={currentBook.pdfAM ? `${s.figure} ${s.circle} ${s.active}` : `${s.figure} ${s.circle}`}>
                    <a href={PROTOCOL_HOSTNAME_PORT + currentBook.pdfAM} target='_blank' rel='noreferrer' download><AiOutlineCloudDownload /></a>
                </div>
                <div className={currentBook.pdfEN ? `${s.figure} ${s.square} ${s.active}` : `${s.figure} ${s.square}`}>
                    <a href={PROTOCOL_HOSTNAME_PORT + currentBook.pdfEN} target='_blank' rel='noreferrer' download><AiOutlineCloudDownload /></a>
                </div>
            </div>}
        </div>
    )
}


interface Props {
    isReaderModal: boolean
    setIsReaderModal: any
    setBookFormat: any
    currentBook: book | any
    isDownload: boolean
}

export default ReaderModal