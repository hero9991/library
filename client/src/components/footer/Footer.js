import React, { useContext, useState } from 'react'
import s from './Footer.module.css'
import ReactCountryFlag from "react-country-flag"
import { UserContext } from '../../App'
import { getChooseLanguageText, getSupportText, getRulesText } from './translatedText/translatedText'
import Rules from './Rules/Rules.js'


function Footer({ setlanguage }) {
    const { language } = useContext(UserContext)
    const [isRulesModal, setIsRulesModal] = useState(false)

    const openPopup = () => setIsRulesModal(true)

    return (
        <section className={s.footer}>
            <Rules isRulesModal={isRulesModal} setIsRulesModal={setIsRulesModal}/>

            <div className={`container ${s.footerWrapper}`}>
                <div onClick={openPopup}>{getRulesText(language)}</div>
                <div>{getSupportText(language)} vanyakubarin@mail.ru</div>
                <div className={s.countryIcons}>
                    {getChooseLanguageText(language)}
                    <ReactCountryFlag onClick={() => setlanguage('AM')} countryCode="AM" style={{ fontSize: '2.5em' }} />
                    <ReactCountryFlag onClick={() => setlanguage('RU')} countryCode="RU" style={{ fontSize: '2.5em' }} />
                    <ReactCountryFlag onClick={() => setlanguage('EN')} countryCode="GB" style={{ fontSize: '2.5em' }} />
                </div>
            </div>
        </section>
    )
}

export default Footer