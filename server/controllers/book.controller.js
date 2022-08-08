import * as bookService from "../service/book.service.js";

async function downloadAudio(request, response) {
  bookService.downloadAudio(request.query.url);
  response.json("download ready");
}

async function playAudio(request, response) {
  const serviceVariables = bookService.playAudio(request.query.url);
  const fileKey = (await serviceVariables).fileKey;
  const s3 = (await serviceVariables).s3;
  const options = (await serviceVariables).options;

  response.attachment(fileKey);
  const fileStream = s3.getObject(options).createReadStream();
  fileStream.pipe(response);
}

async function bookLister(request, response) {
  if (!request.query.title) {
    const book = await bookService.listBooks();
    response.json(book);
  }
  const book = await bookService.listBooksbyTitle(request.query.title);

  response.json(book);
}

async function bookListerById(request, response) {
  response.json(await bookService.listBooksbyId(request.params.id));
}

export { bookLister, bookListerById, downloadAudio, playAudio };
