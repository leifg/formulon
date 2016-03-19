"use strict"

import FunctionLookup from "./functionLookup"

function arrayUnique(a) {
  return a.reduce(function(p, c) {
    if (p.indexOf(c) < 0) p.push(c);
    return p;
  }, []);
};

function walk(ast) {
  switch(ast.type) {
    case "literal":
      return ast
    case "callExpression":
      return FunctionLookup[ast.id](...ast.arguments.map((arg) => walk(arg)))
    case "identifier":
      throw new ReferenceError(`Undefined variable '${ast.name}'`)
  }
}

function _extract(ast, state) {
  switch(ast.type) {
    case "literal":
      return state
    case "callExpression":
      return ast.arguments.map((arg) => _extract(arg, state)).reduce((a,b) => { return a.concat(b) })
    case "identifier":
      return state.concat(ast.name)
  }
}

function extract(ast) {
  return arrayUnique(_extract(ast, []))
}

function replace(ast, replacement) {
  switch(ast.type) {
    case "literal":
      return ast
    case "callExpression":
      return {
        type: "callExpression",
        id: ast.id,
        arguments: ast.arguments.map((arg) => replace(arg, replacement))
      }
    case "identifier":
      if(replacement[ast.name]) {
        let replacementObj = replacement[ast.name]
        return {
          type: "literal",
          value: replacementObj.value,
          dataType: replacementObj.dataType,
          meta: replacementObj.meta
        }
      } else {
        return ast
      }
  }
}

const ASTWalker = {
  walk: walk,
  extract: extract,
  replace: replace,
}

export default ASTWalker
