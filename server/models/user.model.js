import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: String,
  password: String,
});

const userSchema = mongoose.model("User", UserSchema);

export default userSchema;
