import bookSchema from '../service/book-service.js';
import connectDB from '../config/dbConnect.js';
import { MongoClient } from "mongodb";

function getAudioBooks (req, res, next) {
    connectDB().
    dbo.collection("AudioBooks").findOne({}, function(err, result) {
        if (err) throw err;
        console.log(result.name);
        db.close();
      });
}

getAudioBooks()

export default getAudioBooks