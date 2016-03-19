"use strict"

import { buildLiteralFromJs } from "./utils"

export const sf$add = (a, b) => {
  return buildLiteralFromJs(a.value + b.value)
}

export const sf$subtract = (a, b) => {
  return buildLiteralFromJs(a.value - b.value)
}

export const sf$multiply = (a, b) => {
  return buildLiteralFromJs(a.value * b.value)
}

export const sf$divide = (a, b) => {
  return buildLiteralFromJs(a.value / b.value)
}

export const sf$exponentiate = (a, b) => {
  return buildLiteralFromJs(Math.pow(a.value,b.value))
}

export const sf$and = (a, b) => {
  return buildLiteralFromJs(a.value && b.value)
}

export const sf$or = (a, b) => {
  return buildLiteralFromJs(a.value || b.value)
}

export const sf$not = (a) => {
  return buildLiteralFromJs(!a.value)
}
