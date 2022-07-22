import bookSchema from '../service/book-service.js';

function getAudioBooks (req, res, next) {
    console.log(bookSchema.bookSchema)
}

export default getAudioBooks