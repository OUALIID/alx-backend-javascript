const request = require('request');
const { expect } = require('chai');
const sinon = require('sinon');

/* eslint-disable */
describe('apiTesting /', () => {
  it('Testing correct statusCode...', (done) => {
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
  it('Testing correct id type...', (done) => {
    request('http://localhost:7865/cart/1', (error, response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.equal('Payment methods for cart 1');
      done();
    });
  });
  it('Testing wrong id type...', (done) => {
    request('http://localhost:7865/cart/hello', (error, response) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
  it('Testing correct content...', (done) => {
    request('http://localhost:7865/cart', (error, response) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});
