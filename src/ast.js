'use strict'
import { dispatch } from './functionDispatcher'

export const build = (formula) => {
  const parser = require('./salesforceParser.js')
  try {
    return parser.parse(formula == null ? '' : formula.trim())
  } catch (err) {
    if (err instanceof parser.SyntaxError) {
      throw new EvalError('Parsing Error')
    }

    throw err
  }
}

export const traverse = (ast) => {
  switch (ast.type) {
    case 'literal':
      return ast
    case 'callExpression':
      return dispatch(ast.id, ast.arguments.map((arg) => traverse(arg)))
    case 'identifier':
      throw new ReferenceError(`Undefined variable '${ast.name}'`)
  }
}

export const extract = (ast, state = []) => {
  switch (ast.type) {
    case 'literal':
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
