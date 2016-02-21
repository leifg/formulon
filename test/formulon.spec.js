"use strict"

var expect = require('chai').expect
var Formulon = require("../grammars/salesforceFormula.pegjs");

describe("Formulon", () => {
  describe("#parse", () => {
    context("Function Calls", () => {
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

      it("returns correct AST for nested function calls", () => {
        var expected = {
          type: "CallExpression",
          id: "if",
          arguments: [
            {
              type: "CallExpression",
              id: "ispickval",
              arguments: [
                { type: "Identifier", name: "StageName" },
                { type: "Literal", value: "Closed Won" }
              ]
            },
            { type: "Identifier", name: "Amount" },
            { type: "Literal", value: 0 },
          ],
        }
        expect(Formulon.parse("IF(ISPICKVAL(StageName, \"Closed Won\"), Amount, 0)")).to.deep.equal(expected)
      })
    })

    context("Arithmetics", () => {
      it("returns correct AST for simple addition", () => {
        var expected = {
          type: "CallExpression",
          id: "add",
          arguments: [{type: "Literal", value: 1.5}, {type: "Literal", value: 2}],
        }
        expect(Formulon.parse("1.5 + 2")).to.deep.equal(expected)
      })

      it("returns correct AST for addition with more than 2 arguments", () => {
        var expected = {
          type: "CallExpression",
          id: "add",
          arguments: [
            {type: "Literal", value: 1},
            {
              type: "CallExpression",
              id: "add",
              arguments: [
                {type: "Literal", value: 2},
                {type: "Literal", value: 3}
              ]
            }
          ]
        }
        expect(Formulon.parse("1 + 2 + 3")).to.deep.equal(expected)
      })

      it("returns correct AST for addition with function", () => {
        var expected = {
          type: "CallExpression",
          id: "add",
          arguments: [
            {
              type: "CallExpression",
              id: "max",
              arguments: [
                {type: "Literal", value: 1},
                {type: "Literal", value: 3}
              ]
            },
            {type: "Literal", value: 7},
          ]
        }

        expect(Formulon.parse("MAX(1,3) + 7")).to.deep.equal(expected)
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

    context("Literals", () => {
      it("returns correct AST for string literal", () => {
        var expected = {
          type: "Literal",
          value: "a String",
        }
        expect(Formulon.parse("\"a String\"")).to.deep.equal(expected)
      })

      it("returns correct AST for integer literal", () => {
        var expected = {
          type: "Literal",
          value: 11,
        }
        expect(Formulon.parse("11")).to.deep.equal(expected)
      })
    })
  })
})
