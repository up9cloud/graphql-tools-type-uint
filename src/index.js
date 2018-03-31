import { GraphQLScalarType } from 'graphql'
import { GraphQLError } from 'graphql/error'

const MIN = 0
const MAX = Math.pow(2, 32) - 1

export default new GraphQLScalarType({
  name: 'UInt',
  description: `UInt (unsigned int between ${MIN} and ${MAX}) scalar type for [graphql-tools](https://github.com/apollographql/graphql-tools)`,
  serialize (value) {
    if (
      Number.isInteger(value) &&
      value >= MIN &&
      value <= MAX
    ) {
      return value
    }
    return null
  },
  parseValue (value) {
    if (
      Number.isInteger(value) &&
      value >= MIN &&
      value <= MAX
    ) {
      return value
    }
    throw new GraphQLError('', [])
  },
  parseLiteral (ast) {
    const value = Number(ast.value)
    if (
      Number.isInteger(value) &&
      value >= MIN &&
      value <= MAX
    ) {
      return value
    }
    throw new GraphQLError(`Invalid UInt literal.\n${ast.value} is not UInt.`, [ast])
  }
})
