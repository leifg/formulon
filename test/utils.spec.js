/* global describe it context */

'use strict'

import {
  addMonths,
  arrayUnique,
  buildDateLiteral,
  buildDatetimeLiteral,
  buildErrorLiteral,
  buildLiteralFromJs,
  buildGeolocationLiteral,
  buildMultipicklistLiteral,
  buildPicklistLiteral,
  handleFormulonError,
  sfRound,
  coerceLiteral
} from '../lib/utils'
import { ArgumentError, NoFunctionError, NotImplementedError, ReferenceError } from '../lib/errors'

import { expect } from 'chai'

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

  context('Null', () => {
    it('returns expected Literal', () => {
      let expected = {
        type: 'literal',
        value: null,
        dataType: 'null',
        options: {}
      }
      expect(buildLiteralFromJs(null)).to.deep.eq(expected)
    })
  })

  context('unsupported type', () => {
    it('throws TypeError', () => {
      let fn = () => { buildLiteralFromJs({}) }

      expect(fn).to.throw(TypeError, "Unsupported type 'object'")
    })
  })
})

describe('buildDateLiteral', () => {
  context('integer input', () => {
    it('returns expected literal for year/month/day', () => {
      let expected = {
        type: 'literal',
        value: new Date(Date.UTC(2020, 1, 11)),
        dataType: 'date',
        options: {}
      }
      expect(buildDateLiteral(2020, 2, 11)).to.deep.eq(expected)
    })
  })

  context('date input', () => {
    it('returns expected literal for date', () => {
      let expected = {
        type: 'literal',
        value: new Date(Date.UTC(2020, 1, 11)),
        dataType: 'date',
        options: {}
      }
      expect(buildDateLiteral(new Date(Date.UTC(2020, 1, 11)))).to.deep.eq(expected)
    })
  })
})

describe('buildDatetimeLiteral', () => {
  context('unit timestamp input', () => {
    it('returns expected literal for unix timesampt', () => {
      let expected = {
        type: 'literal',
        value: new Date(Date.UTC(2020, 1, 11, 14, 39, 42, 974)),
        dataType: 'datetime',
        options: {}
      }
      expect(buildDatetimeLiteral(1581431982974)).to.deep.eq(expected)
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

describe('buildMultipicklistLiteral', () => {
  it('returns expected Literal for picklist', () => {
    let expected = {
      type: 'literal',
      value: ['Pumpkin', 'Vanilla'],
      dataType: 'multipicklist',
      options: { values: ['Gingerbread', 'Strawberry', 'Chocolate', 'Raspberry', 'Pumpkin', 'Mint', 'Vanilla'] }
    }

    expect(buildMultipicklistLiteral(['Pumpkin', 'Vanilla'], ['Gingerbread', 'Strawberry', 'Chocolate', 'Raspberry', 'Pumpkin', 'Mint', 'Vanilla'])).to.deep.eq(expected)
  })
})

describe('buildPicklistLiteral', () => {
  it('returns expected Literal for picklist', () => {
    let expected = {
      type: 'literal',
      value: 'Public',
      dataType: 'picklist',
      options: { values: ['Public', 'Private', 'Subsidiary', 'Other'] }
    }
    expect(buildPicklistLiteral('Public', ['Public', 'Private', 'Subsidiary', 'Other'])).to.deep.eq(expected)
  })
})

describe('buildGeolocationLiteral', () => {
  it('returns expected Literal for geolocation', () => {
    let expected = {
      type: 'literal',
      value: [32.855160, -117.258836],
      dataType: 'geolocation',
      options: { }
    }
    expect(buildGeolocationLiteral(32.855160, -117.258836)).to.deep.eq(expected)
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

describe('addMonths', () => {
  context('mid month', () => {
    it('returns one month later', () => {
      let input = new Date(Date.UTC(2020, 6, 15))
      let expected = new Date(Date.UTC(2020, 8, 15))
      expect(addMonths(input, 2)).to.deep.eq(expected)
    })
  })

  context('end of the year', () => {
    it('returns one month later', () => {
      let input = new Date(Date.UTC(1999, 11, 15))
      let expected = new Date(Date.UTC(2000, 0, 15))
      expect(addMonths(input, 1)).to.deep.eq(expected)
    })
  })

  context('end of the month', () => {
    it('returns one month later', () => {
      let input = new Date(Date.UTC(2005, 0, 31))
      let expected = new Date(Date.UTC(2005, 1, 28))
      expect(addMonths(input, 1)).to.deep.eq(expected)
    })
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

  context('NoFunctionError', () => {
    it('returns error object', () => {
      let fn = () => { throw new NoFunctionError('Test NoFunctionError', { optionKey: 'optionValue' }) }
      let expected = {
        type: 'error',
        errorType: 'NoFunctionError',
        message: 'Test NoFunctionError',
        optionKey: 'optionValue',
      }
      expect(handleFormulonError(fn)).to.deep.eq(expected)
    })
  })

  context('NotImplementedError', () => {
    it('returns error object', () => {
      let fn = () => { throw new NotImplementedError('Test NotImplementedError', { optionKey: 'optionValue' }) }
      let expected = {
        type: 'error',
        errorType: 'NotImplementedError',
        message: 'Test NotImplementedError',
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
