import React from 'react'
import s from './HomeBodyItem.module.css'
import homeBodyImage from '../../assets/logo/logo.png'
import homeBodyImage1 from '../../assets/logo/logo1.png'
import Slider from '../slider/Slider'

function HomeBodyItem({isBefore}) {
    return (
        <div className={s.homeBodyItem}>
            <div className='container'>
                <div className={s.content}>
                    {isBefore ? <a className={s.linkItem} href='https://www.google.com/'>
                        <img className={s.imageItem} src={homeBodyImage1} alt=''/>
                    </a> : <Slider />}
                    {isBefore ? <Slider /> : <a className={s.linkItem} href='https://www.google.com/'>
                        <img className={s.imageItem} src={homeBodyImage} alt=''/>
                    </a>}
                </div>
            </div>
        </div>
    )
}

export default HomeBodyItem