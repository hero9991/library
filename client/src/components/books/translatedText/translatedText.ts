import { language } from './../../../utility/commonTypes';
import { EN, RU } from "../../../utility/Constants"

export const getEmptyMyBooksText = (language: language) => language === EN
    ? 'Add some boooks to keep your results'
    : language === RU
        ? 'Добавьте книги, чтобы сохранить результат'
        : 'Ավելացրեք գրքեր՝ արդյունքը պահպանելու համար'

export const getEmptyBooksSearchText = (language: language) => language === EN
    ? 'No results found for your search'
    : language === RU
        ? 'По запросу ничего не найдено'
        : 'Ձեր որոնման արդյունքները չեն գտնվել'

export const getEmptyArticlesText = (language: language) => language === EN
    ? 'No articles have been added to this topic yet'
    : language === RU
        ? 'На данную тему еще не было добавлено статей'
        : 'Այս թեմային դեռ հոդվածներ չեն ավելացվել'

export const getUnauthorizedMyBooksText = (language: language) => language === EN
    ? 'Firstly you need to login to save some books'
    : language === RU
        ? 'Сперва вам необходимо войти в систему, чтобы сохранить книги'
        : 'Ձեր գրքերը պահելու համար նախ պետք է մուտք գործեք'

export const getViewMoreText = (language: language) => language === EN
    ? 'View more'
    : language === RU
        ? 'Показать еще'
        : 'Դիտել ավելին'

export const topicTranslations = {
    AM: {
        byPopularity: 'Հանրաճանաչություն',
        byRating: 'Ըստ վարկանիշի',
        byAlphabet: 'Այբբենական',
        all: 'Բոլորը',

        literature: 'Գրականություն',
        novels: 'Հեքիաթներ, վեպեր, պիեսներ և պատմվածքներ',
        historicalNovels: 'Պատմական վեպեր',
        epics: 'էպոսներ',
        poems: 'Պոեմ',
        biographies: 'Կենսագրություններ',

        culture: 'Մշակույթ',
        fromPoliticians: 'Քաղաքական գործիչներից ու կուսակցություններից',
        lettersAndDocuments: 'Նամակներ և փաստաթղթեր',
        sovietHistoriography: 'Խորհրդային պատմագրություն',
        historicalWritings: 'Պատմական գրություններ',
        outstandingArmenians: 'Ականավոր հայեր',

        history: 'Պատմություն',
        // culture: 'Մշակույթ', is dublicated
        economy: 'Տնտեսագիտություն և ֆինանսներ',
        politics: 'Քաղաքականություն', 
        philosophy: 'Փիլիսոփայություն', 
        religion: 'Կրոն', 
        law: 'Օրենք', 
        others: 'Այլ'
    },
    RU: {
        byPopularity: 'По популярности',
        byRating: 'По рейтингу',
        byAlphabet: 'По алфавиту',
        all: 'Все',

        literature: 'Литература',
        novels: 'Сказки, повести, пьесы и рассказы',
        historicalNovels: 'Исторические романы',
        epics: 'Эпосы',
        poems: 'Поэмы',
        biographies: 'Биографии',

        culture: 'Культура',
        fromPoliticians: 'От политиков и партий',
        lettersAndDocuments: 'Письма и документы',
        sovietHistoriography: 'Советская историография',
        historicalWritings: 'Исторические труды',
        outstandingArmenians: 'Выдающиеся армяне',

        history: 'История',
        // culture: 'Культура', is dublicated
        economy: 'Экономика и финансы',
        politics: 'Политика', 
        philosophy: 'Философия', 
        religion: 'Религия', 
        law: 'Право', 
        others: 'Прочее'
    },
    EN: {
        byPopularity: 'By popularity',
        byRating: 'By rating',
        byAlphabet: 'By alphabet',
        all: 'All',
        
        literature: 'Literature',
        novels: 'Novels',
        historicalNovels: 'Historical novels',
        epics: 'Epics',
        poems: 'Poems',
        biographies: 'Biographies',

        culture: 'Culture',
        fromPoliticians: 'From politicians and parties',
        lettersAndDocuments: 'Letters and documents',
        sovietHistoriography: 'Soviet historiography',
        historicalWritings: 'Historical writings',
        outstandingArmenians: 'Outstanding Armenians',

        history: 'History',
        // culture: 'Culture', is dublicated
        economy: 'Economy and Finance',
        politics: 'Politics', 
        philosophy: 'Philosophy', 
        religion: 'Religion', 
        law: 'Law', 
        others: 'Others'
    }
}
