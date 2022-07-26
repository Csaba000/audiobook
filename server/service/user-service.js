import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
    userName: String,
  emailAddress: String,
  password: String,
});

const userSchema = mongoose.model("User", UserSchema);

export default userSchema;
