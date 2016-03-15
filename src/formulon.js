"use strict"

import ASTBuilder from "./astBuilder"
import ASTWalker from "./astWalker"

export const parse = function(formula, substitutions) {
  let ast = ASTBuilder.build(formula);
  return ASTWalker.walk(ASTWalker.replace(ast, substitutions));
}

export const extract = function(formula) {
  let ast = ASTBuilder.build(formula);
  return ASTWalker.extract(ast);
}
