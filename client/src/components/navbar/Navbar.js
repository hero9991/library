import React, { useState } from 'react'
import s from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { FaYoutube, FaTelegram, FaVk, FaSignInAlt, FaSearchPlus, FaHome, FaBook, FaBookReader, FaGlobeEurope, FaRegFileAlt } from 'react-icons/fa'

function Navbar({setIsLoginModal, setIsSignUpModal, isBurgerActive, setIsBurgerActive}) {
    const [isInputActive, setIsInputActive] = useState(true)

    const toggleBurgerMenu = () => {
        if (window.innerWidth < 768) {
            isBurgerActive
                ? document.body.classList.remove('overflow') 
                : document.body.classList.add('overflow')
            setIsBurgerActive(!isBurgerActive)
        }
    }

    return (
        <header>
            <nav className={s.navbar}>
                <div className='container'>
                    <div className={s.tabsWrapper}>
                        <div className={`${s.menu} ${isBurgerActive && s.dropDownMenu}`}>
                            <ul>
                                <li><NavLink exact activeClassName={s.active} onClick={toggleBurgerMenu} to="/">{isBurgerActive && <FaHome className={s.menuIcon}/>}Home</NavLink></li>
                                <li><NavLink exact activeClassName={s.active} onClick={toggleBurgerMenu} to="/catalog/literature">{isBurgerActive && <FaBook className={s.menuIcon}/>}Literature</NavLink></li>
                                <li><NavLink exact activeClassName={s.active} onClick={toggleBurgerMenu} to="/catalog/history">{isBurgerActive && <FaGlobeEurope className={s.menuIcon}/>}History</NavLink></li>
                                <li><NavLink exact activeClassName={s.active} onClick={toggleBurgerMenu} to="/catalog/articles">{isBurgerActive && <FaRegFileAlt className={s.menuIcon}/>}Articles</NavLink></li>
                                <li><NavLink exact activeClassName={s.active} onClick={toggleBurgerMenu} to="/catalog/books">{isBurgerActive && <FaBookReader className={s.menuIcon}/>}My books</NavLink></li>
                            </ul>
                            <button className={`${s.burger} ${isBurgerActive && s.burgerActive}`} onClick={toggleBurgerMenu}>
                                <span></span>
                            </button>
                        </div>
                        <form className={`${s.form} ${isInputActive && s.activeForm}`} onSubmit={e => {e.preventDefault(); alert(1)}}>
                            <input type="text" placeholder="Author or title" />
                        </form>
                        <div className={s.links}>
                            <a href="https://vk.com/patmahayrr" className={`${s.fa} ${s.faVk}`}><FaVk /></a>
                            <a href="https://www.youtube.com/channel/UC6vrmiSj7IzUTqk-qdoabfg" className={`${s.fa} ${s.faYoutube}`}><FaYoutube /></a>
                            <a href="https://tgstat.com/ru/channel/@patmahair" className={`${s.fa} ${s.faTelegram}`}><FaTelegram /></a>
                        </div>
                        <div className={s.authorization}>
                            <button onClick={() => setIsSignUpModal(true)} className={s.singUp}>Sign Up</button>
                            <button onClick={() => setIsLoginModal(true)} className={s.login}>Login</button>
                        </div>
                        {isInputActive ? <FaSignInAlt onClick={() => setIsInputActive(!isInputActive)} className={s.search}/> : <FaSearchPlus onClick={() => setIsInputActive(!isInputActive)} className={s.search}/>}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar