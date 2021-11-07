import { Router } from "express";

import { tryCatch } from "../utilities/error-handling.js";

import { authorizeUser } from "../utilities/authorization.js";

import controller from "../controllers/team.js";

const router = Router();

router.use(authorizeUser);

router.get("/", tryCatch(controller.getTeamMembers));

export default router;
