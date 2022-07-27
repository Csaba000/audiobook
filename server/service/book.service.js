import bookSchema from "../models/book.model.js";

async function listBooks(request, response) {
  return bookSchema.find({});
}
async function listBooksbyId(id) {
  return bookSchema.findById(id);
}
async function listBooksbyTitle(_title) {
  return bookSchema.find({ title: _title });
}

export { listBooks, listBooksbyId, listBooksbyTitle };
