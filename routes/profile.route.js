import { Router } from "express";
import { isAuthenticated } from "./index.js";
import { index, createValidation, create } from "../controllers/profile.controller.js";

const router = Router();

router.use(isAuthenticated);

router.get("/", index);

router.post("/address", createValidation, create);

export default router;
