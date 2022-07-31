import { language } from './../../../utility/commonTypes';
import { EN, RU } from "../../../utility/Constants";

export const getReadNowText = (language: language) => language === EN
    ? 'Read'
    : language === RU
        ? 'Читать'
        : 'Կարդալ'

export const getDownloadText = (language: language) => language === EN
    ? 'Download'
    : language === RU
        ? 'Скачать'
        : 'Ներբեռնել'

export const getDeleteBookText = (language: language) => language === EN
    ? 'Delete Book'
    : language === RU
        ? 'Удалить книгу'
        : 'Ջնջել գիրքը'

export const getUploadBookText = (language: language) => language === EN
    ? 'Upload book'
    : language === RU
        ? 'Загрузить книгу'
        : 'Վերբեռնեք գիրքը'

export const getShowFullDescriptionText = (language: language) => language === EN
    ? 'Show full description'
    : language === RU
        ? 'Показать полное описание'
        : 'Ցույց տալ ամբողջական նկարագրությունը'