import jsKraken from "../src"; // "jskraken"

const KRAKEN_CLIENT = process.env.KRAKEN_CLIENT;
const KRAKEN_TOKEN = process.env.KRAKEN_TOKEN;

const kapi = jsKraken(KRAKEN_CLIENT!, KRAKEN_TOKEN);

kapi
  .getCurrentUser()
  .then((users) => {
    kapi
      .getChannelRooms()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
