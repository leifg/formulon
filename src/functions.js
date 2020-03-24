'use strict'

import { toString } from './formulon'
import { addDays, addMonths, buildDateLiteral, buildDatetimeLiteral, buildGeolocationLiteral, buildLiteralFromJs, buildTimeLiteral, daysDifference, parseTime, sfRound } from './utils'
import { throwNotImplemeted, throwWrongType, ArgumentError } from './errors'

// Date & Time Functions

/* eslint-disable no-unused-vars */
export const sf$addmonths = (date, num) => {
  return buildDateLiteral(addMonths(date.value, num.value))
}
/* eslint-enable no-unused-vars */

export const sf$date = (year, month, day) => {
  return buildDateLiteral(year.value, month.value, day.value)
}

export const sf$datevalue = (expression) => {
  return buildDateLiteral(new Date(Date.parse(expression.value)))
}

export const sf$datetimevalue = (expression) => {
  return buildDatetimeLiteral(Date.parse(`${expression.value}Z`))
}

export const sf$day = (date) => {
  return buildLiteralFromJs(date.value.getUTCDate())
}

export const sf$hour = (expression) => {
  return buildLiteralFromJs(expression.value.getUTCHours())
}

export const sf$millisecond = (expression) => {
  return buildLiteralFromJs(expression.value.getUTCMilliseconds())
}

export const sf$minute = (expression) => {
  return buildLiteralFromJs(expression.value.getUTCMinutes())
}

export const sf$month = (date) => {
  return buildLiteralFromJs(date.value.getUTCMonth() + 1)
}

export const sf$now = () => {
  return buildDatetimeLiteral(new Date().getTime())
}

export const sf$second = (expression) => {
  return buildLiteralFromJs(expression.value.getUTCSeconds())
}

/* eslint-disable no-unused-vars */
export const sf$timenow = () => {
  let millisecondsInDay = 24 * 60 * 60 * 1000

  return buildTimeLiteral(new Date().getTime() % millisecondsInDay)
}
/* eslint-enable no-unused-vars */

export const sf$timevalue = (expression) => {
  return parseTime(expression.value)
}

export const sf$today = () => {
  return buildDateLiteral(new Date())
}

export const sf$weekday = (date) => {
  return buildLiteralFromJs(date.value.getUTCDay() + 1)
}

export const sf$year = (date) => {
  return buildLiteralFromJs(date.value.getUTCFullYear())
}

// Logical Functions

export const sf$and = (logical1, logical2) => {
  return buildLiteralFromJs(logical1.value && logical2.value)
}

/* eslint-disable no-unused-vars */
export const sf$blankvalue = (_expression, _substituteExpression) => {
  throwNotImplemeted('blankvalue')
}
/* eslint-enable no-unused-vars */

export const sf$case = (expression, ...values) => {
  let lastValueIndex = values.length - 1
  if (lastValueIndex <= 0) {
    let options = {
      function: 'case',
      expected: 4,
      received: lastValueIndex + 2
    }
    throw new ArgumentError(`Incorrect number of parameters for function '${options.function.toUpperCase()}()'. Expected ${options.expected}+, received ${options.received}`, options)
  }

  if (lastValueIndex % 2 !== 0) {
    let options = {
      function: 'case',
      expected: lastValueIndex + 1,
      received: lastValueIndex + 2
    }
    throw new ArgumentError(`Incorrect number of parameters for function '${options.function.toUpperCase()}()'. Expected ${options.expected}, received ${options.received}`, options)
  }
  for (let index = 0; index < lastValueIndex; index += 2) {
    if (sf$equal(values[index], expression).value) {
      return values[index + 1]
    }
  }
  return values[lastValueIndex]
}

export const sf$if = (logicalTest, valueIfTrue, valueIfFalse) => {
  return logicalTest.value ? valueIfTrue : valueIfFalse
}

export const sf$isblank = (text) => {
  return buildLiteralFromJs(text.value === '')
}

/* eslint-disable no-unused-vars */
export const sf$isnull = (_expression) => {
  throwNotImplemeted('isnull')
}
/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars */
export const sf$isnumber = (_text) => {
  throwNotImplemeted('isnumber')
}
/* eslint-enable no-unused-vars */

export const sf$not = (logical) => {
  return buildLiteralFromJs(!logical.value)
}

/* eslint-disable no-unused-vars */
export const sf$nullvalue = (_expression, _substituteExpression) => {
  throwNotImplemeted('nullvalue')
}
/* eslint-enable no-unused-vars */

export const sf$or = (logical1, logical2) => {
  return buildLiteralFromJs(logical1.value || logical2.value)
}

export const sf$equal = (value1, value2) => {
  return buildLiteralFromJs(value1.value === value2.value)
}

export const sf$unequal = (value1, value2) => {
  return buildLiteralFromJs(value1.value !== value2.value)
}

export const sf$greaterThan = (value1, value2) => {
  return buildLiteralFromJs(value1.value > value2.value)
}

export const sf$greaterThanOrEqual = (value1, value2) => {
  return buildLiteralFromJs(value1.value >= value2.value)
}

export const sf$lessThan = (value1, value2) => {
  return buildLiteralFromJs(value1.value < value2.value)
}

export const sf$lessThanOrEqual = (value1, value2) => {
  return buildLiteralFromJs(value1.value <= value2.value)
}

// Math Operators

export const sf$add = (value1, value2) => {
  switch([value1.dataType, value2.dataType].join(' ')) {
    case 'date number':
      return buildDateLiteral(addDays(value1.value, value2.value))
    case 'number date':
      return buildDateLiteral(addDays(value2.value, value1.value))
    case 'time number':
      return buildTimeLiteral(value1.value.getTime() + value2.value)
    case 'number time':
      return buildTimeLiteral(value1.value + value2.value.getTime())
    case 'datetime number':
      return buildDatetimeLiteral(addDays(value1.value, value2.value))
    case 'number datetime':
      return buildDatetimeLiteral(addDays(value2.value, value1.value))
    case 'number number':
    case 'text text':
      return buildLiteralFromJs(value1.value + value2.value)
    default:
      throwWrongType('add', 'number', value2.dataType)
  }
}

export const sf$subtract = (value1, value2) => {
  switch([value1.dataType, value2.dataType].join(' ')) {
    case 'date number':
      return buildDateLiteral(addDays(value1.value, -1 * value2.value))
    case 'time number':
      return buildTimeLiteral(value1.value.getTime() + -1 * value2.value)
    case 'datetime number':
      return buildDatetimeLiteral(addDays(value1.value, -1 * value2.value))
    case 'date date':
    case 'datetime datetime':
      return buildLiteralFromJs(daysDifference(value1.value, value2.value))
    case 'time time':
      return buildLiteralFromJs(value1.value.getTime() - value2.value.getTime())
    case 'number number':
    case 'text text':
      return buildLiteralFromJs(value1.value - value2.value)
    default:
      throwWrongType('subtract', 'number', value2.dataType)
  }
}

export const sf$multiply = (value1, value2) => {
  return buildLiteralFromJs(value1.value * value2.value)
}

export const sf$divide = (value1, value2) => {
  return buildLiteralFromJs(value1.value / value2.value)
}

export const sf$exponentiate = (value1, value2) => {
  return buildLiteralFromJs(Math.pow(value1.value, value2.value))
}

// Math Functions

export const sf$abs = (number) => {
  return buildLiteralFromJs(Math.abs(number.value))
}

export const sf$ceiling = (number) => {
  return buildLiteralFromJs(Math.ceil(number.value))
}

/* eslint-disable no-unused-vars */
export const sf$distance = (_location1, _location2, _unit) => {
  throwNotImplemeted('distance')
}
/* eslint-enable no-unused-vars */

export const sf$exp = (number) => {
  return buildLiteralFromJs(Math.exp(number.value))
}

export const sf$floor = (number) => {
  return buildLiteralFromJs(Math.floor(number.value))
}

export const sf$geolocation = (latitude, longitude) => {
  return buildGeolocationLiteral(latitude.value, longitude.value)
}

export const sf$ln = (number) => {
  return buildLiteralFromJs(Math.log(number.value))
}

export const sf$log = (number) => {
  return buildLiteralFromJs(Math.log10(number.value))
}

export const sf$max = (...numbers) => {
  let values = numbers.map((v) => v.value)
  return buildLiteralFromJs(Math.max(...values))
}

/* eslint-disable no-unused-vars */
export const sf$mceiling = (_number) => {
  throwNotImplemeted('mceiling')
}
/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars */
export const sf$mfloor = (_number) => {
  throwNotImplemeted('mfloor')
}
/* eslint-enable no-unused-vars */

export const sf$min = (...numbers) => {
  let values = numbers.map((v) => v.value)
  return buildLiteralFromJs(Math.min(...values))
}

export const sf$mod = (number, divisor) => {
  return buildLiteralFromJs(number.value % divisor.value)
}

export const sf$round = (number, numDigits) => {
  return buildLiteralFromJs(sfRound(number.value, numDigits.value))
}

export const sf$sqrt = (number) => {
  return buildLiteralFromJs(Math.sqrt(number.value))
}

// Text Functions

export const sf$begins = (text, compareText) => {
  return buildLiteralFromJs(text.value.startsWith(compareText.value))
}

export const sf$br = () => {
  return buildLiteralFromJs('\n')
}

/* eslint-disable no-unused-vars */
export const sf$casesafeid = (_id) => {
  throwNotImplemeted('casesafeid')
}
/* eslint-enable no-unused-vars */


export const sf$concat = (text1, text2) => {
  return buildLiteralFromJs(text1.value + text2.value)
}

export const sf$contains = (text, compareText) => {
  return buildLiteralFromJs(text.value.includes(compareText.value))
}

export const sf$find = (searchText, text, startNum = buildLiteralFromJs(1)) => {
  if (startNum.value <= 0 || searchText.value === '') {
    return buildLiteralFromJs(0)
  }

  let textToSearchIn = text.value.substring(startNum.value - 1)
  return buildLiteralFromJs(textToSearchIn.indexOf(searchText.value) + 1)
}

export const sf$getsessionid = () => {
  throwNotImplemeted('getsessionid')
}

/* eslint-disable no-unused-vars */
export const sf$hyperlink = (_url, _friendlyName, _target = null) => {
  throwNotImplemeted('hyperlink')
}
/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars */
export const sf$image = (_imageUrl, _alternateText, _height = null, _width = null) => {
  throwNotImplemeted('image')
}
/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars */
export const sf$includes = (multiselectPicklistField, textLiteral) => {
  return buildLiteralFromJs(multiselectPicklistField.value.includes(textLiteral.value))
}
/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars */
export const sf$ispickval = (picklistField, textLiteral) => {
  return buildLiteralFromJs(picklistField.value === textLiteral.value)
}
/* eslint-enable no-unused-vars */

export const sf$left = (text, numChars) => {
  return sf$mid(text, buildLiteralFromJs(1), numChars)
}

export const sf$len = (text) => {
  return buildLiteralFromJs(text.value.length)
}

/* eslint-disable no-unused-vars */
export const sf$lower = (text, _locale) => {
  return buildLiteralFromJs(text.value.toLowerCase())
}
/* eslint-enable no-unused-vars */

export const sf$lpad = (text, paddedLength, padString) => {
  if (padString == null) {
    return text
  } else if (paddedLength.value < text.value.length) {
    return sf$left(text, paddedLength)
  }
  let maxPadding = padString.value.repeat(paddedLength.value)
  return buildLiteralFromJs((maxPadding + text.value).slice(-paddedLength.value))
}

export const sf$mid = (text, startNum, numChars) => {
  return buildLiteralFromJs(text.value.substr(startNum.value - 1, numChars.value))
}

export const sf$right = (text, numChars) => {
  return buildLiteralFromJs(text.value.substr(text.value.length - numChars.value))
}

export const sf$rpad = (text, paddedLength, padString) => {
  if (padString == null) {
    return text
  } else if (paddedLength.value < text.value.length) {
    return sf$left(text, paddedLength)
  }
  let maxPadding = padString.value.repeat(paddedLength.value)
  return buildLiteralFromJs((text.value + maxPadding).substr(0, paddedLength.value))
}

/* eslint-disable no-unused-vars */
export const sf$substitute = (text, oldText, newText) => {
  throwNotImplemeted('substitute')
}
/* eslint-enable no-unused-vars */

export const sf$text = (value) => {
  if(value.dataType === 'text') {
    return value
  }

  if(value.dataType === 'datetime') {
    return buildLiteralFromJs(toString(value).replace('T', ' ').replace(/\.\d{3}/, ''))
  }

  return buildLiteralFromJs(toString(value))
}

export const sf$trim = (text) => {
  return buildLiteralFromJs(text.value.trim())
}

/* eslint-disable no-unused-vars */
export const sf$upper = (text, _locale) => {
  return buildLiteralFromJs(text.value.toUpperCase())
}
/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars */
export const sf$value = (text) => {
  let parsedValue = parseFloat(text.value)

  if(parsedValue) {
    return buildLiteralFromJs(parsedValue)
  }

  return buildLiteralFromJs(null)
}
/* eslint-enable no-unused-vars */

// Advanced Functions

/* eslint-disable no-unused-vars */
export const sf$currencyrate = (_isoCode) => {
  throwNotImplemeted('currencyrate')
}
/* eslint-enable no-unused-vars */

export const sf$regex = (text, regexText) => {
  let r = new RegExp(`^${regexText.value}$`)
  return buildLiteralFromJs(r.exec(text.value) != null)
}
