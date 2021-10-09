import React from 'react'
import HomeBodyItem from '../homeBodyItem/HomeBodyItem'
import MainBody from '../mainBody/MainBody'
import s from './HomeBody.module.css'

function HomeBody() {
    return (
        <section className={s.homeBody}>
            <MainBody />
            <HomeBodyItem isWhiteBack={true}/>
            <HomeBodyItem isWhiteBack={false}/>
        </section>
    )
}

export default HomeBody