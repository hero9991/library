import React, { useEffect, useRef, useState } from "react"
import { ReactReader, ReactReaderStyle } from "react-reader"
import { AiOutlineCloseSquare } from 'react-icons/ai'
import s from './Reader.module.css'
import ReaderWrapper from "./readerApp/containers/Reader"

// const ownStyles = {
//     ...ReactReaderStyle,
//     arrow: {
//         ...ReactReaderStyle.arrow,
//         color: 'black'
//     }
// }

const Reader = ({ bookUrl, setBookFormat }) => {
    // const [page, setPage] = useState('')
    // const [location, setLocation] = useState(null)

    // useEffect(() => {
    //     const iframe = document.querySelector('[id^="epubjs-view"]');
    //     if (iframe) iframe.src = iframe.src;
    //     // iframe.src = iframe.src;
    // }, [])

    // const renditionRef = useRef(null)
    // const tocRef = useRef(null)
    // const locationChanged = epubcifi => {
    //     if (renditionRef.current && tocRef.current) {
    //         const { displayed, href } = renditionRef.current.location.start
    //         const chapter = tocRef.current.find(item => item.href === href)
    //         setPage(`Page ${displayed.page} of ${displayed.total} in chapter ${chapter ? chapter.label : 'n/a'}`)
    //         setLocation(epubcifi)
    //     }
    // }
    // const tocChanged = (some) => {
    //     console.log(some)
    // }
console.log(123)
    return (
        <div onClick={e => e.stopPropagation()} className={bookUrl ? `${s.readerModalContent} ${s.active}` : s.readerModalContent}>
            {bookUrl && <ReaderWrapper url={bookUrl} />}
            {/* <ReactReader
                title='Samvel'
                location={location}
                locationChanged={locationChanged}
                // tocChanged={tocChanged}
                // swipeable={true}
                url={bookUrl} ////////////////// neeeeeed to correct the language here
                // styles={ownStyles}
                // epubOptions={{
                //     flow: "scrolled",
                //     manager: "continuous"
                // }}
                getRendition={rendition => {
                    renditionRef.current = rendition
                    // rendition.themes.register('custom', {
                    //     img: {
                    //     },
                    //     body: {
                    //         //width: '100vw !important',
                    //         // 'column-width': '900px !important' // one column

                    //         // width: max ? '11px !important' : '600px !important'
                    //     },
                    //     p: {
                    //         // color: '#000',
                    //         color: '#999',
                    //         'font-family': 'Monaco',
                    //         'line-height': '2 !important'
                    //     },
                    //     span: {
                    //         // color: '#000',
                    //         color: '#999',
                    //         'font-family': 'Monaco',
                    //         'line-height': '2 !important'
                    //     }
                    // })
                    // rendition.themes.select('custom')
                }}
                tocChanged={toc => tocRef.current = toc}
            />


            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', left: '1rem', textAlign: 'center', zIndex: 1 }}>
                {page}
            </div>*/}
            <AiOutlineCloseSquare onClick={() => setBookFormat('')} style={{ position: 'absolute', top: '3rem', right: '2rem', textAlign: 'center', zIndex: 1, cursor: 'pointer', fontSize: '50px' }} />
        </div> 
    )
}

export default Reader