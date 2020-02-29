import * as functions from './functions'
import { validateNumOfParams } from './validations'
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
    validations: [validateNumOfParams(1)]
  },
  add: {
    validations: []
  },
  addmonths: {
    validations: [validateNumOfParams(2)]
  },
  and: {
    validations: [validateNumOfParams(2)]
  },
  begins: {
    validations: [validateNumOfParams(2)]
  },
  blankvalue: {
    validations: [validateNumOfParams(2)]
  },
  br: {
    validations: [validateNumOfParams(0)]
  },
  case: {
    validations: [],
  },
  casesafeid: {
    validations: [validateNumOfParams(1)],
  },
  ceiling: {
    validations: [validateNumOfParams(1)]
  },
  contains: {
    validations: [validateNumOfParams(2)]
  },
  currencyrate: {
    validations: [validateNumOfParams(1)]
  },
  date: {
    validations: [validateNumOfParams(3)]
  },
  datetimevalue: {
    validations: [validateNumOfParams(1)]
  },
  datevalue: {
    validations: [validateNumOfParams(1)]
  },
  day: {
    validations: [validateNumOfParams(1)]
  },
  distance: {
    validations: [validateNumOfParams(3)]
  },
  equal: {
    validations: [validateNumOfParams(2)]
  },
  exp: {
    validations: [validateNumOfParams(1)]
  },
  exponentiate: {
    validations: [validateNumOfParams(2)],
  },
  find: {
    validations: [],
  },
  floor: {
    validations: [validateNumOfParams(1)]
  },
  geolocation: {
    validations: [validateNumOfParams(2)]
  },
  getsessionid: {
    validations: [validateNumOfParams(0)]
  },
  greaterThan: {
    validations: [validateNumOfParams(2)]
  },
  greaterThanOrEqual: {
    validations: [validateNumOfParams(2)]
  },
  hour: {
    validations: [validateNumOfParams(1)]
  },
  hyperlink: {
    validations: []
  },
  if: {
    validations: [validateNumOfParams(3)]
  },
  image: {
    validations: []
  },
  includes: {
    validations: [validateNumOfParams(2)]
  },
  invert: {
    validations: [validateNumOfParams(1)]
  },
  isblank: {
    validations: [validateNumOfParams(1)]
  },
  isnull: {
    validations: [validateNumOfParams(1)]
  },
  ispickval: {
    validations: [validateNumOfParams(2)]
  },
  isnumber: {
    validations: [validateNumOfParams(1)]
  },
  left: {
    validations: [validateNumOfParams(2)]
  },
  len: {
    validations: [validateNumOfParams(1)]
  },
  lessThan: {
    validations: [validateNumOfParams(2)]
  },
  lessThanOrEqual: {
    validations: [validateNumOfParams(2)]
  },
  ln: {
    validations: [validateNumOfParams(1)]
  },
  log: {
    validations: [validateNumOfParams(1)]
  },
  lower: {
    validations: [validateNumOfParams(1)]
  },
  lpad: {
    validations: []
  },
  max: {
    validations: []
  },
  mceiling: {
    validations: [validateNumOfParams(1)]
  },
  mfloor: {
    validations: [validateNumOfParams(1)]
  },
  mid: {
    validations: [validateNumOfParams(3)]
  },
  millisecond: {
    validations: [validateNumOfParams(1)]
  },
  min: {
    validations: []
  },
  minute: {
    validations: [validateNumOfParams(1)]
  },
  mod: {
    validations: [validateNumOfParams(2)]
  },
  month: {
    validations: [validateNumOfParams(1)]
  },
  multiply: {
    validations: []
  },
  negate: {
    validations: [validateNumOfParams(1)]
  },
  not: {
    validations: [validateNumOfParams(1)]
  },
  now: {
    validations: [validateNumOfParams(0)]
  },
  nullvalue: {
    validations: [validateNumOfParams(2)]
  },
  or: {
    validations: [validateNumOfParams(2)]
  },
  regex: {
    validations: [validateNumOfParams(3)]
  },
  right: {
    validations: [validateNumOfParams(2)]
  },
  round: {
    validations: [validateNumOfParams(2)]
  },
  rpad: {
    validations: []
  },
  second: {
    validations: [validateNumOfParams(1)]
  },
  sqrt: {
    validations: [validateNumOfParams(1)]
  },
  substitute: {
    validations: [validateNumOfParams(3)],
  },
  text: {
    validations: [validateNumOfParams(1)],
  },
  timenow: {
    validations: [validateNumOfParams(0)]
  },
  timevalue: {
    validations: [validateNumOfParams(1)]
  },
  today: {
    validations: [validateNumOfParams(0)]
  },
  trim: {
    validations: [validateNumOfParams(1)]
  },
  unequal: {
    validations: [validateNumOfParams(2)]
  },
  upper: {
    validations: [validateNumOfParams(1)]
  },
  value: {
    validations: [validateNumOfParams(1)]
  },
  weekday: {
    validations: [validateNumOfParams(1)]
  },
  year: {
    validations: [validateNumOfParams(1)]
  },
}
