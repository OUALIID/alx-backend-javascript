const calculateNumber = require('./2-calcul_chai');

describe('calculateNumber', () => {
  it('should return the sum of two rounded numbers', () => {
    expect(calculateNumber('SUM', 1, 3)).to.equal(4);
    expect(calculateNumber('SUBTRACT', 1, 3.7)).to.equal(-3);
    expect(calculateNumber('DIVIDE', 1.2, 3.7)).to.be.closeTo(0.324, 0.001);
    expect(calculateNumber('DIVIDE', 1.5, 0)).to.equal('Error');
  });
});
