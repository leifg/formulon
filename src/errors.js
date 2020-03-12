export class FormulonRuntimeError extends Error {
  constructor(message, errorType, options) {
    super(message)
    this.errorType = errorType
    this.options = options
  }
}

export class ArgumentError extends FormulonRuntimeError {
  constructor(message, options) {
    super(message, 'ArgumentError', options)
  }
}

export class ReferenceError extends FormulonRuntimeError {
  constructor(message, options) {
    super(message, 'ReferenceError', options)
  }
}

export class NoFunctionError extends FormulonRuntimeError {
  constructor(message, options) {
    super(message, 'NoFunctionError', options)
  }
}

export class NotImplementedError extends FormulonRuntimeError {
  constructor(message, options) {
    super(message, 'NotImplementedError', options)
  }
}

export const throwNotImplemeted = (fnName) => {
  throw new NotImplementedError(`Function ${fnName} not implemented yet.`, {name: fnName})
}

export const throwWrongType = (fnName, expected, received) => {
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


export const throwIncorrectNumberOfArguments = (fnName, expected, received) => {
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
