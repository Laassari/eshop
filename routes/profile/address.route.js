import { Router } from "express";
import {
  address,
  createOrUpdateValidation,
  createOrUpdate,
} from "../../controllers/address.controller.js";

const router = Router();

router.get("/", address);
router.post("/", createOrUpdateValidation, createOrUpdate);

export default router;
