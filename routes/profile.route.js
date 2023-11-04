import { Router } from "express";
import { isAuthenticated } from "./index.js";
import {
  index,
  address,
  createValidation,
  createOrUpdate,
} from "../controllers/profile.controller.js";

const router = Router();

router.use(isAuthenticated);

router.get("/", index);

router.get("/address", address);
router.post("/address", createValidation, createOrUpdate);

export default router;
