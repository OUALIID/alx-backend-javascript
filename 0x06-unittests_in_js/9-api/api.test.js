const request = require('request');
const { expect } = require('chai');
const sinon = require('sinon');
const app = require('./api');

describe('apiTesting', () => {
  it('The test should return the correct status code', (done) => {
    request('http://localhost:7865/', (error, res) => {
      expect(res.statusCode).to.equal(200);
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
      expect(consoleLog.calledWith('API available on localhost port 7865')).to.be.true;
      consoleLog.restore();
      done();
    });
  });
});

describe('Cart page', () => {
  it('responds with status code 200 when :id is a number', (done) => {
    request(app).get('/cart/123').expect(200, done);
  });

  it('responds with status code 404 when :id is not a number', (done) => {
    request(app).get('/cart/abc').expect(404, done);
  });
});
