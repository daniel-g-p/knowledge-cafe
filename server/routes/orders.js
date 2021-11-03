import { application, Router } from "express";

import { tryCatch } from "../utilities/error-handling.js";
import { authorizeUser } from "../utilities/authorization.js";
import controller from "../controllers/orders.js";

const router = Router();

router.use(tryCatch(authorizeUser));

router.get("/pending", tryCatch(controller.getPendingOrders));

router.post("/complete/:orderId", tryCatch(controller.completeOrder));
router.post("/cancel/:orderId", tryCatch(controller.cancelOrder));

export default router;
