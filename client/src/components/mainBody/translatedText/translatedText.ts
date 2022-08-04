import { language } from './../../../utility/commonTypes';
import { EN, RU } from "../../../utility/Constants"

export const getTitleFirstText = (language: language) => language === EN
    ? 'History of our land'
    : language === RU
        ? 'История земли'
        : 'Երկրի պատմությունը'

export const getTitleSecondText = (language: language) => language === EN
    ? 'Roots of our literature'
    : language === RU
        ? 'Корни литературы'
        : 'Մեր արմատները'

export const getButtonUpperText = (language: language) => language === EN
    ? 'PDF/EPUB formats are Available'
    : language === RU
        ? 'Книги в PDF/Epub форматах доступны'
        : 'PDF/EPUB տարբերակները հասանելի էն'

export const getReadButtonText = (language: language) => language === EN
    ? 'Read now'
    : language === RU
        ? 'Читать сейчас'
        : 'Կարդացեք հիմա'