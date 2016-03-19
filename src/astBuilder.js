"use strict"

const ASTBuilder = {
  build: function(formula) {
    const parser = require("./salesforceParser.js")
    try {
      return parser.parse(formula);
    } catch(err) {
      if(err instanceof parser.SyntaxError) {
        throw new EvalError("Parsing Error")
      }

      throw err
    }
  }
}

export default ASTBuilder
