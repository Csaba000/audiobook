import * as userService from "../service/user.service.js";

async function userListerById(request, response) {
  response.json(await userService.listUsersbyId(request.params.id));
}

async function register(request, response) {
  const newUser = await userService.register(
    request.body.email,
    request.body.password
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
async function addToFavorites(request, response) {
  response
    .status(200)
    .json(
      await userService.addToFavorites(
        await userService.tokenDecoder(request.headers.authorization),
        request.body.id
      )
    );
}
async function removeFromFavorites(request, response) {
  response
    .status(200)
    .json(
      await userService.removeFromFavorites(
        await userService.tokenDecoder(request.headers.authorization),
        request.body.id
      )
    );
}

async function currentUser(request, response) {
  response
    .status(200)
    .json(
      await userService.currentUser(
        await userService.tokenDecoder(request.headers.authorization)
      )
    );
}

async function listFavorites(request, response) {
  response
    .status(200)
    .json(
      await userService.listFavorites(
        await userService.tokenDecoder(request.headers.authorization)
      )
    );
}

async function changePassword(request, response) {
  response
    .status(200)
    .json(
      await userService.changePassword(
        request.body.email,
        request.body.password,
        request.body.newPassword
      )
    );
}

async function changeEmail(request, response) {
  response
    .status(200)
    .json(
      await userService.changeEmail(
        request.body.email,
        request.body.password,
        request.body.newEmail
      )
    );
}

export {
  register,
  login,
  userListerById,
  changePassword,
  changeEmail,
  addToFavorites,
  removeFromFavorites,
  listFavorites,
  currentUser,
};
