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
