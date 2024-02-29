const request = require('request');
const { expect } = require('chai');
const sinon = require('sinon');

describe('apiTesting /', () => {
  it('The test should return the correct status code', (done) => {
    request('http://localhost:7865/', (error, response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.equal('Welcome to the payment system');
      const consoleLog = sinon.spy(console, 'log');
      expect(consoleLog.calledWith('API available on localhost port 7865'));
      consoleLog.restore();
      done();
    });
  });
});

describe('apiTesting /cart/:ip', () => {
  it('The test should return the correct result', (done) => {
    request('http://localhost:7865/cart/1', (error, response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.equal('Payment methods for cart 1');
      done();
    });
  });
  it('The test should return the correct result', (done) => {
    request('http://localhost:7865/cart/hello', (error, response) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
  it('The test should return the correct result', (done) => {
    request('http://localhost:7865/cart', (error, response) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});
