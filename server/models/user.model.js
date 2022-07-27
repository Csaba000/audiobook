import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  userName: String,
  emailAddress: String,
  password: String,
});

const userSchema = mongoose.model("User", UserSchema);

export default userSchema;

