/* eslint-env jest */

const serializer = require('./')

expect.addSnapshotSerializer(serializer)

test('should not serialize non-HTTP response', () => {
  const object = { foo: 'bar', null: null, undefined: undefined }
  expect(object).toMatchSnapshot()
})

test('should serialize HTTP response', () => {
  const object = { status: 200, body: { hello: 'world' } }
  expect(object).toMatchSnapshot()
})

test('should serialize HTTP Buffer response', () => {
  const object = { statusCode: 200, body: Buffer.from('{ "Hello": "World" }') }
  expect(object).toMatchSnapshot()
})

test('should serialize LightMyRequest HTTP response', () => {
  const object = { statusCode: 200, body: '{ "Hello": "World" }' }
  expect(object).toMatchSnapshot()
})

test('should not serialize null', () => {
  expect(null).toMatchSnapshot()
})

test('should not serialize undefined', () => {
  expect(undefined).toMatchSnapshot()
})

test('should not serialize array', () => {
  expect([true, 'a', 1, { foo: 'bar' }, null, undefined]).toMatchSnapshot()
})

test('should sort required properties in arrays', () => {
  const object = {
    status: 200,
    body: [
      { hello: 'world', foo: 'bar' },
      { hello: 'gilles', foo: 'baz' }
    ]
  }
  expect(object).toMatchSnapshot()
})
