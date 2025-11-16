export type language = 'EN' | 'AM' | 'RU'

export type user = {
    email: string
    name: string
    _id: string
    books: string[]
    bookRatings: { [key: string]: string }
    isAdmin: boolean
}

export type book = {
    titleRU: string
    titleEN: string
    titleAM: string
    authorRU: string
    authorEN: string
    authorAM: string
    descriptionRU: string
    descriptionAM: string
    descriptionEN: string
    date: string
    ratingCount: number
    rating: number
    viewCount: number
    type: string
    topic: string
    linkImage: string
    pdfRU: string
    pdfEN: string
    pdfAM: string
    epubRU: string
    epubEN: string
    epubAM: string
    _id: string
}

export type comment = {
    userId: string
    userName: string
    parentId: string
    createdDate: string
    body: string
    likes: string[]
    dislikes: string[]
    isUpdated: boolean
    _id: string
}

export type bookFormats = 'pdfRU' | 'pdfEN' | 'pdfAM' | 'epubRU' | 'epubEN' | 'epubAM'

export type actionTypes = 'OPEN' | 'DOWNLOAD' | 'UPLOAD' | 'DELETE'

export type sortingTopics = 'byPopularity' | 'byRating' | 'byAlphabet'
export type topics =  'all' | 'literature' | 'novels' | 'historicalNovels' | 'epics' | 'poems' | 'biographies'
    | 'culture' | 'fromPoliticians' | 'lettersAndDocuments' | 'sovietHistoriography' | 'historicalWritings' | 'outstandingArmenians'
    | 'history' | 'economy' | 'politics' | 'philosophy' | 'religion' | 'law' | 'others'

export type types = 'literature' | 'history' | 'article'

export interface UserContextInterface {
    language: language
    user: any
    setUser: any
}



