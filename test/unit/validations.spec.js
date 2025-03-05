/* global describe it */

import { expect } from 'vitest';
import { buildLiteralFromJs, buildPicklistLiteral } from '../../src/utils';
import {
  caseParams,
  maxNumOfParams,
  minNumOfParams,
  paramTypes,
  sameParamType,
} from '../../src/validations';
import ArgumentError from '../../src/errors/ArgumentError';

describe('maxNumOfParams', () => {
  describe('exact length', () => {
    it('throws no error', () => {
      const params = [buildLiteralFromJs(1), buildLiteralFromJs(2)];
      const fn = () => maxNumOfParams(2)('mod')(params);
      expect(fn()).to.eq(undefined);
    });
  });

  describe('less parameters than expected', () => {
    it('throws no error', () => {
      const params = [buildLiteralFromJs(1), buildLiteralFromJs(2)];
      const fn = () => maxNumOfParams(3)('if')(params);
      expect(fn()).to.eq(undefined);
    });
  });

  describe('more parameters than expected', () => {
    it('throws ArgumentError', () => {
      const params = [buildLiteralFromJs(1), buildLiteralFromJs(2)];
      const fn = () => maxNumOfParams(1)('abs')(params);
      expect(fn).to.throw(ArgumentError, "Incorrect number of parameters for function 'ABS()'. Expected 1, received 2");
    });
  });
});

describe('minNumOfParams', () => {
  describe('exact length', () => {
    it('throws no error', () => {
      const params = [buildLiteralFromJs(1), buildLiteralFromJs(2)];
      const fn = () => minNumOfParams(2)('mod')(params);
      expect(fn()).to.eq(undefined);
    });
  });

  describe('less parameters than expected', () => {
    it('throws ArgumentError', () => {
      const params = [buildLiteralFromJs(1), buildLiteralFromJs(2)];
      const fn = () => minNumOfParams(3)('if')(params);
      expect(fn).to.throw(ArgumentError, "Incorrect number of parameters for function 'IF()'. Expected 3, received 2");
    });
  });

  describe('more parameters than expected', () => {
    it('throws no error', () => {
      const params = [buildLiteralFromJs(1), buildLiteralFromJs(2)];
      const fn = () => minNumOfParams(1)('abs')(params);
      expect(fn()).to.eq(undefined);
    });
  });
});

describe('paramTypes', () => {
  describe('length matches', () => {
    describe('types match', () => {
      describe('single type expectatiosn', () => {
        it('throws no error', () => {
          const params = [buildLiteralFromJs('long')];
          const fn = () => paramTypes('text')('len')(params);
          expect(fn()).to.eq(undefined);
        });

        it('throws no error with null input', () => {
          const params = [buildLiteralFromJs(null)];
          const fn = () => paramTypes('text')('len')(params);
          expect(fn()).to.eq(undefined);
        });
      });

      describe('multi type expectatiosn', () => {
        it('throws no error', () => {
          const params = [buildLiteralFromJs(1), buildLiteralFromJs(2)];
          const fn = () => paramTypes(['date', 'number'], ['date', 'number'])('add')(params);
          expect(fn()).to.eq(undefined);
        });
      });
    });

    describe('types do not match', () => {
      describe('single type expectatiosn', () => {
        it('throws an error for text != number', () => {
          const params = [buildLiteralFromJs(1234)];
          const fn = () => paramTypes('text')('len')(params);
          expect(fn).to.throw(ArgumentError, "Incorrect parameter type for function 'LEN()'. Expected Text, received Number");
        });

        it('throws an error for non-literal input', () => {
          const params = ['regular string'];
          const fn = () => paramTypes('text')('trim')(params);
          expect(fn).to.throw(ArgumentError, "Incorrect parameter type for function 'TRIM()'. Expected Text, received Non-Salesforce");
        });
      });

      describe('multi type expectatiosn', () => {
        it('throws an error for checkbox != number, date', () => {
          const params = [buildLiteralFromJs(true), buildLiteralFromJs(false)];
          const fn = () => paramTypes(['date', 'number'], ['date', 'number'])('add')(params);
          expect(fn).to.throw(ArgumentError, "Incorrect parameter type for function 'ADD()'. Expected Date, Number, received Checkbox");
        });
      });
    });
  });

  describe('expected length > received length', () => {
    describe('types match', () => {
      describe('single type expectatiosn', () => {
        it('throws no error', () => {
          const params = [buildLiteralFromJs('LGENSERT'), buildLiteralFromJs(3)];
          const fn = () => paramTypes('text', 'number', 'text')('lpad')(params);
          expect(fn()).to.eq(undefined);
        });
      });
    });

    describe('types do not match', () => {
      describe('single type expectatiosn', () => {
        it('throws an error for text != number', () => {
          const params = [buildLiteralFromJs('LGENSERT'), buildLiteralFromJs('3')];
          const fn = () => paramTypes('text', 'number', 'text')('lpad')(params);
          expect(fn).to.throw(ArgumentError, "Incorrect parameter type for function 'LPAD()'. Expected Number, received Text");
        });

        it('throws an error for non-literal input', () => {
          const params = ['regular string'];
          const fn = () => paramTypes(['text'])('trim')(params);
          expect(fn).to.throw(ArgumentError, "Incorrect parameter type for function 'TRIM()'. Expected Text, received Non-Salesforce");
        });
      });
    });
  });

  describe('expected length < received length', () => {
    describe('types match', () => {
      describe('single type expectatiosn', () => {
        it('throws no error', () => {
          const params = [buildLiteralFromJs(1), buildLiteralFromJs(3)];
          const fn = () => paramTypes('number')('max')(params);
          expect(fn()).to.eq(undefined);
        });
      });
    });

    describe('types do not match', () => {
      describe('single type expectatiosn', () => {
        it('throws an error for text != number', () => {
          const params = [buildLiteralFromJs(1), buildLiteralFromJs('3')];
          const fn = () => paramTypes('number')('max')(params);
          expect(fn).to.throw(ArgumentError, "Incorrect parameter type for function 'MAX()'. Expected Number, received Text");
        });
      });
    });
  });
});

describe('sameParamType', () => {
  describe('same param type', () => {
    it('does not throw an error', () => {
      const params = [buildLiteralFromJs(1), buildLiteralFromJs(2), buildLiteralFromJs(3)];
      const fn = () => sameParamType()('equal')(params);
      expect(fn()).to.eq(undefined);
    });

    describe('only one param', () => {
      it('does not throw an error', () => {
        const params = [buildLiteralFromJs(1)];
        const fn = () => sameParamType()('equal')(params);
        expect(fn()).to.eq(undefined);
      });
    });

    describe('no param', () => {
      it('does not throw an error', () => {
        const params = [];
        const fn = () => sameParamType()('br')(params);
        expect(fn()).to.eq(undefined);
      });
    });
  });

  describe('different param type', () => {
    it('throws an ArgumentError', () => {
      const params = [buildLiteralFromJs(1), buildLiteralFromJs(2), buildLiteralFromJs('3')];
      const fn = () => sameParamType()('equal')(params);
      expect(fn).to.throw(ArgumentError, "Incorrect parameter type for function 'EQUAL()'. Expected Number, received Text");
    });
  });

  describe('includes null', () => {
    it('throws an ArgumentError', () => {
      const params = [buildLiteralFromJs(null), buildLiteralFromJs(2), buildLiteralFromJs(3)];
      const fn = () => sameParamType()('equal')(params);
      expect(fn()).to.eq(undefined);
    });
  });

  describe('only null parameters', () => {
    it('does not throw an error', () => {
      const params = [buildLiteralFromJs(null), buildLiteralFromJs(null)];
      const fn = () => sameParamType()('equal')(params);
      expect(fn()).to.eq(undefined);
    });
  });
});

describe('caseParams', () => {
  describe('types match up', () => {
    it('throws no error', () => {
      const params = [buildLiteralFromJs(1), buildLiteralFromJs(1), buildLiteralFromJs('1'), buildLiteralFromJs(2), buildLiteralFromJs('2'), buildLiteralFromJs('somethign else')];
      const fn = () => caseParams()('case')(params);
      expect(fn()).to.eq(undefined);
    });

    describe('picklist', () => {
      it('throws no error', () => {
        const params = [buildPicklistLiteral('Active', ['Active', 'Inactive']), buildLiteralFromJs('Active'), buildLiteralFromJs('1'), buildLiteralFromJs('Inactive'), buildLiteralFromJs('2'), buildLiteralFromJs('somethign else')];
        const fn = () => caseParams()('case')(params);
        expect(fn()).to.eq(undefined);
      });
    });
  });

  describe('types do not match', () => {
    it('throws ArgumentError', () => {
      const params = [buildLiteralFromJs(1), buildLiteralFromJs(1), buildLiteralFromJs('1'), buildLiteralFromJs('2'), buildLiteralFromJs('2'), buildLiteralFromJs('somethign else')];
      const fn = () => caseParams()('case')(params);
      expect(fn).to.throw(ArgumentError, "Incorrect parameter type for function 'CASE()'. Expected Number, received Text");
    });

    describe('picklist', () => {
      it('throws ArgumentError', () => {
        const params = [buildPicklistLiteral('Active', ['Active', 'Inactive']), buildLiteralFromJs('Active'), buildLiteralFromJs('1'), buildLiteralFromJs(2), buildLiteralFromJs('2'), buildLiteralFromJs('somethign else')];
        const fn = () => caseParams()('case')(params);
        expect(fn).to.throw(ArgumentError, "Incorrect parameter type for function 'CASE()'. Expected Text, received Number");
      });
    });
  });
});
