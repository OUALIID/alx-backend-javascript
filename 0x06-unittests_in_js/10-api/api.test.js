const request = require('request');
const { expect } = require('chai');
const sinon = require('sinon');

const url = 'http://localhost:7865';

describe('apiTesting /', () => {
  it('Testing correct statusCode...', (done) => {
    request(`${url}`, (error, res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.equal('Welcome to the payment system');
      const consoleLog = sinon.spy(console, 'log');
      expect(consoleLog.calledWith('API available on localhost port 7865'));
      consoleLog.restore();
      done();
    });
  });
});

describe('apiTesting /cart/:ip', () => {
  it('Testing correct id type...', (done) => {
    request(`${url}/cart/1`, (error, res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.equal('Payment methods for cart 1');
      done();
    });
  });
  it('Testing wrong id type...', (done) => {
    request(`${url}/cart/hello`, (error, res) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
  it('Testing correct content...', (done) => {
    request(`${url}/cart`, (error, res) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
});

describe('apiTesting /available_payments', () => {
  it('Testing available_payments...', (done) => {
    request(`${url}/available_payments`, (error, res) => {
      expect(res.status, 200);
      done();
    });
  });
  it('Testing available_payments...', (done) => {
    request(`${url}/available_payments`, (error, res) => {
      const object = {
        payment_methods: {
          credit_cards: true,
          paypal: false,
        },
      };
      expect(JSON.parse(res.body)).to.deep.equal(object);
      done();
    });
  });
});

describe('apiTesting /login', () => {
  it('Testing the statusCode...', (done) => {
    const requestObject = {
      url: `${url}/login`,
      json: { userName: 'OUALID' },
    };
    request.post(requestObject, (error, res, body) => {
      expect(res.status, 200);
      done();
    });
  });
  it('Testing with a userName...', (done) => {
    const requestObject = {
      url: `${url}/login`,
      json: { userName: 'OUALID' },
    };
    request.post(requestObject, (error, res, body) => {
      expect(body).to.equal('Welcome OUALID');
      done();
    });
  });
});