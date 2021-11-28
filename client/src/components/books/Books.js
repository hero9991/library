import React, { useEffect, useState } from 'react'
import BookItem from '../bookItem/BookItem'
import s from './Books.module.css'
import { NavLink } from 'react-router-dom'

function Books() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        fetch('/books', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => setBooks(data))
    }, []) //temp changes

    useEffect(() => {
        const stickBackground = () => {
            if (document.body.offsetHeight - window.innerHeight - window.scrollY <= 70) {
                document.querySelector(('.' + s.books)).style.backgroundPosition = 'right 0 bottom ' + (window.innerHeight + window.scrollY + 70 - document.body.offsetHeight) + 'px'
            } else if (document.querySelector(('.' + s.books)).style.backgroundPosition !== 'right bottom') {
                document.querySelector(('.' + s.books)).style.backgroundPosition = 'right bottom'
            }
        }
        window.addEventListener('scroll', stickBackground)
        return () => window.removeEventListener('scroll', stickBackground)
    }, []);

    return (
        <section className={s.books}>
            <div className={s.sortingWrapper}>
                <div className={`${s.sortingScroll} container`}>
                    <div className={s.sorting}>
                        <NavLink exact activeClassName={s.activeOrder} to='/catalog/literature'>By popularity</NavLink>
                        <NavLink exact activeClassName={s.activeOrder} to='/catalog1'>By rating</NavLink>
                        <NavLink exact activeClassName={s.activeOrder} to='/catalog2'>By alphabet</NavLink>
                    </div>
                    <div className={s.sorting}>
                        <NavLink exact activeClassName={s.activeTopic} to='/catalog/literature'>All books</NavLink>
                        <NavLink exact activeClassName={s.activeTopic} to='/catalog/literature/1'>Prehistoric era</NavLink>
                        <NavLink exact activeClassName={s.activeTopic} to='/catalog1'>Urartu</NavLink>
                        <NavLink exact activeClassName={s.activeTopic} to='/catalog2'>Ancient Armenia</NavLink>
                        <NavLink exact activeClassName={s.activeTopic} to='/catalog2'>Meideval Armenia</NavLink>
                        <NavLink exact activeClassName={s.activeTopic} to='/catalog2'>National movement</NavLink>
                    </div>
                </div>
            </div>
            <div className='container'>
                {books.map((item, index) => index % 2
                    ? <BookItem second={true} bookItem={item} key={index} />
                    : <BookItem second={false} bookItem={item} key={index} />
                )}
                <button className={s.viewMoreButton}>View more</button>
            </div>
        </section>
    )
}

export default Books