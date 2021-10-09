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

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <HomeBody />
          </Route>
          <Route path="/catalog">
            <Books />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
