# attach-css
Localizes CSS based on a virtual DOM tree.

[![build status](https://secure.travis-ci.org/shama/attach-css.svg)](https://travis-ci.org/shama/attach-css)
[![NPM version](https://badge.fury.io/js/attach-css.svg)](https://badge.fury.io/js/attach-css)
[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/shama.svg)](https://saucelabs.com/u/shama)

## example

```js
var attachCSS = require('attach-css')
var createElement = require('base-element')

var button = createElement(document.body)
var vtree = button.render(function () {
  return this.html('button', {
    className: 'my-button'
  }, 'click me')
})

var css = attachCSS('button { cursor: pointer; }', vtree)
// css will equal: button.my-button { cursor: pointer; }
```

## api

### `attachCSS(src, vtree[, options])`

* `src` - A string of CSS to localize.
* `vtree` - A virtual DOM tree to localize against.
* `options` - Options to use when parsing/stringifying the CSS. See [https://www.npmjs.com/package/css](https://www.npmjs.com/package/css).

# license
(c) 2015 Kyle Robinson Young. MIT License
