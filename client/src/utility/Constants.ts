import { language } from './commonTypes';

export const COMMON = 'common'
export const TOKEN = 'token'
export const TEXT = 'text'
export const FILE = 'file'
export const EMAIL = 'email'
export const PASSWORD = 'password'
export const SUBMIT = 'submit'

export const LITERATURE = 'literature'
export const HISTORY = 'history'
export const ARTICLE = 'article'
export const BOOKS = 'books'
export const SEARCH = 'search'

export const AUTHOR = 'author'
export const TITLE = 'title'
export const DESCRIPTION = 'description'

export const BOOK_URL = '/book/'
export const CATALOG_HISTORY_URL = '/catalog/history'
export const CATALOG_LITERATURE_URL = '/catalog/literature'
export const CATALOG_ARTICLE_URL = '/catalog/article'
export const SORT_PARAMETER = 'sort='
export const TOPIC_PARAMETER = 'topic='

export const AM: language = 'AM'
export const EN: language = 'EN'
export const GB = 'GB'
export const RU: language = 'RU'

export const OPEN = 'OPEN'
export const DOWNLOAD = 'DOWNLOAD'
export const UPLOAD = 'UPLOAD'
export const DELETE = 'DELETE'

export const CONTAINER = 'container'

export const PROTOCOL_HOSTNAME_PORT = 'https://patmahair.com'
// export const PROTOCOL_HOSTNAME_PORT = 'http://localhost:5000'

export const TRACKING_ID = 'G-Z15X45F1E8'

export const getUnauthorizedWarningText = (language: language) => language === EN
    ? 'Firstly you need to authorize'
    : language === RU
        ? 'Сперва необходимо авторизоваться'
        : 'Նախ անհրաժեշտ է մուտք գործել'
