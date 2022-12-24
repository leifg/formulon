/* global describe it context */

import { expect } from 'chai';
import {
  build, extract, replace, traverse,
} from '../src/ast';
import { testBuildAst } from './shared';

describe('ast', () => {
  describe('build', () => {
    testBuildAst(build);
  });

  describe('traverse', () => {
    context('literal', () => {
      it('integer literal', () => {
        const input = {
          type: 'literal',
          value: 11,
          dataType: 'number',
          options: {
            length: 2,
            scale: 0,
          },
        };
        const expected = {
          type: 'literal',
          value: 11,
          dataType: 'number',
          options: {
            length: 2,
            scale: 0,
          },
        };

        expect(traverse(input)).to.deep.equal(expected);
      });

      it('float literal', () => {
        const input = {
          type: 'literal',
          value: 11.2,
          dataType: 'number',
          options: {
            length: 2,
            scale: 1,
          },
        };

        const expected = {
          type: 'literal',
          value: 11.2,
          dataType: 'number',
          options: {
            length: 2,
            scale: 1,
          },
        };

        expect(traverse(input)).to.deep.equal(expected);
      });

      it('string literal', () => {
        const input = {
          type: 'literal',
          value: 'a String',
          dataType: 'text',
          options: {
            length: 8,
            scale: 0,
          },
        };

        const expected = {
          type: 'literal',
          value: 'a String',
          dataType: 'text',
          options: {
            length: 8,
            scale: 0,
          },
        };

        expect(traverse(input)).to.deep.equal(expected);
      });
    });

    context('identifier', () => {
      context('just an identifier', () => {
        it('returns ReferenceError', () => {
          const input = { type: 'identifier', name: 'Name' };
          expect(traverse(input)).to.deep.eq({
            type: 'error',
            errorType: 'ReferenceError',
            identifier: input.name,
            message: `Field ${input.name} does not exist. Check spelling.`,
          });
        });
      });

      context('identifer in call', () => {
        it('returns ReferenceError', () => {
          const input = {
            type: 'callExpression',
            id: 'add',
            arguments: [
              {
                type: 'identifier',
                name: 'idontexist',
              },
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
          expect(traverse(input)).to.deep.eq({
            type: 'error',
            errorType: 'ReferenceError',
            identifier: 'idontexist',
            message: 'Field idontexist does not exist. Check spelling.',
          });
        });
      });
    });

    context('callExpression', () => {
      it('1 level', () => {
        const input = {
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
              value: 9,
              dataType: 'number',
              options: {
                length: 1,
                scale: 0,
              },
            },
          ],
        };

        const expected = {
          type: 'literal',
          value: 10.5,
          dataType: 'number',
          options: {
            length: 2,
            scale: 1,
          },
        };

        expect(traverse(input)).to.deep.equal(expected);
      });

      it('2 levels', () => {
        const input = {
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
        const expected = {
          type: 'literal',
          value: 61,
          dataType: 'number',
          options: {
            length: 2,
            scale: 0,
          },
        };

        expect(traverse(input)).to.deep.equal(expected);
      });
    });
  });

  describe('extract', () => {
    context('no identifiers', () => {
      const ast = {
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

      it('returns empty array', () => {
        const expected = [];
        expect(extract(ast)).to.deep.equal(expected);
      });
    });

    context('one identifier', () => {
      const ast = {
        type: 'callExpression',
        id: 'add',
        arguments: [{ type: 'literal', value: 1.5 }, { type: 'identifier', name: 'Name' }],
      };

      it('returns array with identifiers', () => {
        const expected = ['Name'];
        expect(extract(ast)).to.deep.equal(expected);
      });
    });

    context('multiple identifiers', () => {
      const ast = {
        type: 'callExpression',
        id: 'add',
        arguments: [
          {
            type: 'callExpression',
            id: 'subtract',
            arguments: [{ type: 'identifier', name: 'Argument1' }, { type: 'identifier', name: 'Argument2' }],
          },
          { type: 'identifier', name: 'Name' },
        ],
      };

      it('returns array with identifiers', () => {
        const expected = ['Argument1', 'Argument2', 'Name'];
        expect(extract(ast)).to.deep.equal(expected);
      });
    });

    context('redundant identifiers', () => {
      const ast = {
        type: 'callExpression',
        id: 'add',
        arguments: [{ type: 'identifier', name: 'Name' }, { type: 'identifier', name: 'Name' }],
      };

      it('returns array with replaced variables', () => {
        const expected = ['Name', 'Name'];
        expect(extract(ast)).to.deep.equal(expected);
      });
    });

    context('function call without parameters', () => {
      const ast = {
        type: 'callExpression',
        id: 'date',
        arguments: [],
      };

      it('returns empty array', () => {
        const expected = [];
        expect(extract(ast)).to.deep.equal(expected);
      });
    });
  });

  describe('replace', () => {
    context('no identifiers', () => {
      const ast = {
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

      it('returns empty array', () => {
        const expected = ast;
        expect(replace(ast, { Name: 'value' })).to.deep.equal(expected);
      });
    });

    context('one identifier', () => {
      context('replacement given', () => {
        const ast = {
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
              type: 'identifier',
              name: 'Name',
            },
          ],
        };

        it('returns replaced array', () => {
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
                value: 'value',
                dataType: 'text',
                options: {
                  length: 4,
                },
              },
            ],
          };
          const substitutions = {
            Name: {
              value: 'value',
              dataType: 'text',
              options: {
                length: 4,
              },
            },
          };
          expect(replace(ast, substitutions)).to.deep.equal(expected);
        });
      });

      context('no replacement given', () => {
        const ast = {
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
              type: 'identifier',
              name: 'Name',
            },
          ],
        };

        it('returns replaced array', () => {
          const expected = ast;
          expect(replace(ast, {})).to.deep.equal(expected);
        });
      });
    });
  });
});
