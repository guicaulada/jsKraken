import jsKraken from "../src"; // "jskraken"

const TWITCH_CLIENT = process.env.TWITCH_CLIENT;
const TWITCH_TOKEN = process.env.TWITCH_TOKEN;

const kapi = jsKraken(TWITCH_CLIENT!, TWITCH_TOKEN);

kapi
  .getCurrentUser()
  .then((user) => {
    kapi
      .getUserFollows(user.data!._id.toString())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
