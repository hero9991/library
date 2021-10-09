import React from 'react'
import s from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { FaYoutube, FaTelegram, FaVk } from 'react-icons/fa'

function Navbar() {
    return (
        <header>
            <nav className={s.navbar}>
                <div className='container'>
                    <div className={s.tabsWrapper}>
                        <div className={s.menu}>
                            <ul>
                                <li><NavLink exact activeClassName={s.active} to="/">Home</NavLink></li>
                                <li><NavLink exact activeClassName={s.active} to="/catalog">Literature</NavLink></li>
                                <li><NavLink exact activeClassName={s.active} to="/history">History</NavLink></li>
                                <li><NavLink exact activeClassName={s.active} to="/articles">Articles</NavLink></li>
                                <li><NavLink exact activeClassName={s.active} to="/myBooks">My books</NavLink></li>
                            </ul>
                        </div>
                        <form onSubmit={e => {e.preventDefault(); alert(1)}}>
                            <input type="text" placeholder="Author or title" />
                        </form>
                        <div className={s.links}>
                            <a href="https://vk.com/patmahayrr" className={`${s.fa} ${s.faVk}`}><FaVk /></a>
                            <a href="https://tgstat.com/ru/channel/@patmahair" className={`${s.fa} ${s.faTelegram}`}><FaTelegram /></a>
                            <a href="https://www.youtube.com/channel/UC6vrmiSj7IzUTqk-qdoabfg" className={`${s.fa} ${s.faYoutube}`}><FaYoutube /></a>
                        </div>
                        <div className={s.authorization}>
                            <NavLink exact className={s.signup} to='/signup' >Sign Up</NavLink>
                            <NavLink exact className={s.login} to='/login' >Login</NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar