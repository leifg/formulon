"use strict"

var expect = require('chai').expect
let ASTBuilder = require("../src/astBuilder");

describe("ASTBuilder", () => {
  describe("#build", () => {
    context("Function Calls", () => {
      it("function call without arguments", () => {
        var expected = {
          type: "CallExpression",
          id: "now",
          arguments: [],
        }
        expect(ASTBuilder.build("NOW()")).to.deep.equal(expected)
      })

      it("function call with single argument", () => {
        var expected = {
          type: "CallExpression",
          id: "abs",
          arguments: [{type: "Literal", value: 1.5}],
        }
        expect(ASTBuilder.build("ABS(1.5)")).to.deep.equal(expected)
      })

      it("function call with multiple arguments", () => {
        var expected = {
          type: "CallExpression",
          id: "mod",
          arguments: [
            {type: "Literal", value: 11},
            {type: "Literal", value: 2}
          ],
        }
        expect(ASTBuilder.build("MOD(11, 2)")).to.deep.equal(expected)
      })

      it("nested function calls", () => {
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
        expect(ASTBuilder.build("IF(ISPICKVAL(StageName, \"Closed Won\"), Amount, 0)")).to.deep.equal(expected)
      })
    })

    context("Arithmetics", () => {
      it("simple addition", () => {
        var expected = {
          type: "CallExpression",
          id: "add",
          arguments: [{type: "Literal", value: 1.5}, {type: "Literal", value: 2}],
        }
        expect(ASTBuilder.build("1.5 + 2")).to.deep.equal(expected)
      })

      it("simple subtraction", () => {
        var expected = {
          type: "CallExpression",
          id: "subtract",
          arguments: [{type: "Literal", value: 1}, {type: "Literal", value: 10}],
        }
        expect(ASTBuilder.build("1 - 10")).to.deep.equal(expected)
      })

      it("addition with more than 2 arguments", () => {
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
        expect(ASTBuilder.build("1 + 2 + 3")).to.deep.equal(expected)
      })

      it("addition with function", () => {
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

        expect(ASTBuilder.build("MAX(1,3) + 7")).to.deep.equal(expected)
      })

      it("simple multiplication", () => {
        var expected = {
          type: "CallExpression",
          id: "multiply",
          arguments: [{type: "Literal", value: 7}, {type: "Literal", value: 8}],
        }
        expect(ASTBuilder.build("7 * 8")).to.deep.equal(expected)
      })

      it("simple division", () => {
        var expected = {
          type: "CallExpression",
          id: "divide",
          arguments: [{type: "Literal", value: 100}, {type: "Literal", value: 25}],
        }
        expect(ASTBuilder.build("100 / 25")).to.deep.equal(expected)
      })

      it("addition and multiplication (multiplication first)", () => {
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
        expect(ASTBuilder.build("7 * 8 + 5")).to.deep.equal(expected)
      })

      it("addition and multiplication (addition first)", () => {
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
        expect(ASTBuilder.build("5 + 7 * 8")).to.deep.equal(expected)
      })

      it("addition and multiplication with parentheses", () => {
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
        expect(ASTBuilder.build("7 * (8 + 5)")).to.deep.equal(expected)
      })

      it("simple exponentiation", () => {
        var expected = {
          type: "CallExpression",
          id: "exponentiate",
          arguments: [
            {type: "Literal", value: 2},
            {type: "Literal", value: 8},
          ]
        }
        expect(ASTBuilder.build("2 ^ 8")).to.deep.equal(expected)
      })

      it("exponentiation and multiplication", () => {
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
        expect(ASTBuilder.build("2 ^ 8 * 7")).to.deep.equal(expected)
      })

      it("exponentiation, multiplication and addition", () => {
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
        expect(ASTBuilder.build("2 ^ 8 * 7 + 5")).to.deep.equal(expected)
      })

      it("exponentiation, multiplication and addition in parentheses", () => {
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
        expect(ASTBuilder.build("2 ^ (8 * 7 + 5)")).to.deep.equal(expected)
      })
    })

    context("Identifiers", () => {
      it("identifier", () => {
        var expected = {
          type: "Identifier",
          name: "Name",
        }
        expect(ASTBuilder.build("Name")).to.deep.equal(expected)
      })
    })

    context("Literals", () => {
      it("string literal", () => {
        var expected = {
          type: "Literal",
          value: "a String",
        }
        expect(ASTBuilder.build("\"a String\"")).to.deep.equal(expected)
      })

      it("integer literal", () => {
        var expected = {
          type: "Literal",
          value: 11,
        }
        expect(ASTBuilder.build("11")).to.deep.equal(expected)
      })

      it("negative integer literal", () => {
        var expected = {
          type: "Literal",
          value: -11,
        }
        expect(ASTBuilder.build("-11")).to.deep.equal(expected)
      })

      it("explicitely positive integer literal", () => {
        var expected = {
          type: "Literal",
          value: 11,
        }
        expect(ASTBuilder.build("+11")).to.deep.equal(expected)
      })

      it("float literal", () => {
        var expected = {
          type: "Literal",
          value: 11.2,
        }
        expect(ASTBuilder.build("11.2")).to.deep.equal(expected)
      })

      it("TRUE literal", () => {
        var expected = {
          type: "Literal",
          value: true,
        }
        expect(ASTBuilder.build("TRUE")).to.deep.equal(expected)
      })

      it("FALSE literal", () => {
        var expected = {
          type: "Literal",
          value: false,
        }
        expect(ASTBuilder.build("FALSE")).to.deep.equal(expected)
      })
    })

    context("Logic", () =>{
      context("unary", () =>{
        it("NOT with Identifier", () => {
          var expected = {
            type: "CallExpression",
            id: "not",
            arguments: [{type: "Identifier", name: "Negative"}],
          }
          expect(ASTBuilder.build("!Negative")).to.deep.equal(expected)
        })

        it("NOT with boolean literal", () => {
          var expected = {
            type: "CallExpression",
            id: "not",
            arguments: [{type: "Literal", value: false}],
          }
          expect(ASTBuilder.build("!FALSE")).to.deep.equal(expected)
        })
      })

      context("binary", () =>{
        it("&&", () => {
          var expected = {
            type: "CallExpression",
            id: "and",
            arguments: [
              {type: "Identifier", name: "First"},
              {type: "Identifier", name: "Second"},
            ],
          }
          expect(ASTBuilder.build("First && Second")).to.deep.equal(expected)
        })

        it("||", () => {
          var expected = {
            type: "CallExpression",
            id: "or",
            arguments: [
              {type: "Identifier", name: "First"},
              {type: "Identifier", name: "Second"},
            ],
          }
          expect(ASTBuilder.build("First || Second")).to.deep.equal(expected)
        })

        it("==", () => {
          var expected = {
            type: "CallExpression",
            id: "equal",
            arguments: [
              {type: "Identifier", name: "First"},
              {type: "Identifier", name: "Second"},
            ],
          }
          expect(ASTBuilder.build("First == Second")).to.deep.equal(expected)
        })

        it("=", () => {
          var expected = {
            type: "CallExpression",
            id: "equal",
            arguments: [
              {type: "Identifier", name: "First"},
              {type: "Identifier", name: "Second"},
            ],
          }
          expect(ASTBuilder.build("First = Second")).to.deep.equal(expected)
        })

        it("!=", () => {
          var expected = {
            type: "CallExpression",
            id: "unequal",
            arguments: [
              {type: "Identifier", name: "First"},
              {type: "Identifier", name: "Second"},
            ],
          }
          expect(ASTBuilder.build("First != Second")).to.deep.equal(expected)
        })

        it("<>", () => {
          var expected = {
            type: "CallExpression",
            id: "unequal",
            arguments: [
              {type: "Identifier", name: "First"},
              {type: "Identifier", name: "Second"},
            ],
          }
          expect(ASTBuilder.build("First <> Second")).to.deep.equal(expected)
        })

        it("<", () => {
          var expected = {
            type: "CallExpression",
            id: "lessThan",
            arguments: [
              {type: "Identifier", name: "First"},
              {type: "Identifier", name: "Second"},
            ],
          }
          expect(ASTBuilder.build("First < Second")).to.deep.equal(expected)
        })

        it("<=", () => {
          var expected = {
            type: "CallExpression",
            id: "lessThanOrEqual",
            arguments: [
              {type: "Identifier", name: "First"},
              {type: "Identifier", name: "Second"},
            ],
          }
          expect(ASTBuilder.build("First <= Second")).to.deep.equal(expected)
        })

        it(">", () => {
          var expected = {
            type: "CallExpression",
            id: "greaterThan",
            arguments: [
              {type: "Identifier", name: "First"},
              {type: "Identifier", name: "Second"},
            ],
          }
          expect(ASTBuilder.build("First > Second")).to.deep.equal(expected)
        })

        it(">=", () => {
          var expected = {
            type: "CallExpression",
            id: "greaterThanOrEqual",
            arguments: [
              {type: "Identifier", name: "First"},
              {type: "Identifier", name: "Second"},
            ],
          }
          expect(ASTBuilder.build("First >= Second")).to.deep.equal(expected)
        })
      })
    })
  })
})
