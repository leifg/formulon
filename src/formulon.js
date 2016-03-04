"use strict"

let ASTBuilder = require("./astBuilder");
let ASTWalker = require("./astWalker");

let Formulon = {
  parse: function(formula, substitutions) {
    var ast = ASTBuilder.build(formula);
    return ASTWalker.walk(ASTWalker.replace(ast, substitutions));
  }
}

module.exports = Formulon;
