const assert = require('assert');
const calculateNumber = require('./0-calcul.js');

describe('calculateNumber', function() {
  it('Tests returns the sum of two rounded numbers', function() {
    assert.strictEqual(calculateNumber(1, 3), 4);
    assert.strictEqual(calculateNumber(1, 3.7), 5);
    assert.strictEqual(calculateNumber(1.2, 3.7), 5);
    assert.strictEqual(calculateNumber(1.5, 3.7), 6);
  });
  it('Tests returns the sum of two rounded numbers', function() {
    assert.equal(calculateNumber(3, -7), -4);
    assert.equal(calculateNumber(-1, 2), 1);
  });
  it('Tests returns the sum of two rounded numbers', function() {
    assert.equal(calculateNumber(Math.E, Math.PI), 6);
  });
  it('Tests returns the sum of two rounded numbers', function() {
    assert.equal(calculateNumber(11.4, 0), 11);
  });
});
