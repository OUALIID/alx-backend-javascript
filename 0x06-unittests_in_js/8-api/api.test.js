const request = require('supertest');
const app = require('./api');

describe('Index page', function () {
  it('responds with status code 200', (done) => {
    request(app).get('/').expect(200, done);
  });

  it('responds with the correct message', (done) => {
    request(app).get('/').expect('Welcome to the payment system', done);
  });
});
