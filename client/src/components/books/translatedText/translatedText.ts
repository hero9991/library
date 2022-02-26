import { language } from './../../../utility/commonTypes';
import { EN, RU } from "../../../utility/Constants"

export const getEmptyMyBooksText = (language: language) => language === EN
    ? 'Add some boooks to keep your results'
    : language === RU
        ? 'Добавьте книги, чтобы сохранить результат'
        : 'Ավելացրեք գրքեր՝ արդյունքը պահպանելու համար'

export const getUnauthorizedMyBooksText= (language: language) => language === EN
    ? 'Firstly you need to login to save some books'
    : language === RU
        ? 'Сперва вам необходимо войти в систему, чтобы сохранить книги'
        : 'Ձեր գրքերը պահելու համար նախ պետք է մուտք գործեք'

export const getViewMoreText= (language: language) => language === EN
    ? 'View more'
    : language === RU
        ? 'Показать еще'
        : 'Դիտել ավելին'

export const getByPopularityText= (language: language) => language === EN
    ? 'By popularity'
    : language === RU
        ? 'По популярности'
        : 'Հանրաճանաչություն'

export const getByRatingText= (language: language) => language === EN
    ? 'By rating'
    : language === RU
        ? 'По рейтингу'
        : 'Ըստ վարկանիշի'

export const getByAlphabetText= (language: language) => language === EN
    ? 'By alphabet'
    : language === RU
        ? 'По алфавиту'
        : 'Այբբենական'

export const getAllBooksText= (language: language) => language === EN
    ? 'All books'
    : language === RU
        ? 'Все книги'
        : 'Բոլոր գրքերը'

export const getPrehistoricEraText= (language: language) => language === EN
    ? 'Prehistoric era'
    : language === RU
        ? 'Доисторический период'
        : 'Նախապատմական'

export const getUrartuText= (language: language) => language === EN
    ? 'Urartu'
    : language === RU
        ? 'Урарту'
        : 'Ուրարտու'

export const getAncientText= (language: language) => language === EN
    ? 'Ancient Armenia'
    : language === RU
        ? 'Древняя Армения'
        : 'Հին Հայաստան'

export const getMeidevalText= (language: language) => language === EN
    ? 'Meideval Armenia'
    : language === RU
        ? 'Древняя Армения'
        : 'Միջնադարյան Հայաստան'

export const getNationalMovementText= (language: language) => language === EN
    ? 'National movement'
    : language === RU
        ? 'Национальное движение'
        : 'Ազգային շարժում'

export const getSovietText= (language: language) => language === EN
    ? 'Soviet Union Period'
    : language === RU
        ? 'Советский период'
        : 'Խորհրդային ժամանակաշրջան'

export const getModernText= (language: language) => language === EN
    ? 'Modern'
    : language === RU
        ? 'Современное'
        : 'Ժամանակակից'

export const get19CenturyText= (language: language) => language === EN
    ? '19 century'
    : language === RU
        ? '19 век'
        : '19 դար'