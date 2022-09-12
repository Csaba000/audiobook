import mongoose from "mongoose";

const { Schema } = mongoose;

const CategorySchema = new Schema({
  genre: String,
});

const categorySchema = mongoose.model("Category", CategorySchema);

export default categorySchema;
