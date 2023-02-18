var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;
var jwt = require("../index");
var expect = require("chai").expect;
var atob = require("atob");

describe("encoding", () => {
  const b64_to_utf8 = (str) => {
    return decodeURIComponent(atob(str));
  };
  it('should properly encode the token (utf8)',()=> {
    var expected = 'Tanver';
    var token = jwt.sign({ name: expected }, 'shhhhh');
    var decoded_name = JSON.parse(b64_to_utf8(token.split('.')[1])).name;
    expect(decoded_name).to.equal(expected);
  });
  it('should properly encode the token (binary)',  ()=> {
    var expected = 'Tanver';
    var token = jwt.sign({ name: expected }, 'shhhhh', { encoding: 'binary' });
    var decoded_name = JSON.parse(atob(token.split('.')[1])).name;
    expect(decoded_name).to.equal(expected);
  });
  it('should return the same result when decoding',  ()=> {
    var username = 'tanverhasan';

    var token = jwt.sign({
      username: username
    }, 'test');

    var payload = jwt.verify(token, 'test');

    expect(payload.username).to.equal(username);
  });
});
