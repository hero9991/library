import { PROTOCOL_HOSTNAME_PORT } from "../../../utility/Constants"
import { AiOutlineCloudDownload, AiOutlineBook, AiOutlineDelete, AiOutlineUpload } from 'react-icons/ai'
import s from '../ReaderModal.module.css'
import { book, bookFormats } from "../../../utility/commonTypes"

const FigureItem = ({ handleBook, figureType, format, currentBook, isDownload, isOpen, isUpload, isDelete }: Props) => {
    const isShowFigure = (isBookPresent: boolean) => {
        return (isUpload && !isBookPresent) || (!isUpload && isBookPresent)
    }

    return (
        <div onClick={handleBook} className={isShowFigure(!!currentBook[format]) ? `${s.figure} ${s[figureType]} ${s.active}` : `${s.figure} ${s[figureType]}`} data-format={format}>
            {isDownload && <a href={PROTOCOL_HOSTNAME_PORT + currentBook[format]} target='_blank' rel='noreferrer' download data-format={format}><AiOutlineCloudDownload /></a>}
            {isOpen && (format.includes('epub') 
                ? <div data-format={format}><AiOutlineBook data-format={format}/></div>
                : <a href={PROTOCOL_HOSTNAME_PORT + currentBook[format]} target='_blank' rel='noreferrer' data-format={format}><AiOutlineBook /></a>)}
            {isUpload && <div data-format={format}><AiOutlineUpload data-format={format}/></div>}
            {isDelete && <div data-format={format}><AiOutlineDelete data-format={format}/></div>}
        </div>
    )
}

interface Props {
    handleBook: any
    figureType: string
    format: bookFormats
    currentBook: book
    isDownload: boolean
    isOpen: boolean
    isUpload: boolean
    isDelete: boolean
}

export default FigureItem