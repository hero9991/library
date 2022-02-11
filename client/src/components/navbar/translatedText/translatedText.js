import { EN, RU } from "../../../utility/Constants"

export const getHomeTab = language => language === EN
    ? 'Home'
    : language === RU
        ? 'Главная'
        : 'Տուն'

export const getLiteratureTab = language => language === EN
    ? 'Literature'
    : language === RU
        ? 'Литература'
        : 'Գրականություն'

export const getHistoryTab = language => language === EN
    ? 'History'
    : language === RU
        ? 'История'
        : 'Պատմություն'

export const getArticlesTab = language => language === EN
    ? 'Articles'
    : language === RU
        ? 'Статьи'
        : 'Հոդվածներ'

export const getMyBooksTab = language => language === EN
    ? 'My books'
    : language === RU
        ? 'Мои книги'
        : 'Իմ'

export const getLoginTab = language => language === EN
    ? ' Login'
    : language === RU
        ? 'Войти'
        : 'Մուտք'

export const getSignUpTab = language => language === EN
    ? 'Sign up'
    : language === RU
        ? 'Регистрация'
        : 'Գրանցում'

export const getLogOutTab = language => language === EN
    ? 'Log out'
    : language === RU
        ? 'Выйти'
        : 'Դուրս գալ'

export const getSearchPlaceholder = language => language === EN
    ? 'Author or title'
    : language === RU
        ? 'Автор или название'
        : 'Հեղինակ / վերնագիր'