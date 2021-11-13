import React from 'react'
import s from './Footer.module.css'

function Footer() {
    return (
        <section className={s.footer}>
            <div className={`container ${s.footerWrapper}`}>
                <div>Rules: <a href='/'>some adress</a></div>
                <div>Support: vanyakubarin@mail.ru / +7(901)-199-98-24</div>
                <div>About: please, choose the language</div>
            </div>
        </section>
    )
}

export default Footer