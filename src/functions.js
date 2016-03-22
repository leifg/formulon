'use strict'

import { buildLiteralFromJs, sfRound } from './utils'

// Math Operators

export const sf$add = (value1, value2) => {
  return buildLiteralFromJs(value1.value + value2.value)
}

export const sf$subtract = (value1, value2) => {
  return buildLiteralFromJs(value1.value - value2.value)
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

// Logical Operators and Functions

export const sf$and = (logical1, logical2) => {
  return buildLiteralFromJs(logical1.value && logical2.value)
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

export const sf$left = (text, numChars) => {
  return sf$mid(text, buildLiteralFromJs(1), numChars)
}

export const sf$len = (text) => {
  return buildLiteralFromJs(text.value.length)
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
