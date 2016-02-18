"use strict"

class Formulon {
  parse(formula) {
    let grammar = 'start \n\
      = additive \n\
     \n\
    additive \n\
      = left:multiplicative "+" space? right:additive { return left + right; } \n\
      / multiplicative \n\
    \n\
    multiplicative \n\
      = left:primary "*" space? right:multiplicative { return left * right; } \n\
      / primary \n\
    \n\
    primary \n\
      = integer \n\
      / "(" additive:additive ")" { return additive; } \n\
    \n\
    integer "integer" \n\
      = digits:[0-9]+ space? { return parseInt(digits.join(""), 10); } \n\
    \n\
    space = " "'

    let peg = require("pegjs")
    let parser = peg.buildParser(grammar)
    return parser.parse(formula)
  }
}

module.exports = Formulon;
