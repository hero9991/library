import { language } from './../../../utility/commonTypes';
import { EN, RU } from "../../../utility/Constants"

export const getRulesText = (language: language) => language === EN
    ? 'Rules'
    : language === RU
        ? 'Правила'
        : 'Կանոններ'

export const getSupportText = (language: language) => language === EN
    ? 'Support'
    : language === RU
        ? 'Поддержка'
        : 'Աջակցություն'

export const getChooseLanguageText = (language: language) => language === EN
    ? 'Choose language: '
    : language === RU
        ? 'Выберите язык: '
        : 'Ընտրեք լեզուն․ '

export const getRulesInnerText = (language: language) => language === EN
    ? 'The project is not commercial and is aimed solely at educational purposes. We respect copyrights, so if you find violations, please report them immediately by clicking on the support link. Enjoy reading.'
    : language === RU
        ? 'Проект не является коммерческим и направлен исключительно на образовательные цели. Мы уважаем авторские права, поэтому в случае обнаружения нарушений просим незамедлительно сообщить о них, пройдя по ссылке на поддержку. Приятного чтения.'
        : 'Նախագիծը կոմերցիոն չէ և ուղղված է բացառապես կրթական նպատակներին: Մենք հարգում ենք հեղինակային իրավունքները, այնպես որ, եթե խախտումներ եք գտնում, խնդրում ենք անհապաղ հայտնել դրանք՝ սեղմելով աջակցության հղման վրա: Վայելեք կարդալը:'
