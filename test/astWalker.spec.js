"use strict"

var expect = require('chai').expect
let ASTWalker = require("../src/astWalker");

describe("ASTWalker", () => {
  describe("#walk", () => {
    context("Literal", () => {
      it("integer literal", () => {
        var input = {type: "Literal", value: 11}
        var expected = 11

        expect(ASTWalker.walk(input)).to.deep.equal(expected)
      })

      it("float literal", () => {
        var input = {type: "Literal", value: 11.2}
        var expected = 11.2

        expect(ASTWalker.walk(input)).to.deep.equal(expected)
      })

      it("string literal", () => {
        var input = {type: "Literal", value: "a String"}
        var expected = "a String"

        expect(ASTWalker.walk(input)).to.deep.equal(expected)
      })
    })

    context("CallExpression", () => {
      it("1 level", () => {
        var input = {
          type: "CallExpression",
          id: "add",
          arguments: [{type: "Literal", value: 1.5}, {type: "Literal", value: 2}]
        }
        var expected = 3.5

        expect(ASTWalker.walk(input)).to.deep.equal(expected)
      })

      it("2 levels", () => {
        var input = {
          type: "CallExpression",
          id: "add",
          arguments: [
            {
              type: "CallExpression",
              id: "multiply",
              arguments: [{type: "Literal", value: 7}, {type: "Literal", value: 8}],
            },
            {type: "Literal", value: 5},
          ]
        }
        var expected = 61

        expect(ASTWalker.walk(input)).to.deep.equal(expected)
      })
    })
  })
})
