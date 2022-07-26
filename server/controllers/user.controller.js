import userSchema from "../models/user.model.js";

const createUser = async (request, response) => {
  await userSchema.create({
    userName: request.body.userName,
    emailAddress: request.body.emailAddress,
    password: request.body.password,
  });
}

const login = async (request, response) => {
  console.log("TODO: Implement login")
}

export {
  createUser,
  login,
}
