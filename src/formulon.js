'use strict'

import { build, extract as astExtract, replace, traverse } from './ast'
import { arrayUnique, buildLiteralFromJs, coerceLiteral } from './utils'

export const parse = (formula, substitutions = {}) => {
  if (formula == null || formula.trim() === '') {
    return buildLiteralFromJs('')
  }

  let ast = build(formula)

  let coercedSubstitions = Object.keys(substitutions).reduce((previous, current) => {
    previous[current] = coerceLiteral(substitutions[current])
    return previous
  }, {})

  return traverse(replace(ast, coercedSubstitions))
}

export const extract = (formula) => {
  if (formula == null || formula.trim() === '') {
    return []
  }

  let ast = build(formula)
  return arrayUnique(astExtract(ast))
}
