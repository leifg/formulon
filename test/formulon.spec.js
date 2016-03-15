"use strict"

const expect = require("chai").expect
import { parse } from "../src/formulon"

describe("Formulon", () => {
  context("no identifiers", () => {
    it("returns correct result for addition", () => {
      expect(parse("1 + 2", {})).to.equal(3)
    })

    it("returns correct result for subtraction", () => {
      expect(parse("1 - 2", {})).to.equal(-1)
    })
  })

  context("identifiers", () => {
    context("no substitutions", () => {
      it("throws ReferenceError", () => {
        var fn = function () { parse("1 + Custom_field__c", {}) }
        expect(fn).to.throw(ReferenceError, "Undefined variable 'Custom_field__c'")
      })
    })

    context("with substitutions", () => {
      it("returns correct result", () => {
        expect(parse("1 + Custom_field__c", {Custom_field__c: 2})).to.equal(3)
      })
    })
  })
})
