import { memo, useContext, useState } from 'react'
import s from './Footer.module.css'
import ReactCountryFlag from "react-country-flag"
import { UserContext } from '../../App'
import { getChooseLanguageText, getSupportText, getRulesText } from './translatedText/translatedText'
import Rules from './rules/Rules'
import { AM, CONTAINER, EN, GB, RU } from '../../utility/Constants'
import { language, UserContextInterface } from '../../utility/commonTypes'
import { postUserLanguage } from './FooterService'


const Footer = memo(({ setLanguage }: Props) => {
    const { user, setUser, language } = useContext<UserContextInterface>(UserContext)
    const [isRulesModal, setIsRulesModal] = useState<boolean>(false)

    const openPopup = () => setIsRulesModal(true)

    const handleLanguage = (e: any) => {
        const selectedLanguage: language = e.target.dataset.value
        setLanguage(selectedLanguage)

        if (!user?._id) return

        postUserLanguage(selectedLanguage, user._id)
        setUser({ ...user, language: selectedLanguage })
    }

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
                    <ReactCountryFlag onClick={handleLanguage} data-value={AM} countryCode={AM} style={{ fontSize: '2.5em' }} />
                    <ReactCountryFlag onClick={handleLanguage} data-value={RU} countryCode={RU} style={{ fontSize: '2.5em' }} />
                    <ReactCountryFlag onClick={handleLanguage} data-value={EN} countryCode={GB} style={{ fontSize: '2.5em' }} />
                </div>
            </div>
        </section>
    )
})

interface Props {
	setLanguage: any
}

export default Footer