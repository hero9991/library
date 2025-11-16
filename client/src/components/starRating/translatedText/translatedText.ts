import { EN, RU } from './../../../utility/Constants'
import { language } from './../../../utility/commonTypes'

export const getVoteSavedText = (language: language) => language === EN
    ? 'Your vote is successfully saved'
    : language === RU
        ? 'Ваш голос успешно сохранен'
        : 'Ձեր ձայնը հաջողությամբ ավելացվել է'