import React from 'react'
import s from './Navbar.module.css'
import logoText from '../../assets/logo/logo-text.png'

function Navbar() {
    return (
        <div className={s.main}>
            <header>
                <div className={s.mainBar}>
                    <div className='container'>
                        <div className={s.topWrapper}>
                            <img className={s.logo} src={logoText} alt="" />
                            <div className={s.links}>
                                <a href="https://vk.com/patmahayrr" className={`${s.fa} ${s.faVk} fa fa-vk`}> </a>
                                <a href="https://tgstat.com/ru/channel/@patmahair" className={`${s.fa} ${s.faTelegram} fa fa-telegram`}>tg</a>
                                <a href="https://www.youtube.com/channel/UC6vrmiSj7IzUTqk-qdoabfg" className={`${s.fa} ${s.faYoutube} fa fa-youtube`}> </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.bottomBar}>
                    <div className='container'>
                        <div className={s.tabsWrapper}>
                            <div className={s.tabs}>
                                <ul className={s.navItems}>
                                    <li className={s.nabItem}>
                                        <a className={`${s.nabItem} ${s.active}`} aria-current="page" href="#">Home</a>
                                    </li>
                                    <li className={s.nabItem}>
                                        <a className="nav-link" href="#">Features</a>
                                    </li>
                                    <li className={s.nabItem}>
                                        <a className="nav-link" href="#">Pricing</a>
                                    </li>
                                    <li className={s.nabItem}>
                                        <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                                    </li>
                                </ul>
                            </div>
                            <div className={s.authorization}>
                                <a className={s.signup} href="#" >Sign Up</a>
			                    <a className={s.login} href="#" >Login</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>)
}

export default Navbar