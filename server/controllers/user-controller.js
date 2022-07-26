import userSchema from "../service/user-service.js";
import connectDB from "../config/dbConnect.js";
import { request } from "express";

const userName = req.body.username;
const emailAddress = req.body.email;
const password = req.body.password;

async function createUser(request,res) {
  await connectDB();
  await userSchema.create({
    userName: request.body.userName,
    emailAddress:request.body.emailAddress ,
    password: request.body.password,
  });
}

export default createUser;

