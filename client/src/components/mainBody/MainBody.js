import React from 'react'
import s from './MainBody.module.css'
import mainImage from '../../assets/logo/main1.png'
import { Link } from 'react-router-dom'

function MainBody() {
    return (
        <section className={s.mainBody}>
            <div className='container'>
                <div className={s.content}>
                    <img src={mainImage} alt=''/>
                    <div className={s.textContent}>
                        <h1>ՊԱՏՄԱՀԱՅՐ</h1>
                        <h2>History of our land</h2>
                        <h2>Roots of our literature</h2>
                        <div className={s.whiteTextContent}>
                            <p>PDF Version is Available</p>
                            <Link to='/catalog'>Read now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainBody