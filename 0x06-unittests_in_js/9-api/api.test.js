const request = require('request');
const { expect } = require('chai');
const sinon = require('sinon');

describe('apiTesting /', () => {
  it('The test should return the correct status code', (done) => {
    request('http://localhost:7865/', (error, response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  
  it('The test should return the correct result', (done) => {
    request('http://localhost:7865/', (error, response) => {
      expect(response.body).to.deep.equal('Welcome to the payment system');
      done();
    });
  });
  
  it('Testing The correct message should be logged to the console', (done) => {
    request('http://localhost:7865/', (error, response) => {
      const consoleLog = sinon.spy(console, 'log');
      expect(consoleLog.calledWith('API available on localhost port 7865')).to.be.true;
      consoleLog.restore();
      done();
    });
  });
});

describe('apiTesting /cart/:id', () => {
  it('responds with status code 200 for a valid cart ID', (done) => {
    request('http://localhost:7865/cart/1', (error, response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  
  it('responds with status code 404 for an invalid cart ID', (done) => {
    request('http://localhost:7865/cart/hello', (error, response) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
  
  it('returns the correct payment methods for a valid cart ID', (done) => {
    request('http://localhost:7865/cart/1', (error, response) => {
      expect(response.body).to.equal('Payment methods for cart 1');
      done();
    });
  });
  
  it('responds with status code 404 when cart ID is missing', (done) => {
    request('http://localhost:7865/cart', (error, response) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});
