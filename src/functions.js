'use strict'

import { buildLiteralFromJs } from './utils'

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

// Text Functions

export const sf$trim = (text) => {
  return buildLiteralFromJs(text.value.trim())
}
