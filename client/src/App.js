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
import { useState } from 'react';

function App() {
  const [isLoginModal, setIsLoginModal] = useState(false)
  const [isSignUpModal, setIsSignUpModal] = useState(false)
  const [isBurgerActive, setIsBurgerActive] = useState(false)

  return (
    <Router>
      <div className="App">
        <Navbar setIsLoginModal = {setIsLoginModal} setIsSignUpModal = {setIsSignUpModal} isBurgerActive={isBurgerActive} setIsBurgerActive={setIsBurgerActive}/>
        <section className={isBurgerActive && 'blur'}> 
          <Switch>
            <Route path="/" exact>
              <HomeBody className='blur'/>
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
          <AuthorizationModal isLoginModal={isLoginModal} isSignUpModal={isSignUpModal} setIsLoginModal={setIsLoginModal} setIsSignUpModal={setIsSignUpModal}/>
          <Footer />
        </section>
      </div>
    </Router>
  )
}

export default App
