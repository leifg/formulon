'use strict'

import { ArgumentError } from './errors.js'

export const minNumOfParams = (expectedMinNumOfParams) => {
  return (fnName) => {
    return (params) => {
      if (params.length < expectedMinNumOfParams) {
        throwArgumentError(fnName, expectedMinNumOfParams, params.length)
      }
    }
  }
}

export const maxNumOfParams = (expectedMaxNumOfParams) => {
  return (fnName) => {
    return (params) => {
      if (params.length > expectedMaxNumOfParams) {
        throwArgumentError(fnName, expectedMaxNumOfParams, params.length)
      }
    }
  }
}

const throwArgumentError = (fnName, expected, received) => {
  let options = {
    function: fnName,
    expected: expected,
    received: received
  }

  throw new ArgumentError(`Incorrect number of parameters for function '${fnName.toUpperCase()}()'. Expected ${expected}, received ${received}`, options)
}
