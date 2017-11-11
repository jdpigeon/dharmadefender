# postcss-prefix
Replace `:host` elements with a prefix of your choosing

## Usage
```js
const prefix = require('postcss-prefix')
const postcss = require('postcss')

const css = `
  :host { color: blue }
  .hello { color: black }
`

const newCss = postcss()
  .use(prefix('#hello-world'))
  .process(css)
  .toString()

console.log(newCss)
// => #hello-world { color: blue }
// => .hello { color: black }
`
```

## See Also
- [sheetify](https://github.com/stackcss/sheetify)

## License
[MIT](https://tldrlegal.com/license/mit-license)
