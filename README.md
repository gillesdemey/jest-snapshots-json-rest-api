# jest-snapshots-json-rest-api 

[![Build Status](https://travis-ci.org/gillesdemey/jest-snapshots-json-rest-api.svg?branch=master)](https://travis-ci.org/gillesdemey/jest-snapshots-json-rest-api)

Jest Snapshots serializer for JSON REST APIs.

## Install

`yarn add --dev jest-snapshots-json-rest-api`

## Usage

The object you want to snapshot **must** match the following struct for the serializer to work:

```javascript
{
  status: 200,
  body: {
  	hello: 'world'
  }
}
```

Modules like `superstruct` work out-of-the-box.

```javascript
const app = require('./app')
const request = require('superstruct')
const serializer = require('jest-snapshots-json-rest-api')

// add the JSON REST API snapshot serializer
expect.addSnapshotSerializer(serializer)

test('get a user', async () => {
  const response = await request(app)
    .get('/users/')

  expect(response.status).toBe(200)
  expect(response.body.length).toBeGreaterThanOrEqual(3)

  expect(response).toMatchSnapshot()
})
```

This will generate the corresponding `.snap` file:

```javascript
exports[`get a user 1`] = `{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "properties": {
    "created_at": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "first_name": {
      "type": "null"
    },
    "full_name": {
      "type": "string"
    },
    "id": {
      "type": "string"
    },
    "last_name": {
      "type": "null"
    },
    "status": {
      "type": "string"
    },
    "updated_at": {
      "type": "string"
    }
  },
  "type": "object"
}
`;
```
