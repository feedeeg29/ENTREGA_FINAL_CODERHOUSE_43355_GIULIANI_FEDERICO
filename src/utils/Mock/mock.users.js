import { faker } from "@faker-js/faker";
export const mockUser = () => {
    const role = ["user", "admin"]
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        sex: faker.person.sex(),
        id: faker.database.mongodbObjectId(),
        role: "user",
    }
}