"use strict"

var expect = require('chai').expect
var Formulon = require("../grammars/salesforceFormula.pegjs");

describe("Formulon", () => {
  describe("#parse", () => {
    context("function call", () => {
      it("returns correct AST for function call without arguments", () => {
        var expected = {
          type: "CallExpression",
          id: "now",
          arguments: [],
        }
        expect(Formulon.parse("NOW()")).to.deep.equal(expected)
      })

      it("returns correct AST for function call with single argument", () => {
        var expected = {
          type: "CallExpression",
          id: "abs",
          arguments: [{type: "Literal", value: 1.5}],
        }
        expect(Formulon.parse("ABS(1.5)")).to.deep.equal(expected)
      })

      it("returns correct AST for function call with multiple arguments", () => {
        var expected = {
          type: "CallExpression",
          id: "mod",
          arguments: [
            {type: "Literal", value: 11},
            {type: "Literal", value: 2}
          ],
        }
        expect(Formulon.parse("MOD(11, 2)")).to.deep.equal(expected)
      })
    })

    context("Identifiers", () => {
      it("returns correct AST for identifier", () => {
        var expected = {
          type: "Identifier",
          name: "Name",
        }
        expect(Formulon.parse("Name")).to.deep.equal(expected)
      })
    })
  })
})
