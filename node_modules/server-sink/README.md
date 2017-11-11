# server-sink [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5] [![test coverage][6]][7]
[![downloads][8]][9] [![js-standard-style][10]][11]

HTTP server response target. Creates a pipeable endpoint that logs out
requests and responses with the proper response size.

## Usage
```js
const serverSink = require('server-sink')
const bole = require('bole')
const http = require('http')
const fs = require('fs')

const log = bole('app-main')

http.createServer(function (req, res) {
  const sink = serverSink(req, res, log.info)
  const rs = fs.createReadStream('./my-file')
  rs.pipe(sink)
})
```

## API
### sink = serverSink(req, res, log)
Create a new sink. Takes an HTTP `incomingMessage`, `serverReponse` and log
method (`bole` is recommended, not mandatory).

## Installation
```sh
$ npm install server-sink
```

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/server-sink.svg?style=flat-square
[3]: https://npmjs.org/package/server-sink
[4]: https://img.shields.io/travis/yoshuawuyts/server-sink/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/server-sink
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/server-sink/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/server-sink
[8]: http://img.shields.io/npm/dm/server-sink.svg?style=flat-square
[9]: https://npmjs.org/package/server-sink
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
