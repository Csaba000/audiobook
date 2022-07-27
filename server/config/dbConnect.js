import mongoose from "mongoose";

const connectionString = process.env.MONGODB_CONNECTION_STRING;

const connectDB = async () => {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("open", async function (ref) {
    console.log("Connected to mongo server.");
  });
  try {
  } catch (e) {
    console.error(e);
  }
};
export default connectDB;
