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

const Reader = ({ isReaderModal, setIsReaderModal }) => {
    

    const [page, setPage] = useState('')
    const [location, setLocation] = useState(null)
    const [max, setMax] = useState(false)

    useEffect(() => {
        console.log(max)
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
                <ReactReader
                    title='Samvel'
                    location={location}
                    locationChanged={locationChanged}
                    tocChanged={tocChanged}
                    // swipeable={true}
                    url={book}
                    styles={ownStyles}
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
                />
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



// import { useRef, useState } from 'react'
// import {
//     EpubViewer,
//     ReactEpubViewer
// } from 'react-epub-viewer'
// import s from './Reader.module.css'
// import book from '../../assets/BooksItem/Самвел1.epub'
// import useMenu from './useMenu'

// const Reader = ({ isReaderModal, setIsReaderModal }) => {
//     const viewerRef = useRef(null);
//     const navRef = useRef(null);
//     const optionRef = useRef(null);
//     const learningRef = useRef(null);

//     const [currentLocation, setCurrentLocation] = useState(0)
//     const [isContextMenu, setIsContextMenu] = useState(false)
//     const [bookStyle, setBookStyle] = useState({
//         fontFamily: "Origin",
//         fontSize: 18,
//         lineHeight: 1.4,
//         marginHorizontal: 15,
//         marginVertical: 5,
//     })
//     const [bookOption, setBookOption] = useState({
//         flow: "paginated",
//         resizeOnOrientationChange: true,
//         spread: "auto",
//     })

//     const [navControl, onNavToggle] = useMenu(navRef, 300);
//     const [optionControl, onOptionToggle, emitEvent] = useMenu(optionRef, 300);
//     const [learningControl, onLearningToggle] = useMenu(learningRef, 300);

//     const onLocationChange = (loc) => {
//         console.log(123)
//         if (!viewerRef.current) return;
//         viewerRef.current.setLocation(loc);
//     }

//     const [max, setMax] = useState(false)

//     return (
//         <div onClick={() => setIsReaderModal(false)} className={isReaderModal ? `${s.readerModal} ${s.active}` : s.readerModal}>
//             <div onClick={e => { e.stopPropagation() }} className={isReaderModal ? `${s.readerModalContent} ${s.active}` : s.readerModalContent} style={max ? { width: '100vw', height: '100vh' } : {}}>

//                 <ReactEpubViewer
//                     url={book}
//                     ref={viewerRef}
//                 />
//             </div>
//             <div onClick={e => { e.stopPropagation(); setCurrentLocation(currentLocation + 1); onLocationChange(currentLocation); }} className={s.some}>

//             </div>
//         </div>
//     );
// }

// export default Reader











// import { useState, useRef } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { Provider } from 'react-redux'
// import { ReactEpubViewer } from 'react-epub-viewer'
// // containers
// import Header from 'containers/Header'
// import Footer from 'containers/Footer'
// import Nav from 'containers/menu/Nav'
// import Option from 'containers/menu/Option'
// import Learning from 'containers/menu/Note'
// import ContextMenu from 'containers/commons/ContextMenu'
// import Snackbar from 'containers/commons/Snackbar'
// // components
// import ViewerWrapper from 'components/commons/ViewerWrapper'
// // slices
// import store from 'slices'
// import { updateBook, updateCurrentPage, updateToc } from 'slices/book'
// // hooks
// import useMenu from 'lib/hooks/useMenu'
// import useHighlight from 'lib/hooks/useHighlight'
// // styles
// import 'lib/styles/readerStyle.css'
// import viewerLayout from 'lib/styles/viewerLayout'
// // types
// import { RootState } from 'slices'
// import { ViewerRef } from 'types'
// import Book, { BookStyle, BookOption } from 'types/book'
// import Page from 'types/page'
// import Toc from 'types/toc'

// import book from '../../assets/BooksItem/Самвел.epub'
// import s from './Reader.module.css'

// const Reader = ({ isReaderModal, setIsReaderModal }) => {
//     const dispatch = useDispatch();
//     const currentLocation = useSelector < RootState > (state => state.book.currentLocation);

//     const viewerRef = useRef < ViewerRef | any > (null);
//     const navRef = useRef < HTMLDivElement | null > (null);
//     const optionRef = useRef < HTMLDivElement | null > (null);
//     const learningRef = useRef < HTMLDivElement | null > (null);

//     const [isContextMenu, setIsContextMenu] = useState < boolean > (false);

//     const [bookStyle, setBookStyle] = useState < BookStyle > ({
//         fontFamily: 'Origin',
//         fontSize: 18,
//         lineHeight: 1.4,
//         marginHorizontal: 15,
//         marginVertical: 5
//     });
//     const [max, setMax] = useState(false)

//     const [bookOption, setBookOption] = useState < BookOption > ({
//         flow: "paginated",
//         resizeOnOrientationChange: true,
//         spread: "auto"
//     });

//     const [navControl, onNavToggle] = useMenu(navRef, 300.);
//     const [optionControl, onOptionToggle, emitEvent] = useMenu(optionRef, 300);
//     const [learningControl, onLearningToggle] = useMenu(learningRef, 300);
//     const {
//         selection,
//         onSelection,
//         onClickHighlight,
//         onAddHighlight,
//         onRemoveHighlight,
//         onUpdateHighlight
//     } = useHighlight(viewerRef, setIsContextMenu, bookStyle, bookOption.flow);



//     /**
//      * Change Epub book information
//      * @param book Epub Book Info
//      */
//     const onBookInfoChange = (book) => dispatch(updateBook(book));

//     /**
//        * Change Epub location
//        * @param loc epubCFI or href
//        */
//     const onLocationChange = (loc) => {
//         if (!viewerRef.current) return;
//         viewerRef.current.setLocation(loc);
//     }

//     /**
//      * Move page
//      * @param type Direction
//      */
//     const onPageMove = (type) => {
//         const node = viewerRef.current;
//         if (!node || !node.prevPage || !node.nextPage) return;

//         type === "PREV" && node.prevPage();
//         type === "NEXT" && node.nextPage();
//     };

//     /**
//      * Set toc
//      * @param toc Table of Epub contents
//      */
//     const onTocChange = (toc) => dispatch(updateToc(toc));

//     /** 
//      * Set Epub viewer styles
//      * @param bokkStyle_ viewer style
//      */
//     const onBookStyleChange = (bookStyle_) => setBookStyle(bookStyle_);

//     /** 
//      * Set Epub viewer options
//      * @param bookOption_ viewer option
//      */
//     const onBookOptionChange = (bookOption_) => setBookOption(bookOption_);

//     /**
//      * Change current page
//      * @param page Epub page
//      */
//     const onPageChange = (page) => dispatch(updateCurrentPage(page));

//     /** 
//      * ContextMenu on 
//      * @param cfiRange CfiRange
//      */
//     const onContextMenu = (cfiRange) => {
//         const result = onSelection(cfiRange);
//         setIsContextMenu(result);
//     }

//     /** ContextMenu off */
//     const onContextmMenuRemove = () => setIsContextMenu(false);



//     return (
//         <div onClick={() => setIsReaderModal(false)} className={isReaderModal ? `${s.readerModal} ${s.active}` : s.readerModal}>
//             <div onClick={e => e.stopPropagation()} className={isReaderModal ? `${s.readerModalContent} ${s.active}` : s.readerModalContent} style={max ? { width: '100vw', height: '100vh' } : {}}>
//                 <ViewerWrapper>
//                     <Header
//                         onNavToggle={onNavToggle}
//                         onOptionToggle={onOptionToggle}
//                         onLearningToggle={onLearningToggle}
//                     />

//                     <ReactEpubViewer
//                         url={book}
//                         viewerLayout={viewerLayout}
//                         viewerStyle={bookStyle}
//                         viewerOption={bookOption}
//                         onBookInfoChange={onBookInfoChange}
//                         onPageChange={onPageChange}
//                         onTocChange={onTocChange}
//                         onSelection={onContextMenu}
//                         ref={viewerRef}
//                     />

//                     <Footer
//                         title={currentLocation.chapterName}
//                         nowPage={currentLocation.currentPage}
//                         totalPage={currentLocation.totalPage}
//                         onPageMove={onPageMove}
//                     />
//                 </ViewerWrapper>

//                 <Nav
//                     control={navControl}
//                     onToggle={onNavToggle}
//                     onLocation={onLocationChange}
//                     ref={navRef}
//                 />

//                 <Option
//                     control={optionControl}
//                     bookStyle={bookStyle}
//                     bookOption={bookOption}
//                     bookFlow={bookOption.flow}
//                     onToggle={onOptionToggle}
//                     emitEvent={emitEvent}
//                     onBookStyleChange={onBookStyleChange}
//                     onBookOptionChange={onBookOptionChange}
//                     ref={optionRef}
//                 />

//                 <Learning
//                     control={learningControl}
//                     onToggle={onLearningToggle}
//                     onClickHighlight={onClickHighlight}
//                     emitEvent={emitEvent}
//                     viewerRef={viewerRef}
//                     ref={learningRef}
//                 />

//                 <ContextMenu
//                     active={isContextMenu}
//                     viewerRef={viewerRef}
//                     selection={selection}
//                     onAddHighlight={onAddHighlight}
//                     onRemoveHighlight={onRemoveHighlight}
//                     onUpdateHighlight={onUpdateHighlight}
//                     onContextmMenuRemove={onContextmMenuRemove}
//                 />

//                 <Snackbar />
//             </div>
//         </div>);
// }


// export default Reader

