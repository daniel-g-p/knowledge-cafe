import { Router } from "express";

import { tryCatch } from "../middleware/errors.js";

import { authorizeUser } from "../middleware/authorization.js";

import controller from "../controllers/team.js";

const router = Router();

router.use(tryCatch(authorizeUser));

router.get("/", tryCatch(controller.getTeamMembers));
router.post("/", tryCatch(controller.newUser));
router.put("/set-role/:userId", tryCatch(controller.setRole));
router.delete("/:userId", tryCatch(controller.deleteMember));

export default router;
