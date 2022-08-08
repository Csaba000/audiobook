import bookSchema from "../models/book.model.js";
import got from "got";
import * as fs from "fs";
import AWS from "aws-sdk";

async function listBooks(request, response) {
  return bookSchema.find({});
}

async function listBooksbyId(id) {
  return bookSchema.findById(id);
}

async function listBooksbyTitle(title) {
  return bookSchema.find({ title });
}

async function downloadAudio(url) {
  got.stream(url).pipe(fs.createWriteStream("test.mp3"));
}

async function playAudio(url) {
  const fileKey = `asprimaveras/${url}`;
  AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
  });

  const s3 = new AWS.S3();
  const options = {
    Bucket: "audio-books-bucket",
    Key: fileKey,
  };
  
  return { fileKey, s3, options };
}

export { listBooks, listBooksbyId, listBooksbyTitle, downloadAudio, playAudio };
