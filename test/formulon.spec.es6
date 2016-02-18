"use strict"

let path = require('path');
let parser = require(path.join(__dirname, '..', 'lib', 'parser'));

var expect = require('chai').expect

describe('Formulon', () => {
  describe('#parse', () => {
    context("arithmetics", () => {

      it('returns correct result', () => {
        expect(parser.parse("1 + 2")).to.eql(3)
      })
    })
  })
})
