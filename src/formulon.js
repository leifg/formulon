"use strict"

let Formulon = {
  parse: function(formula) {
    var parser = require("../grammars/salesforceFormula.pegjs");
    return parser.parse(formula);
  }
}

module.exports = Formulon;
