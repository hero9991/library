import './App.css'
import Navbar from './components/navbar/Navbar'
import HomeBody from './components/homeBody/HomeBody'
import Footer from './components/footer/Footer'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Books from './components/books/Books';
import BookPage from './components/bookPage/BookPage';
import AuthorizationModal from './components/authorizationModal/AuthorizationModal';
import { useEffect, useState } from 'react';
import { checkAuth } from './utility/AxiosService';

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoginModal, setIsLoginModal] = useState(false)
  const [isSignUpModal, setIsSignUpModal] = useState(false)
  const [isBurgerActive, setIsBurgerActive] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('token')) return

    (async function () {
      try {
        const response = await checkAuth()
        localStorage.setItem('token', response.data.accessToken)
        setIsAuth(true)
        setUser(response.data.user)
      } catch (error) {
        console.log(error.response?.data?.message)
      }
    })()
  }, [])

  return (
    <Router>
      <div className="App">
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} setIsLoginModal={setIsLoginModal} setIsSignUpModal={setIsSignUpModal} isBurgerActive={isBurgerActive} setIsBurgerActive={setIsBurgerActive} />
        <section className={isBurgerActive ? 'blur' : undefined}>
          <Switch>
            <Route path="/" exact>
              <HomeBody className='blur' />
            </Route>
            <Route path="/catalog/literature">
              <Books />
            </Route>
            <Route path="/catalog/history">
              <Books />
            </Route>
            <Route path="/catalog/books">
              <Books />
            </Route>
            <Route path="/book">
              <BookPage />
            </Route>
          </Switch>
          <AuthorizationModal isLoginModal={isLoginModal} isSignUpModal={isSignUpModal} setIsLoginModal={setIsLoginModal} setIsSignUpModal={setIsSignUpModal}
            setIsAuth={setIsAuth} />
          <Footer />
        </section>
      </div>
    </Router>
  )
}

export default App
