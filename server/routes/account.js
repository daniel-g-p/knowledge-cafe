import { Router } from "express";

import { tryCatch } from "../utilities/error-handling.js";

import controller from "../controllers/account.js";

const router = Router();

router.post("/login", tryCatch(controller.login));

export default router;
