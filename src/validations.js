
import ArgumentError from './errors/ArgumentError';

export const minNumOfParams = (expectedMinNumOfParams) => (fnName) => (params) => {
  if (params.length < expectedMinNumOfParams) {
    ArgumentError.throwIncorrectNumberOfArguments(fnName, expectedMinNumOfParams, params.length);
  }
};

export const maxNumOfParams = (expectedMaxNumOfParams) => (fnName) => (params) => {
  if (params.length > expectedMaxNumOfParams) {
    ArgumentError.throwIncorrectNumberOfArguments(fnName, expectedMaxNumOfParams, params.length);
  }
};

export const paramTypes = (...paramTypeList) => (fnName) => (params) => {
  const comparableArray = params.map((literal, index) => [
    literal.dataType, paramTypeList[index] || paramTypeList[paramTypeList.length - 1],
  ]);

  // fill with last element of params, parameterlist is smaller than params

  comparableArray.forEach(([received, expected]) => {
    // allow null input in all functions
    if (received !== 'null') {
      if (Array.isArray(expected)) {
        if (expected.indexOf(received) === -1) {
          ArgumentError.throwWrongType(fnName, expected, received);
        }
      } else if (received !== expected) {
        ArgumentError.throwWrongType(fnName, expected, received);
      }
    }
  });
};
