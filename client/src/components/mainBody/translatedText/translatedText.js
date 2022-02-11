import { EN, RU } from "../../../utility/Constants"

export const getTitleFirst = language => language === EN
    ? 'History of our land'
    : language === RU
        ? 'История земли'
        : 'Մեր երկրի պատմությունը'

export const getTitleSecond = language => language === EN
    ? 'Roots of our literature'
    : language === RU
        ? 'Корни литературы'
        : 'Մեր գրականության արմատները'

export const getButtonUpperText = language => language === EN
    ? 'PDF Version is Available'
    : language === RU
        ? 'Версия в PDF формате доступна'
        : 'PDF տարբերակը հասանելի է'

export const getReadButtonText = language => language === EN
    ? 'Read now'
    : language === RU
        ? 'Читать сейчас'
        : 'Կարդացեք հիմա'