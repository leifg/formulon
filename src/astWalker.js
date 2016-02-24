"use strict"

function walk(ast) {
  switch(ast.type) {
    case "Literal":
      return ast.value
    case "CallExpression":
      return FunctionLookup[ast.id](...ast.arguments.map((arg) => walk(arg) ))
  }
  return ast.value;
}

let FunctionLookup = {
  add: function(a, b) {
    return a + b
  }
}

let ASTWalker = {
  walk: walk
}

module.exports = ASTWalker;
