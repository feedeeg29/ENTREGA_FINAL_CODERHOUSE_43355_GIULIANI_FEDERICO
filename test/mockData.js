import { faker } from '@faker-js/faker'

export const mockData = {
    product: {
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric(),
        thumbnail: faker.image.url(),
        price: Math.floor(Math.random() * (100000 - 1 + 1)) + 1,
        stock: Math.floor(Math.random() * (1000 - 1 + 1)) + 1
    },
    user: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        sex: faker.person.sex(),
        id: faker.database.mongodbObjectId(),
        role: "user",
    },
    registerUser: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        sex: faker.person.sex(),
        id: faker.database.mongodbObjectId(),
    },
    registerAdmin: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: 'adminCoder@coder.com',
        password: 'admin123',
    },
    loginUser: {
        email: 'userCoder@coder.com',
        password: 'user123',
    },
    loginAdmin: {
        email: 'adminCoder@coder.com',
        password: 'admin123'
    },
    createCart: {

    }
}