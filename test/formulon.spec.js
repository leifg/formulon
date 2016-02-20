"use strict"

var expect = require('chai').expect
var Formulon = require("../grammars/arithmetics.pegjs");

describe("Formulon", () => {
  describe("#parse", () => {
    context("arithmetics", () => {
      it("correctly adds numbers", () => {
        expect(Formulon.parse("1 + 2")).to.eql(3)
      })
    })
  })
})
