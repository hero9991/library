import axios from 'axios'
import { PROTOCOL_HOSTNAME_PORT } from './Constants'

// const API_URL = 'http://192.168.1.145:5000/api'
const API_URL = `${PROTOCOL_HOSTNAME_PORT}/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use(config => {

    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use(config => config,
    async error => {
        if (error.response?.status !== 401 || error.config._isRetry) throw error

        const originalRequest = error.config
        originalRequest._isRetry = true
        try {
            const response = await checkAuth()
            localStorage.setItem('token', response.data.accessToken)
            return $api.request(originalRequest)
        } catch (error) {
            console.log('Is not logged in')
            throw error
        }
    })

// Authorization
export const signUp = (email, password, confirmPassword, firstName, lastName) =>
    $api.post('/signup', { email, password, confirmPassword, firstName, lastName })
export const signIn = (email, password) => $api.post('/signin', { email, password })
export const signOut = () => $api.post('/signout')
export const authorizeGoogleAccount = token => $api.post('/authorizegoogleaccount', { token })

// Refresh auth
export const checkAuth = () => axios.get(`${API_URL}/refresh`, { withCredentials: true })

// Books
export const getBooks = (type, chunkNumber, sort, topic, isReversed) => $api.get('/books', { params: { type, chunkNumber, sort, topic, isReversed } })
export const getSliderBooks = type => $api.get('/sliderBooks', { params: { type } })
export const getBooksBySearch = searchQuery => $api.get('/books/search', { params: { searchQuery } })
export const getMyBooks = id => $api.get('/myBooks', { params: { id } })
export const getBook = id => $api.get('/book', { params: { id } })
export const getUserRatings = userId => $api.get('/getUserRatings', { params: { userId } })
export const addOrRemoveBook = (bookId, userId) => $api.post('/add', { bookId, userId })
export const setBookRating = (bookId, userId, rating) => $api.post('/setRating', { bookId, userId, rating })

export const incrementBookView = (bookId, viewCount) => $api.post('/incrementView', { bookId, viewCount })

// Upload books
export const uploadBook = data => $api.post('/upload', data)

export const getCurrentCountryAddress = () => axios.get('https://ipapi.co/json/')
