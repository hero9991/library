export type language = 'EN' | 'AM' | 'RU'

export type user = {
    email: string
    name: string
    _id: string
    books: string[]
    bookRatings: { [key: string]: string }
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

export type bookFormats = 'pdfRU' | 'pdfEN' | 'pdfAM' | 'epubRU' | 'epubEN' | 'epubAM'

export type sortingTopics = 'byPopularity' | 'byRating' | 'byAlphabet'
export type topics =  'all' | 'historicalNovels' | 'sovietHistoriography' | 'prerevolutionaryHistoriography' | 'partyLiterature' 
    | 'nationalPhilosophy' | 'artisticWorks' | 'epics' | 'poems' | 'memoirs' | 'rhymes'

export interface UserContextInterface {
    language: language
    user: any
    setUser: any
}



