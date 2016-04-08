/* global describe it context */

'use strict'

import { dispatch } from '../lib/functionDispatcher'
import { buildLiteralFromJs } from '../lib/utils'

const expect = require('chai').expect

describe('dispatch', () => {
  context('valid input', () => {
    it('correctly returns result', () => {
      let args = [1, 2].map((v) => buildLiteralFromJs(v))
      expect(dispatch('add', args)).to.deep.eq(buildLiteralFromJs(3))
    })
  })
})
