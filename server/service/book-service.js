import mongoose, { isObjectIdOrHexString } from 'mongoose';
const { Schema } = mongoose;

const AudioBookSchema = new Schema({
    coverUrl:String,
    title:String,
    author:String,
    lengthInSeconds:Number
})
