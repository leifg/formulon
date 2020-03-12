'use strict'

import { ArgumentError } from './errors.js'

export const minNumOfParams = (expectedMinNumOfParams) => {
  return (fnName) => {
    return (params) => {
      if (params.length < expectedMinNumOfParams) {
        throwIncorrectNumberOfArguments(fnName, expectedMinNumOfParams, params.length)
      }
    }
  }
}

export const maxNumOfParams = (expectedMaxNumOfParams) => {
  return (fnName) => {
    return (params) => {
      if (params.length > expectedMaxNumOfParams) {
        throwIncorrectNumberOfArguments(fnName, expectedMaxNumOfParams, params.length)
      }
    }
  }
}

export const paramTypes = (...paramTypeList) => {
  return (fnName) => {
    return (params) => {
      let comparableArray = params.map((literal, index) => {
        // fill with last element of params, parameterlist is smaller than params
        return [literal.dataType, paramTypeList[index] || paramTypeList[paramTypeList.length - 1]]
      })

      comparableArray.forEach(([received, expected]) => {
        if(Array.isArray(expected)) {
          if(expected.indexOf(received) === -1) {
            throwWrongType(fnName, expected, received)
          }
        } else if(received !== expected)  {
          throwWrongType(fnName, expected, received)
        }
      })
    }
  }
}

const throwWrongType = (fnName, expected, received) => {
  let options = {
    function: fnName,
    expected: expected,
    received: received
  }

  if (!received) {
    received = 'Non-Salesforce'
  }

  throw new ArgumentError(`Incorrect parameter type for function '${fnName.toUpperCase()}()'. Expected ${capitalize(expected)}, received ${capitalize(received)}`, options)
}


const throwIncorrectNumberOfArguments = (fnName, expected, received) => {
  let options = {
    function: fnName,
    expected: expected,
    received: received
  }

  throw new ArgumentError(`Incorrect number of parameters for function '${fnName.toUpperCase()}()'. Expected ${expected}, received ${received}`, options)
}

const capitalize = (s) => {
  if(Array.isArray(s)) {
    return s.map((elem) => capitalize(elem)).join(', ')
  }

  if (typeof s !== 'string') return ''

  return s.charAt(0).toUpperCase() + s.slice(1)
}
