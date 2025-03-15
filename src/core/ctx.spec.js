import test from 'ava'
import ctx from './ctx.js'

test('should get an empty store', (t) => {
  t.falsy(ctx.store)
})

test('should get nth where ctx is empty', (t) => {
  t.falsy(ctx.get('404'))
})

test('should set value for async context', (t) => {
  ctx.set({ abc: 'xyz' })
  t.is(ctx.get('abc'), 'xyz')
})

test('should get `bar` where ctx has `foo`', (t) => {
  ctx.run({ foo: 'bar' }, () => {
    t.is(ctx.get('foo'), 'bar')
  })
})
