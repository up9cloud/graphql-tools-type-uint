# graphql-tools-type-uint

[![Build Status](https://travis-ci.org/up9cloud/graphql-tools-type-uint.svg?branch=master)](https://travis-ci.org/up9cloud/graphql-tools-type-uint)
[![Coverage Status](https://coveralls.io/repos/github/up9cloud/graphql-tools-type-uint/badge.svg?branch=master)](https://coveralls.io/github/up9cloud/graphql-tools-type-uint?branch=master)

UInt (unsigned int) scalar type for [graphql-tools](https://github.com/apollographql/graphql-tools)

## Usage

```js
import { makeExecutableSchema } from 'graphql-tools'
import UInt from 'graphql-tools-type-uint'

let typeDefs = [`
scalar UInt
type Query {
  value(v: UInt): UInt
}`
]
let resolvers = {
  UInt,
  Query: {
    value: (root, { v }) => v
  }
}
let schema = makeExecutableSchema({ typeDefs, resolvers })

export default schema
```
