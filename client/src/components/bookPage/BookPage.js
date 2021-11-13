import React from 'react'
import s from './BookPage.module.css'
import { covers } from '../../utility/BooksData'

function BookPage() {
    return (
        <section className={s.bookPage}>
            <div className='container'>
                <div className={s.content}>
                    <div className={s.mainContent}>
                    <div className={s.image}>
                        <img src={covers[0].cover} alt=''></img>
                    </div>
                    <div className={s.text}>
                        <div className={s.blackBand}>
                            <p className={s.title}>Hent</p>
                            <p className={s.author}>Garegin Nzhde</p>
                        </div>
                        <p>Helvetica Light is an easy-to-read font, with tall and narrow letters, that works well on almost every site.Helvetica Light is an easy-to-read font, with tall and narrow letters, that works well on almost every site.Helvetica Light is an easy-to-read font, with tall and narrow letters, that works well on almost every site.Helvetica Light is an easy-to-read font, with tall and narrow letters, that works well on almost every site.Helvetica Light is an easy-to-read font, with tall and narrow letters, that works well on almost every site.Helvetica Light is an easy-to-read font, with tall and narrow letters, that works well on almost every site.</p>
                    </div>
                        </div>

                    <div className={s.buttons}>
                        <button>Download</button>
                        <button>Read Now</button>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default BookPage