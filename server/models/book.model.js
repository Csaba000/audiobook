import mongoose from "mongoose";

const { Schema } = mongoose;

const AudioBookSchema = new Schema({
  url: String,
  title: String,
  author: String,
  description: String,
  lengthInSeconds: Number,
  category: String,
});
const bookSchema = mongoose.model("Audio_Book", AudioBookSchema);

export default bookSchema;
