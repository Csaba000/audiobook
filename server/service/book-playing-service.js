import mongoose from 'mongoose';


const { Schema } = mongoose;
const BookPlayingSchema = new Schema({
user:[{ type: mongoose.Schema.Types.ObjectId,ref:'User'}],
book:[{type:mongoose.Schema.Types.ObjectId,ref:'Audio_Book'}]
})
const bookPlayingSchema = mongoose.model('Book_Playing', BookPlayingSchema);


export default bookPlayingSchema


