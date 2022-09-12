import bcrypt from "bcrypt";
import userSchema from "../models/user.model.js";
import jwt from "jsonwebtoken";
import * as bookService from "../service/book.service.js";
import jwt_decode from "jwt-decode";

const emailRegex =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

async function listUsersbyId(id) {
  return userSchema.findById(id);
}

async function register(email, password, username) {
  try {
    const userWithSameEmail = await userSchema.findOne({ email: email });
    if (userWithSameEmail) {
      throw new Error("User with this email already exists!");
    } else {
      await bcrypt.hash(password, 10).then((hashedPassword) => {
        const user = new userSchema({
          email: email,
          password: hashedPassword,
        });

        return user.save();
      });
    }
  } catch (e) {
    console.error('Something went wrong: ${e}');
  }
}

async function currentUser(email) {
  try {
    const user = await userSchema.findOne({ email });
    if (user) {
      return user.email;
    }
  } catch (err) {
    console.log(err);
  }
}

async function login(email, password) {
  try {
    const user = await userSchema.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY
      );
      console.log(user.email);
      return token;
    }
  } catch (err) {
    console.log(err);
  }
}

async function removeFromFavorites(email, id) {
  let message = "Audio book removed from favorites";
  const user = await userSchema.findOne({ email });
  if (user) {
    let fav = await bookService.listBooksbyId(id);
    for (let i = 0; i < user.favorites.length; ++i) {
      if (user.favorites[i]._id == id) {
        user.favorites.splice(user.favorites[i]);
        user.save();
        return message;
      }
      message = "cant find it in favorites";
      return message;
    }
    user.favorites.push(fav);
    user.save();
    return message;
  } else {
    message = "Couldnt remove from favorites ";
    return message;
  }
}

async function addToFavorites(email, id) {
  let message = "Audio book added to favorites";
  const user = await userSchema.findOne({ email });
  if (user) {
    let fav = await bookService.listBooksbyId(id);
    for (let i = 0; i < user.favorites.length; ++i) {
      if (user.favorites[i]._id == id) {
        message = "already added ";
        return message;
      }
    }
    user.favorites.push(fav);
    user.save();
    return message;
  } else {
    message = "Couldnt add to favorites ";
    return message;
  }
}

async function listFavorites(email) {
  const user = await userSchema.findOne({ email: email });
  if (user) {
    return user.favorites;
  }
}

async function changePassword(email, password, newPassword) {
  let message = "Password updated";
  const user = await userSchema.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    user.password = await bcrypt.hash(newPassword, 10);
    user.save();
    return message;
  } else {
    message = "Couldnt update password ";
    return message;
  }
}

async function changeEmail(email, password, newEmail) {
  let message = "Email updated";
  const user = await userSchema.findOne({ email });
  if (
    user &&
    (await bcrypt.compare(password, user.password)) &&
    isEmailValid(email)
  ) {
    user.email = newEmail;
    user.save();
    return message;
  } else {
    message = "Couldnt update email ";
    return message;
  }
}

function isEmailValid(email) {
  +86;
  if (!email) return false;

  if (email.length > 254) return false;

  let valid = emailRegex.test(email);
  if (!valid) return false;

  let parts = email.split("@");
  if (parts[0].length > 64) return false;

  let domainParts = parts[1].split(".");
  if (
    domainParts.some(function (part) {
      return part.length > 63;
    })
  )
    return false;

  return true;
}

async function tokenDecoder(auth) {
  var token = auth;
  var decoded = jwt_decode(token);
  return decoded.email;
}

export {
  register,
  login,
  listUsersbyId,
  changePassword,
  changeEmail,
  addToFavorites,
  removeFromFavorites,
  listFavorites,
  currentUser,
  tokenDecoder,
};
