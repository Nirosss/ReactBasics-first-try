import { storageService } from '../services/storage.service'

const USER_STORAGE = 'user'

export const UserService = {
    getUser,
    getEmptyUser,
    signUp,
    addMove
}
const USERS = [
    { name: "Ochoa Hyde", coins: 100, moves: [] },
    { name: "Hallie Mclean", coins: 120, moves: [] },
    { name: "Parsons Norris", coins: 33, moves: [] },
    { name: "Dominique Soto", coins: 199, moves: [] }
]
function getUser() {
    const currUser = storageService.loadFromStorage(USER_STORAGE) 
    return currUser
    // return new Promise((resolve, reject) => {
    //     const user = USERS.find(user => user.name === currUser)
    //     user ? resolve(user) : reject(`User Name ${currUser} not found!`)
    // })
}

function getEmptyUser(){
    return {
        name:'',
        coins:getRandomInt(20,200),
        moves:[]
    }
}

function addMove(move){
    console.log(move)
    const { amount, toUser } = move 
    const fromUser = getUser()
    return new Promise((resolve, reject) => {
    if (amount > fromUser.coins) return reject (`Insufficient funds!`)
    fromUser.coins = fromUser.coins - amount
    toUser.coins = toUser.coins + amount
    move._id = _makeId(5)
    move.date = (new Date())
    fromUser.moves.push(move)
    storageService.saveToStorage(USER_STORAGE , fromUser)
    resolve (`${amount} Were Transfer`)
})
}

function signUp(user){
    storageService.saveToStorage(USER_STORAGE , user)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}

function _makeId(length = 10) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}