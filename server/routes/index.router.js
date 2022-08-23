import bookRouter from "./book.router.js";
import userRouter from "./user.router.js";
import categoryRouter from "./category.router.js";
import * as auth from "../middleware/auth.js";

export const initRouters = (app) => {
  app.use("/books", auth.verifyToken, bookRouter);
  app.use("/users", userRouter);
  app.use("/category", auth.verifyToken, categoryRouter);
};
