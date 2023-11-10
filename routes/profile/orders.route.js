import { Router } from "express";
import {
  indexForUser
} from "../../controllers/order.controller.js";

const router = Router();

router.get("/", indexForUser);

export default router;
