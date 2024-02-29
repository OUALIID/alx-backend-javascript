const sinon = require('sinon');
const sendPaymentRequestToApi = require('./5-payment');
const Utils = require('./utils');

describe('sendPaymentRequestToApi', () => {
  let stub, consoleStub;

  beforeEach(() => {
    stub = sinon.stub(Utils, 'calculateNumber').returns(10);
    consoleStub = sinon.stub(console, 'log');
  });

  afterEach(() => {
    stub.restore();
    consoleStub.restore();
  });

  it('verifies console.log and Utils.calculateNumber with 100 and 20', () => {
    sendPaymentRequestToApi(100, 20);
    sinon.assert.calledWithExactly(consoleStub, 'The total is: 120');
    sinon.assert.calledWithExactly(stub, 'SUM', 100, 20);
  });

  it('verifies console.log and Utils.calculateNumber with 10 and 10', () => {
    sendPaymentRequestToApi(10, 10);
    sinon.assert.calledWithExactly(consoleStub, 'The total is: 20');
    sinon.assert.calledWithExactly(stub, 'SUM', 10, 10);
  });
});
