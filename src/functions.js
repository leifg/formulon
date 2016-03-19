"use strict"

import { buildLiteralFromJs } from "./utils"

export const add = (a, b) => {
  return buildLiteralFromJs(a.value + b.value)
}

export const subtract = (a, b) => {
  return buildLiteralFromJs(a.value - b.value)
}

export const multiply = (a, b) => {
  return buildLiteralFromJs(a.value * b.value)
}

export const divide = (a, b) => {
  return buildLiteralFromJs(a.value / b.value)
}

export const exponentiate = (a, b) => {
  return buildLiteralFromJs(Math.pow(a.value,b.value))
}

export const and = (a, b) => {
  return buildLiteralFromJs(a.value && b.value)
}

export const or = (a, b) => {
  return buildLiteralFromJs(a.value || b.value)
}

export const not = (a) => {
  return buildLiteralFromJs(!a.value)
}
