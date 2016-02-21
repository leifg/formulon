"use strict"

var expect = require('chai').expect
var Formulon = require("../grammars/salesforceFormula.pegjs");

describe("Formulon", () => {
  describe("#parse", () => {
    context("function call", () => {
      it("returns correct AST for function call with single parameter", () => {
        var expected = {
          type: "FunctionExpression",
          id: "abs",
          params: [{type: "Literal", value: 1.5}],
        }
        expect(Formulon.parse("ABS(1.5)")).to.deep.equal(expected)
      })
    })
  })
})
