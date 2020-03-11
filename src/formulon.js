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

export const toString = (literal) => {
  switch(literal.dataType) {
    case 'null':
      return 'NULL'
    case 'number':
      return literal.value.toString()
    case 'text':
    case 'picklist':
        return `"${literal.value}"`
    case 'multipicklist':
      return '[' + literal.value.map((value) => `"${value}"` ).join(', ') + ']'
    case 'checkbox':
      return literal.value.toString().toUpperCase()
    case 'date':
      return `${literal.value.getUTCFullYear()}-${(literal.value.getUTCMonth() + 1).toString().padStart(2, '0')}-${literal.value.getUTCDate().toString().padStart(2, '0')}`
    case 'datetime':
      return literal.value.toISOString()
    case 'geolocation':
      return `${literal.value[0].toFixed(6)}, ${literal.value[1].toFixed(6)}`
  }
}
