/* global describe it context */

'use strict'

import { expect } from 'chai'

import * as functions from '../lib/functions'
import { buildDateLiteral, buildDatetimeLiteral, buildGeolocationLiteral, buildLiteralFromJs, buildPicklistLiteral } from '../lib/utils'
import { ArgumentError } from '../lib/errors'

// Date & Time Functions

describe('addmonths', () => {
  it('returns correct date', () => {
    let input = buildDateLiteral(1999, 12, 31)
    let expected = buildDateLiteral(2000, 2, 29)
    expect(functions.sf$addmonths(input, buildLiteralFromJs(2))).to.deep.eq(expected)
  })
})

describe('date', () => {
  it('returns correct date', () => {
    let expected = buildDateLiteral(2020, 2, 11)
    expect(functions.sf$date(buildLiteralFromJs(2020), buildLiteralFromJs(2), buildLiteralFromJs(11))).to.deep.eq(expected)
  })
})

describe('datetimevalue', () => {
  it('returns correct datetime', () => {
    let input = buildLiteralFromJs('2020-02-11 17:39:00.973')
    let expected = buildDatetimeLiteral(Date.UTC(2020, 1, 11, 17, 39, 0, 973))
    expect(functions.sf$datetimevalue(input)).to.deep.eq(expected)
  })
})

describe('datevalue', () => {
  it('returns correct date', () => {
    let expected = buildDateLiteral(2020, 2, 11)
    expect(functions.sf$datevalue(buildLiteralFromJs('2020-02-11'))).to.deep.eq(expected)
  })
})

describe('day', () => {
  it('returns correct day', () => {
    let expected = buildLiteralFromJs(11)
    let input = buildDateLiteral(2020, 2, 11)
    expect(functions.sf$day(input)).to.deep.eq(expected)
  })
})

describe('hour', () => {
  it('returns correct hour', () => {
    let expected = buildLiteralFromJs(17)
    let input = buildDatetimeLiteral(Date.UTC(2020, 2, 11, 17, 39, 0))
    expect(functions.sf$hour(input)).to.deep.eq(expected)
  })
})

describe('millisecond', () => {
  it('returns correct millisecond', () => {
    let expected = buildLiteralFromJs(973)
    let input = buildDatetimeLiteral(Date.UTC(2020, 2, 11, 17, 39, 0, 973))
    expect(functions.sf$millisecond(input)).to.deep.eq(expected)
  })
})

describe('minute', () => {
  it('returns correct minute', () => {
    let expected = buildLiteralFromJs(39)
    let input = buildDatetimeLiteral(Date.UTC(2020, 2, 11, 17, 39, 0))
    expect(functions.sf$minute(input)).to.deep.eq(expected)
  })
})

describe('month', () => {
  it('returns correct month', () => {
    let expected = buildLiteralFromJs(2)
    let input = buildDateLiteral(2020, 2, 11)
    expect(functions.sf$month(input)).to.deep.eq(expected)
  })
})

describe('now', () => {
  it('returns correct now', () => {
    let date = new Date()
    let expected = buildDatetimeLiteral(date.getTime())

    let result = functions.sf$now()

    let timeDiference = result.value.getTime() - expected.value.getTime()

    // ignore exact time for comparison
    expected = Object.assign(expected, {value: null})
    result = Object.assign(result, {value: null})

    expect(result).to.deep.eq(expected)

    // check if time difference is below 100 milliseconds
    expect(timeDiference).to.be.at.least(0)
    expect(timeDiference).to.be.below(100)
  })
})

describe('second', () => {
  it('returns correct second', () => {
    let expected = buildLiteralFromJs(19)
    let input = buildDatetimeLiteral(Date.UTC(2020, 2, 11, 17, 39, 19))
    expect(functions.sf$second(input)).to.deep.eq(expected)
  })
})

describe.skip('timenow', () => {
  it('returns correct timenow', () => {
    // TODO implement test for sf$timenow
    expect(functions.sf$timenow()).to.deep.eq(null)
  })
})

describe('today', () => {
  it('returns correct today', () => {
    let date = new Date()
    let expected = buildDateLiteral(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate())

    expect(functions.sf$today()).to.deep.eq(expected)
  })
})

describe('weekday', () => {
  context('sunday', () => {
    it('returns correct weekday', () => {
      let expected = buildLiteralFromJs(1)
      let input = buildDateLiteral(2020, 3, 15)

      expect(functions.sf$weekday(input)).to.deep.eq(expected)
    })
  })

  context('saturday', () => {
    it('returns correct weekday', () => {
      let expected = buildLiteralFromJs(7)
      let input = buildDateLiteral(2020, 2, 15)

      expect(functions.sf$weekday(input)).to.deep.eq(expected)
    })
  })
})

describe('year', () => {
  it('returns correct year', () => {
    let expected = buildLiteralFromJs(2020)
    let input = buildDateLiteral(2020, 2, 15)

    expect(functions.sf$year(input)).to.deep.eq(expected)
  })
})

// Logical Functions

describe('and', () => {
  it('both true', () => {
    expect(functions.sf$and(buildLiteralFromJs(true), buildLiteralFromJs(true))).to.deep.eq(buildLiteralFromJs(true))
  })

  it('false and true', () => {
    expect(functions.sf$and(buildLiteralFromJs(false), buildLiteralFromJs(true))).to.deep.eq(buildLiteralFromJs(false))
  })

  it('true and false', () => {
    expect(functions.sf$and(buildLiteralFromJs(true), buildLiteralFromJs(false))).to.deep.eq(buildLiteralFromJs(false))
  })

  it('both false', () => {
    expect(functions.sf$and(buildLiteralFromJs(false), buildLiteralFromJs(false))).to.deep.eq(buildLiteralFromJs(false))
  })
})

describe.skip('blankvalue', () => {
  it('returns correct blankvalue', () => {
    // TODO implement test for sf$blankvalue
    expect(functions.sf$blankvalue(null, null)).to.deep.eq(null)
  })
})

describe('case', () => {
  const validFn = (input) => {
    return functions.sf$case(
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
    )
  }

  const invalidFn1 = (input) => {
    return functions.sf$case(
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
    )
  }

  const invalidFn2 = (input) => {
    return functions.sf$case(buildLiteralFromJs(input), buildLiteralFromJs(1))
  }

  it('value found', () => {
    expect(validFn(5)).to.deep.eq(buildLiteralFromJs('May'))
  })

  it('value not found', () => {
    expect(validFn(13)).to.deep.eq(buildLiteralFromJs('None'))
  })

  it('incorrect number of arguments', () => {
    let fn = () => { invalidFn1(5) }
    expect(fn).to.throw(ArgumentError, "Incorrect number of parameters for function 'CASE()'. Expected 24, received 25")
  })

  it('only 2 arguments', () => {
    let fn = () => { invalidFn2(5) }
    expect(fn).to.throw(ArgumentError, "Incorrect number of parameters for function 'CASE()'. Expected 4+, received 2")
  })
})

describe('if', () => {
  it('true', () => {
    expect(functions.sf$if(buildLiteralFromJs(true), buildLiteralFromJs('first'), buildLiteralFromJs('second'))).to.deep.eq(buildLiteralFromJs('first'))
  })
  it('false', () => {
    expect(functions.sf$if(buildLiteralFromJs(false), buildLiteralFromJs('first'), buildLiteralFromJs('second'))).to.deep.eq(buildLiteralFromJs('second'))
  })
})

describe('isblank', () => {
  it('returns true if value is an empty string', () => {
    expect(functions.sf$isblank(buildLiteralFromJs(''))).to.deep.eq(buildLiteralFromJs(true))
  })

  it('returns false if value is 0', () => {
    expect(functions.sf$isblank(buildLiteralFromJs(0))).to.deep.eq(buildLiteralFromJs(false))
  })

  it('returns false if value is space', () => {
    expect(functions.sf$isblank(buildLiteralFromJs(' '))).to.deep.eq(buildLiteralFromJs(false))
  })
})

describe.skip('isnull', () => {
  it('returns correct isnull', () => {
    // TODO implement test for sf$isnull
    expect(functions.sf$isnull(null)).to.deep.eq(null)
  })
})

describe.skip('isnumber', () => {
  it('returns correct isnumber', () => {
    // TODO implement test for sf$isnumber
    expect(functions.sf$isnumber(null)).to.deep.eq(null)
  })
})

describe('not', () => {
  it('true', () => {
    expect(functions.sf$not(buildLiteralFromJs(true))).to.deep.eq(buildLiteralFromJs(false))
  })

  it('false', () => {
    expect(functions.sf$not(buildLiteralFromJs(false))).to.deep.eq(buildLiteralFromJs(true))
  })
})

describe('or', () => {
  it('both true', () => {
    expect(functions.sf$or(buildLiteralFromJs(true), buildLiteralFromJs(true))).to.deep.eq(buildLiteralFromJs(true))
  })

  it('false and true', () => {
    expect(functions.sf$or(buildLiteralFromJs(false), buildLiteralFromJs(true))).to.deep.eq(buildLiteralFromJs(true))
  })

  it('true and false', () => {
    expect(functions.sf$or(buildLiteralFromJs(true), buildLiteralFromJs(false))).to.deep.eq(buildLiteralFromJs(true))
  })

  it('both false', () => {
    expect(functions.sf$or(buildLiteralFromJs(false), buildLiteralFromJs(false))).to.deep.eq(buildLiteralFromJs(false))
  })
})

describe.skip('nullvalue', () => {
  it('returns correct nullvalue', () => {
    // TODO implement test for sf$nullvalue
    expect(functions.sf$nullvalue(null, null)).to.deep.eq(null)
  })
})

describe('equal', () => {
  it('equal', () => {
    expect(functions.sf$equal(buildLiteralFromJs(1), buildLiteralFromJs(1))).to.deep.eq(buildLiteralFromJs(true))
  })

  it('unequal', () => {
    expect(functions.sf$equal(buildLiteralFromJs(1), buildLiteralFromJs(0))).to.deep.eq(buildLiteralFromJs(false))
  })
})

describe('unequal', () => {
  it('equal', () => {
    expect(functions.sf$unequal(buildLiteralFromJs(1), buildLiteralFromJs(1))).to.deep.eq(buildLiteralFromJs(false))
  })

  it('unequal', () => {
    expect(functions.sf$unequal(buildLiteralFromJs(1), buildLiteralFromJs(0))).to.deep.eq(buildLiteralFromJs(true))
  })
})

describe('greaterThan', () => {
  it('greater than', () => {
    expect(functions.sf$greaterThan(buildLiteralFromJs(1), buildLiteralFromJs(0))).to.deep.eq(buildLiteralFromJs(true))
  })

  it('smaller than', () => {
    expect(functions.sf$greaterThan(buildLiteralFromJs(0), buildLiteralFromJs(1))).to.deep.eq(buildLiteralFromJs(false))
  })

  it('equal', () => {
    expect(functions.sf$greaterThan(buildLiteralFromJs(1), buildLiteralFromJs(1))).to.deep.eq(buildLiteralFromJs(false))
  })
})

describe('greaterThanOrEqual', () => {
  it('greater than', () => {
    expect(functions.sf$greaterThanOrEqual(buildLiteralFromJs(1), buildLiteralFromJs(0))).to.deep.eq(buildLiteralFromJs(true))
  })

  it('smaller than', () => {
    expect(functions.sf$greaterThanOrEqual(buildLiteralFromJs(0), buildLiteralFromJs(1))).to.deep.eq(buildLiteralFromJs(false))
  })

  it('equal', () => {
    expect(functions.sf$greaterThanOrEqual(buildLiteralFromJs(1), buildLiteralFromJs(1))).to.deep.eq(buildLiteralFromJs(true))
  })
})

describe('lessThan', () => {
  it('greater than', () => {
    expect(functions.sf$lessThan(buildLiteralFromJs(1), buildLiteralFromJs(0))).to.deep.eq(buildLiteralFromJs(false))
  })

  it('smaller than', () => {
    expect(functions.sf$lessThan(buildLiteralFromJs(0), buildLiteralFromJs(1))).to.deep.eq(buildLiteralFromJs(true))
  })

  it('equal', () => {
    expect(functions.sf$lessThan(buildLiteralFromJs(1), buildLiteralFromJs(1))).to.deep.eq(buildLiteralFromJs(false))
  })
})

describe('lessThanOrEqual', () => {
  it('greater than', () => {
    expect(functions.sf$lessThanOrEqual(buildLiteralFromJs(1), buildLiteralFromJs(0))).to.deep.eq(buildLiteralFromJs(false))
  })

  it('smaller than', () => {
    expect(functions.sf$lessThanOrEqual(buildLiteralFromJs(0), buildLiteralFromJs(1))).to.deep.eq(buildLiteralFromJs(true))
  })

  it('equal', () => {
    expect(functions.sf$lessThanOrEqual(buildLiteralFromJs(1), buildLiteralFromJs(1))).to.deep.eq(buildLiteralFromJs(true))
  })
})

// Math Operators

describe('add', () => {
  it('adds correctly', () => {
    expect(functions.sf$add(buildLiteralFromJs(1), buildLiteralFromJs(2))).to.deep.eq(buildLiteralFromJs(3))
  })
})

describe('multiply', () => {
  it('multiplies correctly', () => {
    expect(functions.sf$multiply(buildLiteralFromJs(7), buildLiteralFromJs(8))).to.deep.eq(buildLiteralFromJs(56))
  })
})

describe('exponentiate', () => {
  it('exponentiates correctly', () => {
    expect(functions.sf$exponentiate(buildLiteralFromJs(2), buildLiteralFromJs(5))).to.deep.eq(buildLiteralFromJs(32))
  })
})

// Math Functions

describe('abs', () => {
  it('positive value', () => {
    expect(functions.sf$abs(buildLiteralFromJs(10))).to.deep.eq(buildLiteralFromJs(10))
  })

  it('negative value', () => {
    expect(functions.sf$abs(buildLiteralFromJs(-20))).to.deep.eq(buildLiteralFromJs(20))
  })
})

describe('ceiling', () => {
  it('fix value', () => {
    expect(functions.sf$ceiling(buildLiteralFromJs(10))).to.deep.eq(buildLiteralFromJs(10))
  })

  it('positive low value', () => {
    expect(functions.sf$ceiling(buildLiteralFromJs(0.1))).to.deep.eq(buildLiteralFromJs(1))
  })

  it('positive high value', () => {
    expect(functions.sf$ceiling(buildLiteralFromJs(999.9))).to.deep.eq(buildLiteralFromJs(1000))
  })

  it('negative low value', () => {
    expect(functions.sf$ceiling(buildLiteralFromJs(-0.1))).to.deep.eq(buildLiteralFromJs(-0))
  })

  it('negative high value', () => {
    expect(functions.sf$ceiling(buildLiteralFromJs(-999.9))).to.deep.eq(buildLiteralFromJs(-999))
  })
})

describe.skip('distance', () => {
  it('returns correct distance', () => {
    // TODO implement test for sf$distance
    expect(functions.sf$distance(null, null, null)).to.deep.eq(null)
  })
})

describe('exp', () => {
  it('Integer Literal', () => {
    expect(functions.sf$exp(buildLiteralFromJs(1))).to.deep.eq(buildLiteralFromJs(2.718281828459045))
  })
})

describe('floor', () => {
  it('fix value', () => {
    expect(functions.sf$floor(buildLiteralFromJs(10))).to.deep.eq(buildLiteralFromJs(10))
  })

  it('positive low value', () => {
    expect(functions.sf$floor(buildLiteralFromJs(0.1))).to.deep.eq(buildLiteralFromJs(0))
  })

  it('positive high value', () => {
    expect(functions.sf$floor(buildLiteralFromJs(999.9))).to.deep.eq(buildLiteralFromJs(999))
  })

  it('negative low value', () => {
    expect(functions.sf$floor(buildLiteralFromJs(-0.1))).to.deep.eq(buildLiteralFromJs(-1))
  })

  it('negative high value', () => {
    expect(functions.sf$floor(buildLiteralFromJs(-999.9))).to.deep.eq(buildLiteralFromJs(-1000))
  })
})

describe('geolocation', () => {
  it('returns correct geolocation', () => {
    32.855160, -117.258836
    expect(functions.sf$geolocation(buildLiteralFromJs(32.855160), buildLiteralFromJs(-117.258836))).to.deep.eq(buildGeolocationLiteral(32.855160, -117.258836))
  })
})

describe('ln', () => {
  it('Integer Literal', () => {
    expect(functions.sf$ln(buildLiteralFromJs(5))).to.deep.eq(buildLiteralFromJs(1.6094379124341003))
  })

  it('e', () => {
    expect(functions.sf$ln(buildLiteralFromJs(Math.E))).to.deep.eq(buildLiteralFromJs(1))
  })
})

describe('log', () => {
  it('Integer Literal', () => {
    expect(functions.sf$log(buildLiteralFromJs(7))).to.deep.eq(buildLiteralFromJs(0.8450980400142568))
  })

  it('10', () => {
    expect(functions.sf$log(buildLiteralFromJs(10))).to.deep.eq(buildLiteralFromJs(1))
  })
})

describe('max', () => {
  it('2 elements', () => {
    expect(functions.sf$max(buildLiteralFromJs(1), buildLiteralFromJs(1000))).to.deep.eq(buildLiteralFromJs(1000))
  })

  it('5 elements', () => {
    expect(
      functions.sf$max(
        buildLiteralFromJs(-7),
        buildLiteralFromJs(2),
        buildLiteralFromJs(-8),
        buildLiteralFromJs(-100),
        buildLiteralFromJs(10)
      )).to.deep.eq(buildLiteralFromJs(10))
  })
})

describe.skip('mceiling', () => {
  it('returns correct mceiling', () => {
    // TODO implement test for sf$mceiling
    expect(functions.sf$mceiling(null)).to.deep.eq(null)
  })
})

describe.skip('mfloor', () => {
  it('returns correct mfloor', () => {
    // TODO implement test for sf$mfloor
    expect(functions.sf$mfloor(null)).to.deep.eq(null)
  })
})

describe('min', () => {
  it('2 elements', () => {
    expect(functions.sf$min(buildLiteralFromJs(1), buildLiteralFromJs(1000))).to.deep.eq(buildLiteralFromJs(1))
  })

  it('5 elements', () => {
    expect(
      functions.sf$min(
        buildLiteralFromJs(-7),
        buildLiteralFromJs(2),
        buildLiteralFromJs(-8),
        buildLiteralFromJs(-100),
        buildLiteralFromJs(10)
      )).to.deep.eq(buildLiteralFromJs(-100))
  })
})

describe('mod', () => {
  it('positive number without remainder', () => {
    expect(functions.sf$mod(buildLiteralFromJs(10), buildLiteralFromJs(2))).to.deep.eq(buildLiteralFromJs(0))
  })

  it('positive number with remainder', () => {
    expect(functions.sf$mod(buildLiteralFromJs(10), buildLiteralFromJs(3))).to.deep.eq(buildLiteralFromJs(1))
  })

  it('negative number without remainder', () => {
    expect(functions.sf$mod(buildLiteralFromJs(-15), buildLiteralFromJs(3))).to.deep.eq(buildLiteralFromJs(-0))
  })

  it('negative number with remainder', () => {
    expect(functions.sf$mod(buildLiteralFromJs(-15), buildLiteralFromJs(6))).to.deep.eq(buildLiteralFromJs(-3))
  })
})

describe('round', () => {
  it('positive number round up to full number', () => {
    expect(functions.sf$round(buildLiteralFromJs(1.5), buildLiteralFromJs(0))).to.deep.eq(buildLiteralFromJs(2))
  })

  it('positive number round down to full number', () => {
    expect(functions.sf$round(buildLiteralFromJs(1.2345), buildLiteralFromJs(0))).to.deep.eq(buildLiteralFromJs(1))
  })

  it('negative number round up to full number', () => {
    expect(functions.sf$round(buildLiteralFromJs(-1.5), buildLiteralFromJs(0))).to.deep.eq(buildLiteralFromJs(-2))
  })

  it('positive number round up to 2 digits', () => {
    expect(functions.sf$round(buildLiteralFromJs(225.49823), buildLiteralFromJs(2))).to.deep.eq(buildLiteralFromJs(225.50))
  })

  it('positive number down to 2 digits', () => {
    expect(functions.sf$round(buildLiteralFromJs(-225.495), buildLiteralFromJs(2))).to.deep.eq(buildLiteralFromJs(-225.50))
  })
})

describe('sqrt', () => {
  it('square number', () => {
    expect(functions.sf$sqrt(buildLiteralFromJs(121))).to.deep.eq(buildLiteralFromJs(11))
  })

  it('non square number', () => {
    expect(functions.sf$sqrt(buildLiteralFromJs(2))).to.deep.eq(buildLiteralFromJs(1.4142135623730951))
  })
})

// Text Functions

describe('begins', () => {
  it('begins with', () => {
    expect(functions.sf$begins(buildLiteralFromJs('a string'), buildLiteralFromJs('a'))).to.deep.eq(buildLiteralFromJs(true))
  })

  it('does not begin with', () => {
    expect(functions.sf$begins(buildLiteralFromJs('a string'), buildLiteralFromJs('b'))).to.deep.eq(buildLiteralFromJs(false))
  })
})

describe('br', () => {
  it('returns newline', () => {
    expect(functions.sf$br()).to.deep.eq(buildLiteralFromJs('\n'))
  })
})

describe.skip('casesafeid', () => {
  it('returns correct casesafeid', () => {
    // TODO implement test for sf$casesafeid
    expect(functions.sf$casesafeid(null)).to.deep.eq(null)
  })
})

describe('concat', () => {
  it('concats correctly', () => {
    expect(functions.sf$concat(buildLiteralFromJs('Grapefruit'), buildLiteralFromJs('fruchtfleisch'))).to.deep.eq(buildLiteralFromJs('Grapefruitfruchtfleisch'))
  })
})

describe('contains', () => {
  it('contains', () => {
    expect(functions.sf$contains(buildLiteralFromJs('a string'), buildLiteralFromJs('string'))).to.deep.eq(buildLiteralFromJs(true))
  })

  it('does not contain', () => {
    expect(functions.sf$contains(buildLiteralFromJs('a string'), buildLiteralFromJs('integer'))).to.deep.eq(buildLiteralFromJs(false))
  })
})

describe('find', () => {
  const textToSearchIn = buildLiteralFromJs('search token in this text')

  it('returns 0 for empty search string', () => {
    expect(functions.sf$find(buildLiteralFromJs(''), textToSearchIn)).to.deep.eq(buildLiteralFromJs(0))
  })

  it('returns 0 if searchText is not found', () => {
    expect(functions.sf$find(buildLiteralFromJs('something different'), textToSearchIn)).to.deep.eq(buildLiteralFromJs(0))
  })

  it('returns 0 if startNum is 0', () => {
    expect(functions.sf$find(buildLiteralFromJs('token'), textToSearchIn, buildLiteralFromJs(0))).to.deep.eq(buildLiteralFromJs(0))
  })

  it('returns 0 if startNum is negative', () => {
    expect(functions.sf$find(buildLiteralFromJs('token'), textToSearchIn, buildLiteralFromJs(-2))).to.deep.eq(buildLiteralFromJs(0))
  })

  it('returns correct number for found string', () => {
    expect(functions.sf$find(buildLiteralFromJs('token'), textToSearchIn)).to.deep.eq(buildLiteralFromJs(8))
  })

  it('returns 0 if found string appears after startNum', () => {
    expect(functions.sf$find(buildLiteralFromJs('token'), textToSearchIn, buildLiteralFromJs(9))).to.deep.eq(buildLiteralFromJs(0))
  })
})

describe.skip('getsessionid', () => {
  it('returns correct getsessionid', () => {
    // TODO implement test for sf$getsessionid
    expect(functions.sf$getsessionid()).to.deep.eq(null)
  })
})

describe.skip('hyperlink', () => {
  it('returns correct hyperlink', () => {
    // TODO implement test for sf$hyperlink
    expect(functions.sf$hyperlink(null, null, null)).to.deep.eq(null)
  })
})

describe.skip('image', () => {
  it('returns correct image', () => {
    // TODO implement test for sf$image
    expect(functions.sf$image(null, null, null, null)).to.deep.eq(null)
  })
})

describe.skip('includes', () => {
  it('returns correct includes', () => {
    // TODO implement test for sf$includes
    expect(functions.sf$includes(null, null)).to.deep.eq(null)
  })
})

describe('ispickval', () => {
  it('returns correct ispickval', () => {
    let field = buildPicklistLiteral('Active', ['Active', 'Inactive'])
    let text = buildLiteralFromJs('Active')

    expect(functions.sf$ispickval(field, text)).to.deep.eq(buildLiteralFromJs(true))
  })
})

describe('left', () => {
  it('returns correct string', () => {
    expect(functions.sf$left(buildLiteralFromJs('12345'), buildLiteralFromJs(3))).to.deep.eq(buildLiteralFromJs('123'))
  })

  it('returns correct string for negative input', () => {
    expect(functions.sf$left(buildLiteralFromJs('12345'), buildLiteralFromJs(-1))).to.deep.eq(buildLiteralFromJs(''))
  })
})

describe('len', () => {
  it('returns correct length', () => {
    expect(functions.sf$len(buildLiteralFromJs('12345'))).to.deep.eq(buildLiteralFromJs(5))
  })
})

describe('lower', () => {
  it('returns correct string', () => {
    expect(functions.sf$lower(buildLiteralFromJs('MYCOMPANY.COM'))).to.deep.eq(buildLiteralFromJs('mycompany.com'))
  })
})

describe('lpad', () => {
  it('no pad string given', () => {
    expect(functions.sf$lpad(buildLiteralFromJs('my_company.com'), buildLiteralFromJs(20))).to.deep.eq(buildLiteralFromJs('my_company.com'))
  })

  it('string longer than padded length', () => {
    expect(functions.sf$lpad(buildLiteralFromJs('my_company.com'), buildLiteralFromJs(14), buildLiteralFromJs('z'))).to.deep.eq(buildLiteralFromJs('my_company.com'))
  })

  it('padded length longer than string', () => {
    expect(functions.sf$lpad(buildLiteralFromJs('my_company.com'), buildLiteralFromJs(15), buildLiteralFromJs('z'))).to.deep.eq(buildLiteralFromJs('zmy_company.com'))
  })

  it('padded length shorter than string', () => {
    expect(functions.sf$lpad(buildLiteralFromJs('my_company.com'), buildLiteralFromJs(2), buildLiteralFromJs('z'))).to.deep.eq(buildLiteralFromJs('my'))
  })
})

describe('mid', () => {
  it('returns correct string', () => {
    expect(functions.sf$mid(buildLiteralFromJs('12345'), buildLiteralFromJs(2), buildLiteralFromJs(3))).to.deep.eq(buildLiteralFromJs('234'))
  })
})

describe('right', () => {
  it('returns correct string', () => {
    expect(functions.sf$right(buildLiteralFromJs('12345'), buildLiteralFromJs(3))).to.deep.eq(buildLiteralFromJs('345'))
  })

  it('returns correct string for negative input', () => {
    expect(functions.sf$left(buildLiteralFromJs('12345'), buildLiteralFromJs(-1))).to.deep.eq(buildLiteralFromJs(''))
  })
})

describe('rpad', () => {
  it('no pad string given', () => {
    expect(functions.sf$rpad(buildLiteralFromJs('my_company.com'), buildLiteralFromJs(20))).to.deep.eq(buildLiteralFromJs('my_company.com'))
  })

  it('string longer than padded length', () => {
    expect(functions.sf$rpad(buildLiteralFromJs('my_company.com'), buildLiteralFromJs(14), buildLiteralFromJs('z'))).to.deep.eq(buildLiteralFromJs('my_company.com'))
  })

  it('padded length longer than string', () => {
    expect(functions.sf$rpad(buildLiteralFromJs('my_company.com'), buildLiteralFromJs(15), buildLiteralFromJs('z'))).to.deep.eq(buildLiteralFromJs('my_company.comz'))
  })

  it('padded length shorter than string', () => {
    expect(functions.sf$rpad(buildLiteralFromJs('my_company.com'), buildLiteralFromJs(2), buildLiteralFromJs('z'))).to.deep.eq(buildLiteralFromJs('my'))
  })
})

describe.skip('substitute', () => {
  it('returns correct substitute', () => {
    // TODO implement test for sf$substitute
    expect(functions.sf$substitute(null)).to.deep.eq(null)
  })
})

describe('text', () => {
  context('Number', () => {
    it('returns correct text', () => {
      expect(functions.sf$text(buildLiteralFromJs(1))).to.deep.eq(buildLiteralFromJs('1'))
    })
  })

  context('Text', () => {
    it('returns correct text', () => {
      expect(functions.sf$text(buildLiteralFromJs('text'))).to.deep.eq(buildLiteralFromJs('text'))
    })
  })

  context('Date', () => {
    it('returns correct text', () => {
      expect(functions.sf$text(buildDateLiteral(2020, 2, 11))).to.deep.eq(buildLiteralFromJs('2020-02-11'))
    })
  })
})

describe('trim', () => {
  it('no trailing spaces', () => {
    expect(functions.sf$trim(buildLiteralFromJs('a string'))).to.deep.eq(buildLiteralFromJs('a string'))
  })

  it('trailing spaces', () => {
    expect(functions.sf$trim(buildLiteralFromJs('a string '))).to.deep.eq(buildLiteralFromJs('a string'))
  })

  it('leading spaces', () => {
    expect(functions.sf$trim(buildLiteralFromJs('  a string'))).to.deep.eq(buildLiteralFromJs('a string'))
  })

  it('trailing and leading spaces', () => {
    expect(functions.sf$trim(buildLiteralFromJs('  a string  '))).to.deep.eq(buildLiteralFromJs('a string'))
  })
})

describe('upper', () => {
  it('returns correct string', () => {
    expect(functions.sf$upper(buildLiteralFromJs('mycompany.com'))).to.deep.eq(buildLiteralFromJs('MYCOMPANY.COM'))
  })
})

describe('value', () => {
  context('Parsable', () => {
    it('returns correct value for integer', () => {
      expect(functions.sf$value(buildLiteralFromJs('1'))).to.deep.eq(buildLiteralFromJs(1))
    })

    it('returns correct value for float', () => {
      expect(functions.sf$value(buildLiteralFromJs('3.14'))).to.deep.eq(buildLiteralFromJs(3.14))
    })
  })

  context('Not Parsable', () => {
    it('returns null', () => {
      expect(functions.sf$value(buildLiteralFromJs('Number Kaputt'))).to.deep.eq(buildLiteralFromJs(null))
    })
  })
})

// Advanced Functions

describe.skip('currencyrate', () => {
  it('returns correct currencyrate', () => {
    // TODO implement test for sf$currencyrate
    expect(functions.sf$currencyrate(null)).to.deep.eq(null)
  })
})

describe('regex', () => {
  it('returns true for match', () => {
    let text = buildLiteralFromJs('999-99-9999')
    let regexText = buildLiteralFromJs('[0-9]{3}-[0-9]{2}-[0-9]{4}')
    expect(functions.sf$regex(text, regexText)).to.deep.eq(buildLiteralFromJs(true))
  })

  it('returns false for non-match', () => {
    let text = buildLiteralFromJs('something else')
    let regexText = buildLiteralFromJs('[0-9]{3}-[0-9]{2}-[0-9]{4}')
    expect(functions.sf$regex(text, regexText)).to.deep.eq(buildLiteralFromJs(false))
  })

  it('matches complete string', () => {
    let text = buildLiteralFromJs('According to Marc Benioff, the social enterprise increases customer success.')
    let regexText = buildLiteralFromJs('.*Marc Benioff.*')
    expect(functions.sf$regex(text, regexText)).to.deep.eq(buildLiteralFromJs(true))
  })

  it('does not match partial string', () => {
    let text = buildLiteralFromJs('According to Marc Benioff, the social enterprise increases customer success.')
    let regexText = buildLiteralFromJs('Marc Benioff')
    expect(functions.sf$regex(text, regexText)).to.deep.eq(buildLiteralFromJs(false))
  })
})
