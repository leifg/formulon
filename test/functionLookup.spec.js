var expect = require("chai").expect

let FunctionLookup = require("../src/functionLookup");

describe("FunctionLookup", () => {
  describe("#add", () => {
    it("adds correctly", () => {
      expect(FunctionLookup.add(1,2)).to.eq(3)
    })
  })

  describe("#multiply", () => {
    it("multiplies correctly", () => {
      expect(FunctionLookup.multiply(7,8)).to.eq(56)
    })
  })
})
