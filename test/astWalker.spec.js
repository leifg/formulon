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
  })
})
