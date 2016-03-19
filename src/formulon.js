"use strict"

import ASTBuilder from "./astBuilder"
import ASTWalker from "./astWalker"
import { buildLiteralFromJs, normalizeLiteral } from './functionLookup'

export const parseAndThrowError = function(formula, substitutions) {
  let ast = ASTBuilder.build(formula)
  return ASTWalker.walk(ASTWalker.replace(ast, normalizeLiteral(substitutions)))
}

export const parse = function(formula, substitutions) {
  if(formula === undefined || formula === null || formula.trim() == '') {
    return buildLiteralFromJs("")
  }

  try {
    return parseAndThrowError(formula, substitutions)
  }
  catch(err) {
    return {
      type: "error",
      errorType: err.constructor.name,
      message: err.message
    }
  }
}

export const extract = function(formula) {
  let ast = ASTBuilder.build(formula);
  return ASTWalker.extract(ast);
}
