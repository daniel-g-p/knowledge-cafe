import { Router } from "express";

import { tryCatch } from "../middleware/errors.js";

import controller from "../controllers/account.js";
import { authorizeUser } from "../middleware/authorization.js";

const router = Router();

router.get("/login", tryCatch(controller.verifyLogin));
router.post("/login", tryCatch(controller.login));
router.get("/user", tryCatch(authorizeUser), tryCatch(controller.getUserData));
router.put("/user", tryCatch(controller.editUser));
router.post(
  "/change-password",
  tryCatch(authorizeUser),
  tryCatch(controller.changePassword)
);
router.get("/logout", tryCatch(controller.logout));

export default router;
