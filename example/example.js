let KrakenAPI = require('..') //jskraken

const KRAKEN_TOKEN = process.env.KRAKEN_TOKEN

let kapi = new KrakenAPI(KRAKEN_TOKEN)

kapi.getCurrentUser().then((user) => {
  kapi.getChannelRooms(user._id).then((data) => {
    console.log(data)
  }).catch(err => console.log(err))
}).catch(err => console.log(err))