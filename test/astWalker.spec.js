"use strict"

const expect = require("chai").expect
import ASTWalker from "../src/astWalker"

describe("ASTWalker", () => {
  describe("#walk", () => {
    context("Literal", () => {
      it("integer literal", () => {
        var input = {
          type: "Literal",
          value: 11,
          dataType: "number",
          meta: {
            length: 2,
            scale: 0,
          }
        }
        var expected = {
          type: "Literal",
          value: 11,
          dataType: "number",
          meta: {
            length: 2,
            scale: 0,
          }
        }

        expect(ASTWalker.walk(input)).to.deep.equal(expected)
      })

      it("float literal", () => {
        var input = {
          type: "Literal",
          value: 11.2,
          dataType: "number",
          meta: {
            length: 2,
            scale: 1,
          }
        }

        var expected = {
          type: "Literal",
          value: 11.2,
          dataType: "number",
          meta: {
            length: 2,
            scale: 1,
          }
        }

        expect(ASTWalker.walk(input)).to.deep.equal(expected)
      })

      it("string literal", () => {
        var input = {
          type: "Literal",
          value: "a String",
          dataType: "text",
          meta: {
            length: 8,
            scale: 0,
          }
        }

        var expected = {
          type: "Literal",
          value: "a String",
          dataType: "text",
          meta: {
            length: 8,
            scale: 0,
          }
        }

        expect(ASTWalker.walk(input)).to.deep.equal(expected)
      })
    })

    context("Identifier", () => {
      it("throws ReferenceError", () => {
        var input = { type: "Identifier", name: "Name" }
        var fn = function () { ASTWalker.walk(input) }

        expect(fn).to.throw(ReferenceError, `Undefined variable '${input.name}'`)
      })
    })

    context("CallExpression", () => {
      it("1 level", () => {
        var input = {
          type: "CallExpression",
          id: "add",
          arguments: [
            {
              type: "Literal",
              value: 1.5,
              dataType: "number",
              meta: {
                length: 1,
                scale: 1,
              }
            },
            {
              type: "Literal",
              value: 9,
              dataType: "number",
              meta: {
                length: 1,
                scale: 0,
              }
            }
          ]
        }

        var expected = {
          type: "Literal",
          value: 10.5,
          dataType: "number",
          meta: {
            length: 2,
            scale: 1,
          }
        }

        expect(ASTWalker.walk(input)).to.deep.equal(expected)
      })

      it("2 levels", () => {
        var input = {
          type: "CallExpression",
          id: "add",
          arguments: [
            {
              type: "CallExpression",
              id: "multiply",
              arguments: [
                {
                  type: "Literal",
                  value: 7,
                  dataType: "number",
                  meta: {
                    length: 1,
                    scale: 0,
                  }
                },
                {
                  type: "Literal",
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
              type: "Literal",
              value: 5,
              dataType: "number",
              meta: {
                length: 1,
                scale: 0,
              }
            },
          ]
        }
        var expected = {
          type: "Literal",
          value: 61,
          dataType: "number",
          meta: {
            length: 2,
            scale: 0,
          }
        }

        expect(ASTWalker.walk(input)).to.deep.equal(expected)
      })
    })
  })

  describe("#extract", () => {
    context("no identifiers", () => {
      let ast = {
          type: "CallExpression",
          id: "add",
          arguments: [
            {
              type: "Literal",
              value: 1.5,
              dataType: "number",
              meta: {
                length: 1,
                scale: 1,
              }
            },
            {
              type: "Literal",
              value: 2,
              dataType: "number",
              meta: {
                length: 1,
                scale: 0,
              }
            }
          ]
        }

      it("returns empty array", () => {
        var expected = []
        expect(ASTWalker.extract(ast)).to.deep.equal(expected)
      })
    })

    context("one identifier", () => {
      let ast = {
          type: "CallExpression",
          id: "add",
          arguments: [{type: "Literal", value: 1.5}, {type: "Identifier", name: "Name"}]
        }

      it("returns array with replaced variables", () => {
        var expected = ["Name"]
        expect(ASTWalker.extract(ast)).to.deep.equal(expected)
      })
    })

    context("multiple identifiers", () => {
      let ast = {
          type: "CallExpression",
          id: "add",
          arguments: [
            {
              type: "CallExpression",
              id: "subtract",
              arguments: [{type: "Identifier", name: "Argument1"}, {type: "Identifier", name: "Argument2"}]
            },
            {type: "Identifier", name: "Name"}
          ]
        }

      it("returns array with replaced variables", () => {
        var expected = ["Argument1", "Argument2", "Name"]
        expect(ASTWalker.extract(ast)).to.deep.equal(expected)
      })
    })

    context("redundant identifiers", () => {
      let ast = {
          type: "CallExpression",
          id: "add",
          arguments: [{type: "Identifier", name: "Name"}, {type: "Identifier", name: "Name"}]
        }

      it("returns array with replaced variables", () => {
        var expected = ["Name"]
        expect(ASTWalker.extract(ast)).to.deep.equal(expected)
      })
    })
  })

  describe("#replace", () => {
    context("no identifiers", () => {
      let ast = {
          type: "CallExpression",
          id: "add",
          arguments: [
            {
              type: "Literal",
              value: 1.5,
              dataType: "number",
              meta: {
                length: 1,
                scale: 1,
              }
            },
            {
              type: "Literal",
              value: 2,
              dataType: "number",
              meta: {
                length: 1,
                scale: 0,
              }
            }
          ]
        }

      it("returns empty array", () => {
        var expected = ast
        expect(ASTWalker.replace(ast, {Name: "value"})).to.deep.equal(expected)
      })
    })

    context("one identifier", () => {
      context("replacement given", () => {
        let ast = {
            type: "CallExpression",
            id: "add",
            arguments: [
              {
                type: "Literal",
                value: 1.5,
                dataType: "number",
                meta: {
                  length: 1,
                  scale: 1,
                }
              },
              {
                type: "Identifier",
                name: "Name"
              }
            ]
          }

        it("returns replaced array", () => {
          var expected = {
            type: "CallExpression",
            id: "add",
            arguments: [
              {
                type: "Literal",
                value: 1.5,
                dataType: "number",
                meta: {
                  length: 1,
                  scale: 1,
                }
              },
              {
                type: "Literal",
                value: "value",
                dataType: "text",
                meta: {
                  length: 4,
                }
              }
            ]
          }
          let substitutions = {
            Name: {
              value: "value",
              dataType: "text",
              meta: {
                length: 4,
              }
            }
          }
          expect(ASTWalker.replace(ast, substitutions)).to.deep.equal(expected)
        })
      })

      context("no replacement given", () => {
        let ast = {
            type: "CallExpression",
            id: "add",
            arguments: [
              {
                type: "Literal",
                value: 1.5,
                dataType: "number",
                meta: {
                  length: 1,
                  scale: 1,
                }
              },
              {
                type: "Identifier",
                name: "Name"
              }
            ]
          }

        it("returns replaced array", () => {
          var expected = ast
          expect(ASTWalker.replace(ast, {})).to.deep.equal(expected)
        })
      })
    })
  })
})
