import mongoose from 'mongoose';


const { Schema } = mongoose;
const AudioBookSchema = new Schema({
    coverUrl:String,
    title:String,
    author:String,
    description:String,
    lengthInSeconds:Number
})
const bookSchema = mongoose.model('Audio_Book', AudioBookSchema);


export default bookSchema


