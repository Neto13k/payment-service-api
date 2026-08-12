import * as couponController from "../controllers/couponController"; 
import { Router } from "express";
const router = Router();

router.post("/", couponController.createCoupon);
router.get("/", couponController.getAllCoupons);
router.get("/:id", couponController.getCouponById);
router.put("/:id", couponController.updateCoupon);
router.delete("/:id", couponController.deleteCoupon);

export default router;