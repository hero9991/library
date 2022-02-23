import { EN, RU } from "../../../utility/Constants"

export const getLiteratureTitleText = language => language === EN
    ? 'Armenian literature'
    : language === RU
        ? 'Литература Армении'
        : 'Գրականություն'

export const getHistoryTitleText = language => language === EN
    ? 'Armenian history'
    : language === RU
        ? 'История Армении'
        : 'Պատմություն'