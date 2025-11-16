import { useContext, useState } from 'react'
import s from './Navbar.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaYoutube, FaTelegramPlane, FaVk, FaFacebookF, FaSignInAlt, FaSearchPlus, FaSearch, FaHome, FaBook, FaBookReader, FaGlobeEurope, FaRegFileAlt } from 'react-icons/fa'
import { UserContext } from '../../App'
import { toast } from 'react-toastify'
import { postSignOut } from './NavbarService'
import { getArticlesTabText, getHistoryTabText, getHomeTabText, getLiteratureTabText, getLogOutTabText, getMyBooksTabText, getSignUpTabText, getLoginTabText, getSearchPlaceholderText } from './translatedText/translatedText'
import { AM, CATALOG_ARTICLE_URL, CATALOG_HISTORY_URL, CATALOG_LITERATURE_URL, CONTAINER, RU, SORT_PARAMETER, TEXT, TOPIC_PARAMETER } from '../../utility/Constants'
import { UserContextInterface } from '../../utility/commonTypes'

const Navbar = ({ setIsLoginModal, setIsSignUpModal }: Props) => {
    const [isInputActive, setIsInputActive] = useState<boolean>(true)
    const [isBurgerActive, setIsBurgerActive] = useState<boolean>(false)
    const [delay, setDelay] = useState<any>(null)
    const { user, setUser, language } = useContext<UserContextInterface>(UserContext)
    const navigate = useNavigate()

    const toggleBurgerMenu = () => {
        window.scrollTo(0, 0)

        if (window.innerWidth >= 768) return
        setIsBurgerActive(!isBurgerActive)
    }

    const toggleInput = () => setIsInputActive(!isInputActive)
    const openLoginModal = () => setIsLoginModal(true)
    const openSignUpModal = () => setIsSignUpModal(true)

    const submitLogout = async () => {
        try {
            await postSignOut

            localStorage.removeItem('token')
            setUser(null)
        } catch (error) {
            toast.error(`Error ${error}`)
        }
    }

    const searchBooks = (e: any) => {        
        window.clearTimeout(delay)

        if (!e.target.value) return

        setDelay(
            window.setTimeout(() => {
                navigate(`/catalog/search?value=${e.target.value}`)
            }, 1500)
        )
    }

    const immidiateSearch = (e: any) => {
        if (e.key !== 'Enter') return

        window.clearTimeout(delay)
       
        if (!e.target.value) return
        
        navigate(`/catalog/search?value=${e.target.value}`)
    }

    const resetInput = (e: any) => {
        window.clearTimeout(delay)
        e.target.value = '';
    }

    return (
        <header>
            <nav className={s.navbar}>
                <div className={CONTAINER}>
                    <div className={language === AM
                        ? `${s.tabsWrapper} ${s.AM}`
                        : language === RU
                            ? `${s.tabsWrapper} ${s.RU}`
                            : s.tabsWrapper}>
                        <div className={`${s.menu} ${isBurgerActive ? s.dropDownMenu : undefined}`}>
                            <ul>
                                <li><NavLink className={({ isActive }: { isActive: boolean }) => isActive ? s.active : ''} onClick={toggleBurgerMenu} to="/">{isBurgerActive && <FaHome className={s.menuIcon} />}{getHomeTabText(language)}</NavLink></li>
                                <li><NavLink className={({ isActive }: { isActive: boolean }) => isActive ? s.active : ''} onClick={toggleBurgerMenu} to={`${CATALOG_LITERATURE_URL}?${SORT_PARAMETER}byPopularity&${TOPIC_PARAMETER}all`}>{isBurgerActive && <FaBook className={s.menuIcon} />}{getLiteratureTabText(language)}</NavLink></li>
                                <li><NavLink className={({ isActive }: { isActive: boolean }) => isActive ? s.active : ''} onClick={toggleBurgerMenu} to={`${CATALOG_HISTORY_URL}?${SORT_PARAMETER}byPopularity&${TOPIC_PARAMETER}all`}>{isBurgerActive && <FaGlobeEurope className={s.menuIcon} />}{getHistoryTabText(language)}</NavLink></li>
                                <li><NavLink className={({ isActive }: { isActive: boolean }) => isActive ? s.active : ''} onClick={toggleBurgerMenu} to={`${CATALOG_ARTICLE_URL}?${SORT_PARAMETER}byPopularity&${TOPIC_PARAMETER}all`}>{isBurgerActive && <FaRegFileAlt className={s.menuIcon} />}{getArticlesTabText(language)}</NavLink></li>
                                <li><NavLink className={({ isActive }: { isActive: boolean }) => isActive ? s.active : ''} onClick={toggleBurgerMenu} to="/catalog/books">{isBurgerActive && <FaBookReader className={s.menuIcon} />}{getMyBooksTabText(language)}</NavLink></li>
                                {isBurgerActive && <li className={s.burgerLinks}>
                                    <a href="https://vk.com/patmahayrr" className={`${s.fa} ${s.faVk}`} target='_blank' rel='noreferrer'><FaVk /></a>
                                    <a href="https://t.me/patmahayrr" className={`${s.fa} ${s.faTelegram}`} target='_blank' rel='noreferrer'><FaTelegramPlane /></a>
                                    <a href="https://www.youtube.com/channel/UC6vrmiSj7IzUTqk-qdoabfg" className={`${s.fa} ${s.faYoutube}`} target='_blank' rel='noreferrer'><FaYoutube /></a>
                                    <a href="https://www.facebook.com/%D5%8A%D5%A1%D5%BF%D5%B4%D5%A1%D5%B0%D5%A1%D5%B5%D6%80%D0%9F%D0%B0%D1%82%D0%BC%D0%B0%D1%85%D0%B0%D0%B9%D1%80Patmahayr-108867618374947" className={`${s.fa} ${s.faFacebook}`} target='_blank' rel='noreferrer'><FaFacebookF /></a>
                                </li>}
                            </ul>
                            
                            <button className={`${s.burger} ${isBurgerActive ? s.burgerActive : undefined}`} onClick={toggleBurgerMenu}>
                                <span></span>
                            </button>
                        </div>

                        <form className={`${s.form} ${isInputActive ? s.activeForm : undefined}`} onSubmit={e => e.preventDefault()}>
                            <input onChange={searchBooks} onKeyDown={immidiateSearch} onBlur={resetInput} type={TEXT} placeholder={getSearchPlaceholderText(language)} />
                            <FaSearch />
                        </form>

                        <div className={s.links}>
                            <a href="https://vk.com/patmahayrr" className={`${s.fa} ${s.faVk}`} target='_blank' rel='noreferrer'><FaVk /></a>
                            <a href="https://t.me/patmahayrr" className={`${s.fa} ${s.faTelegram}`} target='_blank' rel='noreferrer'><FaTelegramPlane /></a>
                            <a href="https://www.youtube.com/channel/UC6vrmiSj7IzUTqk-qdoabfg" className={`${s.fa} ${s.faYoutube}`} target='_blank' rel='noreferrer'><FaYoutube /></a>
                            <a href="https://www.facebook.com/%D5%8A%D5%A1%D5%BF%D5%B4%D5%A1%D5%B0%D5%A1%D5%B5%D6%80%D0%9F%D0%B0%D1%82%D0%BC%D0%B0%D1%85%D0%B0%D0%B9%D1%80Patmahayr-108867618374947" className={`${s.fa} ${s.faFacebook}`} target='_blank' rel='noreferrer'><FaFacebookF /></a>
                        </div>

                        {user
                            ? (<div className={`${s.authorization} ${s.logout}`}>
                                <button onClick={submitLogout} className={s.singUp}>{getLogOutTabText(language)}</button>
                            </div>)
                            : (<div className={s.authorization}>
                                <button onClick={openSignUpModal} className={s.singUp}>{getSignUpTabText(language)}</button>
                                <button onClick={openLoginModal} className={s.login}>{getLoginTabText(language)}</button>
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

interface Props {
	setIsLoginModal: any
    setIsSignUpModal: any
}

export default Navbar