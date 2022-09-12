import categorySchema from "../models/category.model.js";

async function createCategory(genre) {
  try {
    if (await categorySchema.findOne({ genre: genre })) {
      throw new Error("This category already exists!");
    }
    await new categorySchema({
      genre: genre,
    }).save();
  } catch (e) {
    console.error(`Something went wrong: ${e}`);
  }
}
async function listCategories() {
  return categorySchema.find({});
}

export { createCategory, listCategories };
