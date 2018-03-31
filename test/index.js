import { expect } from 'chai'
import { graphql } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'

import UInt from '../src'

const whiteList = [
  0,
  1.0,
  Math.pow(2, 32) - 1
]
const blackList = [
  -1,
  0.1,
  Math.pow(2, 32),
  'foo',
  [],
  {}
]

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

describe('UInt', () => {
  describe('serialize', () => {
    it('valid value should pass', () => {
      for (let v of whiteList) {
        expect(UInt.serialize(v)).to.be.equal(v)
      }
    })
    it('invalid value should return null', () => {
      for (let v of blackList) {
        expect(UInt.serialize(v)).to.be.equal(null)
      }
    })
  })

  describe('parseValue', () => {
    it('valid value should pass', async () => {
      for (let v of whiteList) {
        let { data } = await graphql(
          schema,
          `query ($v: UInt) {
            value(v: $v)
          }`,
          null,
          null,
          { v }
        )
        expect(data.value).to.be.equal(v)
      }
    })
    it('invalid value should return errors', async () => {
      for (let v of blackList) {
        let data = await graphql(
          schema,
          `query ($v: UInt) {
            value(v: $v)
          }`,
          null,
          null,
          { v }
        )
        expect(data.data).to.be.equal(undefined)
        // expect(data.data.value).to.be.equal(undefined)
        expect(data.errors).to.be.an('array')
      }
    })
  })

  describe('parseLiteral', () => {
    it('valid value should pass', async () => {
      for (let v of whiteList) {
        let { data } = await graphql(
          schema,
          `query { value(v: ${isNaN(v) ? JSON.stringify(v) : v}) }`
        )
        expect(data.value).to.be.equal(v)
      }
    })
    it('invalid value should return errors', async () => {
      for (let v of blackList) {
        let data = await graphql(
          schema,
          `query { value(v: ${isNaN(v) ? JSON.stringify(v) : v}) }`
        )
        expect(data.data).to.be.equal(undefined)
        // expect(data.data.value).to.be.equal(undefined)
        expect(data.errors).to.be.an('array')
      }
    })
  })
})
