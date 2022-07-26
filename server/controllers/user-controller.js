import userSchema from "../models/user-model.js";

async function createUser(request, res) {
  await userSchema.create({
    userName: request.body.userName,
    emailAddress: request.body.emailAddress,
    password: request.body.password,
  });
}

export default createUser;
