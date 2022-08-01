import userSchema from "../models/user.model.js";
import * as userService from "../service/user.service.js";

async function userListerById(request, response) {
  const book = await userService.listUsersbyId(request.params.id);
  response.json(book);
}

async function register(request, response) {
  const newUser = await userService.register(
    request.body.email,
    request.body.password,
  );
  response.json(newUser);
}
async function login(request, response) {
  const token = await userService.login(
    request.body.email,
    request.body.password
  );
  response.status(200).json({ access_token: token });
}

export { register, login, userListerById };
