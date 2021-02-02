const request = require('supertest');
const server = require('./server');

const db = require('../data/dbConfig');

const user1 = { username: "bob", password: "1234", full_name: "Bob Ross" }

// DELETE TESTING DB BEFORE RUNNING. Encountering lstat issue with sqlite3

// AUTH
describe('auth', () => {
    beforeEach(async () => {
        await db.migrate.rollback();
        await db.migrate.latest();
        await db.seed.run();
    })

    afterAll(async () => {
        await db.destroy();
    })

    // /auth/register
    it('should return a message with "username taken" when user is already registered', async () => {
        await request(server).post('/api/auth/register').send(user1);
        const res = await request(server).post('/api/auth/register').send(user1);

        expect(res.body.message).toBe("username taken")
    })

    it('should return a status code of 400 when user is already registered', async () => {
        await request(server).post('/api/auth/register').send(user1);
        const res = await request(server).post('/api/auth/register').send(user1);
    
        expect(res.status).toBe(400);
    })

    it('should return a body with the user object with proper input', async () => {
        const res = await request(server).post('/api/auth/register').send(user1);

        expect(res.body.id).toBe(1);
        expect(res.body.username).toBe("bob");
        expect(res.body.password).toBeTruthy();
        expect(res.body.full_name).toBeTruthy();
        expect(res.body.role).toBeTruthy();
    })

    // auth/login
    it('should return "invalid credentials" if username or password is incorrect', async () => {
        const res = await request(server).post('/api/auth/login').send(user1);

        expect(res.body).toBe("invalid credentials");
    })

    it('should return a status code of 400 if username or password is incorrect', async () => {
        const res = await request(server).post('/api/auth/login').send(user1);

        expect(res.status).toBe(400);
    })

    it('should return a response body of message and token and the users username', async () => {
        await request(server).post('/api/auth/register').send(user1);
        const res = await request(server).post('/api/auth/login').send(user1);

        expect(res.body.message).toBeTruthy();
        expect(res.body.message.includes(user1.username)).toBeTruthy();
        expect(res.body.token).toBeTruthy();
    })

    // /classes and the restrict middleware
    it('should return a body with a message of "No authorization token"', async () => {
        const res = await request(server).get('/api/classes');

        expect(res.body.message).toBe("No authorization token");
    })

    it('should return a body with "token invalid"', async () => {
        const res = await request(server).get('/api/classes').set('Authorization', 'token');

        expect(res.body.message).toBe("Invalid authorization token");
    })

    it('should return a list of classes if proper token', async () => {
        await request(server).post('/api/auth/register').send(user1);
        const res2 = await request(server).post('/api/auth/login').send(user1);

        const res3 = await request(server).get('/api/classes').set('Authorization', res2.body.token);

        expect(Array.isArray(res3.body)).toBe(true);
        expect(res3.body.length).toBe(4);
    })
})