import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router ,Route, Link} from 'react-router-dom'
import Home from './components/Home'
import Favorite from './components/Favorite'


class App extends Component {

  render() {

    return (
      <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand mb-0 h1">
            <img src={logo} alt="React Logo" width="42" /> Deezweb
          </span>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
              <Link  className="nav-link" to="/">Rechercher un titre</Link>
              </li>
              <li className="nav-item">
              <Link  className="nav-link" to="/favorite">Favorite</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        <Route path="/" component={Home} exact />
        <Route path="/favorite" component={Favorite}/>
        </Router>
    );
    
  }
}

export default App;
