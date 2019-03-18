
import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma'
import { BrowserRouter as Browser, Route, Switch, Link } from 'react-router-dom'
import './style.scss'

import CurrenciesIndex from './components/currencies/currenciesIndex'
import CurrenciesShow from './components/currencies/currenciesShow'
import Home from './lib/pages/home'

const App = () => {
  return (
    <Browser>
      <div>
        <Home />
        <nav className="navbar">
          <Link to="/" className="navbar-item">Index</Link>
        </nav>
        <Switch>
          <Route path="/:id/:id" component={CurrenciesShow} />
          <Route path="/:id" component={CurrenciesIndex} />
        </Switch>
      </div>
    </Browser>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
