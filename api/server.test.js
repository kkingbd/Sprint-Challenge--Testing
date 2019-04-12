const request = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('./server.js');

afterEach(async () => {
   await db('table').truncate();
});


describe('routeHandlers', () => {
    describe('/get games Endpoint', () => {

        it('responds with status 200', async () => {
            const response = await request(server).get('/games');

            expect(response.status).toBe(200);
        })
        it('responds with JSON', async () => {
            const response = await request(server).get('/games');

            expect(response.type).toMatch(/json/i);
        })

        it('sends back correct type', async () => {
            const response = await request(server).get('/games');

            expect(typeof response.body).toBe('object');
        })
    });
});