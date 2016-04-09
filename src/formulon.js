'use strict'

import { build, extract as astExtract, replace, traverse } from './ast'
import { arrayUnique, buildLiteralFromJs, coerceLiteral } from './utils'

export const parseAndThrowError = (formula, substitutions = {}) => {
  let ast = build(formula)
  let coercedSubstitions = Object.keys(substitutions).reduce((previous, current) => {
    previous[current] = coerceLiteral(substitutions[current])
    return previous
  }, {})
  return traverse(replace(ast, coercedSubstitions))
}

export const parse = (formula, substitutions = {}) => {
  if (formula == null || formula.trim() === '') {
    return buildLiteralFromJs('')
  }

  try {
    return parseAndThrowError(formula, substitutions)
  } catch (err) {
    return {
      type: 'error',
      errorType: err.constructor.name,
      message: err.message
    }
  }
}

export const extract = (formula) => {
  if (formula == null || formula.trim() === '') {
    return []
  }

  let ast = build(formula)
  return arrayUnique(astExtract(ast))
}
