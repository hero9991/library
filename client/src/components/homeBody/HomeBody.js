import React from 'react'
import HomeBodyItem from '../homeBodyItem/HomeBodyItem'
import s from './HomeBody.module.css'

function HomeBody() {
    return (
        <section className={s.homeBody}>
            <HomeBodyItem isBefore={false}/>
            <HomeBodyItem isBefore={true}/>
        </section>
    )
}

export default HomeBody