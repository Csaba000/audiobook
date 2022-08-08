import express from "express";
import * as userController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:id", userController.userListerById);
router.post("/login", userController.login);
router.post("/register", userController.register);

export default router;

//     // save the new user
//     user
//       .save()
//       // return success if the new user is added to the database successfully
//       .then((result) => {
//         response.status(201).send({
//           message: "User Created Successfully",
//           result,
//         });
//       })
//       // catch error if the new user wasn't added successfully to the database
//       .catch((error) => {
//         response.status(500).send({
//           message: "Error creating user",
//           error,
//         });
//       });
//   });
//   // catch error if the password hash isn't successful
//   //   .catch((e) => {
//   //     response.status(500).send({
//   //       message: "Password was not hashed successfully",
//   //       e,
//   //     });
//   //   });
// });

export default router;
