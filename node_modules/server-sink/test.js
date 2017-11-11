const getPort = require('get-server-port')
const stream = require('stream')
const bole = require('bole')
const http = require('http')
const tape = require('tape')
const bl = require('bl')

const serverSink = require('./')

tape('should emit events', function (t) {
  t.plan(4)
  const buf = bl()
  bole.output({
    level: 'info',
    stream: buf
  })

  const log = bole('test1')
  const server = http.createServer(function (req, res) {
    const sink = serverSink(req, res, log.info)
    const rs = new stream.PassThrough()
    rs.pipe(sink)

    rs.end('hello world')
  }).listen()

  const port = getPort(server)
  http.get('http://localhost:' + port, function (res) {
    const str = '[' + String(buf).replace(/\n/, ',') + ']'
    const arr = JSON.parse(str)
    t.equal(arr.length, 2, 'arr is right length')
    t.equal(arr[0].message, 'request', 'request exists')
    t.equal(arr[1].message, 'response', 'response exists')
    t.equal(arr[1].contentLength, 11, 'length set')
    server.close()
  })
})
