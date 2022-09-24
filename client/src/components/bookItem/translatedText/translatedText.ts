import { language } from './../../../utility/commonTypes';
import { EN, RU } from "../../../utility/Constants";

export const getReadNowText = (language: language) => language === EN
    ? 'Read Now'
    : language === RU
        ? 'Читать сейчас'
        : 'Կարդալ հիմա'

export const getAddedText = (language: language) => language === EN
    ? 'has been added'
    : language === RU
        ? 'книга добавлена'
        : 'ավելացված է'

export const getDeletedText = (language: language) => language === EN
    ? 'has been deleted'
    : language === RU
        ? 'книга удалена'
        : 'ջնջված է'

        