import bookSchema from "../models/book.model.js";

async function listBooks(request, response) {
  return bookSchema.find({});
}
async function listBooksbyId(id) {
  return bookSchema.findById(id);
}
async function listBooksbyTitle(title) {
  return bookSchema.find({ title: title });
}

export { listBooks, listBooksbyId, listBooksbyTitle };
