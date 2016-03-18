"use strict"

var expect = require("chai").expect

import FunctionLookup, {normalizeLiteral, buildLiteralFromJs} from "../src/functionLookup"

describe('normalizeLiteral', () => {
  context('Number', () => {
    context('Integer (no scale)', () => {
      context('positive', () => {
        let input = {
          value: '2',
          dataType: 'number',
          meta: {
            length: 1,
            scale: 0,
          }
        }

        it('returns parsed literal', () => {
          let expected = {
            name: {
              value: 2,
              dataType: 'number',
              meta: {
                length: 1,
                scale: 0,
              }
            }
          }
          expect(normalizeLiteral({name: input})).to.deep.eq(expected)
        })
      })

      context('negative', () => {
        let input = {
          value: '-12',
          dataType: 'number',
          meta: {
            length: 2,
            scale: 0,
          }
        }

        it('returns parsed literal', () => {
          let expected = {
            name: {
              value: -12,
              dataType: 'number',
              meta: {
                length: 2,
                scale: 0,
              }
            }
          }
          expect(normalizeLiteral({name: input})).to.deep.eq(expected)
        })
      })

      context('explicitly positive', () => {
        let input = {
          value: '+123',
          dataType: 'number',
          meta: {
            length: 3,
            scale: 0,
          }
        }

        it('returns parsed literal', () => {
          let expected = {
            name: {
              value: 123,
              dataType: 'number',
              meta: {
                length: 3,
                scale: 0,
              }
            }
          }
          expect(normalizeLiteral({name: input})).to.deep.eq(expected)
        })
      })
    })
  })
})

describe('buildLiteralFromJs', () => {
  context('Number', () => {
    context('Integer', () => {
      it("returns expected Literal for positive number", () => {
        let expected = {
          type: "Literal",
          value: 1,
          dataType: 'number',
          meta: {
            length: 1,
            scale: 0,
          }
        }
        expect(buildLiteralFromJs(1)).to.deep.eq(expected)
      })

      it("returns expected Literal for positive number", () => {
        let expected = {
          type: "Literal",
          value: -12,
          dataType: 'number',
          meta: {
            length: 2,
            scale: 0,
          }
        }
        expect(buildLiteralFromJs(-12)).to.deep.eq(expected)
      })
    })

    context('Float', () => {
      it("returns expected Literal for positive number", () => {
        let expected = {
          type: "Literal",
          value: 1.5,
          dataType: 'number',
          meta: {
            length: 1,
            scale: 1,
          }
        }
        expect(buildLiteralFromJs(1.5)).to.deep.eq(expected)
      })

      it("returns expected Literal for positive number", () => {
        let expected = {
          type: "Literal",
          value: -125.75,
          dataType: 'number',
          meta: {
            length: 3,
            scale: 2,
          }
        }
        expect(buildLiteralFromJs(-125.75)).to.deep.eq(expected)
      })
    })
  })

  context('Text', () => {
    it("returns expected Literal for text number", () => {
      let expected = {
        type: "Literal",
        value: "four",
        dataType: 'text',
        meta: {
          length: 4,
        }
      }
      expect(buildLiteralFromJs("four")).to.deep.eq(expected)
    })
  })

  context('Checkbox', () => {
    it("returns expected Literal for true", () => {
      let expected = {
        type: "Literal",
        value: true,
        dataType: 'checkbox',
        meta: {}
      }
      expect(buildLiteralFromJs(true)).to.deep.eq(expected)
    })
  })


  context('unsupported type', () => {
    it("throws TypeError", () => {
      let fn = () => { buildLiteralFromJs({}) }

      expect(fn).to.throw(TypeError, "Unsupported type 'object'")
    })
  })
})

describe("FunctionLookup", () => {
  describe("#add", () => {
    it("adds correctly", () => {
      expect(FunctionLookup.add(buildLiteralFromJs(1),buildLiteralFromJs(2))).to.deep.eq(buildLiteralFromJs(3))
    })
  })

  describe("#subtract", () => {
    it("subtracts correctly", () => {
      expect(FunctionLookup.subtract(buildLiteralFromJs(10), buildLiteralFromJs(100))).to.deep.eq(buildLiteralFromJs(-90))
    })
  })

  describe("#multiply", () => {
    it("multiplies correctly", () => {
      expect(FunctionLookup.multiply(buildLiteralFromJs(7),buildLiteralFromJs(8))).to.deep.eq(buildLiteralFromJs(56))
    })
  })

  describe("#divide", () => {
    it("divides correctly", () => {
      expect(FunctionLookup.divide(buildLiteralFromJs(10),buildLiteralFromJs(2))).to.deep.eq(buildLiteralFromJs(5))
    })
  })

  describe("#exponentiate", () => {
    it("exponentiates correctly", () => {
      expect(FunctionLookup.exponentiate(buildLiteralFromJs(2),buildLiteralFromJs(5))).to.deep.eq(buildLiteralFromJs(32))
    })
  })

  describe("#and", () => {
    it("both true", () => {
      expect(FunctionLookup.and(buildLiteralFromJs(true),buildLiteralFromJs(true))).to.deep.eq(buildLiteralFromJs(true))
    })

    it("false and true", () => {
      expect(FunctionLookup.and(buildLiteralFromJs(false),buildLiteralFromJs(true))).to.deep.eq(buildLiteralFromJs(false))
    })

    it("true and false", () => {
      expect(FunctionLookup.and(buildLiteralFromJs(true),buildLiteralFromJs(false))).to.deep.eq(buildLiteralFromJs(false))
    })

    it("both false", () => {
      expect(FunctionLookup.and(buildLiteralFromJs(false),buildLiteralFromJs(false))).to.deep.eq(buildLiteralFromJs(false))
    })
  })

  describe("#or", () => {
    it("both true", () => {
      expect(FunctionLookup.or(buildLiteralFromJs(true),buildLiteralFromJs(true))).to.deep.eq(buildLiteralFromJs(true))
    })

    it("false and true", () => {
      expect(FunctionLookup.or(buildLiteralFromJs(false),buildLiteralFromJs(true))).to.deep.eq(buildLiteralFromJs(true))
    })

    it("true and false", () => {
      expect(FunctionLookup.or(buildLiteralFromJs(true),buildLiteralFromJs(false))).to.deep.eq(buildLiteralFromJs(true))
    })

    it("both false", () => {
      expect(FunctionLookup.or(buildLiteralFromJs(false),buildLiteralFromJs(false))).to.deep.eq(buildLiteralFromJs(false))
    })
  })

  describe("#not", () => {
    it("true", () => {
      expect(FunctionLookup.not(buildLiteralFromJs(true))).to.deep.eq(buildLiteralFromJs(false))
    })

    it("false", () => {
      expect(FunctionLookup.not(buildLiteralFromJs(false))).to.deep.eq(buildLiteralFromJs(true))
    })
  })
})
