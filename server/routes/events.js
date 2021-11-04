import { Router } from "express";

import { tryCatch } from "../utilities/error-handling.js";
import { authorizeUser } from "../utilities/authorization.js";
import controller from "../controllers/events.js";

const router = Router();

router.use(authorizeUser);

router.get("/", tryCatch(controller.getEvents));
router.post("/open", tryCatch(controller.startEvent));
router.post("/close", tryCatch(controller.closeEvent));

export default router;
