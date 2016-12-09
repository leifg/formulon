/* global describe it context */

'use strict'

const expect = require('chai').expect
import { extract, parse, parseAndThrowError } from '../lib/formulon'
import { buildLiteralFromJs } from '../lib/utils'

describe('Formulon', () => {
  describe('parse', () => {
    context('success', () => {
      context('no identifiers', () => {
        it('returns correct result for addition', () => {
          expect(parse('1 + 2')).to.deep.eq(buildLiteralFromJs(3))
        })

        it('returns correct result for subtraction', () => {
          expect(parse('1 - 2')).to.deep.eq(buildLiteralFromJs(-1))
        })

        it('returns correct result longer subtraction', () => {
          expect(parseAndThrowError('5 - 2 - 4')).to.deep.eq(buildLiteralFromJs(-1))
        })

        it('returns correct result longer addition', () => {
          expect(parseAndThrowError('1 + 2 + 4')).to.deep.eq(buildLiteralFromJs(7))
        })

        it('returns correct result longer multiplication', () => {
          expect(parseAndThrowError('2 * 3 * 4')).to.deep.eq(buildLiteralFromJs(24))
        })

        it('returns correct result longer division', () => {
          expect(parseAndThrowError('36 / 2 / 3')).to.deep.eq(buildLiteralFromJs(6))
        })

        it('returns correct result longer subtraction and addition', () => {
          expect(parseAndThrowError('8 - 4 + 2')).to.deep.eq(buildLiteralFromJs(6))
        })

        it('returns correct result longer multiplication and divison', () => {
          expect(parseAndThrowError('12 / 2 * 3')).to.deep.eq(buildLiteralFromJs(18))
        })

        it('returns correct result for function with variable argument list', () => {
          expect(parse('CASE(1, 1, "January", 2, "February", "None")')).to.deep.eq(buildLiteralFromJs('January'))
        })

        it('returns correct result for logical operations', () => {
          expect(parse('1 > 2')).to.deep.eq(buildLiteralFromJs(false))
        })

        it('returns correct result for flow control', () => {
          expect(parse('IF(1 > 2, "greater", "smaller")')).to.deep.eq(buildLiteralFromJs('smaller'))
        })

        it('returns correct result for multiple logicals', () => {
          expect(parse('"a" == "b" || "a" == "a"')).to.deep.eq(buildLiteralFromJs(true))
        })

        it('returns correct result for mixed logicals and arithmetics', () => {
          expect(parse('2 == 1 + 2 || 4 == 2 + 2')).to.deep.eq(buildLiteralFromJs(true))
        })

        it('returns correct result for single quotes', () => {
          expect(parse("'a' + 'b'")).to.deep.eq(buildLiteralFromJs('ab'))
        })
      })

      context('coerce inputs', () => {
        context('number', () => {
          it('rounds variables accordingly', () => {
            let var1 = {
              type: 'literal',
              dataType: 'number',
              value: 1.35,
              options: {
                length: 1,
                scale: 1
              }
            }

            let var2 = {
              type: 'literal',
              dataType: 'number',
              value: 2.35,
              options: {
                length: 1,
                scale: 1
              }
            }

            expect(parse('var1 + var2', {var1: var1, var2: var2})).to.deep.eq(buildLiteralFromJs(3.8))
          })
        })

        context('text', () => {
          it('cuts off text', () => {
            let input = {
              type: 'literal',
              dataType: 'text',
              value: 'first second',
              options: {
                length: 5
              }
            }

            expect(parse('a_text', {a_text: input})).to.deep.eq(buildLiteralFromJs('first'))
          })
        })
      })

      context('with identifiers', () => {
        let substitutions = {
          Custom_field__c: {
            value: 2,
            dataType: 'number',
            options: {
              length: 8,
              scale: 0
            }
          }
        }

        it('returns correct result', () => {
          expect(parse('1 + Custom_field__c', substitutions)).to.deep.eq(buildLiteralFromJs(3))
        })
      })
    })

    context('error', () => {
      context('empty input', () => {
        let expected = buildLiteralFromJs('')

        context('null input', () => {
          it('returns empty string', () => {
            expect(parse(null)).to.deep.eq(expected)
          })
        })

        context('undefined input', () => {
          it('returns empty string', () => {
            expect(parse(undefined)).to.deep.eq(expected)
          })
        })

        context('empty string input', () => {
          it('returns empty string', () => {
            expect(parse('')).to.deep.eq(expected)
          })
        })

        context('whitespace only input', () => {
          it('returns empty string', () => {
            expect(parse('   ')).to.deep.eq(expected)
          })
        })
      })

      context('no substitutions for existing identifier', () => {
        it('returns error object with ReferenceError', () => {
          let expected = {
            type: 'error',
            errorType: 'ReferenceError',
            message: "Undefined variable 'Custom_field__c'"
          }
          expect(parse('1 + Custom_field__c', {})).to.deep.eq(expected)
        })
      })

      context('parse error', () => {
        it('returns error object with ReferenceError', () => {
          let expected = {
            type: 'error',
            errorType: 'EvalError',
            message: 'Parsing Error'
          }
          expect(parse('Custom_field__c +', {})).to.deep.eq(expected)
        })
      })

      context('wrong number of parameters', () => {
        it('returns error object with ReferenceError', () => {
          let expected = {
            type: 'error',
            errorType: 'SyntaxError',
            message: "Incorrect number of parameters for function 'IF()'. Expected 3, received 1"
          }
          expect(parse('IF(1)', {})).to.deep.eq(expected)
        })
      })
    })
  })

  describe('extract', () => {
    context('no identifiers', () => {
      let formula = '1.5 + 2'

      it('returns empty array', () => {
        const expected = []
        expect(extract(formula)).to.deep.equal(expected)
      })
    })

    context('one identifier', () => {
      let formula = '1.5 + Name'

      it('returns array with identifiers', () => {
        const expected = ['Name']
        expect(extract(formula)).to.deep.equal(expected)
      })
    })

    context('multiple identifiers', () => {
      let formula = 'Argument1 - Argument2 + Name'

      it('returns array with identifiers', () => {
        const expected = ['Argument1', 'Argument2', 'Name']
        expect(extract(formula)).to.deep.equal(expected)
      })
    })

    context('redundant identifiers', () => {
      let formula = 'Name * Name'

      it('returns array unique identifiers', () => {
        const expected = ['Name']
        expect(extract(formula)).to.deep.equal(expected)
      })
    })

    context('parameterless function name', () => {
      let formula = 'DATE()'

      it('returns empty array', () => {
        const expected = []
        expect(extract(formula)).to.deep.equal(expected)
      })
    })

    context('empty input', () => {
      let expected = []

      context('null input', () => {
        it('returns empty string', () => {
          expect(extract(null)).to.deep.eq(expected)
        })
      })

      context('undefined input', () => {
        it('returns empty string', () => {
          expect(extract(undefined)).to.deep.eq(expected)
        })
      })

      context('empty string input', () => {
        it('returns empty string', () => {
          expect(extract('')).to.deep.eq(expected)
        })
      })

      context('whitespace only input', () => {
        it('returns empty string', () => {
          expect(extract('   ')).to.deep.eq(expected)
        })
      })
    })
  })
})
