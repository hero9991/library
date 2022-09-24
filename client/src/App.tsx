import Navbar from './components/navbar/Navbar'
import HomeBody from './components/homeBody/HomeBody'
import Footer from './components/footer/Footer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import 'react-toastify/dist/ReactToastify.css'
import Books from './components/books/Books'
import BookPage from './components/bookPage/BookPage'
import AuthorizationModal from './components/authorizationModal/AuthorizationModal'
import { createContext, useEffect, useState, useMemo } from 'react'
import { checkAuth, getCurrentCountryAddress, getUserRatings } from './utility/AxiosService'
import { toast } from 'react-toastify'
import { AM, EN, RU, TOKEN, CATALOG_LITERATURE_URL, CATALOG_HISTORY_URL } from './utility/Constants'
import { language, user, UserContextInterface } from './utility/commonTypes'
import CreateBook from './components/createBook/CreateBook'

export const UserContext = createContext({} as UserContextInterface)

function App() {
  const [user, setUser] = useState<user | null>(null)
  const [language, setLanguage] = useState<language>(EN)
  const [isLoginModal, setIsLoginModal] = useState<boolean>(false)
  const [isSignUpModal, setIsSignUpModal] = useState<boolean>(false)

  useEffect(() => {
    (async function () {
      try {
        if (!localStorage.getItem(TOKEN)) return setCurrentLanguageByLocation()

        const response = await checkAuth()

        localStorage.setItem(TOKEN, response.data.accessToken)
        const userIdToRating = await getUserRatings(response.data.user._id)
        setUser({ ...response.data.user, bookRatings: { ...userIdToRating.data.bookIdToRating } })

        if (response.data.user.language) {
          setLanguage(response.data.user.language)
        } else {
          setCurrentLanguageByLocation()
        }
      } catch (error: any) {
        toast.error(`Error ${error}`)
      }
    })()
  }, [])

  const setCurrentLanguageByLocation = async () => {
      const currentlanguage = (await getCurrentCountryAddress()).data.country
      if (currentlanguage === RU || currentlanguage === AM) setLanguage(currentlanguage)
  }

  const userValue = useMemo(() => ({ user, setUser, language }), [user, language]);

  return (
    <UserContext.Provider value={userValue}>
      <Router>
        <div className="App">
          <ToastContainer autoClose={2000} position='top-center' />
          <Navbar setIsLoginModal={setIsLoginModal} setIsSignUpModal={setIsSignUpModal} />
          <Switch>
            <Route path="/" exact>
              <HomeBody />
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
          {user?.isAdmin && <CreateBook />}
          <AuthorizationModal isLoginModal={isLoginModal} isSignUpModal={isSignUpModal} setIsLoginModal={setIsLoginModal} setIsSignUpModal={setIsSignUpModal} />
          <Footer setLanguage={setLanguage} />
        </div> 
      </Router>
    </UserContext.Provider>
  )
}

export default App
