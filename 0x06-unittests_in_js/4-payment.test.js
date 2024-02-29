const sinon = require('sinon');
const sendPaymentRequestToApi = require('./4-payment');
const Utils = require('./utils');

describe('sendPaymentRequestToApi', function () {
  let stub;

  beforeEach(() => (stub = sinon.stub(Utils, 'calculateNumber').returns(10)));
  afterEach(() => stub.restore());

  it('calls Utils.calculateNumber with correct args', function () {
    sendPaymentRequestToApi(100, 20);
    sinon.assert.calledWith(stub, 'SUM', 100, 20);
  });
});
