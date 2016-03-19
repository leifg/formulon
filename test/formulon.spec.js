"use strict"

const expect = require("chai").expect
import { parse } from "../src/formulon"
import { buildLiteralFromJs } from "../src/functionLookup"

describe("Formulon", () => {
  context("success", () => {
    context("no identifiers", () => {
      it("returns correct result for addition", () => {
        expect(parse("1 + 2", {})).to.deep.eq(buildLiteralFromJs(3))
      })

      it("returns correct result for subtraction", () => {
        expect(parse("1 - 2", {})).to.deep.eq(buildLiteralFromJs(-1))
      })
    })

    context("with identifiers", () => {
      let substitutions = {
        Custom_field__c: {
          value: "2",
          dataType: "number",
          meta: {
            length: 8,
            scale: 0,
          }
        }
      }

      it("returns correct result", () => {
        expect(parse("1 + Custom_field__c", substitutions)).to.deep.eq(buildLiteralFromJs(3))
      })
    })
  })

  context("error", () => {
    context("no substitutions", () => {
      it("throws ReferenceError", () => {
        let expected = {
          type: "Error",
          errorType: "ReferenceError",
          message: "Undefined variable 'Custom_field__c'"
        }
        expect(parse("1 + Custom_field__c", {})).to.deep.eq(expected)
      })
    })
  })
})
