import { Router } from "express";
import { index } from "../controllers/products.controller.js";

const router = Router();

router.get("/", index);

export default router;
