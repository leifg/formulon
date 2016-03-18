"use strict"

import ASTBuilder from "./astBuilder"
import ASTWalker from "./astWalker"
import { normalizeLiteral } from './functionLookup'

function format(ast) {
  return ast.value
}

export const parse = function(formula, substitutions) {
  let ast = ASTBuilder.build(formula);
  return format(ASTWalker.walk(ASTWalker.replace(ast, normalizeLiteral(substitutions))));
}

export const extract = function(formula) {
  let ast = ASTBuilder.build(formula);
  return ASTWalker.extract(ast);
}
