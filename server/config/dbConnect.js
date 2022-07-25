import mongoose from 'mongoose';
import * as dotenv from 'dotenv' 
dotenv.config({ path: '../.env'})
import express from 'express'

const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const connectionString= process.env.MONGODB_CONNECTION_STRING;
console.log(connectionString)
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${user}:${password}${connectionString}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB connected!!');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
};
export default connectDB