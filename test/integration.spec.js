/* global describe it context */

'use strict'

import integration from './integration'

import { expect } from 'chai'

import { parse } from '../lib/formulon'
import { buildDateLiteral, buildDatetimeLiteral, buildLiteralFromJs } from '../lib/utils'

Object.entries(integration).forEach(([category, categoryProperties]) => {
  describe(category, () => {
    categoryProperties.examples.forEach((example) => {
      if(!example.disabled) {
        describe(example.name, () => {
          example.suites.forEach((suite) => {
            if(!suite.disabled) {
              context(suite.context, () => {
                it('returns correct result @integration', () => {
                  expect(parse(example.formula, coerceIdentifiers(suite.identifiers))).to.deep.eq(coerceLiteral(suite.expectedResult))
                }).timeout(5000)
              })
            }
          })
        })
      }
    })
  })
})

const coerceIdentifiers = (identifiers) => {
  const newIdentifiers = {}
  Object.entries(identifiers).forEach(([identifierName, identifierProperties]) => {
    newIdentifiers[identifierName] = coerceLiteral(identifierProperties)
  })

  return newIdentifiers
}

const coerceLiteral = (literal) => {
  switch(literal.dataType) {
    case 'date':
      return buildDateLiteral(literal.value)
    case 'datetime':
      return buildDatetimeLiteral(Date.parse(literal.value))
    case 'picklist':
      return literal
  }

  return buildLiteralFromJs(literal.value)
}
