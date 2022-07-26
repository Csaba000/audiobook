import connectDB from "../config/dbConnect.js";
import { faker } from "@faker-js/faker";
import bookSchema from "../models/book-model.js";

async function createRandomBooks() {
  await connectDB();
  for (let i = 0; i < 15; ++i) {
    await bookSchema.create({
      coverUrl: faker.image.cats(),
      title: faker.company.companyName(),
      author: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      lengthInSeconds: Math.floor(Math.random() * 1000) + 1,
    });
  }
}
export { createRandomBooks };
