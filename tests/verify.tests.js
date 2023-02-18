var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;
const assert = require("chai").assert;
const expect = require("chai").expect;

const jwt = require("../index");
const jws = require("jws");
const fs = require("fs");
const path = require("path");
// const sinon = require("sinon");
const JsonWebTokenError = require("../lib/JsonWebTokenError");

describe("verify", () => {
  const public = fs.readFileSync(path.join(__dirname, "public.pem"));
  const private = fs.readFileSync(path.join(__dirname, "private.pem"));
  it("Should first assume JSON claim set", (done) => {
    const header = { alg: "RS256" };
    const payload = { iat: Math.floor(Date.now() / 1000) };
    const signed = jws.sign({
      header: header,
      payload: payload,
      secret: private,
      encoding: "utf8",
    });
    jwt.verify(signed, public, { typ: "JWT" }, function (err, p) {
      assert.isNull(err);
      assert.deepEqual(p, payload);
      done();
    });
  });

  it("should not mutate options", function (done) {
    const header = { alg: "HS256" };
    const payload = { iat: Math.floor(Date.now() / 1000) };
    const options = { typ: "JWT" };
    const signed = jws.sign({
      header: header,
      payload: payload,
      secret: "secret",
      encoding: "utf8",
    });

    jwt.verify(signed, "secret", options, function (err) {
      assert.isNull(err);
      assert.deepEqual(Object.keys(options).length, 1);
      done();
    });
  });
  it("should not be able to verify unsigned token", () => {
    const header = { alg: "none" };
    const payload = { iat: Math.floor(Date.now() / 1000) };

    const signed = jws.sign({
      header: header,
      payload: payload,
      secret: "secret",
      encoding: "utf8",
    });

    expect( ()=> {
      jwt.verify(signed, "secret", { typ: "JWT" });
    }).to.throw(JsonWebTokenError, /jwt signature is required/);
  });
  it('should not be able to verify unsigned token',  ()=> {
    const header = { alg: 'none' };
    const payload = { iat: Math.floor(Date.now() / 1000 ) };

    const signed = jws.sign({
      header: header,
      payload: payload,
      secret: 'secret',
      encoding: 'utf8'
    });

    expect(function () {
      jwt.verify(signed, undefined, {typ: 'JWT'});
    }).to.throw(JsonWebTokenError, /please specify "none" in "algorithms" to verify unsigned tokens/);
  });
  it('should be able to verify unsigned token when none is specified', function (done) {
    const header = { alg: 'none' };
    const payload = { iat: Math.floor(Date.now() / 1000 ) };

    const signed = jws.sign({
      header: header,
      payload: payload,
      secret: 'secret',
      encoding: 'utf8'
    });

    jwt.verify(signed, null, {typ: 'JWT', algorithms: ['none']}, function(err, p) {
      assert.isNull(err);
      assert.deepEqual(p, payload);
      done();
    });
  });
});

// openssl req -nodes -new -x509 -keyout private.pem -out public.pem
