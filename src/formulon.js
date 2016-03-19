"use strict"

import { build, extract as astExtract, replace, traverse } from "./ast"
import { arrayUnique, buildLiteralFromJs, normalizeLiteral } from './utils'

export const parseAndThrowError = function(formula, substitutions) {
  let ast = build(formula)
  return traverse(replace(ast, normalizeLiteral(substitutions)))
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
  let ast = build(formula);
  return arrayUnique(astExtract(ast))
}
