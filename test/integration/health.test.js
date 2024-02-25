const request = require('supertest');
const { app, server } = require('../../index');

describe('Integration Tests', () => {
  

  afterEach((done) => {
    server.close(done);
  })
  it('should return a 200 OK status code for GET request to /health', async () => {
    const response = await request(server).get('/health');
    expect(response.status).toBe(200);
  });
});
