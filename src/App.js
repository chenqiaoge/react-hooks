import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import Home from './views/home'
import WrapRouter from './router'

function App () {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Layout />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function About () {
  return (
    <div className="About">
      about
    </div>
  )
}
function Inbox () {
  return (
    <div className="Inbox">
      Inbox
    </div>
  )
}
function Layout () {
  return (
    <div className="layout">

      <Router>
        <ul>
          <li><Link to="/">home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
        {/* <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/inbox" component={Inbox} />
        </Switch> */}
        <WrapRouter />
      </Router>
    </div>
  )
}

export default App;
