import React from "react"
import { AiOutlineCloseSquare } from 'react-icons/ai'
import s from './Reader.module.css'
import ReaderWrapper from "./readerApp/containers/Reader"

const Reader = ({ bookUrl, setBookFormat }) => { 

    return (
        <div onClick={e => e.stopPropagation()} className={bookUrl ? `${s.readerModalContent} ${s.active}` : s.readerModalContent}>
            {bookUrl && <ReaderWrapper url={bookUrl} />}
             
            <AiOutlineCloseSquare onClick={() => setBookFormat('')} style={{ position: 'absolute', top: '.5rem', left: '1.5rem', textAlign: 'center', zIndex: 100, cursor: 'pointer', fontSize: '50px' }} />
        </div> 
    )
}

export default Reader