import React from 'react'
import BookItem from '../bookItem/BookItem'
import s from './Books.module.css'
import { covers } from '../../utility/BooksData'

function Books() {
    return (
        <section className={s.books}>
            {covers.map((item, index) => {
                if (index % 2) {
                    return <BookItem second={true} bookItem={item}/>
                } else return <BookItem second={false} bookItem={item}/>
            })}
        </section>
    )
}

export default Books