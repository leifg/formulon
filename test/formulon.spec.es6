"use strict"

let path = require('path');
let Formulon = require(path.join(__dirname, '..', 'src', 'formulon'));

var expect = require('chai').expect

describe('Formulon', () => {
  describe('#parse', () => {
    let formulon

    beforeEach(() => {
      formulon = new Formulon();
    });

    it('returns correct result', () => {
      expect(formulon.parse()).to.eql([ 'a', 'b', 'b', 'a' ])
    })
  })
})
