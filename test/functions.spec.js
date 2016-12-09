/* global describe it */

'use strict'

const expect = require('chai').expect

import * as functions from '../lib/functions'
import { buildLiteralFromJs } from '../lib/utils'

// Math Operators and  Functions

describe('add', () => {
  it('adds correctly', () => {
    expect(functions.sf$add(buildLiteralFromJs(1), buildLiteralFromJs(2))).to.deep.eq(buildLiteralFromJs(3))
  })
})

describe('negate', () => {
  it('negates correctly', () => {
    expect(functions.sf$negate(buildLiteralFromJs(10))).to.deep.eq(buildLiteralFromJs(-10))
  })
})

describe('multiply', () => {
  it('multiplies correctly', () => {
    expect(functions.sf$multiply(buildLiteralFromJs(7), buildLiteralFromJs(8))).to.deep.eq(buildLiteralFromJs(56))
  })
})

describe('invert', () => {
  it('inverts correctly', () => {
    expect(functions.sf$invert(buildLiteralFromJs(10))).to.deep.eq(buildLiteralFromJs(0.1))
  })
})

describe('exponentiate', () => {
  it('exponentiates correctly', () => {
    expect(functions.sf$exponentiate(buildLiteralFromJs(2), buildLiteralFromJs(5))).to.deep.eq(buildLiteralFromJs(32))
  })
})

// Logical Operators and Functions

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
    expect(fn).to.throw(SyntaxError, "Incorrect number of parameters for function 'CASE()'. Expected 24, received 25")
  })

  it('only 2 arguments', () => {
    let fn = () => { invalidFn2(5) }
    expect(fn).to.throw(SyntaxError, "Incorrect number of parameters for function 'CASE()'. Expected 4+, received 2")
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

describe('not', () => {
  it('true', () => {
    expect(functions.sf$not(buildLiteralFromJs(true))).to.deep.eq(buildLiteralFromJs(false))
  })

  it('false', () => {
    expect(functions.sf$not(buildLiteralFromJs(false))).to.deep.eq(buildLiteralFromJs(true))
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

describe('if', () => {
  it('true', () => {
    expect(functions.sf$if(buildLiteralFromJs(true), buildLiteralFromJs('first'), buildLiteralFromJs('second'))).to.deep.eq(buildLiteralFromJs('first'))
  })
  it('false', () => {
    expect(functions.sf$if(buildLiteralFromJs(false), buildLiteralFromJs('first'), buildLiteralFromJs('second'))).to.deep.eq(buildLiteralFromJs('second'))
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

describe('exp', () => {
  it('Integer Literal', () => {
    expect(functions.sf$exp(buildLiteralFromJs(1))).to.deep.eq(buildLiteralFromJs(2.718281828459045))
  })
})

describe('distance', () => {})

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

describe('geolocation', () => {})

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

describe('right', () => {
  it('returns correct string', () => {
    expect(functions.sf$right(buildLiteralFromJs('12345'), buildLiteralFromJs(3))).to.deep.eq(buildLiteralFromJs('345'))
  })

  it('returns correct string for negative input', () => {
    expect(functions.sf$left(buildLiteralFromJs('12345'), buildLiteralFromJs(-1))).to.deep.eq(buildLiteralFromJs(''))
  })
})

describe('upper', () => {
  it('returns correct string', () => {
    expect(functions.sf$upper(buildLiteralFromJs('mycompany.com'))).to.deep.eq(buildLiteralFromJs('MYCOMPANY.COM'))
  })
})

// Advanced Functions

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
