import connectDB from '../config/dbConnect.js';
import mongoose from 'mongoose';

connectDB();
const { Schema } = mongoose;
const AudioBookSchema = new Schema({
    coverUrl:String,
    title:String,
    author:String,
    description:String,
    lengthInSeconds:Number
})
const bookSchema = mongoose.model('profile', AudioBookSchema);


export default bookSchema


