"use strict"

var expect = require("chai").expect

import FunctionLookup from "../src/functionLookup"

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

  describe("#and", () => {
    it("both true", () => {
      expect(FunctionLookup.and(true,true)).to.eq(true)
    })

    it("false and true", () => {
      expect(FunctionLookup.and(false,true)).to.eq(false)
    })

    it("true and false", () => {
      expect(FunctionLookup.and(true,false)).to.eq(false)
    })

    it("both false", () => {
      expect(FunctionLookup.and(false,false)).to.eq(false)
    })
  })

  describe("#or", () => {
    it("both true", () => {
      expect(FunctionLookup.or(true,true)).to.eq(true)
    })

    it("false and true", () => {
      expect(FunctionLookup.or(false,true)).to.eq(true)
    })

    it("true and false", () => {
      expect(FunctionLookup.or(true,false)).to.eq(true)
    })

    it("both false", () => {
      expect(FunctionLookup.or(false,false)).to.eq(false)
    })
  })

  describe("#not", () => {
    it("true", () => {
      expect(FunctionLookup.not(true)).to.eq(false)
    })

    it("false", () => {
      expect(FunctionLookup.not(false)).to.eq(true)
    })
  })
})
