import { Router } from "express";
import {
  index,
  processCartValidtion,
  processCart,
} from "../../controllers/cartPayment.controller.js";

const router = Router();

router.get("/", index);
router.post("/", processCartValidtion, processCart);

export default router;
