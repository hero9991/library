import { memo } from 'react'
import HomeBodyItem from '../homeBodyItem/HomeBodyItem'
import MainBody from '../mainBody/MainBody'
import s from './HomeBody.module.css'

const HomeBody = memo(() => {
    return (
        <section className={s.homeBody}>
            <MainBody />
            <HomeBodyItem isWhiteBack={true}/>
            <HomeBodyItem isWhiteBack={false}/>
        </section>
    )
})

export default HomeBody