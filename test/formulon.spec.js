"use strict"

var expect = require('chai').expect
var Formulon = require("../grammars/salesforceFormula.pegjs");

describe("Formulon", () => {
  describe("#parse", () => {
    context("Function Calls", () => {
      it("returns correct AST for function call without arguments", () => {
        var expected = {
          type: "CallExpression",
          id: "now",
          arguments: [],
        }
        expect(Formulon.parse("NOW()")).to.deep.equal(expected)
      })

      it("returns correct AST for function call with single argument", () => {
        var expected = {
          type: "CallExpression",
          id: "abs",
          arguments: [{type: "Literal", value: 1.5}],
        }
        expect(Formulon.parse("ABS(1.5)")).to.deep.equal(expected)
      })

      it("returns correct AST for function call with multiple arguments", () => {
        var expected = {
          type: "CallExpression",
          id: "mod",
          arguments: [
            {type: "Literal", value: 11},
            {type: "Literal", value: 2}
          ],
        }
        expect(Formulon.parse("MOD(11, 2)")).to.deep.equal(expected)
      })

      it("returns correct AST for nested function calls", () => {
        var expected = {
          type: "CallExpression",
          id: "if",
          arguments: [
            {
              type: "CallExpression",
              id: "ispickval",
              arguments: [
                { type: "Identifier", name: "StageName" },
                { type: "Literal", value: "Closed Won" }
              ]
            },
            { type: "Identifier", name: "Amount" },
            { type: "Literal", value: 0 },
          ],
        }
        expect(Formulon.parse("IF(ISPICKVAL(StageName, \"Closed Won\"), Amount, 0)")).to.deep.equal(expected)
      })
    })

    context("Arithmetics", () => {
      it("returns correct AST for simple addition", () => {
        var expected = {
          type: "CallExpression",
          id: "add",
          arguments: [{type: "Literal", value: 1.5}, {type: "Literal", value: 2}],
        }
        expect(Formulon.parse("1.5 + 2")).to.deep.equal(expected)
      })

      it("returns correct AST for simple subtraction", () => {
        var expected = {
          type: "CallExpression",
          id: "subtract",
          arguments: [{type: "Literal", value: 1}, {type: "Literal", value: 10}],
        }
        expect(Formulon.parse("1 - 10")).to.deep.equal(expected)
      })

      it("returns correct AST for addition with more than 2 arguments", () => {
        var expected = {
          type: "CallExpression",
          id: "add",
          arguments: [
            {type: "Literal", value: 1},
            {
              type: "CallExpression",
              id: "add",
              arguments: [
                {type: "Literal", value: 2},
                {type: "Literal", value: 3}
              ]
            }
          ]
        }
        expect(Formulon.parse("1 + 2 + 3")).to.deep.equal(expected)
      })

      it("returns correct AST for addition with function", () => {
        var expected = {
          type: "CallExpression",
          id: "add",
          arguments: [
            {
              type: "CallExpression",
              id: "max",
              arguments: [
                {type: "Literal", value: 1},
                {type: "Literal", value: 3}
              ]
            },
            {type: "Literal", value: 7},
          ]
        }

        expect(Formulon.parse("MAX(1,3) + 7")).to.deep.equal(expected)
      })

      it("returns correct AST for simple multiplication", () => {
        var expected = {
          type: "CallExpression",
          id: "multiply",
          arguments: [{type: "Literal", value: 7}, {type: "Literal", value: 8}],
        }
        expect(Formulon.parse("7 * 8")).to.deep.equal(expected)
      })

      it("returns correct AST for simple division", () => {
        var expected = {
          type: "CallExpression",
          id: "divide",
          arguments: [{type: "Literal", value: 100}, {type: "Literal", value: 25}],
        }
        expect(Formulon.parse("100 / 25")).to.deep.equal(expected)
      })

      it("returns correct AST for addition and multiplication (multiplication first)", () => {
        var expected = {
          type: "CallExpression",
          id: "add",
          arguments: [
            {
              type: "CallExpression",
              id: "multiply",
              arguments: [{type: "Literal", value: 7}, {type: "Literal", value: 8}],
            },
            {type: "Literal", value: 5},
          ]
        }
        expect(Formulon.parse("7 * 8 + 5")).to.deep.equal(expected)
      })

      it("returns correct AST for addition and multiplication (addition first)", () => {
        var expected = {
          type: "CallExpression",
          id: "add",
          arguments: [
            {type: "Literal", value: 5},
            {
              type: "CallExpression",
              id: "multiply",
              arguments: [{type: "Literal", value: 7}, {type: "Literal", value: 8}],
            },
          ]
        }
        expect(Formulon.parse("5 + 7 * 8")).to.deep.equal(expected)
      })

      it("returns correct AST for addition and multiplication with parentheses", () => {
        var expected = {
          type: "CallExpression",
          id: "multiply",
          arguments: [
            {type: "Literal", value: 7},
            {
              type: "CallExpression",
              id: "add",
              arguments: [{type: "Literal", value: 8}, {type: "Literal", value: 5}],
            },
          ]
        }
        expect(Formulon.parse("7 * (8 + 5)")).to.deep.equal(expected)
      })

      it("returns correct AST for simple exponentiation", () => {
        var expected = {
          type: "CallExpression",
          id: "exponentiate",
          arguments: [
            {type: "Literal", value: 2},
            {type: "Literal", value: 8},
          ]
        }
        expect(Formulon.parse("2 ^ 8")).to.deep.equal(expected)
      })

      it("returns correct AST for exponentiation and multiplication", () => {
        var expected = {
          type: "CallExpression",
          id: "multiply",
          arguments: [
            {
              type: "CallExpression",
              id: "exponentiate",
              arguments: [
                {type: "Literal", value: 2},
                {type: "Literal", value: 8},
              ]
            },
            {type: "Literal", value: 7},
          ]
        }
        expect(Formulon.parse("2 ^ 8 * 7")).to.deep.equal(expected)
      })

      it("returns correct AST for exponentiation, multiplication and addition", () => {
        var expected = {
          type: "CallExpression",
          id: "add",
          arguments: [
            {
              type: "CallExpression",
              id: "multiply",
              arguments: [
                {
                  type: "CallExpression",
                  id: "exponentiate",
                  arguments: [
                    {type: "Literal", value: 2},
                    {type: "Literal", value: 8},
                  ]
                },
                {type: "Literal", value: 7},
              ]
            },
            {type: "Literal", value: 5},
          ]
        }
        expect(Formulon.parse("2 ^ 8 * 7 + 5")).to.deep.equal(expected)
      })

      it("returns correct AST for exponentiation, multiplication and addition in parentheses", () => {
        var expected = {
          type: "CallExpression",
          id: "exponentiate",
          arguments: [
            {type: "Literal", value: 2},
            {
              type: "CallExpression",
              id: "add",
              arguments: [
                {
                  type: "CallExpression",
                  id: "multiply",
                  arguments: [
                    {type: "Literal", value: 8},
                    {type: "Literal", value: 7},
                  ]
                },
                {type: "Literal", value: 5},
              ]
            },
          ]
        }
        expect(Formulon.parse("2 ^ (8 * 7 + 5)")).to.deep.equal(expected)
      })
    })

    context("Identifiers", () => {
      it("returns correct AST for identifier", () => {
        var expected = {
          type: "Identifier",
          name: "Name",
        }
        expect(Formulon.parse("Name")).to.deep.equal(expected)
      })
    })

    context("Literals", () => {
      it("returns correct AST for string literal", () => {
        var expected = {
          type: "Literal",
          value: "a String",
        }
        expect(Formulon.parse("\"a String\"")).to.deep.equal(expected)
      })

      it("returns correct AST for integer literal", () => {
        var expected = {
          type: "Literal",
          value: 11,
        }
        expect(Formulon.parse("11")).to.deep.equal(expected)
      })

      it("returns correct AST for negative integer literal", () => {
        var expected = {
          type: "Literal",
          value: -11,
        }
        expect(Formulon.parse("-11")).to.deep.equal(expected)
      })

      it("returns correct AST for explicitely positive integer literal", () => {
        var expected = {
          type: "Literal",
          value: 11,
        }
        expect(Formulon.parse("+11")).to.deep.equal(expected)
      })

      it("returns correct AST for float literal", () => {
        var expected = {
          type: "Literal",
          value: 11.2,
        }
        expect(Formulon.parse("11.2")).to.deep.equal(expected)
      })

      it("returns correct AST for TRUE literal", () => {
        var expected = {
          type: "Literal",
          value: true,
        }
        expect(Formulon.parse("TRUE")).to.deep.equal(expected)
      })

      it("returns correct AST for FALSE literal", () => {
        var expected = {
          type: "Literal",
          value: false,
        }
        expect(Formulon.parse("FALSE")).to.deep.equal(expected)
      })
    })

    context("Logic", () =>{
      context("unary", () =>{
        it("returns correct AST for NOT with Identifier", () => {
          var expected = {
            type: "CallExpression",
            id: "not",
            arguments: [{type: "Identifier", name: "Negative"}],
          }
          expect(Formulon.parse("!Negative")).to.deep.equal(expected)
        })

        it("returns correct AST for NOT with boolean literal", () => {
          var expected = {
            type: "CallExpression",
            id: "not",
            arguments: [{type: "Literal", value: false}],
          }
          expect(Formulon.parse("!FALSE")).to.deep.equal(expected)
        })
      })

      context("binary", () =>{
        it("returns correct AST for &&", () => {
          var expected = {
            type: "CallExpression",
            id: "and",
            arguments: [
              {type: "Identifier", name: "First"},
              {type: "Identifier", name: "Second"},
            ],
          }
          expect(Formulon.parse("First && Second")).to.deep.equal(expected)
        })

        it("returns correct AST for ||", () => {
          var expected = {
            type: "CallExpression",
            id: "or",
            arguments: [
              {type: "Identifier", name: "First"},
              {type: "Identifier", name: "Second"},
            ],
          }
          expect(Formulon.parse("First || Second")).to.deep.equal(expected)
        })

        it("returns correct AST for ==", () => {
          var expected = {
            type: "CallExpression",
            id: "equal",
            arguments: [
              {type: "Identifier", name: "First"},
              {type: "Identifier", name: "Second"},
            ],
          }
          expect(Formulon.parse("First == Second")).to.deep.equal(expected)
        })

        it("returns correct AST for =", () => {
          var expected = {
            type: "CallExpression",
            id: "equal",
            arguments: [
              {type: "Identifier", name: "First"},
              {type: "Identifier", name: "Second"},
            ],
          }
          expect(Formulon.parse("First = Second")).to.deep.equal(expected)
        })

        it("returns correct AST for !=", () => {
          var expected = {
            type: "CallExpression",
            id: "unequal",
            arguments: [
              {type: "Identifier", name: "First"},
              {type: "Identifier", name: "Second"},
            ],
          }
          expect(Formulon.parse("First != Second")).to.deep.equal(expected)
        })

        it("returns correct AST for <>", () => {
          var expected = {
            type: "CallExpression",
            id: "unequal",
            arguments: [
              {type: "Identifier", name: "First"},
              {type: "Identifier", name: "Second"},
            ],
          }
          expect(Formulon.parse("First <> Second")).to.deep.equal(expected)
        })

        it("returns correct AST for <", () => {
          var expected = {
            type: "CallExpression",
            id: "lessThan",
            arguments: [
              {type: "Identifier", name: "First"},
              {type: "Identifier", name: "Second"},
            ],
          }
          expect(Formulon.parse("First < Second")).to.deep.equal(expected)
        })

        it("returns correct AST for <=", () => {
          var expected = {
            type: "CallExpression",
            id: "lessThanOrEqual",
            arguments: [
              {type: "Identifier", name: "First"},
              {type: "Identifier", name: "Second"},
            ],
          }
          expect(Formulon.parse("First <= Second")).to.deep.equal(expected)
        })

        it("returns correct AST for >", () => {
          var expected = {
            type: "CallExpression",
            id: "greaterThan",
            arguments: [
              {type: "Identifier", name: "First"},
              {type: "Identifier", name: "Second"},
            ],
          }
          expect(Formulon.parse("First > Second")).to.deep.equal(expected)
        })

        it("returns correct AST for >=", () => {
          var expected = {
            type: "CallExpression",
            id: "greaterThanOrEqual",
            arguments: [
              {type: "Identifier", name: "First"},
              {type: "Identifier", name: "Second"},
            ],
          }
          expect(Formulon.parse("First >= Second")).to.deep.equal(expected)
        })
      })
    })
  })
})
