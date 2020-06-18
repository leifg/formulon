/* global describe it context */

import { expect } from 'chai';

import dispatch from '../lib/functionDispatcher';
import { buildLiteralFromJs } from '../lib/utils';

describe('dispatch', () => {
  context('valid input', () => {
    it('correctly returns result', () => {
      const args = [1, 2].map((v) => buildLiteralFromJs(v));
      expect(dispatch('add', args)).to.deep.eq(buildLiteralFromJs(3));
    });
  });
});
