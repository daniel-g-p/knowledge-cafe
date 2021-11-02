import { Router } from "express";

import { tryCatch } from "../utilities/error-handling.js";

import controller from "../controllers/account.js";

const router = Router();

router
  .route("/login")
  .get(tryCatch(controller.verifyLogin))
  .post(tryCatch(controller.login));

export default router;
