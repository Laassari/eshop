import { Router } from "express";
import { index, show, destroy, create } from "../controllers/products.controller.js";
import Product from "../models/Product.js";

const router = Router();

router.get("/", index);

router.get("/:id([0-9]+)", show);

router.delete("/:id([0-9]+)", destroy);

router.post("/", create);

export default router;
