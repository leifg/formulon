import * as functions from './functions'
import { maxNumOfParams, minNumOfParams, paramTypes } from './validations'
import { handleFormulonError } from './utils.js'
import { NoFunctionError } from './errors.js'

export const dispatch = (name, args) => {
  return handleFormulonError(() => {
    let existingFunction = existingFunctions[name]

    if (existingFunction) {
      existingFunction.validations.forEach(
        validateFn => validateFn(name)(args)
      )

      return functions[`sf$${name}`](...args)
    }

    throw new NoFunctionError(`Unknown function ${name.toUpperCase()}. Check spelling.`, { function: name })
  })
}

const existingFunctions = {
  abs: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('number')]
  },
  add: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes(['number', 'text', 'date', 'datetime'], ['number', 'text', 'date', 'datetime'])]
  },
  addmonths: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes(['date', 'datetime'], ['number'])]
  },
  and: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes('checkbox', 'checkbox')]
  },
  begins: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes('text', 'text')]
  },
  blankvalue: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes(['text', 'number'], ['text', 'number'])]
  },
  br: {
    validations: [minNumOfParams(0), maxNumOfParams(0)]
  },
  case: {
    validations: [minNumOfParams(4), paramTypes(['text', 'number', 'date', 'datetime'])],
  },
  casesafeid: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('text')],
  },
  ceiling: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('number')]
  },
  contains: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes('text', 'text')]
  },
  currencyrate: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('text')]
  },
  date: {
    validations: [minNumOfParams(3), maxNumOfParams(3), paramTypes('number', 'number', 'number')]
  },
  datetimevalue: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('text')]
  },
  datevalue: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('text')]
  },
  day: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('date')]
  },
  distance: {
    validations: [minNumOfParams(3), maxNumOfParams(3), paramTypes('geolocation', 'geolocation', 'text')]
  },
  divide: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes('number', 'number')],
  },
  equal: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes(['text', 'number', 'date', 'datetime'])]
  },
  exp: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('number')]
  },
  exponentiate: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes('number', 'number')],
  },
  find: {
    validations: [minNumOfParams(2), maxNumOfParams(3), paramTypes('text', 'text', 'number')],
  },
  floor: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('number')]
  },
  geolocation: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes('number', 'number')]
  },
  getsessionid: {
    validations: [minNumOfParams(0), maxNumOfParams(0)]
  },
  greaterThan: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes('number', 'number')]
  },
  greaterThanOrEqual: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes('number', 'number')]
  },
  hour: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('datetime')]
  },
  hyperlink: {
    validations: [minNumOfParams(2), maxNumOfParams(3), paramTypes('text', 'text', 'text')]
  },
  if: {
    validations: [minNumOfParams(3), maxNumOfParams(3), paramTypes('checkbox', ['text', 'number', 'date', 'datetime'], ['text', 'number', 'date', 'datetime'])]
  },
  image: {
    validations: [minNumOfParams(2), maxNumOfParams(4), paramTypes('text', 'text', 'number', 'number')]
  },
  includes: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes('multipicklist', 'text')]
  },
  isblank: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes(['text', 'number'])]
  },
  isnull: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes(['text', 'number'])]
  },
  ispickval: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes('picklist', 'text')]
  },
  isnumber: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('text')]
  },
  left: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes('text', 'number')]
  },
  len: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('text')]
  },
  lessThan: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes('number', 'number')]
  },
  lessThanOrEqual: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes('number', 'number')]
  },
  ln: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('number')]
  },
  log: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('number')]
  },
  lower: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('text')]
  },
  lpad: {
    validations: [minNumOfParams(2), maxNumOfParams(3), paramTypes('text', 'number', 'text')]
  },
  max: {
    validations: [minNumOfParams(1), paramTypes('number')]
  },
  mceiling: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('number')]
  },
  mfloor: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('number')]
  },
  mid: {
    validations: [minNumOfParams(3), maxNumOfParams(3), paramTypes('text', 'number', 'number')]
  },
  millisecond: {
    validations: [minNumOfParams(1), maxNumOfParams(1), , paramTypes('datetime')]
  },
  min: {
    validations: [minNumOfParams(1), paramTypes('number')]
  },
  minute: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('datetime')]
  },
  mod: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes('number', 'number')]
  },
  month: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('date')]
  },
  multiply: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes('number', 'number')]
  },
  not: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('checkbox')]
  },
  now: {
    validations: [minNumOfParams(0), maxNumOfParams(0)]
  },
  nullvalue: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes(['text', 'number'], ['text', 'number'])]
  },
  or: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes('checkbox')]
  },
  regex: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes('text', 'text')]
  },
  right: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes('text', 'number')]
  },
  round: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes('number', 'number')]
  },
  rpad: {
    validations: [minNumOfParams(2), maxNumOfParams(3), paramTypes('text', 'number', 'text')]
  },
  second: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('datetime')]
  },
  sqrt: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('number')]
  },
  subtract: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes('number', 'number')],
  },
  substitute: {
    validations: [minNumOfParams(3), maxNumOfParams(3), paramTypes('text', 'text', 'text')],
  },
  text: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes(['number', 'date', 'datetime', 'picklist'])],
  },
  timenow: {
    validations: [minNumOfParams(0), maxNumOfParams(0)]
  },
  timevalue: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('text')]
  },
  today: {
    validations: [minNumOfParams(0), maxNumOfParams(0)]
  },
  trim: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('text')]
  },
  unequal: {
    validations: [minNumOfParams(2), maxNumOfParams(2), paramTypes(['text', 'number'], ['text', 'number'])]
  },
  upper: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('text')]
  },
  value: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('text')]
  },
  weekday: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('date')]
  },
  year: {
    validations: [minNumOfParams(1), maxNumOfParams(1), paramTypes('date')]
  },
}
