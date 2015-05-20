var attachCSS = require('../index.js')

var test = require('tape')
var createElement = require('base-element')
var document = require('global/document')

test('button -> button.my-button', function (t) {
  t.plan(2)
  var result

  setUp(function (fixture) {
    var button = createButton(fixture)

    result = attachCSS('button { color: red; }', button.vtree, { compress: true })
    t.equal(result, 'button.my-button{color:red;}')

    result = attachCSS('button em { font-style: italic; }', button.vtree, { compress: true })
    t.equal(result, 'button.my-button em{font-style:italic;}')

    tearDown(t.end)
  })
})

test('.my-button -> .my-button', function (t) {
  t.plan(1)
  var result

  setUp(function (fixture) {
    var button = createButton(fixture)

    result = attachCSS('.my-button { color: red; } .my-button em { font-style: italic; }', button.vtree, { compress: true })
    t.equal(result, '.my-button{color:red;}.my-button em{font-style:italic;}')

    tearDown(t.end)
  })
})

test('#my-button -> #my-button', function (t) {
  t.plan(2)
  var result

  setUp(function (fixture) {
    var button = createButton(fixture, { id: 'my-button' })

    result = attachCSS('#my-button { color: red; }', button.vtree, { compress: true })
    t.equal(result, '#my-button{color:red;}')

    result = attachCSS('#my-button em { font-style: italic; }', button.vtree, { compress: true })
    t.equal(result, '#my-button em{font-style:italic;}')

    tearDown(t.end)
  })
})

test('* -> .my-button *', function (t) {
  t.plan(1)
  var result

  setUp(function (fixture) {
    var button = createButton(fixture)

    result = attachCSS('* { color: red; }', button.vtree, { compress: true })
    t.equal(result, '.my-button *{color:red;}')

    tearDown(t.end)
  })
})

test('.my-button.second -> .my-button.second', function (t) {
  t.plan(2)
  var result

  setUp(function (fixture) {
    var button = createButton(fixture)

    result = attachCSS('.my-button.second { color: red; }', button.vtree, { compress: true })
    t.equal(result, '.my-button.second{color:red;}')

    result = attachCSS('.my-button.second button { color: red; }', button.vtree, { compress: true })
    t.equal(result, '.my-button.second button{color:red;}')

    tearDown(t.end)
  })
})

function createButton (fixture, params) {
  params = params || { className: 'my-button' }
  var button = createElement(fixture)
  button.render(function () {
    return this.html('button', params, this.html('em', 'click me'))
  })
  return button
}

function setUp (cb) {
  var fixture = document.createElement('div')
  fixture.setAttribute('id', 'fixture')
  document.body.appendChild(fixture)
  cb(fixture)
}

function tearDown (cb) {
  var fixture = document.getElementById('fixture')
  if (fixture) fixture.parentNode.removeChild(fixture)
  cb()
}
