import axios from 'axios'
import { bookFormats, language } from './commonTypes'
import { PROTOCOL_HOSTNAME_PORT } from './Constants'

const API_URL = `${PROTOCOL_HOSTNAME_PORT}/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config: any) => {

    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use((config: any) => config,
    async error => {
        if (error.response?.status !== 401 || error.config._isRetry) throw error

        const originalRequest = error.config
        originalRequest._isRetry = true
        try {
            const response = await checkAuth()
            localStorage.setItem('token', response.data.accessToken)
            return $api.request(originalRequest)
        } catch (error) {
            localStorage.removeItem('token')
            throw error
        }
    })

// Authorization
export const signUp = (email: string, password: string, confirmPassword: string, firstName: string, lastName: string) =>
    $api.post('/signup', { email, password, confirmPassword, firstName, lastName })
export const signIn = (email: string, password: string) => $api.post('/signin', { email, password })
export const signOut = () => $api.post('/signout')
export const authorizeGoogleAccount = (code: string) => $api.post('/authorizegoogleaccount', { code })

export const setUserLanguage = (language: language, userId: string) => $api.post('/setLanguage', { language, userId })

// Refresh auth
export const checkAuth = () => axios.get(`${API_URL}/refresh`, { withCredentials: true })

// Books
export const getBooks = (type: string, chunkNumber: number, sort: string, topic: string, isReversed: boolean, language: string) => $api.get('/books', { params: { type, chunkNumber, sort, topic, isReversed, language } })
export const getSliderBooks = (type: string) => $api.get('/sliderBooks', { params: { type } })
export const getBooksBySearch = (searchQuery: string, chunkNumber: number) => $api.get('/books/search', { params: { searchQuery, chunkNumber } })
export const getMyBooks = (id: string) => $api.get('/myBooks', { params: { id } })
export const getBook = (id: string) => $api.get('/book', { params: { id } })
export const getUserRatings = (userId: string) => $api.get('/getUserRatings', { params: { userId } })
export const addOrRemoveBook = (bookId: string, userId: string) => $api.post('/add', { bookId, userId })
export const setBookRating = (bookId: string, userId: string, rating: number) => $api.post('/setRating', { bookId, userId, rating })

export const incrementBookView = (bookId: string, viewCount: string) => $api.post('/incrementView', { bookId, viewCount })

// Upload books
export const uploadBook = (data: any) => $api.post('/upload', data)
export const updateBookInfo = (data: any) => $api.post('/updateBookInfo', data)
export const addBookFile = (data: any) => $api.post('/addBookFile', data)
export const deleteBookFile = (bookId: string, bookFormat: bookFormats) => $api.post('/deleteBookFile', { bookId, bookFormat })
export const addBookImage = (data: any) => $api.post('/addBookImage', data)
export const deleteBookImage = (bookId: string) => $api.post('/deleteBookImage', { bookId })

// Comments
export const getComments = (parentId: string) => $api.get('/comments', { params: { parentId } })
export const createComment = (userId: string, userName: string, parentId: string, body: string) => $api.post('/createComment', { userId, userName, parentId, body })
export const updateComment = (commentId: string, body: string, userId: string) => $api.post('/updateComment', { commentId, body, userId })
export const deleteComment = (commentId: string, userId: string) => $api.post('/deleteComment', { commentId, userId })
export const reactComent = (commentId: string, userId: string, isLike: boolean) => $api.post('/reactComment', { commentId, userId, isLike })

export const getCurrentCountryAddress = () => axios.get('https://ipinfo.io/json?token=681314bfddb2d3')
