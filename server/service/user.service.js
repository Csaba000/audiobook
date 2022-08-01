import bcrypt from "bcrypt";
import userSchema from "../models/user.model.js";
import jwt from "jsonwebtoken";

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
          username: username,
        });

        return user.save();
      });
    }
  } catch (e) {
    console.error(`Something went wrong: ${e}`);
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
      return token;
    }
  } catch (err) {
    console.log(err);
  }
}

export { register, login, listUsersbyId };
