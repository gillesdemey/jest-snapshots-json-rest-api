'use strict'

const sortKeys = require('sort-keys')
const toSchema = require('generate-schema').json

const JSONRestAPISnapshotSerializer = {
  test: (res) => res.status && res.body,
  print: ({ body }) => {
    const schema = sortKeys(toSchema(body), { deep: true })
    return JSON.stringify(schema, null, 2)
  }
}

module.exports = JSONRestAPISnapshotSerializer
