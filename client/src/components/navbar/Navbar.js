import React from 'react'
import s from './Navbar.module.css'
import logoText from '../../assets/logo/logo-text.png'

function Navbar() {
    return (
        <header>
            {/* <div className={s.mainBar}>
                    <div className='container'>
                        <div className={s.topWrapper}>
                            <img className={s.logo} src={logoText} alt="" />
                            <div className={s.links}>
                                <a href="https://vk.com/patmahayrr" className={`${s.fa} ${s.faVk} fa fa-vk`}> </a>
                                <a href="https://tgstat.com/ru/channel/@patmahair" className={`${s.fa} ${s.faTelegram} fa fa-telegram`}> </a>
                                <a href="https://www.youtube.com/channel/UC6vrmiSj7IzUTqk-qdoabfg" className={`${s.fa} ${s.faYoutube} fa fa-youtube`}> </a>
                            </div>
                        </div>
                    </div>
                </div> */}
            <nav className={s.navbar}>
                <div className='container'>
                    <div className={s.tabsWrapper}>
                        <div className={s.menu}>
                            <ul>
                                <li className={s.active}><a className={`${s.nabItem} ${s.active}`} aria-current="page" href="#">Home</a></li>
                                <li className={s.inactive}><a className="nav-link" href="#">Books</a></li>
                                <li className={s.inactive}><a className="nav-link" href="#">History</a></li>
                                <li className={s.inactive}><a className="nav-link" href="#">Art</a></li>
                            </ul>
                        </div>
                        <div className={s.links}>
                            <a href="https://vk.com/patmahayrr" className={`${s.fa} ${s.faVk} fa fa-vk`}> </a>
                            <a href="https://tgstat.com/ru/channel/@patmahair" className={`${s.fa} ${s.faTelegram} fa fa-telegram`}> </a>
                            <a href="https://www.youtube.com/channel/UC6vrmiSj7IzUTqk-qdoabfg" className={`${s.fa} ${s.faYoutube} fa fa-youtube`}> </a>
                        </div>
                        <div className={s.authorization}>
                            <a className={s.signup} href="#" >Sign Up</a>
                            <a className={s.login} href="#" >Login</a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar