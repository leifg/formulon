"use strict"

let FunctionLookup = {
  add: function(a, b) {
    return a + b
  },
  subtract: function(a, b) {
    return a - b
  },
  multiply: function(a, b) {
    return a * b
  },
  divide: function(a, b) {
    return a / b
  },
  exponentiate: function(a, b) {
    return Math.pow(a,b)
  },
}

module.exports = FunctionLookup;
