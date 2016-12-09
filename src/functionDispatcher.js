import * as functions from './functions'
import { validateNumOfParams } from './validations'

export const dispatch = (name, args) => {
  if (functionValidations[name]) {
    functionValidations[name](name)(args)
  }
  return functions[`sf$${name}`](...args)
}

const functionValidations = {
  exponentiate: validateNumOfParams(2),
  and: validateNumOfParams(2),
  or: validateNumOfParams(2),
  not: validateNumOfParams(1),
  if: validateNumOfParams(3),
  equal: validateNumOfParams(2),
  unequal: validateNumOfParams(2),
  greaterThan: validateNumOfParams(2),
  greaterThanOrEqual: validateNumOfParams(2),
  lessThan: validateNumOfParams(2),
  lessThanOrEqual: validateNumOfParams(2),
  abs: validateNumOfParams(1),
  ceiling: validateNumOfParams(1),
  exp: validateNumOfParams(1),
  floor: validateNumOfParams(1),
  ln: validateNumOfParams(1),
  log: validateNumOfParams(1),
  mod: validateNumOfParams(2),
  round: validateNumOfParams(2),
  sqrt: validateNumOfParams(1),
  begins: validateNumOfParams(2),
  br: validateNumOfParams(0),
  contains: validateNumOfParams(2),
  left: validateNumOfParams(2),
  len: validateNumOfParams(1),
  mid: validateNumOfParams(3),
  right: validateNumOfParams(2),
  trim: validateNumOfParams(1),
  regex: validateNumOfParams(3)
}
