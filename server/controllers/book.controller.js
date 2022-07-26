import bookSchema from "../models/book.model.js";

async function listBooks(request, response) {
  bookSchema.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.json(result);
    }
  });
}
export {listBooks}