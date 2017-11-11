'use strict';

const postcss = require('postcss')
const Selector = require('postcss-selector-parser')

module.exports = postcss.plugin('postcss-prefix', postcssPrefix)

function postcssPrefix (prefix, options) {
  options = options || {}

  return function walk (root) {
    root.walkRules(function (rule) {
      const selector = Selector(transformSelectors)
        .process(rule.selector).result

      rule.selector = selector
    })
  }

  function transformSelectors (selectors) {
    selectors.eachInside(function (selector) {
      // don't prefix if parent is not selector
      if (selector.parent.type !== 'selector') return

      // don't prefix if not first node in container
      if (selector.parent.nodes[0] !== selector) return

      // don't prefix pseudo selector args unless it's `:not`
      if (selector.parent.parent.type === 'pseudo' && selector.parent.parent.value !== ':not') {
        return
      }

      if (selector.type === 'pseudo' && selector.value === ':host') {
        const prefixNode = getPrefixNode(prefix)
        const replacement = Selector.selector()
        replacement.nodes = [prefixNode].concat(selector.clone().nodes)
        selector.replaceWith(replacement)
      } else if (selector.type === 'pseudo' && selector.value === ':host-context') {
        const prefixNode = getPrefixNode(prefix)
        const replacement = Selector.selector()
        const prevNodes = selector.clone().nodes
        replacement.nodes = prevNodes.concat(' ', prefixNode, ', ', prefixNode, prevNodes)
        selector.replaceWith(replacement)
      }
    })
  }
}

function getPrefixNode (prefix) {
  const sigil = prefix[0]
  const value = prefix.slice(1)

  switch (sigil) {
    case '#':
      return Selector.id({ value: value })
    case '.':
      return Selector.className({ value: value })
  }
}
