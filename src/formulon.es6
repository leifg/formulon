"use strict"

class Formulon {
  parse() {
    let peg = require("pegjs")
    let parser = peg.buildParser("start = ('a' / 'b')+")
    return parser.parse("abba")
  }
}

module.exports = Formulon;
