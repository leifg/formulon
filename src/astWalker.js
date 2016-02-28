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

let ASTWalker = {
  walk: walk
}

module.exports = ASTWalker;
