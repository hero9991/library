// import s from './Rules.module.css'

const Rules = ({ isRulesModal, setIsRulesModal }: Props) => {
    const hidePopup = () => setIsRulesModal(false)

    return (
        <div onClick={hidePopup} >
            <div onClick={e => e.stopPropagation()} >
                Библиотека не подразумевает передачи книг в распоряжение или владение пользователям и читателям. Чтение книг может происходить лишь через веб-приложение для чтения на сайте, либо через приложения для мобильных и других устройств. Вся организация личных каталогов книг (полок) происходит исключительно внутри самого сервиса.
            </ div>
        </ div>
    )
}

interface Props {
    isRulesModal: boolean
    setIsRulesModal: any
}

export default Rules