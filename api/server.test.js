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
    describe('/post games', () => {

        it('responds with status 201', async () => {
            const body = {
                title: 'Pacman', // required
                genre: 'Arcade', // required
                releaseYear: 1980 // not required
              }
            const response = await request(server).post('/games').send(body);

            expect(response.status).toBe(201);
            expect(response.body.length).toBe(1);

        })
        it('responds with status 422', async () => {
            const body = {}
            const response = await request(server).post('/games').send(body);

            expect(response.status).toBe(422);
        })

        it('sends back correct type', async () => {
            const body = {title: 'Hanna', genre: 'arcade', releaseYear: 1990}
            const response = await request(server).post('/games').send(body);

            expect(typeof response.body).toBe('object');
        })

        it('should return the id of the game created', async () => {
            const body = {
               title: 'Clash Royale',
               genre: 'PG-6',
               releaseYear: '2010',
            };
   
            const response = await request(server).post('/games').send(body);
            expect(response.body).toEqual([1]);
         });

         it('should return status code error of 422,', async () => {
            const body = {title: 'ptris'}
            const response = await request(server).post('/games').send(body);

            expect(response.status).toBe(422);
        })
        
    });
});