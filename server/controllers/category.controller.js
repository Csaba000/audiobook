import * as categoryService from "../service/category.service.js";

async function createCategory(request, response) {
  const newCategory = await categoryService.createCategory(request.body.genre);
  response.json(newCategory);
}

async function categoryLister(request, response) {
  const book = await categoryService.listCategories();
  response.json(book);
}

export { createCategory, categoryLister };
