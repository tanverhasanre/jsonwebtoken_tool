var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;

const jwt = require("../index");
var expect = require("chai").expect;

describe("decoding token", () => {
  it("should not crash when decoding a null token", () => {
    var decoded = jwt.decode("");
    expect(decoded).to.equal(null);
  });
});
