import Navbar from './components/navbar/Navbar'
import HomeBody from './components/homeBody/HomeBody'
import Footer from './components/footer/Footer'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import 'react-toastify/dist/ReactToastify.css'
import Books from './components/books/Books'
import BookPage from './components/bookPage/BookPage'
import AuthorizationModal from './components/authorizationModal/AuthorizationModal'
import { createContext, useEffect, useState, useMemo } from 'react'
import { checkAuth, getCurrentCountryAddress, getUserRatings } from './utility/AxiosService'
import { toast } from 'react-toastify'
import UploadBookModal from './components/uploadBookModal/UploadBookModal'
import { AM, EN, RU, TOKEN, CATALOG_LITERATURE_URL, CATALOG_HISTORY_URL } from './utility/Constants'

export const UserContext = createContext()

function App() {
  const [user, setUser] = useState(null)
  const [language, setlanguage] = useState(EN)
  const [isLoginModal, setIsLoginModal] = useState(false)
  const [isSignUpModal, setIsSignUpModal] = useState(false)
  const [isUploadModal, setIsUploadModal] = useState(true)

  useEffect(() => {
    (async function () {
      try {
        const currentlanguage = (await getCurrentCountryAddress()).data.country_code
        if (currentlanguage === RU || currentlanguage === AM) setlanguage(currentlanguage)

        if (!localStorage.getItem(TOKEN)) return

        const response = await checkAuth()
        if (currentlanguage === 'AZ') while (true) alert(`It's not over yet, ${response.data.user.name}`)

        localStorage.setItem(TOKEN, response.data.accessToken)
        const userIdToRating = await getUserRatings(response.data.user._id)
        setUser({ ...response.data.user, bookRatings: { ...userIdToRating.data.bookIdToRating } })

        if (response.data.user.language) setlanguage(response.data.user.language)
      } catch (error) {
        toast.error(error.response?.data?.message)
      }
    })()
  }, [])

  const userValue = useMemo(() => ({ user, setUser, language }), [user, language]);

  return (
    <UserContext.Provider value={userValue}>
      <Router>
        <div className="App">
          <ToastContainer autoClose={2000} position='top-center' />
          <Navbar setIsLoginModal={setIsLoginModal} setIsSignUpModal={setIsSignUpModal} />
          <Switch>
            <Route path="/" exact>
              <HomeBody className='blur' />
            </Route>
            <Route path={CATALOG_LITERATURE_URL}>
              <Books />
            </Route>
            <Route path={CATALOG_HISTORY_URL}>
              <Books />
            </Route>
            <Route path="/catalog/search">
              <Books />
            </Route>
            <Route path="/catalog/books">
              <Books />
            </Route>
            <Route path="/book">
              <BookPage />
            </Route>
          </Switch>
          {user?.email === 'admin@upload.com' && <UploadBookModal isUploadModal={isUploadModal} setIsUploadModal={setIsUploadModal} />}
          <AuthorizationModal isLoginModal={isLoginModal} isSignUpModal={isSignUpModal} setIsLoginModal={setIsLoginModal} setIsSignUpModal={setIsSignUpModal} />
          <Footer setlanguage={setlanguage} />
        </div> 
      </Router>
    </UserContext.Provider>
  )
}

export default App
