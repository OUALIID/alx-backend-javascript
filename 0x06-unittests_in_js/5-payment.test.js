const sinon = require('sinon');
const sendPaymentRequestToApi = require('./5-payment');
const Utils = require('./utils');

describe('sendPaymentRequestToApi', () => {
  let stub;
  let consoleLog;

  beforeEach(() => {
    stub = sinon.stub(Utils, 'calculateNumber');
    consoleLog = sinon.spy(console, 'log');
  });

  it('Testing with totalAmount = 150 and totalShipping = 30', () => {
    stub.returns(180);

    sendPaymentRequestToApi(150, 30);

    expect(stub.calledWithExactly('SUM', 150, 30)).to.be.true;
    expect(consoleLog.calledOnceWith('The total is: 180')).to.be.true;
  });

  it('Testing with totalAmount = 75 and totalShipping = 25', () => {
    stub.returns(100);

    sendPaymentRequestToApi(75, 25);

    expect(stub.calledWithExactly('SUM', 75, 25)).to.be.true;
    expect(consoleLog.calledOnceWith('The total is: 100')).to.be.true;
  });

  afterEach(() => {
    stub.restore();
    consoleLog.restore();
  });
});
