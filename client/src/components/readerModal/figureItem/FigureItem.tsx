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
            {isDownload && <a href={PROTOCOL_HOSTNAME_PORT + currentBook[format]} target='_blank' rel='noreferrer' download ><AiOutlineCloudDownload /></a>}
            {isOpen && (format.includes('epub') 
                ? <div ><AiOutlineBook /></div>
                : <a href={PROTOCOL_HOSTNAME_PORT + currentBook[format]} target='_blank' rel='noreferrer' ><AiOutlineBook /></a>)}
            {isUpload && <div ><AiOutlineUpload /></div>}
            {isDelete && <div ><AiOutlineDelete /></div>}
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