import { EN, RU } from "../../../utility/Constants"

export const getLiteratureTitle = language => language === EN
    ? 'Armenian literature'
    : language === RU
        ? 'Литература Армении'
        : 'Գրականություն'

export const getHistoryTitle = language => language === EN
    ? 'Armenian history'
    : language === RU
        ? 'История Армении'
        : 'Պատմություն'