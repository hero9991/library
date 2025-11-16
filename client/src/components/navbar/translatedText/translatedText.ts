import { language } from './../../../utility/commonTypes';
import { EN, RU } from "../../../utility/Constants"

export const getHomeTabText = (language: language) => language === EN
    ? 'Home'
    : language === RU
        ? 'Главная'
        : 'Տուն'

export const getLiteratureTabText = (language: language) => language === EN
    ? 'Literature'
    : language === RU
        ? 'Литература'
        : 'Գրականություն'

export const getHistoryTabText = (language: language) => language === EN
    ? 'History'
    : language === RU
        ? 'История'
        : 'Պատմություն'

export const getArticlesTabText = (language: language) => language === EN
    ? 'Articles'
    : language === RU
        ? 'Статьи'
        : 'Հոդվածներ'

export const getMyBooksTabText = (language: language) => language === EN
    ? 'My books'
    : language === RU
        ? 'Мои книги'
        : 'Իմ'

export const getLoginTabText = (language: language) => language === EN
    ? 'Login'
    : language === RU
        ? 'Войти'
        : 'Մուտք'

export const getSignUpTabText = (language: language) => language === EN
    ? 'Sign up'
    : language === RU
        ? 'Регистрация'
        : 'Գրանցում'

export const getLogOutTabText = (language: language) => language === EN
    ? 'Log out'
    : language === RU
        ? 'Выйти'
        : 'Դուրս գալ'

export const getSearchPlaceholderText = (language: language) => language === EN
    ? 'Author or title'
    : language === RU
        ? 'Автор или название'
        : 'Հեղինակ / վերնագիր'

export const getArticleDisabledText = (language: language) => language === EN
    ? 'This tab is not available yet'
    : language === RU
        ? 'Эта вкладка пока недоступна'
        : 'Այս ներդիրը դեռ հասանելի չէ'