'use strict'

import { throwWrongType, throwIncorrectNumberOfArguments } from './errors.js'

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
