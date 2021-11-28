import React, { useState } from 'react'
import s from './BookPage.module.css'
import Reader from '../reader/Reader'

function BookPage() {
    const [isReaderModal, setIsReaderModal] = useState(false)

    return (
        <section className={s.bookPage}>
            <div className='container'>
                <div className={s.content}>
                    <div className={s.mainContent}>
                    <div className={s.image}>
                        <img src={require('../../assets/booksCover/Gikor.jpeg').default} alt=''></img>
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
                        <button onClick={() => setIsReaderModal(true)}>Read Now</button>
                    </div>
                {/* <iframe title='book' src={book} width="100%" height="500px"></iframe> */}
                {/* <embed src={book} type='application/pdf' position='absolute' width='100%' height='660px'></embed> */}
                <Reader isReaderModal={isReaderModal} setIsReaderModal={setIsReaderModal}/>
             </div>

            </div>
        </section>
    )
}

export default BookPage