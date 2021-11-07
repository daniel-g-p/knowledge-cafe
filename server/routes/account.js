import { Router } from "express";

import { tryCatch } from "../utilities/error-handling.js";

import controller from "../controllers/account.js";

const router = Router();

router.get("/login", tryCatch(controller.verifyLogin));
router.post("/login", tryCatch(controller.login));
router.get("/user", tryCatch(controller.getUserData));
router.put("/user", tryCatch(controller.editUser));

export default router;
