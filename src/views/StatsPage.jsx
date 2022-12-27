import React, { Component } from 'react'
import { BitCoinService } from '../services/BitcoinService.js'
import { Sparklines, SparklinesLine } from 'react-sparklines'

export class StatsPage extends Component {
  componentDidMount() {
    this.getPriceData()
    this.getTransactionsData()
  }
  state = {
    marketPrice: [1, 2, 3, 4, 5, 6, 67, 7, 7, 8, 78, 67, 67, 867, 86, 78, 67],
    transactionsVolume: [1],
    firstDay: null,
    lastDay: null,
  }
  getTransactionsData = async () => {
    const {marketPrice} = await BitCoinService.getConfirmedTransactions()
    this.setState({ transactionsVolume : marketPrice })
    // return transactionsVolume How can I fix this without using 2 functions
  }

  getPriceData = async () => {
    const {marketPrice , firstDay , lastDay} = await BitCoinService.getMarketPrice()
    this.setState({ marketPrice , firstDay , lastDay })
    // return marketPrice
  }

  render() {
    if (!this.state.marketPrice || !this.state.transactionsVolume ) return <div>Loading...</div>
    return (
      <div className="statistics">
        <section className='bitcoin price'>
         <h1>Bitcoin Price</h1>
        <Sparklines
          data={this.state.marketPrice}
          limit={180}
          width={200}
          height={50}
          margin={0.5}>
          <SparklinesLine style={{ stroke: 'black', fill: 'none', strokeWidth: "0.1"}} />
        </Sparklines>
        <section className='graph-dates'>
          <div>{this.state.firstDay}</div>
          <div>{this.state.lastDay}</div>
        </section>
        </section>
        <section className='bitcoin transactions'>
         <h1>Confirmed Transactions</h1>
        <Sparklines
          data={this.state.transactionsVolume}
          limit={180}
          width={200}
          height={50}
          margin={0.5}>
          <SparklinesLine style={{ stroke: 'green', fill: 'none', strokeWidth: "0.1"}} />
        </Sparklines>
        <section className='graph-dates'>
          <div>{this.state.firstDay}</div>
          <div>{this.state.lastDay}</div>
        </section>
        </section>
      </div>
    )
  }
}
