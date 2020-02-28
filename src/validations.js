'use strict'

import { ArgumentError } from './errors.js'

export const validateNumOfParams = (expectedNumOfParams) => {
  return (fnName) => {
    return (params) => {
      if (params.length !== expectedNumOfParams) {
        let options = {
          function: fnName,
          expected: expectedNumOfParams,
          received: params.length
        }
        throw new ArgumentError(`Incorrect number of parameters for function '${options.function.toUpperCase()}()'. Expected ${options.expected}, received ${options.received}`, options)
      }
    }
  }
}
