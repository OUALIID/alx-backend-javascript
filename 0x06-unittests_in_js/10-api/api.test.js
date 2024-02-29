const request = require('request');
const { expect } = require('chai');
const sinon = require('sinon');

const url = 'http://localhost:7865';

describe('apiTesting /', () => {
  it('Testing correct statusCode and log message', (done) => {
    request(url, (error, response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.equal('Welcome to the payment system');
      const consoleLog = sinon.spy(console, 'log');
      setTimeout(() => {
        expect(consoleLog.calledWith('API available on localhost port 7865')).to.be.true;
        consoleLog.restore();
        done();
      }, 1000);
    });
  });
});

describe('apiTesting /cart/:id', () => {
  it('Testing correct id type and content', (done) => {
    request(`${url}/cart/1`, (error, response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.equal('Payment methods for cart 1');
      done();
    });
  });

  it('Testing wrong id type', (done) => {
    request(`${url}/cart/hello`, (error, response) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  it('Testing correct content for invalid cart endpoint', (done) => {
    request(`${url}/cart`, (error, response) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});

describe('apiTesting /available_payments', () => {
  it('Testing correct status code for available_payments', (done) => {
    request(`${url}/available_payments`, (error, response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('Testing correct response object for available_payments', (done) => {
    request(`${url}/available_payments`, (error, response) => {
      const expectedResponse = {
        payment_methods: {
          credit_cards: true,
          paypal: false,
        },
      };
      expect(JSON.parse(response.body)).to.deep.equal(expectedResponse);
      done();
    });
  });
});

describe('apiTesting /login', () => {
  it('Testing correct status code for login', (done) => {
    const requestOptions = {
      url: `${url}/login`,
      json: { userName: 'Asmaa' },
    };
    request.post(requestOptions, (error, response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('Testing correct response message for login', (done) => {
    const requestOptions = {
      url: `${url}/login`,
      json: { userName: 'Asmaa' },
    };
    request.post(requestOptions, (error, response, body) => {
      expect(body).to.equal('Welcome Asmaa');
      done();
    });
  });
});
