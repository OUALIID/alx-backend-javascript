const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai');

describe('calculateNumber', () => {
  it('Testing normal cases...', () => {
    expect(calculateNumber('SUM', 1, 3)).to.equal(4);
    expect(calculateNumber('SUBTRACT', 5, 3.7)).to.equal(1);
    expect(calculateNumber('DIVIDE', 8.2, 3.7)).to.be.closeTo(2.216, 0.001);
    expect(calculateNumber('DIVIDE', 1.4, 4.5)).to.be.closeTo(0.311, 0.001);
  });

  it('Testing division by zero...', () => {
    expect(calculateNumber('DIVIDE', 1, 0)).to.equal('Error');
  });

  it('Testing operations with constants...', () => {
    expect(calculateNumber('SUM', Math.E, Math.PI)).to.be.closeTo(5.86, 0.01);
    expect(calculateNumber('SUBTRACT', Math.PI, Math.E)).to.be.closeTo(0.42, 0.01);
    expect(calculateNumber('DIVIDE', Math.E, Math.PI)).to.be.closeTo(0.86, 0.01);
  });

  it('Testing negative numbers...', () => {
    expect(calculateNumber('SUM', -1, 3)).to.equal(2);
    expect(calculateNumber('SUBTRACT', 5, -3.7)).to.equal(9);
  });

  it('Testing large numbers...', () => {
    expect(calculateNumber('SUM', 1000000, 2000000)).to.equal(3000000);
    expect(calculateNumber('SUBTRACT', 1000000, 999999)).to.equal(1);
    expect(calculateNumber('DIVIDE', 9999999, 3)).to.be.closeTo(3333333, 1);
  });
});
