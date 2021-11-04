import { Router } from "express";

import { tryCatch } from "../utilities/error-handling.js";
import { authorizeUser } from "../utilities/authorization.js";
import controller from "../controllers/events.js";

const router = Router();

router.use(tryCatch(authorizeUser));

router.post("/open", controller.startEvent);
router.post("/close", controller.closeEvent);

export default router;
