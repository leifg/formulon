/* global describe it context */

'use strict'

import { arrayUnique, buildErrorLiteral, buildLiteralFromJs, handleFormulonError, sfRound, coerceLiteral } from '../lib/utils'
import { ArgumentError, ReferenceError } from '../lib/errors'

const expect = require('chai').expect

describe('buildLiteralFromJs', () => {
  context('Number', () => {
    context('Integer', () => {
      it('returns expected Literal for positive number', () => {
        let expected = {
          type: 'literal',
          value: 1,
          dataType: 'number',
          options: {
            length: 1,
            scale: 0
          }
        }
        expect(buildLiteralFromJs(1)).to.deep.eq(expected)
      })

      it('returns expected Literal for negative number', () => {
        let expected = {
          type: 'literal',
          value: -12,
          dataType: 'number',
          options: {
            length: 2,
            scale: 0
          }
        }
        expect(buildLiteralFromJs(-12)).to.deep.eq(expected)
      })
    })

    context('Float', () => {
      it('returns expected Literal for positive number', () => {
        let expected = {
          type: 'literal',
          value: 1.5,
          dataType: 'number',
          options: {
            length: 1,
            scale: 1
          }
        }
        expect(buildLiteralFromJs(1.5)).to.deep.eq(expected)
      })

      it('returns expected Literal for positive number', () => {
        let expected = {
          type: 'literal',
          value: -125.75,
          dataType: 'number',
          options: {
            length: 3,
            scale: 2
          }
        }
        expect(buildLiteralFromJs(-125.75)).to.deep.eq(expected)
      })
    })
  })

  context('Text', () => {
    it('returns expected Literal for text number', () => {
      let expected = {
        type: 'literal',
        value: 'four',
        dataType: 'text',
        options: {
          length: 4
        }
      }
      expect(buildLiteralFromJs('four')).to.deep.eq(expected)
    })
  })

  context('Checkbox', () => {
    it('returns expected Literal for true', () => {
      let expected = {
        type: 'literal',
        value: true,
        dataType: 'checkbox',
        options: {}
      }
      expect(buildLiteralFromJs(true)).to.deep.eq(expected)
    })
  })

  context('unsupported type', () => {
    it('throws TypeError', () => {
      let fn = () => { buildLiteralFromJs({}) }

      expect(fn).to.throw(TypeError, "Unsupported type 'object'")
    })
  })
})

describe('buildErrorLiteral', () => {
  it('returns expected Literal for error', () => {
    let expected = {
      type: 'error',
      errorType: 'ReferenceError',
      identifier: 'idontexist',
      message: 'Field idontexist does not exist. Check spelling.'
    }
    expect(buildErrorLiteral('ReferenceError', 'Field idontexist does not exist. Check spelling.', { identifier: 'idontexist' })).to.deep.eq(expected)
  })
})

describe('arrayUnique', () => {
  // TODO add deepFreeze
  context('non redundant elements', () => {
    it('returns same input as output for empty array', () => {
      let input = []
      let expected = []
      expect(arrayUnique(input)).to.deep.eq(expected)
    })

    it('returns same input as output', () => {
      let input = ['a', 'b', 'c']
      let expected = ['a', 'b', 'c']
      expect(arrayUnique(input)).to.deep.eq(expected)
    })
  })

  context('redundant elements', () => {
    it('leaves out redundant elements', () => {
      let input = ['a', 'b', 'c', 'a']
      let expected = ['a', 'b', 'c']
      expect(arrayUnique(input)).to.deep.eq(expected)
    })
  })
})

describe('sfRound', () => {
  it('positive number round up to full number', () => {
    expect(sfRound(1.5, 0)).to.deep.eq(2)
  })

  it('positive number round down to full number', () => {
    expect(sfRound(1.2345, 0)).to.deep.eq(1)
  })

  it('negative number round up to full number', () => {
    expect(sfRound(-1.5, 0)).to.deep.eq(-2)
  })

  it('positive number round up to 2 digits', () => {
    expect(sfRound(225.49823, 2)).to.deep.eq(225.50)
  })

  it('positive number down to 2 digits', () => {
    expect(sfRound(-225.495, 2)).to.deep.eq(-225.50)
  })
})

describe('coerceLiteral', () => {
  context('Number', () => {
    it('rounds accordingly', () => {
      let input = {
        type: 'literal',
        dataType: 'number',
        value: 1.5,
        options: {
          length: 1,
          scale: 0
        }
      }

      let expectedOutput = {
        type: 'literal',
        dataType: 'number',
        value: 2,
        options: {
          length: 1,
          scale: 0
        }
      }
      expect(coerceLiteral(input)).to.deep.eq(expectedOutput)
    })
  })

  context('Text', () => {
    it('cuts text off', () => {
      let input = {
        type: 'literal',
        dataType: 'text',
        value: 'first second',
        options: {
          length: 5
        }
      }

      let expectedOutput = {
        type: 'literal',
        dataType: 'text',
        value: 'first',
        options: {
          length: 5
        }
      }
      expect(coerceLiteral(input)).to.deep.eq(expectedOutput)
    })
  })
})

describe('handleFormulonError', () => {
  context('no error raised', () => {
    it('returns value of function', () => {
      let fn = () => { return 'success' }
      expect(handleFormulonError(fn)).to.eq('success')
    })
  })

  context('ArgumentError', () => {
    it('returns error object', () => {
      let fn = () => { throw new ArgumentError('Test Argument Error', { optionKey: 'optionValue' }) }
      let expected = {
        type: 'error',
        errorType: 'ArgumentError',
        message: 'Test Argument Error',
        optionKey: 'optionValue'
      }
      expect(handleFormulonError(fn)).to.deep.eq(expected)
    })
  })

  context('ReferenceError', () => {
    it('returns error object', () => {
      let fn = () => { throw new ReferenceError('Test ReferenceError', { optionKey: 'optionValue' }) }
      let expected = {
        type: 'error',
        errorType: 'ReferenceError',
        message: 'Test ReferenceError',
        optionKey: 'optionValue',
      }
      expect(handleFormulonError(fn)).to.deep.eq(expected)
    })
  })

  context('non formulon error', () => {
    it('throws error', () => {
      let fn = () => { throw new TypeError('Something different') }
      expect(fn).to.throw(TypeError, 'Something different')
    })
  })
})
