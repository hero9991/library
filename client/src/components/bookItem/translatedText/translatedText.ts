import { language } from './../../../utility/commonTypes';
import { EN, RU } from "../../../utility/Constants";

export const getReadNowText = (language: language) => language === EN
    ? 'Read Now'
    : language === RU
        ? 'Читать сейчас'
        : 'Կարդալ հիմա'

export const getUnauthorizedWarningText = (language: language) => language === EN
    ? 'Firstly you need to authorize'
    : language === RU
        ? 'Сперва необходимо авторизоваться'
        : 'Նախ անհրաժեշտ է մուտք գործել'

        