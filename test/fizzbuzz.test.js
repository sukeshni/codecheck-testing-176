"use strict";

var assert = require("chai").assert;
var codecheck = require("codecheck");

function fizzbuzz(n) {
  if (n % 15 === 0) return "FizzBuzz";
  if (n % 5 === 0)  return "Buzz";
  if (n % 3 === 0)  return "Fizz";
  return n.toString();
}

describe("FizzBuzz", function() {

  it("1 -> 1", function() {
    var app = codecheck.consoleApp(process.env.APP_COMMAND);
    return app.run(1).spread(function(code, stdOut) {
      assert.equal(code, 0);
      assert.equal(stdOut.length, 1);
      assert.equal(stdOut[0], "1");
    });
  });

  it("2 -> 2", function() {
    var app = codecheck.consoleApp(process.env.APP_COMMAND);
    return app.run(2).spread(function(code, stdOut) {
      assert.equal(code, 0);
      assert.equal(stdOut.length, 1);
      assert.equal(stdOut[0], "2");
    });
  });

  it("3 -> Fizz", function() {
    var app = codecheck.consoleApp(process.env.APP_COMMAND);
    return app.run(3).spread(function(code, stdOut) {
      assert.equal(code, 0);
      assert.equal(stdOut.length, 1);
      assert.equal(stdOut[0], "Fizz");
    });
  });

  it ("1 to 100", function() {
    this.timeout(30000);

    var promises = [];
    for (let i=1; i<=100; i++) {
      promises.push((function(n) {
        var app = codecheck.consoleApp(process.env.APP_COMMAND);
        return app.run(n).spread(function(code, stdOut) {
          assert.equal(code, 0);
          assert.equal(stdOut.length, 1);
          assert.equal(stdOut[0], fizzbuzz(n));
        });
      })(i));
    }
    return Promise.all(promises);
  });
});