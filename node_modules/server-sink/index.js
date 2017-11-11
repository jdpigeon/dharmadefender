const sizeStream = require('size-stream')
const logHttp = require('http-ndjson')

module.exports = sink

// HTTP server response target
// (obj, obj, fn) -> obj
function sink (req, res, log) {
  const setSize = logHttp(req, res, log)
  const sink = sizeStream()
  sink.once('size', setSize)
  sink.pipe(res)
  return sink
}
