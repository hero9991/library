import { EN, RU } from "../../../utility/Constants";

export const getReadNowText = language => language === EN
    ? 'Read Now'
    : language === RU
        ? 'Читать сейчас'
        : 'Կարդացեք հիմա'