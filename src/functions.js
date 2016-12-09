'use strict'

import { buildLiteralFromJs, sfRound } from './utils'

// Math Operators

export const sf$negate = (value) => {
  return buildLiteralFromJs(-1 * (value.value))
}

export const sf$invert = (value) => {
  return buildLiteralFromJs(1.0 / (value.value))
}

export const sf$add = (...input) => {
  let values = input.map((v) => v.value)
  return buildLiteralFromJs(values.reduce((a, b) => a + b))
}

export const sf$multiply = (...input) => {
  let values = input.map((v) => v.value)
  return buildLiteralFromJs(values.reduce((a, b) => a * b))
}

export const sf$exponentiate = (value1, value2) => {
  return buildLiteralFromJs(Math.pow(value1.value, value2.value))
}

// Logical Operators and Functions

export const sf$and = (logical1, logical2) => {
  return buildLiteralFromJs(logical1.value && logical2.value)
}

export const sf$case = (expression, ...values) => {
  let lastValueIndex = values.length - 1
  if (lastValueIndex <= 0) {
    throw new SyntaxError(`Incorrect number of parameters for function 'CASE()'. Expected 4+, received ${lastValueIndex + 2}`)
  }

  if (lastValueIndex % 2 !== 0) {
    throw new SyntaxError(`Incorrect number of parameters for function 'CASE()'. Expected ${lastValueIndex + 1}, received ${lastValueIndex + 2}`)
  }
  for (let index = 0; index < lastValueIndex; index += 2) {
    if (sf$equal(values[index], expression).value) {
      return values[index + 1]
    }
  }
  return values[lastValueIndex]
}

export const sf$or = (logical1, logical2) => {
  return buildLiteralFromJs(logical1.value || logical2.value)
}

export const sf$not = (logical) => {
  return buildLiteralFromJs(!logical.value)
}

export const sf$if = (logicalTest, valueIfTrue, valueIfFalse) => {
  return logicalTest.value ? valueIfTrue : valueIfFalse
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

// Math Functions

export const sf$abs = (number) => {
  return buildLiteralFromJs(Math.abs(number.value))
}

export const sf$ceiling = (number) => {
  return buildLiteralFromJs(Math.ceil(number.value))
}

export const sf$exp = (number) => {
  return buildLiteralFromJs(Math.exp(number.value))
}

export const sf$floor = (number) => {
  return buildLiteralFromJs(Math.floor(number.value))
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

export const sf$left = (text, numChars) => {
  return sf$mid(text, buildLiteralFromJs(1), numChars)
}

export const sf$len = (text) => {
  return buildLiteralFromJs(text.value.length)
}

export const sf$lower = (text, locale) => {
  return buildLiteralFromJs(text.value.toLowerCase())
}

export const sf$lpad = (text, paddedLength, padString) => {
  if (padString == null) {
    return text
  } else if (paddedLength.value < text.value.length) {
    return sf$left(text, paddedLength)
  }
  let maxPadding = padString.value.repeat(paddedLength.value)
  return buildLiteralFromJs((maxPadding + text.value).slice(-paddedLength.value))
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

export const sf$mid = (text, startNum, numChars) => {
  return buildLiteralFromJs(text.value.substr(startNum.value - 1, numChars.value))
}

export const sf$right = (text, numChars) => {
  return buildLiteralFromJs(text.value.substr(text.value.length - numChars.value))
}

export const sf$trim = (text) => {
  return buildLiteralFromJs(text.value.trim())
}

export const sf$upper = (text, locale) => {
  return buildLiteralFromJs(text.value.toUpperCase())
}

// Advanced Functions

export const sf$regex = (text, regexText) => {
  let r = new RegExp(`^${regexText.value}$`)
  return buildLiteralFromJs(r.exec(text.value) != null)
}
