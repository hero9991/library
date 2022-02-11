import React, { useEffect, useRef, useState } from "react"
import { ReactReader, ReactReaderStyle } from "react-reader"
import s from './Reader.module.css'
import book from '../../assets/BooksItem/Самвел1.epub'

const ownStyles = {
    ...ReactReaderStyle,
    arrow: {
        ...ReactReaderStyle.arrow,
        color: 'black'
    }
}

const Reader = ({ isReaderModal, setIsReaderModal, currentBook }) => {


    const [page, setPage] = useState('')
    const [location, setLocation] = useState(null)
    const [max, setMax] = useState(false)

    useEffect(() => {
        const iframe = document.querySelector('[id^="epubjs-view"]');
        if (iframe) iframe.src = iframe.src;
        // iframe.src = iframe.src;
    }, [max])

    const renditionRef = useRef(null)
    const tocRef = useRef(null)
    const locationChanged = epubcifi => {
        if (renditionRef.current && tocRef.current) {
            const { displayed, href } = renditionRef.current.location.start
            const chapter = tocRef.current.find(item => item.href === href)
            setPage(`Page ${displayed.page} of ${displayed.total} in chapter ${chapter ? chapter.label : 'n/a'}`)
            setLocation(epubcifi)
        }
    }
    const tocChanged = (some) => {
        console.log(some)
    }

    return (
        <div onClick={() => setIsReaderModal(false)} className={isReaderModal ? `${s.readerModal} ${s.active}` : s.readerModal}>
            <div onClick={e => e.stopPropagation()} className={isReaderModal ? `${s.readerModalContent} ${s.active}` : s.readerModalContent} style={max ? { width: '100vw', height: '100vh' } : {}}>
                {currentBook && <ReactReader
                    title='Samvel'
                    location={location}
                    locationChanged={locationChanged}
                    tocChanged={tocChanged}
                    // swipeable={true}
                    url={currentBook.epubRU} ////////////////// neeeeeed to correct the language here
                    // styles={ownStyles}
                    // epubOptions={{
                    //     flow: "scrolled",
                    //     manager: "continuous"
                    // }}
                    getRendition={rendition => {
                        renditionRef.current = rendition
                        rendition.themes.register('custom', {
                            img: {
                            },
                            body: {
                                //width: '100vw !important',
                                // 'column-width': '900px !important' // one column

                                // width: max ? '11px !important' : '600px !important'
                            },
                            p: {
                                // color: '#000',
                                color: '#999',
                                'font-family': 'Monaco',
                                'line-height': '2 !important'
                            },
                            span: {
                                // color: '#000',
                                color: '#999',
                                'font-family': 'Monaco',
                                'line-height': '2 !important'
                            }
                        })
                        rendition.themes.select('custom')
                    }}
                    tocChanged={toc => tocRef.current = toc}
                />}
                <div onClick={_ => {
                    // setMax(true);
                    // document.querySelector('[id^="epubjs-view"]').contentDocument.location.reload(true)
                }} style={{ position: 'absolute', bottom: '1rem', right: '1rem', left: '1rem', textAlign: 'center', zIndex: 1 }}>
                    {page}
                </div>
            </div>

        </div>
    )
}

export default Reader