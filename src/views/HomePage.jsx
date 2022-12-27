import React, { Component } from 'react'
import { UserService } from '../services/UserService.js'
import { BitCoinService } from '../services/BitcoinService.js'
import { MoveList } from '../cmps/MoveList'

export class HomePage extends Component {
  state = {
    user: null,
    rate: null,
  }

  componentDidMount() {
    this.loadUser()
  }

  loadUser = async () => {
    const user = await UserService.getUser()
    if (!user) return this.props.history.push('/signup')
    this.setState({ user }, () => {
      this.loadRate(user.coins)
    })
  }
  loadRate = async (coins) => {
    const rate = await BitCoinService.getRate(coins)
    this.setState({ rate })
  }

  render() {
    const { user } = this.state
    console.log(user)
    if (!user) return <div>Loading...</div>
    const { moves } = user
    console.log(moves)
    return (
      <section className="home-page">
        <section className='flex space-around'>
        <section className="user-details">
          <section className="info">
            <section>
              <h3>Hello {user.name}!</h3>
            </section>
            <section>
              <h3> Coins: {user.coins}</h3>
            </section>
            <section>
              <h3> BTC: {this.state.rate} </h3>
            </section>
          </section>
        </section>
        </section>
        <section className="user-moves flex">
          <h2> Your Last Moves:</h2>
          <MoveList moves={moves}/>
        </section>
      </section>
    )
  }
}
