import {
  listBooks,
  listBooksbyId,
  listBooksbyTitle,
} from "../service/book.service.js";

async function bookLister(request, response) {
  if (!request.query.title) {
    const book = await listBooks();
    response.json(book);
  } else {
    const book = await listBooksbyTitle(request.query.title);
    response.json(book);
  }
}
async function bookListerById(request, response) {
  const book = await listBooksbyId(request.params.id);
  response.json(book);
}

export { bookLister, bookListerById };
