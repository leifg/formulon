"use strict"

var expect = require("chai").expect

let FunctionLookup = require("../src/functionLookup");

describe("FunctionLookup", () => {
  describe("#add", () => {
    it("adds correctly", () => {
      expect(FunctionLookup.add(1,2)).to.eq(3)
    })
  })

  describe("#subtract", () => {
    it("subtracts correctly", () => {
      expect(FunctionLookup.subtract(10, 100)).to.eq(-90)
    })
  })

  describe("#multiply", () => {
    it("multiplies correctly", () => {
      expect(FunctionLookup.multiply(7,8)).to.eq(56)
    })
  })

  describe("#divide", () => {
    it("divides correctly", () => {
      expect(FunctionLookup.divide(10,2)).to.eq(5)
    })
  })

  describe("#exponentiate", () => {
    it("exponentiates correctly", () => {
      expect(FunctionLookup.exponentiate(2,5)).to.eq(32)
    })
  })
})
