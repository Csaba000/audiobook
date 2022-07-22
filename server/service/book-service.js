import connectDB from '../config/dbConnect';

connectDB();
//var db = mongoose.connect('mongodb+srv://kapusilorand:95rZaDPt6YkDmTm@audiobooks.yynaz.mongodb.net/?retryWrites=true&w=majority');
const { Schema } = mongoose;
const AudioBookSchema = new Schema({
    coverUrl:String,
    title:String,
    author:String,
    description:String,
    lengthInSeconds:Number
})
const bookSchema = mongoose.model('profile', AudioBookSchema);
console.log(bookSchema)
//console.log(mongoose.connection.readyState);


export default bookSchema


