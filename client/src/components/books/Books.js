import React from 'react'
import BookItem from '../bookItem/BookItem'
import s from './Books.module.css'
import { covers } from '../../utility/BooksData'
import { NavLink } from 'react-router-dom'

function Books() {
    return (
        <section className={s.books}>
            <div className='container'>
                <div className={s.sortingWrapper}>
                    <span>Sort:</span>
                    <div className={s.sorting}>
                        <NavLink exact activeClassName={s.active} to='/catalog/literature'>By popularity</NavLink>
                        <NavLink exact activeClassName={s.active} to='/catalog1'>By rating</NavLink>
                        <NavLink exact activeClassName={s.active} to='/catalog2'>By alphabet</NavLink>
                    </div>
                </div>
                {covers.map((item, index) => index % 2
                    ? <BookItem second={true} bookItem={item} key={index} />
                    : <BookItem second={false} bookItem={item} key={index} />
                )}
                <button className={s.viewMoreButton}>View more</button>
            </div>
        </section>
    )
}

export default Books