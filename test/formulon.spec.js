/* global describe it context */

'use strict'

const expect = require('chai').expect
import { extract, parse } from '../src/formulon'
import { buildLiteralFromJs } from '../src/utils'

describe('Formulon', () => {
  describe('parse', () => {
    context('success', () => {
      context('no identifiers', () => {
        it('returns correct result for addition', () => {
          expect(parse('1 + 2', {})).to.deep.eq(buildLiteralFromJs(3))
        })

        it('returns correct result for subtraction', () => {
          expect(parse('1 - 2', {})).to.deep.eq(buildLiteralFromJs(-1))
        })

        it('returns correct result for function with variable argument list', () => {
          expect(parse('MAX(1, 2, 10, 7)', {})).to.deep.eq(buildLiteralFromJs(10))
        })
      })

      context('with identifiers', () => {
        let substitutions = {
          Custom_field__c: {
            value: '2',
            dataType: 'number',
            meta: {
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
    })
  })

  describe('extract', () => {
    context('no identifiers', () => {
      let formula = '1.5 + 2'

      it('returns empty array', () => {
        var expected = []
        expect(extract(formula)).to.deep.equal(expected)
      })
    })

    context('one identifier', () => {
      let formula = '1.5 + Name'

      it('returns array with identifiers', () => {
        var expected = ['Name']
        expect(extract(formula)).to.deep.equal(expected)
      })
    })

    context('multiple identifiers', () => {
      let formula = 'Argument1 - Argument2 + Name'

      it('returns array with identifiers', () => {
        var expected = ['Argument1', 'Argument2', 'Name']
        expect(extract(formula)).to.deep.equal(expected)
      })
    })

    context('redundant identifiers', () => {
      let formula = 'Name * Name'

      it('returns array unique identifiers', () => {
        var expected = ['Name']
        expect(extract(formula)).to.deep.equal(expected)
      })
    })
  })
})
