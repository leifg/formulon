/* global describe it context */

'use strict'

var expect = require('chai').expect

import { arrayUnique, normalizeLiteral, buildLiteralFromJs } from '../src/utils'

describe('normalizeLiteral', () => {
  context('Number', () => {
    context('Integer (no scale)', () => {
      context('positive', () => {
        let input = {
          value: '2',
          dataType: 'number',
          meta: {
            length: 1,
            scale: 0
          }
        }

        it('returns parsed literal', () => {
          let expected = {
            name: {
              value: 2,
              dataType: 'number',
              meta: {
                length: 1,
                scale: 0
              }
            }
          }
          expect(normalizeLiteral({name: input})).to.deep.eq(expected)
        })
      })

      context('negative', () => {
        let input = {
          value: '-12',
          dataType: 'number',
          meta: {
            length: 2,
            scale: 0
          }
        }

        it('returns parsed literal', () => {
          let expected = {
            name: {
              value: -12,
              dataType: 'number',
              meta: {
                length: 2,
                scale: 0
              }
            }
          }
          expect(normalizeLiteral({name: input})).to.deep.eq(expected)
        })
      })

      context('explicitly positive', () => {
        let input = {
          value: '+123',
          dataType: 'number',
          meta: {
            length: 3,
            scale: 0
          }
        }

        it('returns parsed literal', () => {
          let expected = {
            name: {
              value: 123,
              dataType: 'number',
              meta: {
                length: 3,
                scale: 0
              }
            }
          }
          expect(normalizeLiteral({name: input})).to.deep.eq(expected)
        })
      })
    })
  })
})

describe('buildLiteralFromJs', () => {
  context('Number', () => {
    context('Integer', () => {
      it('returns expected Literal for positive number', () => {
        let expected = {
          type: 'literal',
          value: 1,
          dataType: 'number',
          meta: {
            length: 1,
            scale: 0
          }
        }
        expect(buildLiteralFromJs(1)).to.deep.eq(expected)
      })

      it('returns expected Literal for positive number', () => {
        let expected = {
          type: 'literal',
          value: -12,
          dataType: 'number',
          meta: {
            length: 2,
            scale: 0
          }
        }
        expect(buildLiteralFromJs(-12)).to.deep.eq(expected)
      })
    })

    context('Float', () => {
      it('returns expected Literal for positive number', () => {
        let expected = {
          type: 'literal',
          value: 1.5,
          dataType: 'number',
          meta: {
            length: 1,
            scale: 1
          }
        }
        expect(buildLiteralFromJs(1.5)).to.deep.eq(expected)
      })

      it('returns expected Literal for positive number', () => {
        let expected = {
          type: 'literal',
          value: -125.75,
          dataType: 'number',
          meta: {
            length: 3,
            scale: 2
          }
        }
        expect(buildLiteralFromJs(-125.75)).to.deep.eq(expected)
      })
    })
  })

  context('Text', () => {
    it('returns expected Literal for text number', () => {
      let expected = {
        type: 'literal',
        value: 'four',
        dataType: 'text',
        meta: {
          length: 4
        }
      }
      expect(buildLiteralFromJs('four')).to.deep.eq(expected)
    })
  })

  context('Checkbox', () => {
    it('returns expected Literal for true', () => {
      let expected = {
        type: 'literal',
        value: true,
        dataType: 'checkbox',
        meta: {}
      }
      expect(buildLiteralFromJs(true)).to.deep.eq(expected)
    })
  })

  context('unsupported type', () => {
    it('throws TypeError', () => {
      let fn = () => { buildLiteralFromJs({}) }

      expect(fn).to.throw(TypeError, "Unsupported type 'object'")
    })
  })
})

describe('arrayUnique', () => {
  // TODO add deepFreeze
  context('non redundant elements', () => {
    it('returns same input as output for empty array', () => {
      let input = []
      let expected = []
      expect(arrayUnique(input)).to.deep.eq(expected)
    })

    it('returns same input as output', () => {
      let input = ['a', 'b', 'c']
      let expected = ['a', 'b', 'c']
      expect(arrayUnique(input)).to.deep.eq(expected)
    })
  })

  context('redundant elements', () => {
    it('leaves out redundant elements', () => {
      let input = ['a', 'b', 'c', 'a']
      let expected = ['a', 'b', 'c']
      expect(arrayUnique(input)).to.deep.eq(expected)
    })
  })
})
