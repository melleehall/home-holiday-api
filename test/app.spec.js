const { expect } = require('chai')
const app = require('../src/app')

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!  See API documentation here: https://github.com/melleehall/home-holiday-api')
  })
})