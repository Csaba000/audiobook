import * as bookService from "../service/book.service.js";

async function bookLister(request, response) {
  if (!request.query.title && !request.query.category) {
    const book = await bookService.listBooks();
    response.json(book);
  }
  if (request.query.title) {
    const book = await bookService.listBooksbyTitle(request.query.title);
    response.json(book);
  }
  if (request.query.category) {
    const book = await bookService.listBooksbyCategory(request.query.category);
    response.json(book);
  }
}

async function bookListerById(request, response) {
  response.json(await bookService.listBooksbyId(request.params.id));
}

export { bookLister, bookListerById };
