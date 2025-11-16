import { useContext } from 'react'
import { UserContext } from '../../../App'
import { UserContextInterface } from '../../../utility/commonTypes'
import { getRulesInnerText } from '../translatedText/translatedText'
import s from './Rules.module.css'

const Rules = ({ isRulesModal, setIsRulesModal }: Props) => {
    const { language } = useContext<UserContextInterface>(UserContext)

    const hidePopup = () => setIsRulesModal(false)

    return (
        <div onClick={hidePopup} className={isRulesModal ? `${s.rulesModal} ${s.active}` : s.rulesModal}>
            <div onClick={e => e.stopPropagation()} className={isRulesModal ? `${s.rulesModalContent} ${s.active}` : s.rulesModalContent}>
                {getRulesInnerText(language)}
            </ div>
        </ div>
    )
}

interface Props {
    isRulesModal: boolean
    setIsRulesModal: any
}

export default Rules