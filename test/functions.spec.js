/* global describe it context */

'use strict'

import { expect } from 'chai'

import { dispatch } from '../lib/functionDispatcher'
import {
  buildDateLiteral,
  buildDatetimeLiteral,
  buildErrorLiteral,
  buildGeolocationLiteral,
  buildLiteralFromJs,
  buildPicklistLiteral,
  buildMultipicklistLiteral,
  buildTimeLiteral
} from '../lib/utils'

// Date & Time Functions

describe('addmonths', () => {
  it('returns correct date', () => {
    let input = buildDateLiteral(1999, 12, 31)
    let expected = buildDateLiteral(2000, 2, 29)
    expect(dispatch('addmonths', [input, buildLiteralFromJs(2)])).to.deep.eq(expected)
  })
})

describe('date', () => {
  it('returns correct date', () => {
    let expected = buildDateLiteral(2020, 2, 11)
    expect(dispatch('date', [buildLiteralFromJs(2020), buildLiteralFromJs(2), buildLiteralFromJs(11)])).to.deep.eq(expected)
  })
})

describe('datetimevalue', () => {
  it('returns correct datetime', () => {
    let input = buildLiteralFromJs('2020-02-11 17:39:00.973')
    let expected = buildDatetimeLiteral(Date.UTC(2020, 1, 11, 17, 39, 0, 973))
    expect(dispatch('datetimevalue', [input])).to.deep.eq(expected)
  })
})

describe('datevalue', () => {
  it('returns correct date', () => {
    let expected = buildDateLiteral(2020, 2, 11)
    expect(dispatch('datevalue', [buildLiteralFromJs('2020-02-11')])).to.deep.eq(expected)
  })
})

describe('day', () => {
  it('returns correct day', () => {
    let expected = buildLiteralFromJs(11)
    let input = buildDateLiteral(2020, 2, 11)
    expect(dispatch('day', [input])).to.deep.eq(expected)
  })
})

describe('hour', () => {
  it('returns correct hour', () => {
    let expected = buildLiteralFromJs(17)
    let input = buildDatetimeLiteral(Date.UTC(2020, 2, 11, 17, 39, 0))
    expect(dispatch('hour', [input])).to.deep.eq(expected)
  })
})

describe('millisecond', () => {
  it('returns correct millisecond', () => {
    let expected = buildLiteralFromJs(973)
    let input = buildDatetimeLiteral(Date.UTC(2020, 2, 11, 17, 39, 0, 973))
    expect(dispatch('millisecond', [input])).to.deep.eq(expected)
  })
})

describe('minute', () => {
  it('returns correct minute', () => {
    let expected = buildLiteralFromJs(39)
    let input = buildDatetimeLiteral(Date.UTC(2020, 2, 11, 17, 39, 0))
    expect(dispatch('minute', [input])).to.deep.eq(expected)
  })
})

describe('month', () => {
  it('returns correct month', () => {
    let expected = buildLiteralFromJs(2)
    let input = buildDateLiteral(2020, 2, 11)
    expect(dispatch('month', [input])).to.deep.eq(expected)
  })
})

describe('now', () => {
  it('returns correct now', () => {
    let date = new Date()
    let expected = buildDatetimeLiteral(date.getTime())

    let result = dispatch('now', [])

    let timeDiference = result.value.getTime() - expected.value.getTime()

    // ignore exact time for comparison
    expected = Object.assign(expected, {value: null})
    result = Object.assign(result, {value: null})

    expect(result).to.deep.eq(expected)

    // check if time difference is below 100 milliseconds
    expect(timeDiference).to.be.within(0, 100);
  })
})

describe('second', () => {
  it('returns correct second', () => {
    let expected = buildLiteralFromJs(19)
    let input = buildDatetimeLiteral(Date.UTC(2020, 2, 11, 17, 39, 19))
    expect(dispatch('second', [input])).to.deep.eq(expected)
  })
})

describe('timenow', () => {
  it('returns correct timenow', () => {
    let millisecondsInDay = 24 * 60 * 60 * 1000

    let date = new Date()
    let expected = buildTimeLiteral(date.getTime() % millisecondsInDay)

    let result = dispatch('timenow', [])

    let timeDiference = result.value.getTime() - expected.value.getTime()

    // ignore exact time for comparison
    expected = Object.assign(expected, {value: null})
    result = Object.assign(result, {value: null})

    expect(result).to.deep.eq(expected)

    // check if time difference is below 100 milliseconds
    expect(timeDiference).to.be.within(0, 100);
  })
})

describe('timevalue', () => {
  it('returns correct timevalue', () => {
    let expected = buildTimeLiteral(63061003)
    expect(dispatch('timevalue', [buildLiteralFromJs('17:31:01.003')])).to.deep.eq(expected)
  })
})

describe('today', () => {
  it('returns correct today', () => {
    let date = new Date()
    let expected = buildDateLiteral(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate())

    expect(dispatch('today', [])).to.deep.eq(expected)
  })
})

describe('weekday', () => {
  context('sunday', () => {
    it('returns correct weekday', () => {
      let expected = buildLiteralFromJs(1)
      let input = buildDateLiteral(2020, 3, 15)

      expect(dispatch('weekday', [input])).to.deep.eq(expected)
    })
  })

  context('saturday', () => {
    it('returns correct weekday', () => {
      let expected = buildLiteralFromJs(7)
      let input = buildDateLiteral(2020, 2, 15)

      expect(dispatch('weekday', [input])).to.deep.eq(expected)
    })
  })
})

describe('year', () => {
  it('returns correct year', () => {
    let expected = buildLiteralFromJs(2020)
    let input = buildDateLiteral(2020, 2, 15)

    expect(dispatch('year', [input])).to.deep.eq(expected)
  })
})

// Logical Functions

describe('and', () => {
  it('both true', () => {
    expect(dispatch('and', [buildLiteralFromJs(true), buildLiteralFromJs(true)])).to.deep.eq(buildLiteralFromJs(true))
  })

  it('false and true', () => {
    expect(dispatch('and', [buildLiteralFromJs(false), buildLiteralFromJs(true)])).to.deep.eq(buildLiteralFromJs(false))
  })

  it('true and false', () => {
    expect(dispatch('and', [buildLiteralFromJs(true), buildLiteralFromJs(false)])).to.deep.eq(buildLiteralFromJs(false))
  })

  it('both false', () => {
    expect(dispatch('and', [buildLiteralFromJs(false), buildLiteralFromJs(false)])).to.deep.eq(buildLiteralFromJs(false))
  })
})

describe.skip('blankvalue', () => {
  it('returns correct blankvalue', () => {
    // TODO implement test for sf$blankvalue
    expect(dispatch('blankvalue', [null, null])).to.deep.eq(null)
  })
})

describe('case', () => {
  const validFn = (input) => {
    return dispatch('case', [
      buildLiteralFromJs(input),
      buildLiteralFromJs(1), buildLiteralFromJs('January'),
      buildLiteralFromJs(2), buildLiteralFromJs('February'),
      buildLiteralFromJs(3), buildLiteralFromJs('March'),
      buildLiteralFromJs(4), buildLiteralFromJs('April'),
      buildLiteralFromJs(5), buildLiteralFromJs('May'),
      buildLiteralFromJs(6), buildLiteralFromJs('June'),
      buildLiteralFromJs(7), buildLiteralFromJs('July'),
      buildLiteralFromJs(8), buildLiteralFromJs('August'),
      buildLiteralFromJs(9), buildLiteralFromJs('September'),
      buildLiteralFromJs(10), buildLiteralFromJs('October'),
      buildLiteralFromJs(11), buildLiteralFromJs('November'),
      buildLiteralFromJs(12), buildLiteralFromJs('December'),
      buildLiteralFromJs('None')
    ])
  }

  // No else value
  const invalidFn1 = (input) => {
    return dispatch('case', [
      buildLiteralFromJs(input),
      buildLiteralFromJs(1), buildLiteralFromJs('January'),
      buildLiteralFromJs(2), buildLiteralFromJs('February'),
      buildLiteralFromJs(3), buildLiteralFromJs('March'),
      buildLiteralFromJs(4), buildLiteralFromJs('April'),
      buildLiteralFromJs(5), buildLiteralFromJs('May'),
      buildLiteralFromJs(6), buildLiteralFromJs('June'),
      buildLiteralFromJs(7), buildLiteralFromJs('July'),
      buildLiteralFromJs(8), buildLiteralFromJs('August'),
      buildLiteralFromJs(9), buildLiteralFromJs('September'),
      buildLiteralFromJs(10), buildLiteralFromJs('October'),
      buildLiteralFromJs(11), buildLiteralFromJs('November'),
      buildLiteralFromJs(12), buildLiteralFromJs('December')
    ])
  }

  const invalidFn2 = (input) => {
    return dispatch('case', [buildLiteralFromJs(input), buildLiteralFromJs(1)])
  }

  it('value found', () => {
    expect(validFn(5)).to.deep.eq(buildLiteralFromJs('May'))
  })

  it('value not found', () => {
    expect(validFn(13)).to.deep.eq(buildLiteralFromJs('None'))
  })

  it('incorrect number of arguments', () => {
    expect(invalidFn1(5)).to.deep.eq(buildErrorLiteral('ArgumentError', "Incorrect number of parameters for function 'CASE()'. Expected 24, received 25", { function: 'case', expected: 24, received: 25 }))
  })

  it('only 2 arguments', () => {
    expect(invalidFn2(5)).to.deep.eq(buildErrorLiteral('ArgumentError', "Incorrect number of parameters for function 'CASE()'. Expected 4, received 2", { function: 'case', expected: 4, received: 2 }))
  })
})

describe('if', () => {
  it('true', () => {
    expect(dispatch('if', [buildLiteralFromJs(true), buildLiteralFromJs('first'), buildLiteralFromJs('second')])).to.deep.eq(buildLiteralFromJs('first'))
  })
  it('false', () => {
    expect(dispatch('if', [buildLiteralFromJs(false), buildLiteralFromJs('first'), buildLiteralFromJs('second')])).to.deep.eq(buildLiteralFromJs('second'))
  })
})

describe('isblank', () => {
  it('returns true if value is an empty string', () => {
    expect(dispatch('isblank', [buildLiteralFromJs('')])).to.deep.eq(buildLiteralFromJs(true))
  })

  it('returns false if value is 0', () => {
    expect(dispatch('isblank', [buildLiteralFromJs(0)])).to.deep.eq(buildLiteralFromJs(false))
  })

  it('returns false if value is space', () => {
    expect(dispatch('isblank', [buildLiteralFromJs(' ')])).to.deep.eq(buildLiteralFromJs(false))
  })
})

describe.skip('isnull', () => {
  it('returns correct isnull', () => {
    // TODO implement test for sf$isnull
    expect(dispatch('isnull', [null])).to.deep.eq(null)
  })
})

describe.skip('isnumber', () => {
  it('returns correct isnumber', () => {
    // TODO implement test for sf$isnumber
    expect(dispatch('isnumber', [null])).to.deep.eq(null)
  })
})

describe('not', () => {
  it('true', () => {
    expect(dispatch('not', [buildLiteralFromJs(true)])).to.deep.eq(buildLiteralFromJs(false))
  })

  it('false', () => {
    expect(dispatch('not', [buildLiteralFromJs(false)])).to.deep.eq(buildLiteralFromJs(true))
  })
})

describe('or', () => {
  it('both true', () => {
    expect(dispatch('or', [buildLiteralFromJs(true), buildLiteralFromJs(true)])).to.deep.eq(buildLiteralFromJs(true))
  })

  it('false and true', () => {
    expect(dispatch('or', [buildLiteralFromJs(false), buildLiteralFromJs(true)])).to.deep.eq(buildLiteralFromJs(true))
  })

  it('true and false', () => {
    expect(dispatch('or', [buildLiteralFromJs(true), buildLiteralFromJs(false)])).to.deep.eq(buildLiteralFromJs(true))
  })

  it('both false', () => {
    expect(dispatch('or', [buildLiteralFromJs(false), buildLiteralFromJs(false)])).to.deep.eq(buildLiteralFromJs(false))
  })
})

describe.skip('nullvalue', () => {
  it('returns correct nullvalue', () => {
    // TODO implement test for sf$nullvalue
    expect(dispatch('nullvalue', [null, null])).to.deep.eq(null)
  })
})

describe('equal', () => {
  it('equal', () => {
    expect(dispatch('equal', [buildLiteralFromJs(1), buildLiteralFromJs(1)])).to.deep.eq(buildLiteralFromJs(true))
  })

  it('unequal', () => {
    expect(dispatch('equal', [buildLiteralFromJs(1), buildLiteralFromJs(0)])).to.deep.eq(buildLiteralFromJs(false))
  })
})

describe('unequal', () => {
  it('equal', () => {
    expect(dispatch('unequal', [buildLiteralFromJs(1), buildLiteralFromJs(1)])).to.deep.eq(buildLiteralFromJs(false))
  })

  it('unequal', () => {
    expect(dispatch('unequal', [buildLiteralFromJs(1), buildLiteralFromJs(0)])).to.deep.eq(buildLiteralFromJs(true))
  })
})

describe('greaterThan', () => {
  it('greater than', () => {
    expect(dispatch('greaterThan', [buildLiteralFromJs(1), buildLiteralFromJs(0)])).to.deep.eq(buildLiteralFromJs(true))
  })

  it('smaller than', () => {
    expect(dispatch('greaterThan', [buildLiteralFromJs(0), buildLiteralFromJs(1)])).to.deep.eq(buildLiteralFromJs(false))
  })

  it('equal', () => {
    expect(dispatch('greaterThan', [buildLiteralFromJs(1), buildLiteralFromJs(1)])).to.deep.eq(buildLiteralFromJs(false))
  })
})

describe('greaterThanOrEqual', () => {
  it('greater than', () => {
    expect(dispatch('greaterThanOrEqual', [buildLiteralFromJs(1), buildLiteralFromJs(0)])).to.deep.eq(buildLiteralFromJs(true))
  })

  it('smaller than', () => {
    expect(dispatch('greaterThanOrEqual', [buildLiteralFromJs(0), buildLiteralFromJs(1)])).to.deep.eq(buildLiteralFromJs(false))
  })

  it('equal', () => {
    expect(dispatch('greaterThanOrEqual', [buildLiteralFromJs(1), buildLiteralFromJs(1)])).to.deep.eq(buildLiteralFromJs(true))
  })
})

describe('lessThan', () => {
  it('greater than', () => {
    expect(dispatch('lessThan', [buildLiteralFromJs(1), buildLiteralFromJs(0)])).to.deep.eq(buildLiteralFromJs(false))
  })

  it('smaller than', () => {
    expect(dispatch('lessThan', [buildLiteralFromJs(0), buildLiteralFromJs(1)])).to.deep.eq(buildLiteralFromJs(true))
  })

  it('equal', () => {
    expect(dispatch('lessThan', [buildLiteralFromJs(1), buildLiteralFromJs(1)])).to.deep.eq(buildLiteralFromJs(false))
  })
})

describe('lessThanOrEqual', () => {
  it('greater than', () => {
    expect(dispatch('lessThanOrEqual', [buildLiteralFromJs(1), buildLiteralFromJs(0)])).to.deep.eq(buildLiteralFromJs(false))
  })

  it('smaller than', () => {
    expect(dispatch('lessThanOrEqual', [buildLiteralFromJs(0), buildLiteralFromJs(1)])).to.deep.eq(buildLiteralFromJs(true))
  })

  it('equal', () => {
    expect(dispatch('lessThanOrEqual', [buildLiteralFromJs(1), buildLiteralFromJs(1)])).to.deep.eq(buildLiteralFromJs(true))
  })
})

// Math Operators

describe('add', () => {
  context('Number, Number', () => {
    it('adds correctly', () => {
      expect(dispatch('add', [buildLiteralFromJs(1), buildLiteralFromJs(2)])).to.deep.eq(buildLiteralFromJs(3))
    })
  })

  context('Text, Text', () => {
    it('concats correctly', () => {
      expect(dispatch('add', [buildLiteralFromJs('Black'), buildLiteralFromJs('Jack')])).to.deep.eq(buildLiteralFromJs('BlackJack'))
    })
  })

  context('Date, Number', () => {
    it('adds number of days', () => {
      expect(dispatch('add', [buildDateLiteral(2020, 2, 11), buildLiteralFromJs(5)])).to.deep.eq(buildDateLiteral(2020, 2, 16))
    })
  })

  context('Number, Date', () => {
    it('adds number of days', () => {
      expect(dispatch('add', [buildLiteralFromJs(5), buildDateLiteral(2020, 2, 11)])).to.deep.eq(buildDateLiteral(2020, 2, 16))
    })
  })

  context('Time, Number', () => {

    it('adds number of milliseconds', () => {
      expect(dispatch('add', [buildTimeLiteral(45000000), buildLiteralFromJs(5000)])).to.deep.eq(buildTimeLiteral(45005000))
    })
  })

  context('Number, Time', () => {
    it('adds number of milliseconds', () => {
      expect(dispatch('add', [buildLiteralFromJs(5000), buildTimeLiteral(45000000)])).to.deep.eq(buildTimeLiteral(45005000))
    })
  })

  context('Datetime, Number', () => {
    it('adds number of days', () => {
      expect(dispatch('add', [buildDatetimeLiteral(Date.UTC(2020, 1, 28, 17, 39, 0, 973)), buildLiteralFromJs(5)])).to.deep.eq(buildDatetimeLiteral(Date.UTC(2020, 2, 4, 17, 39, 0, 973)))
    })
  })

  context('Number, Datetime', () => {
    it('adds number of days', () => {
      expect(dispatch('add', [buildLiteralFromJs(5), buildDatetimeLiteral(Date.UTC(2020, 1, 28, 17, 39, 0, 973))])).to.deep.eq(buildDatetimeLiteral(Date.UTC(2020, 2, 4, 17, 39, 0, 973)))
    })
  })

  context('Date, Date', () => {
    it('returns ArgumentError', () => {
      expect(dispatch('add', [buildDateLiteral(2020, 2, 11), buildDateLiteral(2020, 2, 11)])).to.deep.eq(buildErrorLiteral('ArgumentError', "Incorrect parameter type for function 'ADD()'. Expected Number, received Date", { function: 'add', expected: 'number', received: 'date' }))
    })
  })
})

describe('multiply', () => {
  it('multiplies correctly', () => {
    expect(dispatch('multiply', [buildLiteralFromJs(7), buildLiteralFromJs(8)])).to.deep.eq(buildLiteralFromJs(56))
  })
})

describe('exponentiate', () => {
  it('exponentiates correctly', () => {
    expect(dispatch('exponentiate', [buildLiteralFromJs(2), buildLiteralFromJs(5)])).to.deep.eq(buildLiteralFromJs(32))
  })
})

// Math Functions

describe('abs', () => {
  it('positive value', () => {
    expect(dispatch('abs', [buildLiteralFromJs(10)])).to.deep.eq(buildLiteralFromJs(10))
  })

  it('negative value', () => {
    expect(dispatch('abs', [buildLiteralFromJs(-20)])).to.deep.eq(buildLiteralFromJs(20))
  })
})

describe('ceiling', () => {
  it('fix value', () => {
    expect(dispatch('ceiling', [buildLiteralFromJs(10)])).to.deep.eq(buildLiteralFromJs(10))
  })

  it('positive low value', () => {
    expect(dispatch('ceiling', [buildLiteralFromJs(0.1)])).to.deep.eq(buildLiteralFromJs(1))
  })

  it('positive high value', () => {
    expect(dispatch('ceiling', [buildLiteralFromJs(999.9)])).to.deep.eq(buildLiteralFromJs(1000))
  })

  it('negative value', () => {
    expect(dispatch('ceiling', [buildLiteralFromJs(-2.5)])).to.deep.eq(buildLiteralFromJs(-3))
  })

  it('negative low value', () => {
    expect(dispatch('ceiling', [buildLiteralFromJs(-0.1)])).to.deep.eq(buildLiteralFromJs(-1))
  })

  it('negative high value', () => {
    expect(dispatch('ceiling', [buildLiteralFromJs(-999.9)])).to.deep.eq(buildLiteralFromJs(-1000))
  })
})

describe('distance', () => {
  it('returns error for unknown unit', () => {
    let expectedOptions = {
      function: 'distance',
      expected: ['km', 'mi'],
      received: 'ft'
    }
    expect(
      dispatch('distance', [buildGeolocationLiteral(51.5105474,-0.1358797), buildGeolocationLiteral(32.855160, -117.258836), buildLiteralFromJs('ft')])
    ).to.deep.eq(buildErrorLiteral('ArgumentError', "Incorrect parameter value for function 'DISTANCE()'. Expected 'mi'/'km', received 'ft'", expectedOptions))
  })

  it('returns correct distance for Europe -> US', () => {
    expect(dispatch('distance', [buildGeolocationLiteral(51.5105474,-0.1358797), buildGeolocationLiteral(32.855160, -117.258836), buildLiteralFromJs('km')])).to.deep.eq(buildLiteralFromJs(8813.750642478108))
  })

  it('returns correct distance for longest distance possible', () => {
    expect(dispatch('distance', [buildGeolocationLiteral(0,0), buildGeolocationLiteral(0, 180), buildLiteralFromJs('km')])).to.deep.eq(buildLiteralFromJs(20015.115070354455))
  })
})

describe('exp', () => {
  it('Integer Literal', () => {
    expect(dispatch('exp', [buildLiteralFromJs(1)])).to.deep.eq(buildLiteralFromJs(2.718281828459045))
  })
})

describe('floor', () => {
  it('fix value', () => {
    expect(dispatch('floor', [buildLiteralFromJs(10)])).to.deep.eq(buildLiteralFromJs(10))
  })

  it('positive low value', () => {
    expect(dispatch('floor', [buildLiteralFromJs(0.1)])).to.deep.eq(buildLiteralFromJs(0))
  })

  it('positive high value', () => {
    expect(dispatch('floor', [buildLiteralFromJs(999.9)])).to.deep.eq(buildLiteralFromJs(999))
  })

  it('negative value', () => {
    expect(dispatch('floor', [buildLiteralFromJs(-2.5)])).to.deep.eq(buildLiteralFromJs(-2))
  })

  it('negative low value', () => {
    expect(dispatch('floor', [buildLiteralFromJs(-0.1)])).to.deep.eq(buildLiteralFromJs(-0))
  })

  it('negative high value', () => {
    expect(dispatch('floor', [buildLiteralFromJs(-999.9)])).to.deep.eq(buildLiteralFromJs(-999))
  })
})

describe('geolocation', () => {
  it('returns correct geolocation', () => {
    expect(dispatch('geolocation', [buildLiteralFromJs(32.855160), buildLiteralFromJs(-117.258836)])).to.deep.eq(buildGeolocationLiteral(32.855160, -117.258836))
  })
})

describe('ln', () => {
  it('Integer Literal', () => {
    expect(dispatch('ln', [buildLiteralFromJs(5)])).to.deep.eq(buildLiteralFromJs(1.6094379124341003))
  })

  it('e', () => {
    expect(dispatch('ln', [buildLiteralFromJs(Math.E)])).to.deep.eq(buildLiteralFromJs(1))
  })
})

describe('log', () => {
  it('Integer Literal', () => {
    expect(dispatch('log', [buildLiteralFromJs(7)])).to.deep.eq(buildLiteralFromJs(0.8450980400142568))
  })

  it('10', () => {
    expect(dispatch('log', [buildLiteralFromJs(10)])).to.deep.eq(buildLiteralFromJs(1))
  })
})

describe('max', () => {
  it('2 elements', () => {
    expect(dispatch('max', [buildLiteralFromJs(1), buildLiteralFromJs(1000)])).to.deep.eq(buildLiteralFromJs(1000))
  })

  it('5 elements', () => {
    expect(
      dispatch('max', [
        buildLiteralFromJs(-7),
        buildLiteralFromJs(2),
        buildLiteralFromJs(-8),
        buildLiteralFromJs(-100),
        buildLiteralFromJs(10)
      ])).to.deep.eq(buildLiteralFromJs(10))
  })
})

describe('mceiling', () => {
  it('returns correct value for positive numbers', () => {
    expect(dispatch('mceiling', [buildLiteralFromJs(2.5)])).to.deep.eq(buildLiteralFromJs(3))
  })

  it('returns correct value for negative numbers', () => {
    expect(dispatch('mceiling', [buildLiteralFromJs(-2.5)])).to.deep.eq(buildLiteralFromJs(-2))
  })
})

describe('mfloor', () => {
  it('returns correct value for positive numbers', () => {
    expect(dispatch('mfloor', [buildLiteralFromJs(2.5)])).to.deep.eq(buildLiteralFromJs(2))
  })

  it('returns correct value for negative numbers', () => {
    expect(dispatch('mfloor', [buildLiteralFromJs(-2.5)])).to.deep.eq(buildLiteralFromJs(-3))
  })
})

describe('min', () => {
  it('2 elements', () => {
    expect(dispatch('min', [buildLiteralFromJs(1), buildLiteralFromJs(1000)])).to.deep.eq(buildLiteralFromJs(1))
  })

  it('5 elements', () => {
    expect(
      dispatch('min', [
        buildLiteralFromJs(-7),
        buildLiteralFromJs(2),
        buildLiteralFromJs(-8),
        buildLiteralFromJs(-100),
        buildLiteralFromJs(10)
      ])).to.deep.eq(buildLiteralFromJs(-100))
  })
})

describe('mod', () => {
  it('positive number without remainder', () => {
    expect(dispatch('mod', [buildLiteralFromJs(10), buildLiteralFromJs(2)])).to.deep.eq(buildLiteralFromJs(0))
  })

  it('positive number with remainder', () => {
    expect(dispatch('mod', [buildLiteralFromJs(10), buildLiteralFromJs(3)])).to.deep.eq(buildLiteralFromJs(1))
  })

  it('negative number without remainder', () => {
    expect(dispatch('mod', [buildLiteralFromJs(-15), buildLiteralFromJs(3)])).to.deep.eq(buildLiteralFromJs(-0))
  })

  it('negative number with remainder', () => {
    expect(dispatch('mod', [buildLiteralFromJs(-15), buildLiteralFromJs(6)])).to.deep.eq(buildLiteralFromJs(-3))
  })
})

describe('round', () => {
  it('positive number round up to full number', () => {
    expect(dispatch('round', [buildLiteralFromJs(1.5), buildLiteralFromJs(0)])).to.deep.eq(buildLiteralFromJs(2))
  })

  it('positive number round down to full number', () => {
    expect(dispatch('round', [buildLiteralFromJs(1.2345), buildLiteralFromJs(0)])).to.deep.eq(buildLiteralFromJs(1))
  })

  it('negative number round up to full number', () => {
    expect(dispatch('round', [buildLiteralFromJs(-1.5), buildLiteralFromJs(0)])).to.deep.eq(buildLiteralFromJs(-2))
  })

  it('positive number round up to 2 digits', () => {
    expect(dispatch('round', [buildLiteralFromJs(225.49823), buildLiteralFromJs(2)])).to.deep.eq(buildLiteralFromJs(225.50))
  })

  it('positive number down to 2 digits', () => {
    expect(dispatch('round', [buildLiteralFromJs(-225.495), buildLiteralFromJs(2)])).to.deep.eq(buildLiteralFromJs(-225.50))
  })
})

describe('sqrt', () => {
  it('square number', () => {
    expect(dispatch('sqrt', [buildLiteralFromJs(121)])).to.deep.eq(buildLiteralFromJs(11))
  })

  it('non square number', () => {
    expect(dispatch('sqrt', [buildLiteralFromJs(2)])).to.deep.eq(buildLiteralFromJs(1.4142135623730951))
  })
})

describe('subtract', () => {
  context('Number, Number', () => {
    it('adds correctly', () => {
      expect(dispatch('subtract', [buildLiteralFromJs(5), buildLiteralFromJs(3)])).to.deep.eq(buildLiteralFromJs(2))
    })
  })

  context('Text, Text', () => {
    it('returns ArgumentError', () => {
      let expected = buildErrorLiteral('ArgumentError', "Incorrect parameter type for function 'SUBTRACT()'. Expected Number, Date, Datetime, Time, received Text", { function: 'subtract', expected: ['number', 'date', 'datetime', 'time'], received: 'text' })
      expect(dispatch('subtract', [buildLiteralFromJs('Black'), buildLiteralFromJs('Jack')])).to.deep.eq(expected)
    })
  })

  context('Date, Number', () => {
    it('subtracts number of days', () => {
      expect(dispatch('subtract', [buildDateLiteral(2020, 2, 11), buildLiteralFromJs(5)])).to.deep.eq(buildDateLiteral(2020, 2, 6))
    })
  })

  context('Number, Date', () => {
    it('returns ArgumentError', () => {
      let expected = buildErrorLiteral('ArgumentError', "Incorrect parameter type for function 'SUBTRACT()'. Expected Number, received Date", { function: 'subtract', expected: 'number', received: 'date' })
      expect(dispatch('subtract', [buildLiteralFromJs(5), buildDateLiteral(2020, 2, 11)])).to.deep.eq(expected)
    })
  })

  context('Time, Number', () => {
    it('subtracts number of milliseconds', () => {
      expect(dispatch('subtract', [buildTimeLiteral(45005000), buildLiteralFromJs(5000)])).to.deep.eq(buildTimeLiteral(45000000))
    })
  })

  context('Number, Time', () => {
    it('returns ArgumentError', () => {
      let expected = buildErrorLiteral('ArgumentError', "Incorrect parameter type for function 'SUBTRACT()'. Expected Number, received Time", { function: 'subtract', expected: 'number', received: 'time' })
      expect(dispatch('subtract', [buildLiteralFromJs(5000), buildTimeLiteral(45000000)])).to.deep.eq(expected)
    })
  })

  context('Datetime, Number', () => {
    it('subtracts number of days', () => {
      expect(dispatch('subtract', [buildDatetimeLiteral(Date.UTC(2020, 2, 4, 17, 39, 0, 973)), buildLiteralFromJs(5)])).to.deep.eq(buildDatetimeLiteral(Date.UTC(2020, 1, 28, 17, 39, 0, 973)))
    })
  })

  context('Number, Datetime', () => {
    it('returns ArgumentError', () => {
      let expected = buildErrorLiteral('ArgumentError', "Incorrect parameter type for function 'SUBTRACT()'. Expected Number, received Datetime", { function: 'subtract', expected: 'number', received: 'datetime' })
      expect(dispatch('subtract', [buildLiteralFromJs(5), buildDatetimeLiteral(Date.UTC(2020, 1, 28, 17, 39, 0, 973))])).to.deep.eq(expected)
    })
  })

  context('Date, Date', () => {
    it('returns difference in days', () => {
      expect(dispatch('subtract', [buildDateLiteral(2020, 2, 16), buildDateLiteral(2020, 2, 11)])).to.deep.eq(buildLiteralFromJs(5))
    })
  })

  context('Time, Time', () => {
    it('returns difference in milliseconds', () => {
      expect(dispatch('subtract', [buildTimeLiteral(45005000), buildTimeLiteral(45000000)])).to.deep.eq(buildLiteralFromJs(5000))
    })
  })

  context('Datetime, DateTime', () => {
    it('returns difference in days', () => {
      let datetime1 = buildDatetimeLiteral(Date.UTC(2020, 2, 1, 17, 39, 0, 973))
      let datetime2 = buildDatetimeLiteral(Date.UTC(2020, 1, 28, 5, 39, 0, 973))
      expect(dispatch('subtract', [datetime1, datetime2])).to.deep.eq(buildLiteralFromJs(2.5))
    })
  })
})

// Text Functions

describe('begins', () => {
  it('begins with', () => {
    expect(dispatch('begins', [buildLiteralFromJs('a string'), buildLiteralFromJs('a')])).to.deep.eq(buildLiteralFromJs(true))
  })

  it('does not begin with', () => {
    expect(dispatch('begins', [buildLiteralFromJs('a string'), buildLiteralFromJs('b')])).to.deep.eq(buildLiteralFromJs(false))
  })
})

describe('br', () => {
  it('returns newline', () => {
    expect(dispatch('br', [])).to.deep.eq(buildLiteralFromJs('\n'))
  })
})

describe.skip('casesafeid', () => {
  it('returns correct casesafeid', () => {
    // TODO implement test for sf$casesafeid
    expect(dispatch('casesafeid', [null])).to.deep.eq(null)
  })
})

describe('contains', () => {
  it('contains', () => {
    expect(dispatch('contains', [buildLiteralFromJs('a string'), buildLiteralFromJs('string')])).to.deep.eq(buildLiteralFromJs(true))
  })

  it('does not contain', () => {
    expect(dispatch('contains', [buildLiteralFromJs('a string'), buildLiteralFromJs('integer')])).to.deep.eq(buildLiteralFromJs(false))
  })
})

describe('find', () => {
  const textToSearchIn = buildLiteralFromJs('search token in this text')

  it('returns 0 for empty search string', () => {
    expect(dispatch('find', [buildLiteralFromJs(''), textToSearchIn])).to.deep.eq(buildLiteralFromJs(0))
  })

  it('returns 0 if searchText is not found', () => {
    expect(dispatch('find', [buildLiteralFromJs('something different'), textToSearchIn])).to.deep.eq(buildLiteralFromJs(0))
  })

  it('returns 0 if startNum is 0', () => {
    expect(dispatch('find', [buildLiteralFromJs('token'), textToSearchIn, buildLiteralFromJs(0)])).to.deep.eq(buildLiteralFromJs(0))
  })

  it('returns 0 if startNum is negative', () => {
    expect(dispatch('find', [buildLiteralFromJs('token'), textToSearchIn, buildLiteralFromJs(-2)])).to.deep.eq(buildLiteralFromJs(0))
  })

  it('returns correct number for found string', () => {
    expect(dispatch('find', [buildLiteralFromJs('token'), textToSearchIn])).to.deep.eq(buildLiteralFromJs(8))
  })

  it('returns 0 if found string appears after startNum', () => {
    expect(dispatch('find', [buildLiteralFromJs('token'), textToSearchIn, buildLiteralFromJs(9)])).to.deep.eq(buildLiteralFromJs(0))
  })
})

describe.skip('getsessionid', () => {
  it('returns correct getsessionid', () => {
    // TODO implement test for sf$getsessionid
    expect(dispatch('getsessionid', [])).to.deep.eq(null)
  })
})

describe.skip('hyperlink', () => {
  it('returns correct hyperlink', () => {
    // TODO implement test for sf$hyperlink
    expect(dispatch('hyperlink', [null, null, null])).to.deep.eq(null)
  })
})

describe.skip('image', () => {
  it('returns correct image', () => {
    // TODO implement test for sf$image
    expect(dispatch('image', [null, null, null, null])).to.deep.eq(null)
  })
})

describe('includes', () => {
  it('returns correct result for selected value', () => {
    let field = buildMultipicklistLiteral(['Golf', 'Computer'], ['Golf', 'Swimming', 'Horseback Riding', 'Computer'])
    expect(dispatch('includes', [field, buildLiteralFromJs('Golf')])).to.deep.eq(buildLiteralFromJs(true))
  })

  it('returns correct result for non-selected value', () => {
    let field = buildMultipicklistLiteral(['Golf', 'Computer'], ['Golf', 'Swimming', 'Horseback Riding', 'Computer'])
    expect(dispatch('includes', [field, buildLiteralFromJs('Swimming')])).to.deep.eq(buildLiteralFromJs(false))
  })
})

describe('ispickval', () => {
  it('returns correct ispickval', () => {
    let field = buildPicklistLiteral('Active', ['Active', 'Inactive'])
    let text = buildLiteralFromJs('Active')

    expect(dispatch('ispickval', [field, text])).to.deep.eq(buildLiteralFromJs(true))
  })
})

describe('left', () => {
  it('returns correct string', () => {
    expect(dispatch('left', [buildLiteralFromJs('12345'), buildLiteralFromJs(3)])).to.deep.eq(buildLiteralFromJs('123'))
  })

  it('returns correct string for negative input', () => {
    expect(dispatch('left', [buildLiteralFromJs('12345'), buildLiteralFromJs(-1)])).to.deep.eq(buildLiteralFromJs(''))
  })
})

describe('len', () => {
  it('returns correct length', () => {
    expect(dispatch('len', [buildLiteralFromJs('12345')])).to.deep.eq(buildLiteralFromJs(5))
  })
})

describe('lower', () => {
  it('returns correct string', () => {
    expect(dispatch('lower', [buildLiteralFromJs('MYCOMPANY.COM')])).to.deep.eq(buildLiteralFromJs('mycompany.com'))
  })
})

describe('lpad', () => {
  it('no pad string given', () => {
    expect(dispatch('lpad', [buildLiteralFromJs('my_company.com'), buildLiteralFromJs(20)])).to.deep.eq(buildLiteralFromJs('my_company.com'))
  })

  it('string longer than padded length', () => {
    expect(dispatch('lpad', [buildLiteralFromJs('my_company.com'), buildLiteralFromJs(14), buildLiteralFromJs('z')])).to.deep.eq(buildLiteralFromJs('my_company.com'))
  })

  it('padded length longer than string', () => {
    expect(dispatch('lpad', [buildLiteralFromJs('my_company.com'), buildLiteralFromJs(15), buildLiteralFromJs('z')])).to.deep.eq(buildLiteralFromJs('zmy_company.com'))
  })

  it('padded length shorter than string', () => {
    expect(dispatch('lpad', [buildLiteralFromJs('my_company.com'), buildLiteralFromJs(2), buildLiteralFromJs('z')])).to.deep.eq(buildLiteralFromJs('my'))
  })
})

describe('mid', () => {
  it('returns correct string', () => {
    expect(dispatch('mid', [buildLiteralFromJs('12345'), buildLiteralFromJs(2), buildLiteralFromJs(3)])).to.deep.eq(buildLiteralFromJs('234'))
  })
})

describe('right', () => {
  it('returns correct string', () => {
    expect(dispatch('right', [buildLiteralFromJs('12345'), buildLiteralFromJs(3)])).to.deep.eq(buildLiteralFromJs('345'))
  })

  it('returns correct string for negative input', () => {
    expect(dispatch('left', [buildLiteralFromJs('12345'), buildLiteralFromJs(-1)])).to.deep.eq(buildLiteralFromJs(''))
  })
})

describe('rpad', () => {
  it('no pad string given', () => {
    expect(dispatch('rpad', [buildLiteralFromJs('my_company.com'), buildLiteralFromJs(20)])).to.deep.eq(buildLiteralFromJs('my_company.com'))
  })

  it('string longer than padded length', () => {
    expect(dispatch('rpad', [buildLiteralFromJs('my_company.com'), buildLiteralFromJs(14), buildLiteralFromJs('z')])).to.deep.eq(buildLiteralFromJs('my_company.com'))
  })

  it('padded length longer than string', () => {
    expect(dispatch('rpad', [buildLiteralFromJs('my_company.com'), buildLiteralFromJs(15), buildLiteralFromJs('z')])).to.deep.eq(buildLiteralFromJs('my_company.comz'))
  })

  it('padded length shorter than string', () => {
    expect(dispatch('rpad', [buildLiteralFromJs('my_company.com'), buildLiteralFromJs(2), buildLiteralFromJs('z')])).to.deep.eq(buildLiteralFromJs('my'))
  })
})

describe('substitute', () => {
  it('returns correct result for no replace', () => {
    expect(dispatch('substitute', [buildLiteralFromJs('Beer'), buildLiteralFromJs('Water'), buildLiteralFromJs('Wine')])).to.deep.eq(buildLiteralFromJs('Beer'))
  })

  it('returns correct result for single replace', () => {
    expect(dispatch('substitute', [buildLiteralFromJs('50% Coupon'), buildLiteralFromJs('Coupon'), buildLiteralFromJs('Discount')])).to.deep.eq(buildLiteralFromJs('50% Discount'))
  })

  it('returns correct result for mutli replace', () => {
    expect(dispatch('substitute', [buildLiteralFromJs('Wake me up before you go go'), buildLiteralFromJs('go'), buildLiteralFromJs('leave')])).to.deep.eq(buildLiteralFromJs('Wake me up before you leave leave'))
  })

  it('returns correct result for conflicting regex characters', () => {
    expect(dispatch('substitute', [buildLiteralFromJs("("), buildLiteralFromJs('('), buildLiteralFromJs('[')])).to.deep.eq(buildLiteralFromJs('['))
  })
})

describe('text', () => {
  context('Number', () => {
    it('returns correct text', () => {
      expect(dispatch('text', [buildLiteralFromJs(1)])).to.deep.eq(buildLiteralFromJs('1'))
    })
  })

  context('Date', () => {
    it('returns correct text', () => {
      expect(dispatch('text', [buildDateLiteral(2020, 2, 11)])).to.deep.eq(buildLiteralFromJs('2020-02-11'))
    })
  })

  context('Datetime', () => {
    it('returns correct text', () => {
      expect(dispatch('text', [buildDatetimeLiteral(Date.UTC(2020, 1, 11, 17, 39, 0, 973))])).to.deep.eq(buildLiteralFromJs('2020-02-11 17:39:00Z'))
    })
  })
})

describe('trim', () => {
  it('no trailing spaces', () => {
    expect(dispatch('trim', [buildLiteralFromJs('a string')])).to.deep.eq(buildLiteralFromJs('a string'))
  })

  it('trailing spaces', () => {
    expect(dispatch('trim', [buildLiteralFromJs('a string ')])).to.deep.eq(buildLiteralFromJs('a string'))
  })

  it('leading spaces', () => {
    expect(dispatch('trim', [buildLiteralFromJs('  a string')])).to.deep.eq(buildLiteralFromJs('a string'))
  })

  it('trailing and leading spaces', () => {
    expect(dispatch('trim', [buildLiteralFromJs('  a string  ')])).to.deep.eq(buildLiteralFromJs('a string'))
  })
})

describe('upper', () => {
  it('returns correct string', () => {
    expect(dispatch('upper', [buildLiteralFromJs('mycompany.com')])).to.deep.eq(buildLiteralFromJs('MYCOMPANY.COM'))
  })
})

describe('value', () => {
  context('Parsable', () => {
    it('returns correct value for integer', () => {
      expect(dispatch('value', [buildLiteralFromJs('1')])).to.deep.eq(buildLiteralFromJs(1))
    })

    it('returns correct value for float', () => {
      expect(dispatch('value', [buildLiteralFromJs('3.14')])).to.deep.eq(buildLiteralFromJs(3.14))
    })
  })

  context('Not Parsable', () => {
    it('returns null', () => {
      expect(dispatch('value', [buildLiteralFromJs('Number Kaputt')])).to.deep.eq(buildLiteralFromJs(null))
    })
  })
})

// Advanced Functions

describe.skip('currencyrate', () => {
  it('returns correct currencyrate', () => {
    // TODO implement test for sf$currencyrate
    expect(dispatch('currencyrate', [null])).to.deep.eq(null)
  })
})

describe('regex', () => {
  it('returns true for match', () => {
    let text = buildLiteralFromJs('999-99-9999')
    let regexText = buildLiteralFromJs('[0-9]{3}-[0-9]{2}-[0-9]{4}')
    expect(dispatch('regex', [text, regexText])).to.deep.eq(buildLiteralFromJs(true))
  })

  it('returns false for non-match', () => {
    let text = buildLiteralFromJs('something else')
    let regexText = buildLiteralFromJs('[0-9]{3}-[0-9]{2}-[0-9]{4}')
    expect(dispatch('regex', [text, regexText])).to.deep.eq(buildLiteralFromJs(false))
  })

  it('matches complete string', () => {
    let text = buildLiteralFromJs('According to Marc Benioff, the social enterprise increases customer success.')
    let regexText = buildLiteralFromJs('.*Marc Benioff.*')
    expect(dispatch('regex', [text, regexText])).to.deep.eq(buildLiteralFromJs(true))
  })

  it('does not match partial string', () => {
    let text = buildLiteralFromJs('According to Marc Benioff, the social enterprise increases customer success.')
    let regexText = buildLiteralFromJs('Marc Benioff')
    expect(dispatch('regex', [text, regexText])).to.deep.eq(buildLiteralFromJs(false))
  })
})
