/* global describe it context */

'use strict'

import integration from './integration'

import { expect } from 'chai'

import { parse } from '../lib/formulon'
import { buildDateLiteral, buildLiteralFromJs } from '../lib/utils'

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
                })
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
  if(literal.dataType == 'date') {
    return buildDateLiteral(literal.value)
  }
  return buildLiteralFromJs(literal.value)
}
