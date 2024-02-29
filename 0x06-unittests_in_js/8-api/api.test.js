const request = require('request');
const { expect } = require('chai');
const sinon = require('sinon');

describe('apiTesting', () => {
  it('The test should return the correct status code', (done) => {
    request('http://localhost:7865/', (error, res) => {
      expect(res.status, 200);
      done();
    });
  });
  it('The test should return the correct result', (done) => {
    request('http://localhost:7865/', (error, res) => {
      expect(res.body).to.deep.equal('Welcome to the payment system');
      done();
    });
  });
  it('Testing The correct message should be logged to the console', (done) => {
    request('http://localhost:7865/', (error, res) => {
	  const consoleLog = sinon.spy(console, 'log');
      expect(consoleLog.calledWith('API available on localhost port 7865'));
	  consoleLog.restore();
      done();
    });
  });
});
