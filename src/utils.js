'use strict'

import { FormulonRuntimeError } from './errors.js'

export const buildLiteralFromJs = (input) => {
  let base = { type: 'literal', value: input }

  if (input === null) {
    return Object.assign(
      base,
      { dataType: 'null', options: {} }
    )
  }

  let type = typeof (input)
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

export const buildDateLiteral = (yearOrDateObj, month, day) => {
  if(yearOrDateObj instanceof Date) {
    return buildDateLiteral(yearOrDateObj.getUTCFullYear(), yearOrDateObj.getUTCMonth() + 1, yearOrDateObj.getUTCDate())
  }

  return {
    type: 'literal',
    dataType: 'date',
    value: new Date(Date.UTC(yearOrDateObj, month - 1, day)),
    options: {}
  }
}

export const buildDatetimeLiteral = (unixTimestamp) => {
  return {
    type: 'literal',
    dataType: 'datetime',
    value: new Date(unixTimestamp),
    options: {}
  }
}

export const buildGeolocationLiteral = (latitude, longitude) => {
  return {
    type: 'literal',
    dataType: 'geolocation',
    value: [latitude, longitude],
    options: {}
  }
}

export const buildPicklistLiteral = (value, values) => {
  return {
    type: 'literal',
    dataType: 'picklist',
    value: value,
    options: { values: values }
  }
}

export const buildMultipicklistLiteral = (value, values) => {
  return {
    type: 'literal',
    dataType: 'multipicklist',
    value: value,
    options: { values: values }
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

// shamelessly stolen from https://stackoverflow.com/a/12793246/1087469
export const addMonths = (date, numOfMonths) => {
  let newMonth = date.getUTCMonth() + numOfMonths
  let newDate = new Date(Date.UTC(date.getUTCFullYear(), newMonth, date.getUTCDate()))

  if (date.getUTCDate() != newDate.getUTCDate()) {
    newDate.setUTCDate(0);
  }

  return newDate
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
