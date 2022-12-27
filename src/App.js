import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import './assets/scss/global.scss'
import { ContactApp } from './views/ContactApp'
import React, { Component } from 'react'
import { Header } from './cmps/Header'
import { HomePage } from './views/HomePage'
import { StatsPage } from './views/StatsPage'
import { ContactDetails } from './views/ContactDetails'
import { ContactEdit } from './views/ContactEdit'
import { SignUp } from './cmps/SignUp'
export class App extends Component {
  state = {
    page: 'home',
    loggedInUser: 'Dominique Soto',
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/contacts/edit/:id?" component={ContactEdit} />
            <Route path="/contacts/:id" component={ContactDetails} />
            <Route path="/contacts" component={ContactApp} />
            <Route path="/statistics" component={StatsPage} />
            <Route path="/signup" component={SignUp} />
            <Route path="/" component={HomePage} />
          </Switch>
        </div>
      </Router>
    )
  }
}

// onSetPageToDisplay = (page) => {
//   this.setState({ page })
// }
// onSetPageToDisplay= {this.onSetPageToDisplay}
// {this.state.page === 'contacts' &&<ContactApp/>}
// {this.state.page === 'home' && <HomePage user = {this.state.loggedInUser}/>}
// {this.state.page === 'statistics' && <StatsPage/>}
