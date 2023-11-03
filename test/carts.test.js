import chai from 'chai';
import supertest from 'supertest'
import { faker } from '@faker-js/faker'
import { mockData } from '../test/mockData.js'

const requester = supertest('http://0.0.0.0:8080/api/carts')
const expect = chai.expect;

describe('Test modulo Carts', () => {
    it('traer todos los Carts', async () => {
        const { statusCode } = await requester.get('/')
        expect(statusCode).to.equal(200)
    })
    it('Buscar cart por ID', async () => {
        const cid = faker.database.mongodbObjectId();
        const { statusCode } = await requester.get(`/${cid}`);
        expect(statusCode).to.equal(200)
    })
    it('crear Carrito', async () => {
        const { statusCode } = await requester.post('/').send(mockData.product)
    })
})