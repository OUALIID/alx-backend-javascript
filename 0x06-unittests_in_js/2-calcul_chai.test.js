const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai');

/* eslint-disable */
describe('calculateNumber', () => {
  it('Testing normal cases...', () => {
	expect(calculateNumber('SUM', 1, 3)).to.equal(4);
    expect(calculateNumber('SUM', 1, 3)).to.equal(4);
    expect(calculateNumber('SUBTRACT', 5, 3.7)).to.equal(1);
    expect(calculateNumber('DIVIDE', 8.2, 3.7)).to.equal(2);
    expect(calculateNumber('DIVIDE', 1.4, 4.5)).to.equal(0.2);
  });
  it('Testing devision on zero...', () => {
    expect(calculateNumber('DIVIDE', 1, 0)).to.equal('Error');
  });
  it('Testing odds...', () => {
    expect(calculateNumber('SUM', Math.E, Math.PI)).to.equal(6);
    expect(calculateNumber('SUBTRACT', Math.E, Math.PI)).to.equal(0);
    expect(calculateNumber('DIVIDE', Math.E, Math.PI)).to.equal(1);
  });
  it('Testing negatives...', () => {
    expect(calculateNumber('SUM', -1, 3)).to.equal(2);
    expect(calculateNumber('SUBTRACT', 5, -3.7)).to.equal(9);
  });
});
