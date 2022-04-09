import { useContext } from 'react'
import s from './MainBody.module.css'
import mainImage from '../../assets/logo/main1.png'
import { Link } from 'react-router-dom'
import { UserContext } from '../../App'
import { getButtonUpperText, getReadButtonText, getTitleFirstText, getTitleSecondText } from './translatedText/translatedText'
import { CONTAINER } from '../../utility/Constants'
import { UserContextInterface } from '../../utility/commonTypes'

function MainBody() {
    const { language } = useContext<UserContextInterface>(UserContext)

    return (
        <section className={s.mainBody}>
            <div className={CONTAINER}>
                <div className={s.topContent}>
                    <div className={s.topText}>
                        <h1>ՊԱՏՄԱՀԱՅՐ</h1>
                        <div>
                            <h2>{getTitleFirstText(language)}</h2>
                            <h2>{getTitleSecondText(language)}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className={CONTAINER}>
                <div className={s.bottomContent}>
                    <img src={mainImage} alt='' />
                    <div className={s.bottomText}>
                        <p>{getButtonUpperText(language)}</p>
                        <Link to='/catalog/literature?sort=byPopularity&topic=all'>{getReadButtonText(language)}</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainBody