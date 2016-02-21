"use strict"

export var Formulon = {
  parse: function(formula) {
    var parser = require("../grammars/salesforceFormula.pegjs");
    return parser.parse(formula);
  }
}
