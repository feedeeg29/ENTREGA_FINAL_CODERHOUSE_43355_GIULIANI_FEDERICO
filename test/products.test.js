import chai from 'chai';
import supertest from 'supertest'
import { faker } from '@faker-js/faker'
import { mockData } from '../test/mockData.js';

const requester = supertest('http://0.0.0.0:8080/api/products')
const expect = chai.expect

describe('Testing Modulo Productos', () => {
    it('Traer todos los productos', async () => {
        const { statusCode } = await requester.get('/');
        expect(statusCode).to.equal(200);
    });
    it('Buscar producto por ID', async () => {
        const pid = faker.database.mongodbObjectId();
        const { statusCode } = await requester.get(`/${pid}`);
        expect(statusCode).to.equal(200)
    })
    it('crear producto', async () => {
        const { statusCode } = await requester.post('/').send(mockData.product)
        expect(statusCode).to.equal(200)
    })
})
