import React, { useContext, useState } from 'react'
import s from './Navbar.module.css'
import { NavLink, useHistory } from 'react-router-dom'
import { FaYoutube, FaTelegram, FaVk, FaSignInAlt, FaSearchPlus, FaSearch, FaHome, FaBook, FaBookReader, FaGlobeEurope, FaRegFileAlt } from 'react-icons/fa'
import { getBooksBySearch, signOut } from '../../utility/AxiosService'
import { UserContext } from '../../App'
import { toast } from 'react-toastify'
import { postSignOut } from './NavbarService'
import { getArticlesTab, getHistoryTab, getHomeTab, getLiteratureTab, getLogOutTab, getMyBooksTab, getSignUpTab, getLoginTab, getSearchPlaceholder } from './translatedText/translatedText'
import { CATALOG_HISTORY_URL, CATALOG_LITERATURE_URL, CONTAINER, SORT_PARAMETER, TEXT, TOPIC_PARAMETER } from '../../utility/Constants'

function Navbar({ setIsLoginModal, setIsSignUpModal }) {
    const [isInputActive, setIsInputActive] = useState(true)
    const [isBurgerActive, setIsBurgerActive] = useState(false)
    const [delay, setDelay] = useState(false)
    const { user, setUser, language } = useContext(UserContext)
    const history = useHistory()

    const toggleBurgerMenu = () => {
        window.scrollTo(0, 0)

        if (window.innerWidth >= 768) return
        setIsBurgerActive(!isBurgerActive)
    }

    const toggleInput = () => setIsInputActive(!isInputActive)
    const openLoginModal = () => setIsLoginModal(true)
    const openSignUpModal = () => setIsSignUpModal(true)

    const submitLogout = async () => {
        await postSignOut

        localStorage.removeItem('token')
        setUser(null)
    }

    const searchBooks = e => {
        clearTimeout(delay)

        setDelay(
            setTimeout(() => {
                history.push(`/catalog/search?value=${e.target.value}`)
            }, 1500)
        )
    }

    return (
        <header>
            <nav className={s.navbar}>
                <div className={CONTAINER}>
                    <div className={s.tabsWrapper}>
                        <div className={`${s.menu} ${isBurgerActive ? s.dropDownMenu : undefined}`}>
                            <ul>
                                <li><NavLink exact activeClassName={s.active} onClick={toggleBurgerMenu} to="/">{isBurgerActive && <FaHome className={s.menuIcon} />}{getHomeTab(language)}</NavLink></li>
                                <li><NavLink exact activeClassName={s.active} onClick={toggleBurgerMenu} to={`${CATALOG_LITERATURE_URL}?${SORT_PARAMETER}byPopularity&${TOPIC_PARAMETER}all`}>{isBurgerActive && <FaBook className={s.menuIcon} />}{getLiteratureTab(language)}</NavLink></li>
                                <li><NavLink exact activeClassName={s.active} onClick={toggleBurgerMenu} to={`${CATALOG_HISTORY_URL}?${SORT_PARAMETER}byPopularity&${TOPIC_PARAMETER}all`}>{isBurgerActive && <FaGlobeEurope className={s.menuIcon} />}{getHistoryTab(language)}</NavLink></li>
                                <li><NavLink exact activeClassName={s.active} onClick={toggleBurgerMenu} to="/catalog/articles">{isBurgerActive && <FaRegFileAlt className={s.menuIcon} />}{getArticlesTab(language)}</NavLink></li>
                                <li><NavLink exact activeClassName={s.active} onClick={toggleBurgerMenu} to="/catalog/books">{isBurgerActive && <FaBookReader className={s.menuIcon} />}{getMyBooksTab(language)}</NavLink></li>
                            </ul>
                            <button className={`${s.burger} ${isBurgerActive ? s.burgerActive : undefined}`} onClick={toggleBurgerMenu}>
                                <span></span>
                            </button>
                        </div>

                        <form className={`${s.form} ${isInputActive ? s.activeForm : undefined}`} onSubmit={e => e.preventDefault()}>
                            <input onChange={e => searchBooks(e)} type={TEXT} placeholder={getSearchPlaceholder(language)} />
                            <FaSearch />
                        </form>

                        <div className={s.links}>
                            <a href="https://vk.com/patmahayrr" className={`${s.fa} ${s.faVk}`}><FaVk /></a>
                            <a href="https://www.youtube.com/channel/UC6vrmiSj7IzUTqk-qdoabfg" className={`${s.fa} ${s.faYoutube}`}><FaYoutube /></a>
                            <a href="https://tgstat.com/ru/channel/@patmahair" className={`${s.fa} ${s.faTelegram}`}><FaTelegram /></a>
                        </div>

                        {user
                            ? (<div className={`${s.authorization} ${s.logout}`}>
                                <button onClick={submitLogout} className={s.singUp}>{getLogOutTab(language)}</button>
 
                            </div>)
                            : (<div className={s.authorization}>
                                <button onClick={openSignUpModal} className={s.singUp}>{getSignUpTab(language)}</button>
                                <button onClick={openLoginModal} className={s.login}>{getLoginTab(language)}</button>
                            </div>)}

                        {isInputActive
                            ? <FaSignInAlt onClick={toggleInput} className={s.search} />
                            : <FaSearchPlus onClick={toggleInput} className={s.search} />}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar