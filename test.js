/* eslint-env jest */

const serializer = require('./')

expect.addSnapshotSerializer(serializer)

test('should not serialize non-HTTP response', () => {
  const object = { foo: 'bar' }
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
