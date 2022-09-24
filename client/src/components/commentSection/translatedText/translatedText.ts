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
    ? 'Show comments'
    : language === RU
        ? 'Раскрыть комментарии'
        : 'Մեկնաբանությունները'

export const getHideCommentsText = (language: language) => language === EN
    ? 'Hide comments'
    : language === RU
        ? 'Скрыть комментарии'
        : 'Թաքցնել մեկնաբանությունները'

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
    ? 'POSTS'
    : language === RU
        ? 'ПОСТЫ'
        : 'ՓՈՍՏԵՐ'

export const getCommentSavedText = (language: language) => language === EN
    ? 'The comment has been saved'
    : language === RU
        ? 'Комментарий сохранен'
        : 'Մեկնաբանությունն ավելացվել է'

export const getCommentDeletedText = (language: language) => language === EN
    ? 'The comment has been deleted'
    : language === RU
        ? 'Комментарий удален'
        : 'Մեկնաբանությունը ջնջվել է'

export const getCommentUpdatedText = (language: language) => language === EN
    ? 'The comment has been updated'
    : language === RU
        ? 'Комментарий обновлен'
        : 'Մեկնաբանությունը թարմացվել է'
        