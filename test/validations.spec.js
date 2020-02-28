/* global describe it context */

'use strict'

import { buildLiteralFromJs } from '../lib/utils'
import { validateNumOfParams } from '../lib/validations'
import { ArgumentError } from '../lib/errors'

import { expect } from 'chai'

describe('validateNumOfParams', () => {
  context('correct length', () => {
    it('throws no error', () => {
      const params = [buildLiteralFromJs(1), buildLiteralFromJs(2)]
      const fn = () => validateNumOfParams(2)('mod')(params)
      expect(fn()).to.eq(undefined)
    })
  })

  context('less parameters than expected', () => {
    it('throws ArgumentError', () => {
      const params = [buildLiteralFromJs(1), buildLiteralFromJs(2)]
      const fn = () => validateNumOfParams(3)('if')(params)
      expect(fn).to.throw(ArgumentError, "Incorrect number of parameters for function 'IF()'. Expected 3, received 2")
    })
  })

  context('more parameters than expected', () => {
    it('throws ArgumentError', () => {
      const params = [buildLiteralFromJs(1), buildLiteralFromJs(2)]
      const fn = () => validateNumOfParams(1)('abs')(params)
      expect(fn).to.throw(ArgumentError, "Incorrect number of parameters for function 'ABS()'. Expected 1, received 2")
    })
  })
})
