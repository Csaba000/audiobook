import mongoose from "mongoose";

const { Schema } = mongoose;
const TimeStampSchema = new Schema({
  time: Number,
  book: [{ type: mongoose.Schema.Types.ObjectId, ref: "Audio_Book" }],
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
const timeStampSchema = mongoose.model("Time_Stamp", TimeStampSchema);

export default timeStampSchema;
