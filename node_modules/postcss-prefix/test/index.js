const prefix = require('../')
const postcss = require('postcss')
const test = require('tape')
const path = require('path')
const fs = require('fs')

test('postcss-prefix', function (t) {
  const expected = fs.readFileSync(path.join(__dirname, 'fixture-out.css'), 'utf8')
  const css = fs.readFileSync(path.join(__dirname, 'fixture.css'), 'utf8')
  const out = postcss()
    .use(prefix('#hello-world'))
    .process(css)
    .toString()

  t.equal(out, expected, 'output is as expected')
  t.end()
})

test('postcss-prefix: keyframes ignored', function (t) {
  const css = fs.readFileSync(path.join(__dirname, 'keyframe.css'), 'utf8')
  const out = postcss()
    .use(prefix('#key'))
    .process(css)
    .toString()

  t.equal(out, css, 'keyframes are not prefixed')
  t.end()
})
