import { Router } from "express";

import { tryCatch } from "../utilities/error-handling.js";
import { authorizeUser } from "../utilities/authorization.js";
import controller from "../controllers/orders.js";

const router = Router();

router.get(
  "/pending",
  tryCatch(authorizeUser),
  tryCatch(controller.getPendingOrders)
);

export default router;
