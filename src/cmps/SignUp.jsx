import React, { Component } from 'react'
import { UserService } from '../services/UserService.js'

export class SignUp extends Component {
  state = {
    user: null,
  }

  async componentDidMount() {
    const user = await UserService.getEmptyUser()
    this.setState({ user })
    //    if (user) return this.props.history.push('/')
  }

  onSignup = async (ev) => {
    ev.preventDefault()
    try {
      await UserService.signUp({ ...this.state.user })
      this.props.history.push('/')
    } catch (err) {
      console.log('err:', err)
    }
  }

  handleChange = ({ target }) => {
    const field = target.name
    let value = target.value
    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break
      case 'checkbox':
        value = target.checked
        break
      default:
        break
    }

    this.setState((prevState) => ({
      user: { ...prevState.user, [field]: value },
    }))
  }

  render() {
    const { user } = this.state
    if (!user) return
    const { name } = user
    return (
      <section className="user-signup">
        <form onSubmit={this.onSignup}>
          <label htmlFor="name">Name</label>
          <input
            onChange={this.handleChange}
            value={name}
            type="text"
            name="name"
            id="name"
          />
          <button>Sign-up</button>
        </form>
        <img src={require('../assets/images/wallet.png')} alt=""/>
      </section>
    )
  }
}
