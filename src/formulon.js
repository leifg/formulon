"use strict"

import ASTBuilder from "./astBuilder"
import ASTWalker from "./astWalker"
import { normalizeLiteral } from './functionLookup'

function format(ast) {
  return ast.value
}

function parseAndThrowError(formula, substitutions) {
  let ast = ASTBuilder.build(formula);
  return ASTWalker.walk(ASTWalker.replace(ast, normalizeLiteral(substitutions)))
}

export const parse = function(formula, substitutions) {
  try {
    return parseAndThrowError(formula, substitutions)
  }
  catch(err) {
    return {
      type: "Error",
      errorType: err.constructor.name,
      message: err.message
    }
  }
}

export const extract = function(formula) {
  let ast = ASTBuilder.build(formula);
  return ASTWalker.extract(ast);
}
