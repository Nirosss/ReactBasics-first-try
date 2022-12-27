import axios from 'axios'

export const BitCoinService =  {
    getRate,
    getMarketPrice,
    getConfirmedTransactions
}

async function getRate(coins) {
    const res = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
    return res.data
}

async function getMarketPrice() {
    const res = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=6months&format=json&cors=true`)
    return setDataToDisplay(res.data.values)
    
}

async function getConfirmedTransactions() {
    const res = await axios.get(`https://api.blockchain.info/charts/transactions-per-second?timespan=6months&rollingAverage=24hours&format=json&cors=true`)
    return setDataToDisplay(res.data.values)
}

function setDataToDisplay(values){
    let firstDay = getDate(values[0].x)
    let lastDay = getDate(values[values.length-1].x)
    let marketPrice = values.map((value) => value.y)
    return {marketPrice, firstDay ,lastDay}
}

function getDate(date){
    const newDate = new Date(date * 1000)
    return newDate.toLocaleDateString()
}