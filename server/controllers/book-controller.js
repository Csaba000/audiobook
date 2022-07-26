import bookSchema from "../service/book-service.js";
import connectDB from "../config/dbConnect.js";
import { MongoClient } from "mongodb";
import { faker } from "@faker-js/faker";
import { response } from "express";

async function createRandomBooks() {
  await connectDB();
  for (let i = 0; i < 15; ++i) {
    await bookSchema.create({
      coverUrl: faker.internet.domainName(),
      title: faker.company.companyName(),
      author: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      lengthInSeconds: Math.floor(Math.random() * 1000) + 1,
    });
  }
}
async function listBooks(request, response) {
  bookSchema.find({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      response.json(result);
    }
  });
}

export default listBooks;
