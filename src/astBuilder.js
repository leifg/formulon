"use strict"

let ASTBuilder = {
  build: function(formula) {
    var parser = require("../grammars/salesforceFormula.pegjs");
    return parser.parse(formula);
  }
}

module.exports = ASTBuilder;
