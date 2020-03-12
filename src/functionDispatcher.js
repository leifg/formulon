import * as functions from './functions'
import { maxNumOfParams, minNumOfParams } from './validations'
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
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  add: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  addmonths: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  and: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  begins: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  blankvalue: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  br: {
    validations: [minNumOfParams(0), maxNumOfParams(0)]
  },
  case: {
    validations: [minNumOfParams(4)],
  },
  casesafeid: {
    validations: [minNumOfParams(1), maxNumOfParams(1)],
  },
  ceiling: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  contains: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  currencyrate: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  date: {
    validations: [minNumOfParams(3), maxNumOfParams(3)]
  },
  datetimevalue: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  datevalue: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  day: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  distance: {
    validations: [minNumOfParams(3), maxNumOfParams(3)]
  },
  divide: {
    validations: [minNumOfParams(2), maxNumOfParams(2)],
  },
  equal: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  exp: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  exponentiate: {
    validations: [minNumOfParams(2), maxNumOfParams(2)],
  },
  find: {
    validations: [minNumOfParams(2), maxNumOfParams(3)],
  },
  floor: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  geolocation: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  getsessionid: {
    validations: [minNumOfParams(0), maxNumOfParams(0)]
  },
  greaterThan: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  greaterThanOrEqual: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  hour: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  hyperlink: {
    validations: [minNumOfParams(2), maxNumOfParams(3)]
  },
  if: {
    validations: [minNumOfParams(3), maxNumOfParams(3)]
  },
  image: {
    validations: [minNumOfParams(2), maxNumOfParams(4)]
  },
  includes: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  isblank: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  isnull: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  ispickval: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  isnumber: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  left: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  len: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  lessThan: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  lessThanOrEqual: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  ln: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  log: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  lower: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  lpad: {
    validations: [minNumOfParams(2), maxNumOfParams(3)]
  },
  max: {
    validations: [minNumOfParams(1)]
  },
  mceiling: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  mfloor: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  mid: {
    validations: [minNumOfParams(3), maxNumOfParams(3)]
  },
  millisecond: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  min: {
    validations: [minNumOfParams(1)]
  },
  minute: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  mod: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  month: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  multiply: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  not: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  now: {
    validations: [minNumOfParams(0), maxNumOfParams(0)]
  },
  nullvalue: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  or: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  regex: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  right: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  round: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  rpad: {
    validations: [minNumOfParams(2), maxNumOfParams(3)]
  },
  second: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  sqrt: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  subtract: {
    validations: [minNumOfParams(2), maxNumOfParams(2)],
  },
  substitute: {
    validations: [minNumOfParams(3), maxNumOfParams(3)],
  },
  text: {
    validations: [minNumOfParams(1), maxNumOfParams(1)],
  },
  timenow: {
    validations: [minNumOfParams(0), maxNumOfParams(0)]
  },
  timevalue: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  today: {
    validations: [minNumOfParams(0), maxNumOfParams(0)]
  },
  trim: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  unequal: {
    validations: [minNumOfParams(2), maxNumOfParams(2)]
  },
  upper: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  value: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  weekday: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
  year: {
    validations: [minNumOfParams(1), maxNumOfParams(1)]
  },
}
