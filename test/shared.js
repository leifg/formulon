/* eslint import/prefer-default-export: 0 */
/* global it context */

import { expect } from 'chai';

export const testBuildAst = (handler) => {
  context('Trimming', () => {
    it('parses AST correctly with trailing whitespace', () => {
      const expected = {
        type: 'literal',
        value: 1,
        dataType: 'number',
        options: {
          length: 1,
          scale: 0,
        },
      };
      expect(handler('1 ')).to.deep.equal(expected);
    });

    it('parses AST correctly with leading whitespace', () => {
      const expected = {
        type: 'literal',
        value: 2,
        dataType: 'number',
        options: {
          length: 1,
          scale: 0,
        },
      };
      expect(handler(' 2')).to.deep.equal(expected);
    });

    it('parses AST correctly with leading and trailing whitespace', () => {
      const expected = {
        type: 'literal',
        value: 3,
        dataType: 'number',
        options: {
          length: 1,
          scale: 0,
        },
      };
      expect(handler(' 3 ')).to.deep.equal(expected);
    });

    it('parses AST correctly with whitespaces in function calls', () => {
      const expected = {
        type: 'callExpression',
        id: 'ceiling',
        arguments: [
          {
            type: 'literal',
            value: 1.9,
            dataType: 'number',
            options: {
              length: 1,
              scale: 1,
            },
          },
        ],
      };
      expect(handler('CEILING (1.9 )')).to.deep.equal(expected);
    });
  });

  context('Whitespace Characters', () => {
    it('parses AST correctly with newlines between operators', () => {
      const expected = {
        type: 'callExpression',
        id: 'add',
        arguments: [
          {
            type: 'literal',
            value: 1,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
          {
            type: 'literal',
            value: 2,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
        ],
      };
      expect(handler('1 + \n2')).to.deep.equal(expected);
    });

    it('parses AST correctly with newlines in function call', () => {
      const expected = {
        type: 'callExpression',
        id: 'max',
        arguments: [
          {
            type: 'literal',
            value: 1,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
          {
            type: 'literal',
            value: 2,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
          {
            type: 'literal',
            value: 3,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
        ],
      };
      expect(handler('MAX(1\n,2\n,3\n)')).to.deep.equal(expected);
    });

    it('parses AST correctly with zero space whitespaces', () => {
      const expected = {
        type: 'callExpression',
        id: 'add',
        arguments: [
          {
            type: 'literal',
            value: 1,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
          {
            type: 'literal',
            value: 2,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
        ],
      };
      expect(handler('1+\u200b2')).to.deep.equal(expected);
    });
  });

  context('Function Calls', () => {
    it('function call without arguments', () => {
      const expected = {
        type: 'callExpression',
        id: 'now',
        arguments: [],
      };
      expect(handler('NOW()')).to.deep.equal(expected);
    });

    it('function call with single argument', () => {
      const expected = {
        type: 'callExpression',
        id: 'abs',
        arguments: [
          {
            type: 'literal',
            value: 1.5,
            dataType: 'number',
            options: {
              length: 1,
              scale: 1,
            },
          },
        ],
      };
      expect(handler('ABS(1.5)')).to.deep.equal(expected);
    });

    it('function call with multiple arguments', () => {
      const expected = {
        type: 'callExpression',
        id: 'mod',
        arguments: [
          {
            type: 'literal',
            value: 11,
            dataType: 'number',
            options: {
              length: 2,
              scale: 0,
            },
          },
          {
            type: 'literal',
            value: 2,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
        ],
      };
      expect(handler('MOD(11, 2)')).to.deep.equal(expected);
    });

    it('nested function calls', () => {
      const expected = {
        type: 'callExpression',
        id: 'if',
        arguments: [
          {
            type: 'callExpression',
            id: 'ispickval',
            arguments: [
              { type: 'identifier', name: 'StageName' },
              {
                type: 'literal',
                value: 'Closed Won',
                dataType: 'text',
                options: {
                  length: 10,
                },
              },
            ],
          },
          { type: 'identifier', name: 'Amount' },
          {
            type: 'literal',
            value: 0,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
        ],
      };
      expect(
        handler('IF(ISPICKVAL(StageName, "Closed Won"), Amount, 0)'),
      ).to.deep.equal(expected);
    });
  });

  context('Arithmetics', () => {
    it('string concatenation', () => {
      const expected = {
        type: 'callExpression',
        id: 'add',
        arguments: [
          {
            type: 'literal',
            value: 'con',
            dataType: 'text',
            options: {
              length: 3,
            },
          },
          {
            type: 'literal',
            value: 'cated',
            dataType: 'text',
            options: {
              length: 5,
            },
          },
        ],
      };

      expect(handler('"con" & "cated"')).to.deep.equal(expected);
    });

    it('simple addition', () => {
      const expected = {
        type: 'callExpression',
        id: 'add',
        arguments: [
          {
            type: 'literal',
            value: 1.5,
            dataType: 'number',
            options: {
              length: 1,
              scale: 1,
            },
          },
          {
            type: 'literal',
            value: 2,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
        ],
      };
      expect(handler('1.5 + 2')).to.deep.equal(expected);
    });

    it('simple subtraction', () => {
      const expected = {
        type: 'callExpression',
        id: 'subtract',
        arguments: [
          {
            type: 'literal',
            value: 1,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
          {
            type: 'literal',
            value: 10,
            dataType: 'number',
            options: {
              length: 2,
              scale: 0,
            },
          },
        ],
      };
      expect(handler('1 - 10')).to.deep.equal(expected);
    });

    it('addition with more than 2 arguments', () => {
      const expected = {
        type: 'callExpression',
        id: 'add',
        arguments: [
          {
            type: 'callExpression',
            id: 'add',
            arguments: [
              {
                type: 'literal',
                value: 1,
                dataType: 'number',
                options: {
                  length: 1,
                  scale: 0,
                },
              },
              {
                type: 'literal',
                value: 2,
                dataType: 'number',
                options: {
                  length: 1,
                  scale: 0,
                },
              },
            ],
          },
          {
            type: 'literal',
            value: 3,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
        ],
      };
      expect(handler('1 + 2 + 3')).to.deep.equal(expected);
    });

    it('addition with function', () => {
      const expected = {
        type: 'callExpression',
        id: 'add',
        arguments: [
          {
            type: 'callExpression',
            id: 'max',
            arguments: [
              {
                type: 'literal',
                value: 1,
                dataType: 'number',
                options: {
                  length: 1,
                  scale: 0,
                },
              },
              {
                type: 'literal',
                value: 3,
                dataType: 'number',
                options: {
                  length: 1,
                  scale: 0,
                },
              },
            ],
          },
          {
            type: 'literal',
            value: 7,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
        ],
      };

      expect(handler('MAX(1,3) + 7')).to.deep.equal(expected);
    });

    it('simple multiplication', () => {
      const expected = {
        type: 'callExpression',
        id: 'multiply',
        arguments: [
          {
            type: 'literal',
            value: 7,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
          {
            type: 'literal',
            value: 8,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
        ],
      };
      expect(handler('7 * 8')).to.deep.equal(expected);
    });

    it('simple division', () => {
      const expected = {
        type: 'callExpression',
        id: 'divide',
        arguments: [
          {
            type: 'literal',
            value: 100,
            dataType: 'number',
            options: {
              length: 3,
              scale: 0,
            },
          },
          {
            type: 'literal',
            value: 25,
            dataType: 'number',
            options: {
              length: 2,
              scale: 0,
            },
          },
        ],
      };
      expect(handler('100 / 25')).to.deep.equal(expected);
    });

    it('addition and multiplication (multiplication first)', () => {
      const expected = {
        type: 'callExpression',
        id: 'add',
        arguments: [
          {
            type: 'callExpression',
            id: 'multiply',
            arguments: [
              {
                type: 'literal',
                value: 7,
                dataType: 'number',
                options: {
                  length: 1,
                  scale: 0,
                },
              },
              {
                type: 'literal',
                value: 8,
                dataType: 'number',
                options: {
                  length: 1,
                  scale: 0,
                },
              },
            ],
          },
          {
            type: 'literal',
            value: 5,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
        ],
      };
      expect(handler('7 * 8 + 5')).to.deep.equal(expected);
    });

    it('addition and multiplication (addition first)', () => {
      const expected = {
        type: 'callExpression',
        id: 'add',
        arguments: [
          {
            type: 'literal',
            value: 5,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
          {
            type: 'callExpression',
            id: 'multiply',
            arguments: [
              {
                type: 'literal',
                value: 7,
                dataType: 'number',
                options: {
                  length: 1,
                  scale: 0,
                },
              },
              {
                type: 'literal',
                value: 8,
                dataType: 'number',
                options: {
                  length: 1,
                  scale: 0,
                },
              },
            ],
          },
        ],
      };
      expect(handler('5 + 7 * 8')).to.deep.equal(expected);
    });

    it('addition and multiplication with parentheses', () => {
      const expected = {
        type: 'callExpression',
        id: 'multiply',
        arguments: [
          {
            type: 'literal',
            value: 7,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
          {
            type: 'callExpression',
            id: 'add',
            arguments: [
              {
                type: 'literal',
                value: 8,
                dataType: 'number',
                options: {
                  length: 1,
                  scale: 0,
                },
              },
              {
                type: 'literal',
                value: 5,
                dataType: 'number',
                options: {
                  length: 1,
                  scale: 0,
                },
              },
            ],
          },
        ],
      };
      expect(handler('7 * (8 + 5)')).to.deep.equal(expected);
    });

    it('simple exponentiation', () => {
      const expected = {
        type: 'callExpression',
        id: 'exponentiate',
        arguments: [
          {
            type: 'literal',
            value: 2,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
          {
            type: 'literal',
            value: 8,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
        ],
      };
      expect(handler('2 ^ 8')).to.deep.equal(expected);
    });

    it('exponentiation and multiplication', () => {
      const expected = {
        type: 'callExpression',
        id: 'multiply',
        arguments: [
          {
            type: 'callExpression',
            id: 'exponentiate',
            arguments: [
              {
                type: 'literal',
                value: 2,
                dataType: 'number',
                options: {
                  length: 1,
                  scale: 0,
                },
              },
              {
                type: 'literal',
                value: 8,
                dataType: 'number',
                options: {
                  length: 1,
                  scale: 0,
                },
              },
            ],
          },
          {
            type: 'literal',
            value: 7,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
        ],
      };
      expect(handler('2 ^ 8 * 7')).to.deep.equal(expected);
    });

    it('exponentiation, multiplication and addition', () => {
      const expected = {
        type: 'callExpression',
        id: 'add',
        arguments: [
          {
            type: 'callExpression',
            id: 'multiply',
            arguments: [
              {
                type: 'callExpression',
                id: 'exponentiate',
                arguments: [
                  {
                    type: 'literal',
                    value: 2,
                    dataType: 'number',
                    options: {
                      length: 1,
                      scale: 0,
                    },
                  },
                  {
                    type: 'literal',
                    value: 8,
                    dataType: 'number',
                    options: {
                      length: 1,
                      scale: 0,
                    },
                  },
                ],
              },
              {
                type: 'literal',
                value: 7,
                dataType: 'number',
                options: {
                  length: 1,
                  scale: 0,
                },
              },
            ],
          },
          {
            type: 'literal',
            value: 5,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
        ],
      };
      expect(handler('2 ^ 8 * 7 + 5')).to.deep.equal(expected);
    });

    it('exponentiation, multiplication and addition in parentheses', () => {
      const expected = {
        type: 'callExpression',
        id: 'exponentiate',
        arguments: [
          {
            type: 'literal',
            value: 2,
            dataType: 'number',
            options: {
              length: 1,
              scale: 0,
            },
          },
          {
            type: 'callExpression',
            id: 'add',
            arguments: [
              {
                type: 'callExpression',
                id: 'multiply',
                arguments: [
                  {
                    type: 'literal',
                    value: 8,
                    dataType: 'number',
                    options: {
                      length: 1,
                      scale: 0,
                    },
                  },
                  {
                    type: 'literal',
                    value: 7,
                    dataType: 'number',
                    options: {
                      length: 1,
                      scale: 0,
                    },
                  },
                ],
              },
              {
                type: 'literal',
                value: 5,
                dataType: 'number',
                options: {
                  length: 1,
                  scale: 0,
                },
              },
            ],
          },
        ],
      };
      expect(handler('2 ^ (8 * 7 + 5)')).to.deep.equal(expected);
    });
  });

  context('Boolean Algebra', () => {
    it('simple or', () => {
      const expected = {
        type: 'callExpression',
        id: 'or',
        arguments: [
          {
            type: 'literal',
            value: true,
            dataType: 'checkbox',
            options: {},
          },
          {
            type: 'literal',
            value: false,
            dataType: 'checkbox',
            options: {},
          },
        ],
      };

      expect(handler('TRUE || FALSE')).to.deep.equal(expected);
    });

    it('simple and', () => {
      const expected = {
        type: 'callExpression',
        id: 'and',
        arguments: [
          {
            type: 'literal',
            value: true,
            dataType: 'checkbox',
            options: {},
          },
          {
            type: 'literal',
            value: false,
            dataType: 'checkbox',
            options: {},
          },
        ],
      };

      expect(handler('TRUE && FALSE')).to.deep.equal(expected);
    });

    it('default precedence', () => {
      const expected = {
        type: 'callExpression',
        id: 'or',
        arguments: [
          {
            type: 'literal',
            value: true,
            dataType: 'checkbox',
            options: {},
          },
          {
            type: 'callExpression',
            id: 'and',
            arguments: [
              {
                type: 'literal',
                value: false,
                dataType: 'checkbox',
                options: {},
              },
              {
                type: 'literal',
                value: false,
                dataType: 'checkbox',
                options: {},
              },
            ],
          },
        ],
      };

      expect(handler('TRUE || FALSE && FALSE')).to.deep.equal(expected);
    });

    it('overwriting precedence with parentheses', () => {
      const expected = {
        type: 'callExpression',
        id: 'and',
        arguments: [
          {
            type: 'callExpression',
            id: 'or',
            arguments: [
              {
                type: 'literal',
                value: true,
                dataType: 'checkbox',
                options: {},
              },
              {
                type: 'literal',
                value: false,
                dataType: 'checkbox',
                options: {},
              },
            ],
          },
          {
            type: 'literal',
            value: false,
            dataType: 'checkbox',
            options: {},
          },
        ],
      };

      expect(handler('(TRUE || FALSE) && FALSE')).to.deep.equal(expected);
    });

    it('logical comparison and concatenation', () => {
      const expected = {
        type: 'callExpression',
        id: 'and',
        arguments: [
          {
            type: 'callExpression',
            id: 'equal',
            arguments: [
              {
                type: 'literal',
                value: 1,
                dataType: 'number',
                options: {
                  length: 1,
                  scale: 0,
                },
              },
              {
                type: 'literal',
                value: 1,
                dataType: 'number',
                options: {
                  length: 1,
                  scale: 0,
                },
              },
            ],
          },
          {
            type: 'callExpression',
            id: 'equal',
            arguments: [
              {
                type: 'literal',
                value: 1,
                dataType: 'number',
                options: {
                  length: 1,
                  scale: 0,
                },
              },
              {
                type: 'literal',
                value: 1,
                dataType: 'number',
                options: {
                  length: 1,
                  scale: 0,
                },
              },
            ],
          },
        ],
      };
      expect(handler('1 == 1 && 1 == 1')).to.deep.equal(expected);
    });
  });

  context('Identifiers', () => {
    it('returns correct result', () => {
      const expected = {
        type: 'identifier',
        name: 'Name',
      };
      expect(handler('Name')).to.deep.equal(expected);
    });

    context('Cross Object Identifier', () => {
      it('returns correct result for simple cross object identifier', () => {
        const expected = {
          type: 'identifier',
          name: 'Account.Name',
        };
        expect(handler('Account.Name')).to.deep.equal(expected);
      });

      it('returns correct result for cross object identifier with brackets', () => {
        const expected = {
          type: 'identifier',
          name: '[Contact].Account.Owner.IsActive',
        };
        expect(handler('[Contact].Account.Owner.IsActive')).to.deep.equal(expected);
      });
    });

    context('User Identifier', () => {
      it('returns correct result', () => {
        const expected = {
          type: 'identifier',
          name: '$User.Commission_Percent__c',
        };
        expect(handler('$User.Commission_Percent__c')).to.deep.equal(expected);
      });
    });
  });

  context('Literals', () => {
    it('string literal', () => {
      const expected = {
        type: 'literal',
        value: 'a String',
        dataType: 'text',
        options: {
          length: 8,
        },
      };
      expect(handler('"a String"')).to.deep.equal(expected);
    });

    it('integer literal', () => {
      const expected = {
        type: 'literal',
        value: 12,
        dataType: 'number',
        options: {
          length: 2,
          scale: 0,
        },
      };
      expect(handler('12')).to.deep.equal(expected);
    });

    it('negative integer literal', () => {
      const expected = {
        type: 'literal',
        value: -123,
        dataType: 'number',
        options: {
          length: 3,
          scale: 0,
        },
      };
      expect(handler('-123')).to.deep.equal(expected);
    });

    it('explicitely positive integer literal', () => {
      const expected = {
        type: 'literal',
        value: 1234,
        dataType: 'number',
        options: {
          length: 4,
          scale: 0,
        },
      };
      expect(handler('+1234')).to.deep.equal(expected);
    });

    it('float literal', () => {
      const expected = {
        type: 'literal',
        value: 11.2,
        dataType: 'number',
        options: {
          length: 2,
          scale: 1,
        },
      };
      expect(handler('11.2')).to.deep.equal(expected);
    });

    it('TRUE literal', () => {
      const expected = {
        type: 'literal',
        value: true,
        dataType: 'checkbox',
        options: {},
      };
      expect(handler('TRUE')).to.deep.equal(expected);
    });

    it('true literal', () => {
      const expected = {
        type: 'literal',
        value: true,
        dataType: 'checkbox',
        options: {},
      };
      expect(handler('true')).to.deep.equal(expected);
    });

    it('FALSE literal', () => {
      const expected = {
        type: 'literal',
        value: false,
        dataType: 'checkbox',
        options: {},
      };
      expect(handler('FALSE')).to.deep.equal(expected);
    });

    it('false literal', () => {
      const expected = {
        type: 'literal',
        value: false,
        dataType: 'checkbox',
        options: {},
      };
      expect(handler('false')).to.deep.equal(expected);
    });

    it('NULL literal', () => {
      const expected = {
        type: 'literal',
        value: null,
        dataType: 'null',
        options: {},
      };
      expect(handler('NULL')).to.deep.equal(expected);
    });

    it('null literal', () => {
      const expected = {
        type: 'literal',
        value: null,
        dataType: 'null',
        options: {},
      };
      expect(handler('null')).to.deep.equal(expected);
    });
  });

  context('Logic', () => {
    context('unary', () => {
      it('NOT with Identifier', () => {
        const expected = {
          type: 'callExpression',
          id: 'not',
          arguments: [{ type: 'identifier', name: 'Negative' }],
        };
        expect(handler('!Negative')).to.deep.equal(expected);
      });

      it('NOT with boolean literal', () => {
        const expected = {
          type: 'callExpression',
          id: 'not',
          arguments: [
            {
              type: 'literal',
              value: false,
              dataType: 'checkbox',
              options: {},
            },
          ],
        };
        expect(handler('!FALSE')).to.deep.equal(expected);
      });
    });

    context('binary', () => {
      it('&&', () => {
        const expected = {
          type: 'callExpression',
          id: 'and',
          arguments: [
            { type: 'identifier', name: 'First' },
            { type: 'identifier', name: 'Second' },
          ],
        };
        expect(handler('First && Second')).to.deep.equal(expected);
      });

      it('||', () => {
        const expected = {
          type: 'callExpression',
          id: 'or',
          arguments: [
            { type: 'identifier', name: 'First' },
            { type: 'identifier', name: 'Second' },
          ],
        };
        expect(handler('First || Second')).to.deep.equal(expected);
      });

      it('==', () => {
        const expected = {
          type: 'callExpression',
          id: 'equal',
          arguments: [
            { type: 'identifier', name: 'First' },
            { type: 'identifier', name: 'Second' },
          ],
        };
        expect(handler('First == Second')).to.deep.equal(expected);
      });

      it('=', () => {
        const expected = {
          type: 'callExpression',
          id: 'equal',
          arguments: [
            { type: 'identifier', name: 'First' },
            { type: 'identifier', name: 'Second' },
          ],
        };
        expect(handler('First = Second')).to.deep.equal(expected);
      });

      it('!=', () => {
        const expected = {
          type: 'callExpression',
          id: 'unequal',
          arguments: [
            { type: 'identifier', name: 'First' },
            { type: 'identifier', name: 'Second' },
          ],
        };
        expect(handler('First != Second')).to.deep.equal(expected);
      });

      it('<>', () => {
        const expected = {
          type: 'callExpression',
          id: 'unequal',
          arguments: [
            { type: 'identifier', name: 'First' },
            { type: 'identifier', name: 'Second' },
          ],
        };
        expect(handler('First <> Second')).to.deep.equal(expected);
      });

      it('<', () => {
        const expected = {
          type: 'callExpression',
          id: 'lessThan',
          arguments: [
            { type: 'identifier', name: 'First' },
            { type: 'identifier', name: 'Second' },
          ],
        };
        expect(handler('First < Second')).to.deep.equal(expected);
      });

      it('<=', () => {
        const expected = {
          type: 'callExpression',
          id: 'lessThanOrEqual',
          arguments: [
            { type: 'identifier', name: 'First' },
            { type: 'identifier', name: 'Second' },
          ],
        };
        expect(handler('First <= Second')).to.deep.equal(expected);
      });

      it('>', () => {
        const expected = {
          type: 'callExpression',
          id: 'greaterThan',
          arguments: [
            { type: 'identifier', name: 'First' },
            { type: 'identifier', name: 'Second' },
          ],
        };
        expect(handler('First > Second')).to.deep.equal(expected);
      });

      it('>=', () => {
        const expected = {
          type: 'callExpression',
          id: 'greaterThanOrEqual',
          arguments: [
            { type: 'identifier', name: 'First' },
            { type: 'identifier', name: 'Second' },
          ],
        };
        expect(handler('First >= Second')).to.deep.equal(expected);
      });
    });
  });

  context('Function', () => {
    context('case sensitivity', () => {
      it('returns expected AST', () => {
        const expected = {
          type: 'callExpression',
          id: 'contains',
          arguments: [
            {
              type: 'literal',
              dataType: 'text',
              value: 'funeral',
              options: {
                length: 7,
              },
            },
            {
              type: 'literal',
              dataType: 'text',
              value: 'fun',
              options: {
                length: 3,
              },
            },
          ],
        };

        expect(handler('CONTAINS("funeral", "fun")')).to.deep.equal(expected);
        expect(handler('contains("funeral", "fun")')).to.deep.equal(expected);
      });
    });
  });

  context('Quotes', () => {
    context('Single Quotes', () => {
      it('returns expected result', () => {
        const expected = {
          type: 'literal',
          value: 'string',
          dataType: 'text',
          options: {
            length: 6,
          },
        };

        expect(handler("'string'")).to.deep.equal(expected);
      });

      context('Double Quotes in Single Quotes', () => {
        it('returns expected result', () => {
          const expected = {
            type: 'literal',
            value: '"string"',
            dataType: 'text',
            options: {
              length: 8,
            },
          };

          expect(handler("'\"string\"'")).to.deep.equal(expected);
        });
      });
    });

    context('Double Quotes', () => {
      it('returns expected result', () => {
        const expected = {
          type: 'literal',
          value: 'string',
          dataType: 'text',
          options: {
            length: 6,
          },
        };

        expect(handler('"string"')).to.deep.equal(expected);
      });

      context('Single Quotes in Double Quotes', () => {
        it('returns expected result', () => {
          const expected = {
            type: 'literal',
            value: "'string'",
            dataType: 'text',
            options: {
              length: 8,
            },
          };

          expect(handler("\"'string'\"")).to.deep.equal(expected);
        });
      });
    });
  });
};
