import bookSchema from "../models/book.model.js";

async function listBooks(request, response) {
  return bookSchema.find({});
}

async function listBooksbyId(id) {
  return bookSchema.findById(id);
}

async function listBooksbyTitle(title) {
  var regex = RegExp(".*" + title + ".*");
  return bookSchema.find({ title: regex });
}

async function listBooksbyCategory(category) {
  return bookSchema.find({ category: category });
}

export {
  listBooks,
  listBooksbyId,
  listBooksbyTitle,
  listBooksbyCategory,
};
