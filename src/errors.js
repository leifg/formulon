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
