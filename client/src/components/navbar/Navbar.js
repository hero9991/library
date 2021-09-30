import React from 'react'
import s from './Navbar.module.css'
import logoText from '../../assets/logo-text.png'

function Navbar() {
    return (
        <div className={s.main}>
            <header>
                <div className={s.mainBar}>
                    <div className={s.container}>
                        <div className={s.topWrapper}>
                            <img className={s.logo} src={logoText} alt="" />
                            <div className={s.links}>
                                <a href="https://vk.com/patmahayrr" className={`${s.fa} ${s.faVk} fa fa-vk`}></a>
                                <a href="https://tgstat.com/ru/channel/@patmahair" className={`${s.fa} ${s.faTelegram} fa fa-telegram`}>tg</a>
                                <a href="https://www.youtube.com/channel/UC6vrmiSj7IzUTqk-qdoabfg" className={`${s.fa} ${s.faYoutube} fa fa-youtube`}></a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <a className="navbar-brand" href="#">Labrary</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Sort By
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#">Name</a>
                                        <a className="dropdown-item" href="#">Author</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Popularity</a>
                                    </div>
                                </li>
                            </ul>
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                <button id="btn" className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav> */}
            </header>
        </div>)
}

export default Navbar