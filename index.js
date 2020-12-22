'use strict'

const sortKeys = require('sort-keys')
const toSchema = require('generate-schema').json

const isSupertest = res => res.status && res.body
const isLightMyRequest = res => res.statusCode && res.body

const JSONRestAPISnapshotSerializer = {
  test: (res) =>
    res && [
      isSupertest,
      isLightMyRequest
    ].some(testFn => testFn(res)),
  print: ({ body }) => {
    const contents = tryParse(body)
    const schema = sortKeys(toSchema(contents), { deep: true })
    return JSON.stringify(schema, null, 2)
  }
}

// work for string values and Buffers
function tryParse (value) {
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

module.exports = JSONRestAPISnapshotSerializer
