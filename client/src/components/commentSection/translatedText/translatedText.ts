import { language } from "../../../utility/commonTypes";
import { EN, RU } from "../../../utility/Constants";

export const getReplayText = (language: language) => language === EN
    ? 'Replay'
    : language === RU
        ? 'Ответить'
        : 'Պատասխանել'

export const getCancelText = (language: language) => language === EN
    ? 'Cancel'
    : language === RU
        ? 'Отмена'
        : 'Չեղարկել'

export const getShowCommentsText = (language: language) => language === EN
    ? 'Show replies'
    : language === RU
        ? 'Раскрыть ответы'
        : 'Պատասխանները'

export const getHideCommentsText = (language: language) => language === EN
    ? 'Hide replies'
    : language === RU
        ? 'Скрыть ответы'
        : 'Թաքցնել պատասխանները'

export const getDeleteText = (language: language) => language === EN
    ? 'Delete'
    : language === RU
        ? 'Удалить'
        : 'Ջնջել'

export const getChangeText = (language: language) => language === EN
    ? 'Change'
    : language === RU
        ? 'Изменить'
        : 'Խմբագրել'

export const getUpdatedText = (language: language) => language === EN
    ? 'updated'
    : language === RU
        ? 'изменено'
        : 'փոխվել Է'

export const getShareText = (language: language) => language === EN
    ? 'Share'
    : language === RU
        ? 'Поделиться'
        : 'Կիսվել'

export const getPostsUpperText = (language: language) => language === EN
    ? 'COMMENTS'
    : language === RU
        ? 'КОММЕНТАРИИ'
        : 'ՄԵԿՆԱԲԱՆՈՒԹՅՈՒՆՆԵՐ'

export const getCommentSavedText = (language: language) => language === EN
    ? 'The replay has been saved'
    : language === RU
        ? 'Ответ сохранен'
        : 'Պատասխանը ավելացվել է'

export const getCommentDeletedText = (language: language) => language === EN
    ? 'The replay has been deleted'
    : language === RU
        ? 'Ответ удален'
        : 'Պատասխանը ջնջվել է'

export const getCommentUpdatedText = (language: language) => language === EN
    ? 'The replay has been updated'
    : language === RU
        ? 'Ответ обновлен'
        : 'Պատասխանը թարմացվել է'
        