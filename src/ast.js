'use strict'
import { dispatch } from './functionDispatcher'
import { buildErrorLiteral, handleFormulonError} from './utils'
import { ReferenceError } from './errors'

export const build = (formula) => {
  /* eslint-disable no-undef */
  const parser = require('./salesforceParser.js')
  /* eslint-enable no-undef */

  try {
    return parser.parse(formula == null ? '' : formula.trim())
  } catch (err) {
    if (err instanceof parser.SyntaxError) {
      return buildErrorLiteral('SyntaxError', 'Syntax error.', {})
    }

    throw err
  }
}

export const traverse = (ast) => {
  return handleFormulonError( () => { return traverseAndThrow(ast) } )
}

export const extract = (ast, state = []) => {
  switch (ast.type) {
    case 'literal':
    case 'error':
      return state
    case 'callExpression':
      return ast.arguments.map((arg) => extract(arg, state)).reduce((a, b) => { return a.concat(b) }, [])
    case 'identifier':
      return state.concat(ast.name)
  }
}

export const replace = (ast, replacement) => {
  switch (ast.type) {
    case 'literal':
    case 'error':
      return ast
    case 'callExpression':
      return {
        type: 'callExpression',
        id: ast.id,
        arguments: ast.arguments.map((arg) => replace(arg, replacement))
      }
    case 'identifier':
      if (replacement[ast.name]) {
        return Object.assign(
          {},
          replacement[ast.name],
          { type: 'literal' }
        )
      } else {
        return ast
      }
  }
}

// private

const traverseAndThrow = (ast) => {
  switch (ast.type) {
    case 'literal':
    case 'error':
      return ast
    case 'callExpression':
      return dispatch(ast.id, ast.arguments.map((arg) => traverseAndThrow(arg)))
    case 'identifier':
      throw new ReferenceError(`Field ${ast.name} does not exist. Check spelling.`, { identifier: ast.name })
  }
}
