'use strict'

import { FormulonRuntimeError } from './errors.js'

export const buildLiteralFromJs = (input) => {
  let type = typeof (input)
  let base = { type: 'literal', value: input }
  switch (typeof (input)) {
    case 'number':
      return Object.assign(
        base,
        { dataType: 'number', options: calculateNumberOptions(input) }
      )
    case 'string':
      return Object.assign(
        base,
        { dataType: 'text', options: { length: input.length } }
      )
    case 'boolean':
      return Object.assign(
        base,
        { dataType: 'checkbox', options: {} }
      )
    default:
      throw new TypeError(`Unsupported type '${type}'`)
  }
}

export const buildErrorLiteral = (errorType, message, options) =>{
  return Object.assign(
    {
      type: 'error',
      errorType: errorType,
      message: message
    },
    options
  )
}

export const buildDateLiteral = ( year, month, day ) => {
  return {
    type: 'literal',
    dataType: 'date',
    value: new Date(year, month - 1, day),
    options: {}
  }
}

export const arrayUnique = (array) => {
  return array.reduce((p, c) => {
    if (p.indexOf(c) < 0) p.push(c)
    return p
  }, [])
}

export const coerceLiteral = (input) => {
  return Object.assign({}, input, { value: coerceValue(input.dataType, input.value, input.options) })
}

// Salesforce rounding works slightly different than JS rounding
// JS:
// Math.round(-1.5) => -1
// SF:
// ROUND(-1.5) => -2
export const sfRound = (number, numDigits) => {
  if (number < 0) {
    return -1 * sfRound(number * -1, numDigits)
  }
  let multiplier = Math.pow(10, numDigits)
  return Math.round(number * multiplier) / multiplier
}

export const handleFormulonError = (fn) => {
  try {
    return fn()
  } catch (err) {
    if(err instanceof FormulonRuntimeError) {
      return buildErrorLiteral(err.errorType, err.message, err.options)
    }

    throw err
  }
}

// private

const calculateNumberOptions = (number) => {
  let numberString = (number).toString().replace('-', '')
  if (numberString.indexOf('.') !== -1) {
    let splitted = numberString.split('.')
    return {
      length: splitted[0].length,
      scale: splitted[1].length
    }
  }

  return {
    length: numberString.length,
    scale: 0
  }
}

const coerceValue = (dataType, value, options) => {
  switch (dataType) {
    case 'number':
      return sfRound(value, options.scale)
    case 'text':
      return value.substring(0, options.length)
    default:
      return value
  }
}
