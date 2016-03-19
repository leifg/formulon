"use strict"

import ASTBuilder from "../src/astBuilder"
const expect = require("chai").expect

describe("ASTBuilder", () => {
  describe("#build", () => {
    context("Function Calls", () => {
      it("function call without arguments", () => {
        var expected = {
          type: "callExpression",
          id: "now",
          arguments: [],
        }
        expect(ASTBuilder.build("NOW()")).to.deep.equal(expected)
      })

      it("function call with single argument", () => {
        var expected = {
          type: "callExpression",
          id: "abs",
          arguments: [
            {
              type: "literal",
              value: 1.5,
              dataType: "number",
              meta: {
                length: 1,
                scale: 1,
              }
            }
          ],
        }
        expect(ASTBuilder.build("ABS(1.5)")).to.deep.equal(expected)
      })

      it("function call with multiple arguments", () => {
        var expected = {
          type: "callExpression",
          id: "mod",
          arguments: [
            {
              type: "literal",
              value: 11,
              dataType: "number",
              meta: {
                length: 2,
                scale: 0,
              }
            },
            {
              type: "literal",
              value: 2,
              dataType: "number",
              meta: {
                length: 1,
                scale: 0,
              }
            }
          ],
        }
        expect(ASTBuilder.build("MOD(11, 2)")).to.deep.equal(expected)
      })

      it("nested function calls", () => {
        var expected = {
          type: "callExpression",
          id: "if",
          arguments: [
            {
              type: "callExpression",
              id: "ispickval",
              arguments: [
                { type: "identifier", name: "StageName" },
                {
                  type: "literal",
                  value: "Closed Won",
                  dataType: "text",
                  meta: {
                    length: 10,
                  }
                }
              ]
            },
            { type: "identifier", name: "Amount" },
            {
              type: "literal",
              value: 0,
              dataType: "number",
              meta: {
                length: 1,
                scale: 0,
              }
            },
          ],
        }
        expect(ASTBuilder.build("IF(ISPICKVAL(StageName, \"Closed Won\"), Amount, 0)")).to.deep.equal(expected)
      })
    })

    context("Arithmetics", () => {
      it("simple addition", () => {
        var expected = {
          type: "callExpression",
          id: "add",
          arguments: [
            {
              type: "literal",
              value: 1.5,
              dataType: "number",
              meta: {
                length: 1,
                scale: 1,
              }
            },
            {
              type: "literal",
              value: 2,
              dataType: "number",
              meta: {
                length: 1,
                scale: 0,
              }
            }
          ],
        }
        expect(ASTBuilder.build("1.5 + 2")).to.deep.equal(expected)
      })

      it("simple subtraction", () => {
        var expected = {
          type: "callExpression",
          id: "subtract",
          arguments: [
            {
              type: "literal",
              value: 1,
              dataType: "number",
              meta: {
                length: 1,
                scale: 0,
              }
            },
            {
              type: "literal",
              value: 10,
              dataType: "number",
              meta: {
                length: 2,
                scale: 0,
              }
            }
          ],
        }
        expect(ASTBuilder.build("1 - 10")).to.deep.equal(expected)
      })

      it("addition with more than 2 arguments", () => {
        var expected = {
          type: "callExpression",
          id: "add",
          arguments: [
            {
              type: "literal",
              value: 1,
              dataType: "number",
              meta: {
                length: 1,
                scale: 0,
              }
            },
            {
              type: "callExpression",
              id: "add",
              arguments: [
                {
                  type: "literal",
                  value: 2,
                  dataType: "number",
                  meta: {
                    length: 1,
                    scale: 0,
                  }
                },
                {
                  type: "literal",
                  value: 3,
                  dataType: "number",
                  meta: {
                    length: 1,
                    scale: 0,
                  }
                }
              ]
            }
          ]
        }
        expect(ASTBuilder.build("1 + 2 + 3")).to.deep.equal(expected)
      })

      it("addition with function", () => {
        var expected = {
          type: "callExpression",
          id: "add",
          arguments: [
            {
              type: "callExpression",
              id: "max",
              arguments: [
                {
                  type: "literal",
                  value: 1,
                  dataType: "number",
                  meta: {
                    length: 1,
                    scale: 0,
                  }
                },
                {
                  type: "literal",
                  value: 3,
                  dataType: "number",
                  meta: {
                    length: 1,
                    scale: 0,
                  }
                }
              ]
            },
            {
              type: "literal",
              value: 7,
              dataType: "number",
              meta: {
                length: 1,
                scale: 0,
              }
            },
          ]
        }

        expect(ASTBuilder.build("MAX(1,3) + 7")).to.deep.equal(expected)
      })

      it("simple multiplication", () => {
        var expected = {
          type: "callExpression",
          id: "multiply",
          arguments: [
            {
              type: "literal",
              value: 7,
              dataType: "number",
              meta: {
                length: 1,
                scale: 0,
              }
            },
            {
              type: "literal",
              value: 8,
              dataType: "number",
              meta: {
                length: 1,
                scale: 0,
              }
            }
          ],
        }
        expect(ASTBuilder.build("7 * 8")).to.deep.equal(expected)
      })

      it("simple division", () => {
        var expected = {
          type: "callExpression",
          id: "divide",
          arguments: [
            {
              type: "literal",
              value: 100,
              dataType: "number",
              meta: {
                length: 3,
                scale: 0,
              }
            },
            {
              type: "literal",
              value: 25,
              dataType: "number",
              meta: {
                length: 2,
                scale: 0,
              }
            }
          ],
        }
        expect(ASTBuilder.build("100 / 25")).to.deep.equal(expected)
      })

      it("addition and multiplication (multiplication first)", () => {
        var expected = {
          type: "callExpression",
          id: "add",
          arguments: [
            {
              type: "callExpression",
              id: "multiply",
              arguments: [
                {
                  type: "literal",
                  value: 7,
                  dataType: "number",
                  meta: {
                    length: 1,
                    scale: 0,
                  }
                },
                {
                  type: "literal",
                  value: 8,
                  dataType: "number",
                  meta: {
                    length: 1,
                    scale: 0,
                  }
                }
              ],
            },
            {
              type: "literal",
              value: 5,
              dataType: "number",
              meta: {
                length: 1,
                scale: 0,
              }
            },
          ]
        }
        expect(ASTBuilder.build("7 * 8 + 5")).to.deep.equal(expected)
      })

      it("addition and multiplication (addition first)", () => {
        var expected = {
          type: "callExpression",
          id: "add",
          arguments: [
            {
              type: "literal",
              value: 5,
              dataType: "number",
              meta: {
                length: 1,
                scale: 0,
              }
            },
            {
              type: "callExpression",
              id: "multiply",
              arguments: [
                {
                  type: "literal",
                  value: 7,
                  dataType: "number",
                  meta: {
                    length: 1,
                    scale: 0,
                  }
                },
                {
                  type: "literal",
                  value: 8,
                  dataType: "number",
                  meta: {
                    length: 1,
                    scale: 0,
                  }
                }
              ],
            },
          ]
        }
        expect(ASTBuilder.build("5 + 7 * 8")).to.deep.equal(expected)
      })

      it("addition and multiplication with parentheses", () => {
        var expected = {
          type: "callExpression",
          id: "multiply",
          arguments: [
            {
              type: "literal",
              value: 7,
              dataType: "number",
              meta: {
                length: 1,
                scale: 0,
              }
            },
            {
              type: "callExpression",
              id: "add",
              arguments: [
                {
                  type: "literal",
                  value: 8,
                  dataType: "number",
                  meta: {
                    length: 1,
                    scale: 0,
                  }
                },
                {
                  type: "literal",
                  value: 5,
                  dataType: "number",
                  meta: {
                    length: 1,
                    scale: 0,
                  }
                }],
            },
          ]
        }
        expect(ASTBuilder.build("7 * (8 + 5)")).to.deep.equal(expected)
      })

      it("simple exponentiation", () => {
        var expected = {
          type: "callExpression",
          id: "exponentiate",
          arguments: [
            {
              type: "literal",
              value: 2,
              dataType: "number",
              meta: {
                length: 1,
                scale: 0,
              }
            },
            {
              type: "literal",
              value: 8,
              dataType: "number",
              meta: {
                length: 1,
                scale: 0,
              }
            },
          ]
        }
        expect(ASTBuilder.build("2 ^ 8")).to.deep.equal(expected)
      })

      it("exponentiation and multiplication", () => {
        var expected = {
          type: "callExpression",
          id: "multiply",
          arguments: [
            {
              type: "callExpression",
              id: "exponentiate",
              arguments: [
                {
                  type: "literal",
                  value: 2,
                  dataType: "number",
                  meta: {
                    length: 1,
                    scale: 0,
                  }
                },
                {
                  type: "literal",
                  value: 8,
                  dataType: "number",
                  meta: {
                    length: 1,
                    scale: 0,
                  }
                },
              ]
            },
            {
              type: "literal",
              value: 7,
              dataType: "number",
              meta: {
                length: 1,
                scale: 0,
              }
            },
          ]
        }
        expect(ASTBuilder.build("2 ^ 8 * 7")).to.deep.equal(expected)
      })

      it("exponentiation, multiplication and addition", () => {
        var expected = {
          type: "callExpression",
          id: "add",
          arguments: [
            {
              type: "callExpression",
              id: "multiply",
              arguments: [
                {
                  type: "callExpression",
                  id: "exponentiate",
                  arguments: [
                    {
                      type: "literal",
                      value: 2,
                      dataType: "number",
                      meta: {
                        length: 1,
                        scale: 0,
                      }
                    },
                    {
                      type: "literal",
                      value: 8,
                      dataType: "number",
                      meta: {
                        length: 1,
                        scale: 0,
                      }
                    },
                  ]
                },
                {
                  type: "literal",
                  value: 7,
                  dataType: "number",
                  meta: {
                    length: 1,
                    scale: 0,
                  }
                },
              ]
            },
            {
              type: "literal",
              value: 5,
              dataType: "number",
              meta: {
                length: 1,
                scale: 0,
              }
            },
          ]
        }
        expect(ASTBuilder.build("2 ^ 8 * 7 + 5")).to.deep.equal(expected)
      })

      it("exponentiation, multiplication and addition in parentheses", () => {
        var expected = {
          type: "callExpression",
          id: "exponentiate",
          arguments: [
            {
              type: "literal",
              value: 2,
              dataType: "number",
              meta: {
                length: 1,
                scale: 0,
              }
            },
            {
              type: "callExpression",
              id: "add",
              arguments: [
                {
                  type: "callExpression",
                  id: "multiply",
                  arguments: [
                    {
                      type: "literal",
                      value: 8,
                      dataType: "number",
                      meta: {
                        length: 1,
                        scale: 0,
                      }
                    },
                    {
                      type: "literal",
                      value: 7,
                      dataType: "number",
                      meta: {
                        length: 1,
                        scale: 0,
                      }
                    },
                  ]
                },
                {
                  type: "literal",
                  value: 5,
                  dataType: "number",
                  meta: {
                    length: 1,
                    scale: 0,
                  }
                },
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
          type: "identifier",
          name: "Name"
        }
        expect(ASTBuilder.build("Name")).to.deep.equal(expected)
      })
    })

    context("Literals", () => {
      it("string literal", () => {
        var expected = {
          type: "literal",
          value: "a String",
          dataType: "text",
          meta: {
            length: 8,
          }
        }
        expect(ASTBuilder.build("\"a String\"")).to.deep.equal(expected)
      })

      it("integer literal", () => {
        var expected = {
          type: "literal",
          value: 12,
          dataType: "number",
          meta: {
            length: 2,
            scale: 0,
          }
        }
        expect(ASTBuilder.build("12")).to.deep.equal(expected)
      })

      it("negative integer literal", () => {
        var expected = {
          type: "literal",
          value: -123,
          dataType: "number",
          meta: {
            length: 3,
            scale: 0,
          }
        }
        expect(ASTBuilder.build("-123")).to.deep.equal(expected)
      })

      it("explicitely positive integer literal", () => {
        var expected = {
          type: "literal",
          value: 1234,
          dataType: "number",
          meta: {
            length: 4,
            scale: 0,
          }
        }
        expect(ASTBuilder.build("+1234")).to.deep.equal(expected)
      })

      it("float literal", () => {
        var expected = {
          type: "literal",
          value: 11.2,
          dataType: "number",
          meta: {
            length: 2,
            scale: 1,
          }
        }
        expect(ASTBuilder.build("11.2")).to.deep.equal(expected)
      })

      it("TRUE literal", () => {
        var expected = {
          type: "literal",
          value: true,
          dataType: "checkbox",
          meta: {}
        }
        expect(ASTBuilder.build("TRUE")).to.deep.equal(expected)
      })

      it("FALSE literal", () => {
        var expected = {
          type: "literal",
          value: false,
          dataType: "checkbox",
          meta: {}
        }
        expect(ASTBuilder.build("FALSE")).to.deep.equal(expected)
      })
    })

    context("Logic", () =>{
      context("unary", () =>{
        it("NOT with Identifier", () => {
          var expected = {
            type: "callExpression",
            id: "not",
            arguments: [{type: "identifier", name: "Negative"}],
          }
          expect(ASTBuilder.build("!Negative")).to.deep.equal(expected)
        })

        it("NOT with boolean literal", () => {
          var expected = {
            type: "callExpression",
            id: "not",
            arguments: [
              {
                type: "literal",
                value: false,
                dataType: "checkbox",
                meta: {}
              }
            ],
          }
          expect(ASTBuilder.build("!FALSE")).to.deep.equal(expected)
        })
      })

      context("binary", () =>{
        it("&&", () => {
          var expected = {
            type: "callExpression",
            id: "and",
            arguments: [
              {type: "identifier", name: "First"},
              {type: "identifier", name: "Second"},
            ],
          }
          expect(ASTBuilder.build("First && Second")).to.deep.equal(expected)
        })

        it("||", () => {
          var expected = {
            type: "callExpression",
            id: "or",
            arguments: [
              {type: "identifier", name: "First"},
              {type: "identifier", name: "Second"},
            ],
          }
          expect(ASTBuilder.build("First || Second")).to.deep.equal(expected)
        })

        it("==", () => {
          var expected = {
            type: "callExpression",
            id: "equal",
            arguments: [
              {type: "identifier", name: "First"},
              {type: "identifier", name: "Second"},
            ],
          }
          expect(ASTBuilder.build("First == Second")).to.deep.equal(expected)
        })

        it("=", () => {
          var expected = {
            type: "callExpression",
            id: "equal",
            arguments: [
              {type: "identifier", name: "First"},
              {type: "identifier", name: "Second"},
            ],
          }
          expect(ASTBuilder.build("First = Second")).to.deep.equal(expected)
        })

        it("!=", () => {
          var expected = {
            type: "callExpression",
            id: "unequal",
            arguments: [
              {type: "identifier", name: "First"},
              {type: "identifier", name: "Second"},
            ],
          }
          expect(ASTBuilder.build("First != Second")).to.deep.equal(expected)
        })

        it("<>", () => {
          var expected = {
            type: "callExpression",
            id: "unequal",
            arguments: [
              {type: "identifier", name: "First"},
              {type: "identifier", name: "Second"},
            ],
          }
          expect(ASTBuilder.build("First <> Second")).to.deep.equal(expected)
        })

        it("<", () => {
          var expected = {
            type: "callExpression",
            id: "lessThan",
            arguments: [
              {type: "identifier", name: "First"},
              {type: "identifier", name: "Second"},
            ],
          }
          expect(ASTBuilder.build("First < Second")).to.deep.equal(expected)
        })

        it("<=", () => {
          var expected = {
            type: "callExpression",
            id: "lessThanOrEqual",
            arguments: [
              {type: "identifier", name: "First"},
              {type: "identifier", name: "Second"},
            ],
          }
          expect(ASTBuilder.build("First <= Second")).to.deep.equal(expected)
        })

        it(">", () => {
          var expected = {
            type: "callExpression",
            id: "greaterThan",
            arguments: [
              {type: "identifier", name: "First"},
              {type: "identifier", name: "Second"},
            ],
          }
          expect(ASTBuilder.build("First > Second")).to.deep.equal(expected)
        })

        it(">=", () => {
          var expected = {
            type: "callExpression",
            id: "greaterThanOrEqual",
            arguments: [
              {type: "identifier", name: "First"},
              {type: "identifier", name: "Second"},
            ],
          }
          expect(ASTBuilder.build("First >= Second")).to.deep.equal(expected)
        })
      })
    })
  })
})
