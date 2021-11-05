import { Router } from "express";

import { tryCatch } from "../utilities/error-handling.js";
import { authorizeUser } from "../utilities/authorization.js";

import controller from "../controllers/products.js";

const router = Router();

router.use(authorizeUser);

router.get("/", tryCatch(controller.getProducts));

export default router;
