"use strict"

let FunctionLookup = require("./functionLookup")

function walk(ast) {
  switch(ast.type) {
    case "Literal":
      return ast.value
    case "CallExpression":
      return FunctionLookup[ast.id](...ast.arguments.map((arg) => walk(arg)))
    case "Identifier":
      throw new ReferenceError(`Undefined variable '${ast.name}'`)
  }
}

function _extract(ast, state) {
  switch(ast.type) {
    case "Literal":
      return state
    case "CallExpression":
      return ast.arguments.map((arg) => _extract(arg, state)).reduce((a,b) => { return a.concat(b) })
    case "Identifier":
      return state.concat(ast.name)
  }
}

function extract(ast) {
  return _extract(ast, [])
}

function replace(ast, replacement) {
  return ast
}

let ASTWalker = {
  walk: walk,
  extract: extract,
  replace: replace,
}

module.exports = ASTWalker;
