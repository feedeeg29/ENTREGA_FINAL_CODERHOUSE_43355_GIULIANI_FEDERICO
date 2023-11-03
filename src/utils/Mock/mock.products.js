import { faker } from '@faker-js/faker'
export const generateProduct = () => {
    return {
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric(),
        thumbnail: faker.image.url(),
        price: Math.floor(Math.random() * (100000 - 1 + 1)) + 1,
        stock: Math.floor(Math.random() * (1000 - 1 + 1)) + 1
    }
}