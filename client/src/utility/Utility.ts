import { language } from './commonTypes';
import { AM, RU } from './Constants';

export const getTimeSince = (date: string, language: language) => {
    var seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
        return getTranslatedTime(interval, ['год', 'года', 'лет'], 'տարի', 'years', language)
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return getTranslatedTime(interval, ['месяц', 'месяца', 'месяцев'], 'ամիս', 'months', language)
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return getTranslatedTime(interval, ['день', 'дня', 'дней'], 'օր', 'days', language)
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return getTranslatedTime(interval, ['час', 'часа', 'часов'], 'ժամ', 'hours', language)
    }
    interval = seconds / 60;
    if (interval > 1) {
        return getTranslatedTime(interval, ['минуту', 'минуты', 'минут'], 'րոպե', 'minutes', language)
    }
    console.log(seconds)
    if (seconds === 0) return language === RU ? 'только что' : language === AM ? 'հենց հիմա' : 'just now'
    return getTranslatedTime(seconds, ['секунду', 'секунды', 'секунд'], 'վայրկյան', 'seconds', language)
}

const getTranslatedTime = (interval: number, measureDeclensionsRU: string[], measureAM: string, measureEN: string, language: language) => {
    const roundedInterval = Math.floor(interval)
    if (roundedInterval === 1) measureEN.slice(0, -1)

    if (language === RU) {
        return `${roundedInterval} ${getMeasureRU(roundedInterval, measureDeclensionsRU)} назад`
    }
    return `${roundedInterval} ${language === AM ? ` ${measureAM} առաջ` : ` ${measureEN} ago`}`
}

const getMeasureRU = (number: number, titles: string[]) => {  
    const cases = [2, 0, 1, 1, 1, 2]
    return titles[ (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5] ]
}