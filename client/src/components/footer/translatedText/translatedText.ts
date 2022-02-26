import { language } from './../../../utility/commonTypes';
import { EN, RU } from "../../../utility/Constants"

export const getRulesText = (language: language) => language === EN
    ? 'Rules'
    : language === RU
        ? 'Правила'
        : 'Կանոններ'

export const getSupportText = (language: language) => language === EN
    ? 'Support: '
    : language === RU
        ? 'Поддержка: '
        : 'Աջակցություն․ '

export const getChooseLanguageText = (language: language) => language === EN
    ? 'Choose language: '
    : language === RU
        ? 'Выберите язык: '
        : 'Ընտրեք լեզուն․ '
