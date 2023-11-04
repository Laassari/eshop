import { Router } from "express";
import { isAuthenticated } from "../index.js";
import { index, updateUserInfoValidation, updateUserInfo } from "../../controllers/profile.controller.js";
import addressRoutes from "./address.route.js";

const router = Router();

router.use(isAuthenticated);

router.get("/", index);
router.post("/", updateUserInfoValidation, updateUserInfo);

router.use("/address", addressRoutes);

export default router;
