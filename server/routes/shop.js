import { Router } from "express";

import { tryCatch } from "../utilities/error-handling.js";

import controller from "../controllers/shop.js";

const router = Router();

router.get("/", tryCatch(controller.getShopItems));

export default router;