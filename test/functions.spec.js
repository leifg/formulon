"use strict"

var expect = require("chai").expect

import * as functions from "../src/functions"
import { buildLiteralFromJs } from "../src/utils"

describe("FunctionLookup", () => {
  describe("#add", () => {
    it("adds correctly", () => {
      expect(functions.add(buildLiteralFromJs(1),buildLiteralFromJs(2))).to.deep.eq(buildLiteralFromJs(3))
    })
  })

  describe("#subtract", () => {
    it("subtracts correctly", () => {
      expect(functions.subtract(buildLiteralFromJs(10), buildLiteralFromJs(100))).to.deep.eq(buildLiteralFromJs(-90))
    })
  })

  describe("#multiply", () => {
    it("multiplies correctly", () => {
      expect(functions.multiply(buildLiteralFromJs(7),buildLiteralFromJs(8))).to.deep.eq(buildLiteralFromJs(56))
    })
  })

  describe("#divide", () => {
    it("divides correctly", () => {
      expect(functions.divide(buildLiteralFromJs(10),buildLiteralFromJs(2))).to.deep.eq(buildLiteralFromJs(5))
    })
  })

  describe("#exponentiate", () => {
    it("exponentiates correctly", () => {
      expect(functions.exponentiate(buildLiteralFromJs(2),buildLiteralFromJs(5))).to.deep.eq(buildLiteralFromJs(32))
    })
  })

  describe("#and", () => {
    it("both true", () => {
      expect(functions.and(buildLiteralFromJs(true),buildLiteralFromJs(true))).to.deep.eq(buildLiteralFromJs(true))
    })

    it("false and true", () => {
      expect(functions.and(buildLiteralFromJs(false),buildLiteralFromJs(true))).to.deep.eq(buildLiteralFromJs(false))
    })

    it("true and false", () => {
      expect(functions.and(buildLiteralFromJs(true),buildLiteralFromJs(false))).to.deep.eq(buildLiteralFromJs(false))
    })

    it("both false", () => {
      expect(functions.and(buildLiteralFromJs(false),buildLiteralFromJs(false))).to.deep.eq(buildLiteralFromJs(false))
    })
  })

  describe("#or", () => {
    it("both true", () => {
      expect(functions.or(buildLiteralFromJs(true),buildLiteralFromJs(true))).to.deep.eq(buildLiteralFromJs(true))
    })

    it("false and true", () => {
      expect(functions.or(buildLiteralFromJs(false),buildLiteralFromJs(true))).to.deep.eq(buildLiteralFromJs(true))
    })

    it("true and false", () => {
      expect(functions.or(buildLiteralFromJs(true),buildLiteralFromJs(false))).to.deep.eq(buildLiteralFromJs(true))
    })

    it("both false", () => {
      expect(functions.or(buildLiteralFromJs(false),buildLiteralFromJs(false))).to.deep.eq(buildLiteralFromJs(false))
    })
  })

  describe("#not", () => {
    it("true", () => {
      expect(functions.not(buildLiteralFromJs(true))).to.deep.eq(buildLiteralFromJs(false))
    })

    it("false", () => {
      expect(functions.not(buildLiteralFromJs(false))).to.deep.eq(buildLiteralFromJs(true))
    })
  })
})
