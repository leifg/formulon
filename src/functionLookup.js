"use strict"

// TODO implement for other types
function normalizeIdentifier(input) {
  switch (input.dataType) {
    case 'number':
      return Object.assign(
        {},
        input,
        { value: parseInt(input.value, 10) },
        {
          meta: {
            length: input.value.replace(/[\+\-]/g,"").length,
            scale: 0,
          }
        }
      )
    default:
      return input
  }
}

export const normalizeLiteral = function(input) {
  return Object.keys(input).map((key) => {
    return {
      name: key,
      value: input[key].value,
      dataType: input[key].dataType,
    }
  }).reduce((agg, identifier) => {
    return Object.assign(
      agg,
      {
        [identifier.name]: normalizeIdentifier(
          {
            value: identifier.value,
            dataType: identifier.dataType
          }
        )
      }
    )
  }, {})
}

function calculateNumberMeta(number) {
  let numberString = (number).toString().replace("-", "")
  if(numberString.indexOf(".") != -1) {
    let splitted = numberString.split(".")
    return {
      length: splitted[0].length,
      scale: splitted[1].length,
    }
  }

  return {
    length: numberString.length,
    scale: 0,
  }
}

export const buildLiteralFromJs = function(input) {
  let type = typeof(input)
  let base = { type: "Literal", value: input }
  switch(typeof(input)) {
    case 'number':
      return Object.assign(
        base,
        { dataType: 'number', meta: calculateNumberMeta(input) }
      )
    case 'string':
      return Object.assign(
        base,
        { dataType: 'text', meta: { length: input.length } }
      )
    case 'boolean':
      return Object.assign(
        base,
        { dataType: 'checkbox', meta: {} }
      )
    default:
      throw new TypeError(`Unsupported type '${type}'`)
  }
}

const FunctionLookup = {
  add: function(a, b) {
    return buildLiteralFromJs(a.value + b.value)
  },
  subtract: function(a, b) {
    return buildLiteralFromJs(a.value - b.value)
  },
  multiply: function(a, b) {
    return buildLiteralFromJs(a.value * b.value)
  },
  divide: function(a, b) {
    return buildLiteralFromJs(a.value / b.value)
  },
  exponentiate: function(a, b) {
    return buildLiteralFromJs(Math.pow(a.value,b.value))
  },
  and: function(a, b) {
    return buildLiteralFromJs(a.value && b.value)
  },
  or: function(a, b) {
    return buildLiteralFromJs(a.value || b.value)
  },
  not: function(a) {
    return buildLiteralFromJs(!a.value)
  },
}

export default FunctionLookup
