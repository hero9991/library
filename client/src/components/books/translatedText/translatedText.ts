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
        all: 'Բոլոր գրքերը',
        historicalNovels: 'Պատմական վեպեր',
        sovietHistoriography: 'Խորհրդային պատմագրություն',
        prerevolutionaryHistoriography: 'Նախահեղափոխական պատմագրություն',
        partyLiterature: 'Կուսակցական գրականություն',
        nationalPhilosophy: 'Ազգային փիլիսոփայություն',
        artisticWorks: 'Արվեստի գործեր',
        epics: 'էպոսներ',
        poems: 'Պոեմ',
        memoirs: 'Հուշեր',
        rhymes: 'Բանաստեղծություններ'
    },
    RU: {
        byPopularity: 'По популярности',
        byRating: 'По рейтингу',
        byAlphabet: 'По алфавиту',
        all: 'Все книги',
        historicalNovels: 'Исторические романы',
        sovietHistoriography: 'Советская историография',
        prerevolutionaryHistoriography: 'Дореволюционная историография',
        partyLiterature: 'Партийная литература',
        nationalPhilosophy: 'Национальная философия',
        artisticWorks: 'Художественные произведения',
        epics: 'Эпосы',
        poems: 'Поэмы',
        memoirs: 'Мемуары',
        rhymes: 'Стихотворения'
    },
    EN: {
        byPopularity: 'By popularity',
        byRating: 'By rating',
        byAlphabet: 'By alphabet',
        all: 'All books',
        historicalNovels: 'Historical novels',
        sovietHistoriography: 'Soviet historiography',
        prerevolutionaryHistoriography: 'Pre-revolutionary historiography',
        partyLiterature: 'Party literature',
        nationalPhilosophy: 'National philosophy',
        artisticWorks: 'Artistic works',
        epics: 'Epics',
        poems: 'Poems',
        memoirs: 'Memoirs',
        rhymes: 'Rhymes'
    }
}
