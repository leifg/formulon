"use strict"

var expect = require("chai").expect

import * as functions from "../src/functions"
import { buildLiteralFromJs } from "../src/utils"

describe("add", () => {
  it("adds correctly", () => {
    expect(functions.sf$add(buildLiteralFromJs(1),buildLiteralFromJs(2))).to.deep.eq(buildLiteralFromJs(3))
  })
})

describe("subtract", () => {
  it("subtracts correctly", () => {
    expect(functions.sf$subtract(buildLiteralFromJs(10), buildLiteralFromJs(100))).to.deep.eq(buildLiteralFromJs(-90))
  })
})

describe("multiply", () => {
  it("multiplies correctly", () => {
    expect(functions.sf$multiply(buildLiteralFromJs(7),buildLiteralFromJs(8))).to.deep.eq(buildLiteralFromJs(56))
  })
})

describe("divide", () => {
  it("divides correctly", () => {
    expect(functions.sf$divide(buildLiteralFromJs(10),buildLiteralFromJs(2))).to.deep.eq(buildLiteralFromJs(5))
  })
})

describe("exponentiate", () => {
  it("exponentiates correctly", () => {
    expect(functions.sf$exponentiate(buildLiteralFromJs(2),buildLiteralFromJs(5))).to.deep.eq(buildLiteralFromJs(32))
  })
})

describe("and", () => {
  it("both true", () => {
    expect(functions.sf$and(buildLiteralFromJs(true),buildLiteralFromJs(true))).to.deep.eq(buildLiteralFromJs(true))
  })

  it("false and true", () => {
    expect(functions.sf$and(buildLiteralFromJs(false),buildLiteralFromJs(true))).to.deep.eq(buildLiteralFromJs(false))
  })

  it("true and false", () => {
    expect(functions.sf$and(buildLiteralFromJs(true),buildLiteralFromJs(false))).to.deep.eq(buildLiteralFromJs(false))
  })

  it("both false", () => {
    expect(functions.sf$and(buildLiteralFromJs(false),buildLiteralFromJs(false))).to.deep.eq(buildLiteralFromJs(false))
  })
})

describe("or", () => {
  it("both true", () => {
    expect(functions.sf$or(buildLiteralFromJs(true),buildLiteralFromJs(true))).to.deep.eq(buildLiteralFromJs(true))
  })

  it("false and true", () => {
    expect(functions.sf$or(buildLiteralFromJs(false),buildLiteralFromJs(true))).to.deep.eq(buildLiteralFromJs(true))
  })

  it("true and false", () => {
    expect(functions.sf$or(buildLiteralFromJs(true),buildLiteralFromJs(false))).to.deep.eq(buildLiteralFromJs(true))
  })

  it("both false", () => {
    expect(functions.sf$or(buildLiteralFromJs(false),buildLiteralFromJs(false))).to.deep.eq(buildLiteralFromJs(false))
  })
})

describe("not", () => {
  it("true", () => {
    expect(functions.sf$not(buildLiteralFromJs(true))).to.deep.eq(buildLiteralFromJs(false))
  })

  it("false", () => {
    expect(functions.sf$not(buildLiteralFromJs(false))).to.deep.eq(buildLiteralFromJs(true))
  })
})

describe("trim", () => {
  it("no trailing spaces", () => {
    expect(functions.sf$trim(buildLiteralFromJs("a string"))).to.deep.eq(buildLiteralFromJs("a string"))
  })

  it("trailing spaces", () => {
    expect(functions.sf$trim(buildLiteralFromJs("a string "))).to.deep.eq(buildLiteralFromJs("a string"))
  })

  it("leading spaces", () => {
    expect(functions.sf$trim(buildLiteralFromJs("  a string"))).to.deep.eq(buildLiteralFromJs("a string"))
  })

  it("trailing and leading spaces", () => {
    expect(functions.sf$trim(buildLiteralFromJs("  a string  "))).to.deep.eq(buildLiteralFromJs("a string"))
  })
})
