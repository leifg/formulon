"use strict"

export var Formulon = {
  parse: function(formula) {
    var parser = require("../grammars/arithmetics.pegjs");
    return parser.parse(formula);
  }
}
