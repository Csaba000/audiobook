import bookRouter from "./book.router.js";
import userRouter from "./user.router.js";

export const initRouters = (app) => {
  app.use("/books", bookRouter);
  app.use("/users", userRouter);
};
