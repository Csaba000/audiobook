import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";

const preUri = process.env.MONGODB_PREURI;
const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const connectionString = process.env.MONGODB_CONNECTION_STRING;

const uri = `mongodb+srv://kapusilorand:95rZaDPt6YkDmTm@audiobooks.yynaz.mongodb.net/AudioBooks?retryWrites=true&w=majority`;
//${preUri}${user}:${password}${connectionString}
const connectDB = async () => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("open", async function (ref) {
    console.log("Connected to mongo server.");
  });
  try {
  } catch (e) {
    console.error(e);
  }
};
export default connectDB;
