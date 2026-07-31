const request = require('supertest');
const app = require('../src/app');
const { connect, closeDatabase, clearDatabase } = require('./setup');

let token;

beforeAll(async () => {
    await connect();
});

beforeEach(async () => {
    await request(app)
        .post('/api/auth/register')
        .send({
            name: 'Note Owner',
            email: 'noteowner@example.com',
            password: 'password123'
        });

    const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'noteowner@example.com',
            password: 'password123'
        });

    token = loginRes.body.token;
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('Notes Endpoints', () => {
    it('should reject requests with no token', async () => {
        const res = await request(app).get('/api/notes');
        expect(res.statusCode).toBe(401);
    });

    it('should create a new note', async () => {
        const res = await request(app)
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test Note', content: 'Some content' });

        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe('Test Note');
        expect(res.body.content).toBe('Some content');
    });

    it('should get all notes for the logged in user', async () => {
        await request(app)
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Note 1', content: 'Content 1' });

        const res = await request(app)
            .get('/api/notes')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].title).toBe('Note 1');
    });

    it('should get a single note by id', async () => {
        const createRes = await request(app)
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Single Note', content: 'Content here' });

        const noteId = createRes.body._id;

        const res = await request(app)
            .get(`/api/notes/${noteId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe('Single Note');
    });

    it('should update a note', async () => {
        const createRes = await request(app)
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Old Title', content: 'Old content' });

        const noteId = createRes.body._id;

        const res = await request(app)
            .put(`/api/notes/${noteId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'New Title', content: 'New content' });

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe('New Title');
    });

    it('should delete a note', async () => {
        const createRes = await request(app)
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'To Delete', content: 'Delete me' });

        const noteId = createRes.body._id;

        const res = await request(app)
            .delete(`/api/notes/${noteId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });

    it('should not allow a different user to update someone else\'s note', async () => {
        const createRes = await request(app)
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Owner Note', content: 'Private content' });

        const noteId = createRes.body._id;

        await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Intruder',
                email: 'intruder@example.com',
                password: 'password123'
            });

        const intruderLogin = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'intruder@example.com',
                password: 'password123'
            });

        const intruderToken = intruderLogin.body.token;

        const res = await request(app)
            .put(`/api/notes/${noteId}`)
            .set('Authorization', `Bearer ${intruderToken}`)
            .send({ title: 'Hacked Title', content: 'Hacked content' });

        expect(res.statusCode).toBe(404);
    });
});