"use strict"

const ASTBuilder = {
  build: function(formula) {
    const parser = require("../grammars/salesforceFormula.js");
    return parser.parse(formula);
  }
}

export default ASTBuilder
