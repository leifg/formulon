"use strict"

let path = require('path');
let Formulon = require(path.join(__dirname, '..', 'src', 'formulon'));

var expect = require('chai').expect

describe('Formulon', () => {
  describe('#parse', () => {
    let formulon = new Formulon();
    context("arithmetics", () => {

      it('returns correct result', () => {
        expect(formulon.parse("1 + 2")).to.eql(3)
      })

    })
  })
})
