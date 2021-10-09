import React from 'react'
import s from './HomeBodyItem.module.css'
import Slider from '../slider/Slider'

function HomeBodyItem({isWhiteBack}) {
    return (
        <section className={`${s.homeBodyItem} ${isWhiteBack ? s.whiteBack : s.blackBack}`}>
            <div className='container'>
                <Slider isBlackFont={isWhiteBack}/>
            </div>
        </section>
    )
}

export default HomeBodyItem