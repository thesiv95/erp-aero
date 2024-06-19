import { fakerEN as faker } from '@faker-js/faker';

const generateUserName = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return `${firstName} ${lastName}`;
};

export default generateUserName;