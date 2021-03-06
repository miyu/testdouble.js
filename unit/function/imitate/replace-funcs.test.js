import Double from '../../../src/value/double'

let create, subject
module.exports = {
  beforeEach: () => {
    create = td.replace('../../../src/function/create').default
    subject = require('../../../src/function/imitate/replace-funcs').default
  },
  'replace-top level func props, leave others': () => {
    function foo () {}
    const parentDouble = new Double('FOO', null, foo)
    function bar () {}
    foo.a = bar
    foo.b = 42
    const childDouble = new Double(null, null, 'fake FOO.bar')
    td.when(create(bar)).thenReturn(childDouble)

    subject(parentDouble)

    assert.equal(foo.a, 'fake FOO.bar')
    assert.equal(foo.b, 42)
    assert.equal(childDouble.parent, parentDouble)
    assert.equal(parentDouble.children.has(childDouble), true)
  },
  'replace top-level constructor funcs with fake constructors': () => {
    // RTODO: depends on new impl of td.constructor(), not current behavior
  }
}
