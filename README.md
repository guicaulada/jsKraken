# jsKraken

[npm-url]: https://npmjs.org/package/jskraken
[npm-image]: https://img.shields.io/npm/v/jskraken.svg
[pipeline-image]: https://github.com/Sighmir/jsKraken/workflows/CI/CD/badge.svg
[pipeline-url]: https://github.com/Sighmir/jsKraken/actions?query=workflow%3ACI%2FCD
[coverage-image]: https://codecov.io/gh/Sighmir/jsKraken/graph/badge.svg
[coverage-url]: https://codecov.io/gh/Sighmir/jsKraken
[quality-image]: https://sonarcloud.io/api/project_badges/measure?project=jsKraken&metric=alert_status
[quality-url]: https://sonarcloud.io/dashboard?id=jsKraken
[depstat-url]: https://david-dm.org/Sighmir/jsKraken
[depstat-image]: https://david-dm.org/Sighmir/jsKraken/status.svg
[devdepstat-url]: https://david-dm.org/Sighmir/jsKraken?type=dev
[devdepstat-image]: https://david-dm.org/Sighmir/jsKraken/dev-status.svg

[![NPM version][npm-image]][npm-url]
[![Pipeline Status][pipeline-image]][pipeline-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Sonarcloud Status][quality-image]][quality-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Dev Dependency Status][devdepstat-image]][devdepstat-url]

**jsKraken** is a Typescript wrapper to the [Twitch Kraken API](https://dev.twitch.tv/docs/v5).

## Requirements

- Tested against Twitch API v5
- For Node.js you will need the [xmlhttprequest](https://www.npmjs.com/package/xmlhttprequest) library.
- A Twitch token, get yours here: https://twitchtokengenerator.com

## Documentation

### Getting Started

If you are using Node.js, install jsKraken using npm:

```bash
$ npm install jskraken
```

You can now require and use jskraken like so:

```ts
import jsKraken from "jskraken";

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
```

Refer to the [Kraken API Documentation](https://dev.twitch.tv/docs/v5) and the [jsKraken Example](https://github.com/Sighmir/jsKraken/tree/master/example) for more information.

### Browser

You can also load this script on your browser like so:

```html
<script src="https://cdn.jsdelivr.net/npm/jskraken/dist/bundle.js"></script>
```

You can now use jsKraken normally on the page, like you would on Node.js.

## License

```
jsKraken - Helix API Javascript Library.
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
