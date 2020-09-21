import faker from "faker";

export const data = new Array(50).fill(null).map((e) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
}));
