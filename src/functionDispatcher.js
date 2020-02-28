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
  and: {
    validations: [validateNumOfParams(2)]
  },
  begins: {
    validations: [validateNumOfParams(2)]
  },
  br: {
    validations: [validateNumOfParams(0)]
  },
  case: {
    validations: [],
  },
  ceiling: {
    validations: [validateNumOfParams(1)]
  },
  contains: {
    validations: [validateNumOfParams(2)]
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
  if: {
    validations: [validateNumOfParams(3)]
  },
  invert: {
    validations: [validateNumOfParams(1)]
  },
  isblank: {
    validations: [validateNumOfParams(1)]
  },
  greaterThan: {
    validations: [validateNumOfParams(2)]
  },
  greaterThanOrEqual: {
    validations: [validateNumOfParams(2)]
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
  mid: {
    validations: [validateNumOfParams(3)]
  },
  min: {
    validations: []
  },
  mod: {
    validations: [validateNumOfParams(2)]
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
  sqrt: {
    validations: [validateNumOfParams(1)]
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
}
