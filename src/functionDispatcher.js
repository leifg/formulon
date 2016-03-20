import * as functions from './functions'

export const dispatch = (name, args) => {
  return functions[`sf$${name}`](...args)
}
