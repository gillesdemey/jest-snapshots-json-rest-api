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
