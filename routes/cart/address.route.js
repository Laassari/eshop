import { Router } from "express";
import {
  index,
  createOrUpdateValidation,
  createOrUpdate,
} from "../../controllers/cartAddress.controller.js";

const router = Router();

router.get("/", index);
router.post("/", createOrUpdateValidation, createOrUpdate);

export default router;
