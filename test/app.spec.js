const server = require('../src/server')

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(server)
      .get('/api')
      .expect(200, 'Hello, world!')
  })
})