"use strict"

export const normalizeLiteral = function(input) {
  return Object.keys(input).map((key) => {
    return Object.assign(
      {},
      { name: key },
      input[key]
    )
  }).reduce((agg, identifier) => {
    let name = identifier.name
    let object = normalizeIdentifier(identifier)
    delete object.name
    return Object.assign(
      agg,
      {
        [name]: object
      }
    )
  }, {})
}

export const buildLiteralFromJs = function(input) {
  let type = typeof(input)
  let base = { type: "literal", value: input }
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

export const arrayUnique = (array) => {
  return array.reduce(function(p, c) {
    if (p.indexOf(c) < 0) p.push(c);
    return p;
  }, []);
}

// private

// TODO implement for other types
const normalizeIdentifier = (input) => {
  switch (input.dataType) {
    case 'number':
      return Object.assign(
        {},
        input,
        { value: parseInt(input.value, 10) }
      )
    default:
      return input
  }
}

const calculateNumberMeta = (number) => {
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
