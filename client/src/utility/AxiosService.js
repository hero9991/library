import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

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
        if (error.response.status !== 401 || error.config._isRetry) throw error

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


export const signUp = (email, password, confirmPassword, firstname, lastname) =>
    $api.post('/signup', { email, password, confirmPassword, firstname, lastname })
export const signIn = (email, password) => $api.post('/signin', { email, password })
export const signOut = () => $api.post('/signout')
export const authorizeGoogle = (token, id, email) => $api.post('/authorizegoogle', { token, id, email })

export const getBooks = () => $api.get('/books')

export const checkAuth = () => axios.get(`${API_URL}/refresh`, { withCredentials: true })
