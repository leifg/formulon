"use strict"

const ASTBuilder = {
  build: function(formula) {
    const parser = require("./salesforceParser.js");
    return parser.parse(formula);
  }
}

export default ASTBuilder
