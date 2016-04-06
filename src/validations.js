'use strict'

export const validateNumOfParams = (expectedNumOfParams) => {
  return (fnName) => {
    return (params) => {
      if (params.length !== expectedNumOfParams) {
        throw new SyntaxError(`Incorrect number of parameters for function '${fnName.toUpperCase()}()'. Expected ${expectedNumOfParams}, received ${params.length}`)
      }
    }
  }
}
