# jsKraken #

**jsKraken** is a Javascript module for working with the [Twitch Kraken API](https://dev.twitch.tv/docs/v5).

## Requirements
* Tested against Twitch API v5
* For Node.js you will need the [xmlhttprequest](https://www.npmjs.com/package/xmlhttprequest) library.

## Documentation ##
### Getting Started

If you are using Node.js, install jsKraken using npm:

```bash
$ npm install jskraken
```

You can now require and use jskraken like so:

```js
let KrakenAPI = require('jskraken')

const KRAKEN_TOKEN = process.env.KRAKEN_TOKEN

let kapi = new KrakenAPI(KRAKEN_TOKEN)

kapi.getCurrentUser().then((user) => {
  kapi.getChannelRooms(user._id).then((data) => {
    console.log(data)
  }).catch(err => console.log(err))
}).catch(err => console.log(err))
```

Refer to the [Kraken API Documentation](https://dev.twitch.tv/docs/v5) and the [jsKraken Example](https://github.com/Sighmir/jsKraken/tree/master/example) for more information.  

### Browser

You can also load this script on your browser like so:

```html
<script src='https://cdn.jsdelivr.net/npm/jskraken/jsKraken.js'></script>
```

You can now use the class KrakenAPI normally on the page, like you would on Node.js.

## License ##
```
jsKraken - Kraken API Javascript Library.
Copyright (C) 2019  Guilherme Caulada (Sighmir)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
