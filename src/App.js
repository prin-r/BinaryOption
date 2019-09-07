import React, { Component } from 'react'
import './App.css'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import Dashboard from './pages/Dashboard'
import Nav from './components/Nav'
import NotFound from './pages/NotFound'

export default class App extends Component {
  render() {
    return (
      <UserProvider>
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/" component={NotFound} />
          </Switch>
        </Router>
      </UserProvider>
    )
  }
}
