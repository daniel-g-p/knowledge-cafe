import { Router } from "express";

import { tryCatch } from "../middleware/errors.js";

import { authorizeUser, authorizeAdmin } from "../middleware/authorization.js";

import controller from "../controllers/team.js";

const router = Router();

router.use(tryCatch(authorizeUser));

router.get("/", tryCatch(authorizeUser), tryCatch(controller.getTeamMembers));
router.post("/", tryCatch(authorizeAdmin), tryCatch(controller.newUser));
router.put(
  "/set-role/:userId",
  tryCatch(authorizeAdmin),
  tryCatch(controller.setRole)
);
router.delete(
  "/:userId",
  tryCatch(authorizeAdmin),
  tryCatch(controller.deleteMember)
);

export default router;
