const fs = require('fs')
const logs = require('../helpers/logs')

const db = JSON.parse(fs.readFileSync('./users.json', 'utf-8'))

const getOnline = () => {
    const {users} = db
    const usersOnline = users.filter(user => user.status === "ONLINE")
    console.log(logs.data, "Online Users", usersOnline)
    return usersOnline
 }
module.exports = getOnline