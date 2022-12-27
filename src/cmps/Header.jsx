import { NavLink, withRouter } from 'react-router-dom'
import React from 'react'

export function _Header(props) {
  function onBack() {
    props.history.goBack()
  }
  return (
    <div className="header-main flex">
      <section className="header-logo">
        <img src={require('../assets/images/logo.png')} alt="" onClick={onBack}/>
      </section>
      <section className="header-links flex">
        <ul className="clean-list flex">
          <li> <NavLink exact to="/" >Home</NavLink></li>
          <li> <NavLink to="/contacts" >Contacts</NavLink></li>
          <li><NavLink to="/statistics" >Statistics</NavLink></li>
        </ul>
      </section>
    </div>
  )
}

export const Header = withRouter(_Header)

// onClick={() => onSetPageToDisplay('home')}>
// onClick={() => onSetPageToDisplay('contacts')}
//  onClick={() => onSetPageToDisplay('statistics')}