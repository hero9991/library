import React, { memo, useContext, useState } from 'react'
import s from './Footer.module.css'
import ReactCountryFlag from "react-country-flag"
import { UserContext } from '../../App'
import { getChooseLanguageText, getSupportText, getRulesText } from './translatedText/translatedText'
import Rules from './rules/Rules.js'
import { AM, CONTAINER, EN, GB, RU } from '../../utility/Constants'


const Footer = memo(({ setlanguage }) => {
    const { language } = useContext(UserContext)
    const [isRulesModal, setIsRulesModal] = useState(false)

    const openPopup = () => setIsRulesModal(true)

    return (
        <section className={language === AM
            ? `${s.footer} ${s.AM}`
            : language === RU
                ? `${s.footer} ${s.RU}`
                : s.footer}>
            <Rules isRulesModal={isRulesModal} setIsRulesModal={setIsRulesModal}/>

            <div className={`${CONTAINER} ${s.footerWrapper}`}>
                <div onClick={openPopup}>{getRulesText(language)}</div>
                <div>{getSupportText(language)} vanyakubarin@mail.ru</div>
                <div className={s.countryIcons}>
                    <span>{getChooseLanguageText(language)}</span>
                    <ReactCountryFlag onClick={() => setlanguage(AM)} countryCode={AM} style={{ fontSize: '2.5em' }} />
                    <ReactCountryFlag onClick={() => setlanguage(RU)} countryCode={RU} style={{ fontSize: '2.5em' }} />
                    <ReactCountryFlag onClick={() => setlanguage(EN)} countryCode={GB} style={{ fontSize: '2.5em' }} />
                </div>
            </div>
        </section>
    )
})

export default Footer