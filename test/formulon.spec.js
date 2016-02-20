"use strict"

var expect = require('chai').expect
var Formulon = require("../grammars/arithmetics.pegjs");

describe("Formulon", () => {
  describe("#parse", () => {
    context("arithmetics", () => {
      it("correctly adds numbers", () => {
        expect(Formulon.parse("1 + 2")).to.eql(3)
      })

      it("correctly subtracts numbers", () => {
        expect(Formulon.parse("1 - 2")).to.eql(-1)
      })

      it("correctly multiplies numbers", () => {
        expect(Formulon.parse("7 * 8")).to.eql(56)
      })

      it("correctly divides numbers", () => {
        expect(Formulon.parse("1 / 2")).to.eql(0.5)
      })
    })
  })
})
