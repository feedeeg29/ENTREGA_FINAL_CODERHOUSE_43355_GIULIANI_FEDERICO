import chai from 'chai';
import supertest from 'supertest';
import { mockData } from '../test/mockData.js'

const requester = supertest('http://0.0.0.0:8080/api/users');
const expect = chai.expect;

describe('Testing Sessions module', () => {
    it('Registrar como usuario', async () => {
        const { statusCode } = await requester.post('/register').send(mockData.registerUser);
        expect(statusCode).to.equal(200);
    })
    it('Registrar como admin', async () => {
        const { statusCode } = await requester.post('/register').send(mockData.registerUser);
        expect(statusCode).to.equal(200);
    })
    it('Login como user', async () => {
        const { statusCode } = await requester.post('/login').send(mockData.loginUser);
        expect(statusCode).to.equal(400);
    })
    it('Login como admin', async () => {
        const { statusCode } = await requester.post('/register').send(mockData.loginAdmin);
        expect(statusCode).to.equal(200);
    })
})
