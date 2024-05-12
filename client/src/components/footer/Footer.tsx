import { memo, useContext, useState } from 'react'
import s from './Footer.module.css'
import { RU as RU_FLAG, AM as AM_FLAG, GB as GB_FLAG } from 'country-flag-icons/react/3x2'
import { UserContext } from '../../App'
import { getChooseLanguageText, getSupportText, getRulesText } from './translatedText/translatedText'
import Rules from './Rules/Rules'
import { AM, CONTAINER, EN, GB, RU } from '../../utility/Constants'
import { language, UserContextInterface } from '../../utility/commonTypes'
import { postUserLanguage } from './FooterService'

const Footer = memo(({ setLanguage }: Props) => {
    const { user, setUser, language } = useContext<UserContextInterface>(UserContext)
    const [isRulesModal, setIsRulesModal] = useState<boolean>(false)

    const openPopup = () => setIsRulesModal(true)

    const handleLanguage = (e: any) => {
        const selectedLanguage: language = e.currentTarget.dataset.value
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
                <div><a href='https://vk.com/id171718509' target='_blank' rel='noreferrer'>{getSupportText(language)}</a></div>
                <div className={s.countryIcons}>
                    <span>{getChooseLanguageText(language)}</span>
                    <AM_FLAG className={s.commonFlag} onClick={handleLanguage} data-value={AM} />
                    <RU_FLAG className={s.commonFlag} onClick={handleLanguage} data-value={RU}/>
                    <GB_FLAG className={s.commonFlag} onClick={handleLanguage} data-value={EN} />
                </div>
            </div>
        </section>
    )
})

interface Props {
	setLanguage: any
}

export default Footer