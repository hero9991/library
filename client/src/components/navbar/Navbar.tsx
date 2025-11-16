import { useContext, useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react'
import s from './Navbar.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaYoutube, FaTelegramPlane, FaVk, FaFacebookF, FaTimes, FaSearch, FaHome, FaBook, FaBookReader, FaGlobeEurope, FaRegFileAlt } from 'react-icons/fa'
import { UserContext } from '../../App'
import { toast } from 'react-toastify'
import { postSignOut } from './NavbarService'
import { getArticlesTabText, getHistoryTabText, getHomeTabText, getLiteratureTabText, getLogOutTabText, getMyBooksTabText, getSignUpTabText, getLoginTabText, getSearchPlaceholderText } from './translatedText/translatedText'
import { AM, CATALOG_ARTICLE_URL, CATALOG_HISTORY_URL, CATALOG_LITERATURE_URL, CONTAINER, RU, SORT_PARAMETER, TEXT, TOPIC_PARAMETER } from '../../utility/Constants'
import { UserContextInterface } from '../../utility/commonTypes'

const Navbar = ({ setIsLoginModal, setIsSignUpModal }: Props) => {
    const [isBurgerActive, setIsBurgerActive] = useState<boolean>(false)
    const [delay, setDelay] = useState<number | null>(null)
    const [searchValue, setSearchValue] = useState<string>('')
    const { user, setUser, language } = useContext<UserContextInterface>(UserContext)
    const navigate = useNavigate()
    const searchInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isBurgerActive) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isBurgerActive])

    const toggleBurgerMenu = (): void => {
        if (window.innerWidth >= 768) {
            return
        }
        
        if (!isBurgerActive) {
            window.scrollTo(0, 0)
        }
        
        setIsBurgerActive(!isBurgerActive)
    }

    const closeBurgerMenu = (): void => {
        setIsBurgerActive(false)
    }

    const openLoginModal = (): void => {
        setIsLoginModal(true)
        closeBurgerMenu()
    }

    const openSignUpModal = (): void => {
        setIsSignUpModal(true)
        closeBurgerMenu()
    }

    const submitLogout = async (): Promise<void> => {
        try {
            await postSignOut

            localStorage.removeItem('token')
            setUser(null)
            closeBurgerMenu()
            toast.success('Logged out successfully')
        } catch (error) {
            toast.error(`Error ${error}`)
        }
    }

    const searchBooks = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value
        setSearchValue(value)
        
        if (delay) {
            window.clearTimeout(delay)
        }

        if (!value.trim()) {
            return
        }

        const timeoutId = window.setTimeout(() => {
            navigate(`/catalog/search?value=${value}`)
        }, 1500)
        
        setDelay(timeoutId)
    }

    const immidiateSearch = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key !== 'Enter') {
            return
        }

        if (delay) {
            window.clearTimeout(delay)
        }
       
        const value = (e.target as HTMLInputElement).value
        
        if (!value.trim()) {
            return
        }
        
        navigate(`/catalog/search?value=${value}`)
    }

    const clearSearch = (): void => {
        if (delay) {
            window.clearTimeout(delay)
        }
        setSearchValue('')
        if (searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }

    const handleNavLinkClick = (): void => {
        closeBurgerMenu()
    }

    return (
        <header>
            <nav className={s.navbar} role="navigation" aria-label="Main navigation">
                <div className={CONTAINER}>
                    <div className={language === AM
                        ? `${s.tabsWrapper} ${s.AM}`
                        : language === RU
                            ? `${s.tabsWrapper} ${s.RU}`
                            : s.tabsWrapper}>
                        <div className={`${s.menu} ${isBurgerActive ? s.dropDownMenu : undefined}`}>
                            <ul role="menubar">
                                <li role="none">
                                    <NavLink 
                                        role="menuitem"
                                        className={({ isActive }: { isActive: boolean }) => isActive ? s.active : ''} 
                                        onClick={handleNavLinkClick} 
                                        to="/"
                                    >
                                        {isBurgerActive && <FaHome className={s.menuIcon} />}
                                        {getHomeTabText(language)}
                                    </NavLink>
                                </li>
                                <li role="none">
                                    <NavLink 
                                        role="menuitem"
                                        className={({ isActive }: { isActive: boolean }) => isActive ? s.active : ''} 
                                        onClick={handleNavLinkClick} 
                                        to={`${CATALOG_LITERATURE_URL}?${SORT_PARAMETER}byPopularity&${TOPIC_PARAMETER}all`}
                                    >
                                        {isBurgerActive && <FaBook className={s.menuIcon} />}
                                        {getLiteratureTabText(language)}
                                    </NavLink>
                                </li>
                                <li role="none">
                                    <NavLink 
                                        role="menuitem"
                                        className={({ isActive }: { isActive: boolean }) => isActive ? s.active : ''} 
                                        onClick={handleNavLinkClick} 
                                        to={`${CATALOG_HISTORY_URL}?${SORT_PARAMETER}byPopularity&${TOPIC_PARAMETER}all`}
                                    >
                                        {isBurgerActive && <FaGlobeEurope className={s.menuIcon} />}
                                        {getHistoryTabText(language)}
                                    </NavLink>
                                </li>
                                <li role="none">
                                    <NavLink 
                                        role="menuitem"
                                        className={({ isActive }: { isActive: boolean }) => isActive ? s.active : ''} 
                                        onClick={handleNavLinkClick} 
                                        to={`${CATALOG_ARTICLE_URL}?${SORT_PARAMETER}byPopularity&${TOPIC_PARAMETER}all`}
                                    >
                                        {isBurgerActive && <FaRegFileAlt className={s.menuIcon} />}
                                        {getArticlesTabText(language)}
                                    </NavLink>
                                </li>
                                <li role="none">
                                    <NavLink 
                                        role="menuitem"
                                        className={({ isActive }: { isActive: boolean }) => isActive ? s.active : ''} 
                                        onClick={handleNavLinkClick} 
                                        to="/catalog/books"
                                    >
                                        {isBurgerActive && <FaBookReader className={s.menuIcon} />}
                                        {getMyBooksTabText(language)}
                                    </NavLink>
                                </li>
                                {isBurgerActive && (
                                    <>
                                        <li className={s.burgerLinks}>
                                            <a 
                                                href="https://vk.com/patmahayrr" 
                                                className={`${s.fa} ${s.faVk}`} 
                                                target='_blank' 
                                                rel='noreferrer'
                                                aria-label="VK"
                                            >
                                                <FaVk />
                                            </a>
                                            <a 
                                                href="https://t.me/patmahayrr" 
                                                className={`${s.fa} ${s.faTelegram}`} 
                                                target='_blank' 
                                                rel='noreferrer'
                                                aria-label="Telegram"
                                            >
                                                <FaTelegramPlane />
                                            </a>
                                            <a 
                                                href="https://www.youtube.com/channel/UC6vrmiSj7IzUTqk-qdoabfg" 
                                                className={`${s.fa} ${s.faYoutube}`} 
                                                target='_blank' 
                                                rel='noreferrer'
                                                aria-label="YouTube"
                                            >
                                                <FaYoutube />
                                            </a>
                                            <a 
                                                href="https://www.facebook.com/%D5%8A%D5%A1%D5%BF%D5%B4%D5%A1%D5%B0%D5%A1%D5%B5%D6%80%D0%9F%D0%B0%D1%82%D0%BC%D0%B0%D1%85%D0%B0%D0%B9%D1%80Patmahayr-108867618374947" 
                                                className={`${s.fa} ${s.faFacebook}`} 
                                                target='_blank' 
                                                rel='noreferrer'
                                                aria-label="Facebook"
                                            >
                                                <FaFacebookF />
                                            </a>
                                        </li>
                                        {user ? (
                                            <li className={s.burgerAuthButtons}>
                                                <button onClick={submitLogout} className={s.burgerLogout}>
                                                    {getLogOutTabText(language)}
                                                </button>
                                            </li>
                                        ) : (
                                            <li className={s.burgerAuthButtons}>
                                                <button onClick={openSignUpModal} className={s.burgerSignUp}>
                                                    {getSignUpTabText(language)}
                                                </button>
                                                <button onClick={openLoginModal} className={s.burgerLogin}>
                                                    {getLoginTabText(language)}
                                                </button>
                                            </li>
                                        )}
                                    </>
                                )}
                            </ul>
                            
                            <button 
                                className={`${s.burger} ${isBurgerActive ? s.burgerActive : undefined}`} 
                                onClick={toggleBurgerMenu}
                                aria-label={isBurgerActive ? 'Close menu' : 'Open menu'}
                                aria-expanded={isBurgerActive}
                            >
                                <span></span>
                            </button>
                        </div>

                        <form 
                            className={s.form} 
                            onSubmit={e => e.preventDefault()}
                            role="search"
                        >
                            <div className={s.searchInputWrapper}>
                                <input 
                                    ref={searchInputRef}
                                    className={s.input} 
                                    onChange={searchBooks} 
                                    onKeyDown={immidiateSearch}
                                    value={searchValue}
                                    type={TEXT} 
                                    placeholder={getSearchPlaceholderText(language)}
                                    aria-label="Search books"
                                />
                                <FaSearch className={s.searchIcon} />
                                {searchValue && (
                                    <button 
                                        type="button" 
                                        className={s.clearButton} 
                                        onClick={clearSearch}
                                        aria-label="Clear search"
                                    >
                                        <FaTimes />
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className={s.links}>
                            <a 
                                href="https://vk.com/patmahayrr" 
                                className={`${s.fa} ${s.faVk}`} 
                                target='_blank' 
                                rel='noreferrer'
                                aria-label="VK"
                            >
                                <FaVk />
                            </a>
                            <a 
                                href="https://t.me/patmahayrr" 
                                className={`${s.fa} ${s.faTelegram}`} 
                                target='_blank' 
                                rel='noreferrer'
                                aria-label="Telegram"
                            >
                                <FaTelegramPlane />
                            </a>
                            <a 
                                href="https://www.youtube.com/channel/UC6vrmiSj7IzUTqk-qdoabfg" 
                                className={`${s.fa} ${s.faYoutube}`} 
                                target='_blank' 
                                rel='noreferrer'
                                aria-label="YouTube"
                            >
                                <FaYoutube />
                            </a>
                            <a 
                                href="https://www.facebook.com/%D5%8A%D5%A1%D5%BF%D5%B4%D5%A1%D5%B0%D5%A1%D5%B5%D6%80%D0%9F%D0%B0%D1%82%D0%BC%D0%B0%D1%85%D0%B0%D0%B9%D1%80Patmahayr-108867618374947" 
                                className={`${s.fa} ${s.faFacebook}`} 
                                target='_blank' 
                                rel='noreferrer'
                                aria-label="Facebook"
                            >
                                <FaFacebookF />
                            </a>
                        </div>

                        <div className={s.desktopAuth}>
                            {user
                                ? (
                                    <div className={`${s.authorization} ${s.logout}`}>
                                        <button onClick={submitLogout} className={s.singUp}>
                                            {getLogOutTabText(language)}
                                        </button>
                                    </div>
                                )
                                : (
                                    <div className={s.authorization}>
                                        <button onClick={openSignUpModal} className={s.singUp}>
                                            {getSignUpTabText(language)}
                                        </button>
                                        <button onClick={openLoginModal} className={s.login}>
                                            {getLoginTabText(language)}
                                        </button>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </nav>
            {isBurgerActive && <div className={s.overlay} onClick={closeBurgerMenu} />}
        </header>
    )
}

interface Props {
	setIsLoginModal: any
    setIsSignUpModal: any
}

export default Navbar