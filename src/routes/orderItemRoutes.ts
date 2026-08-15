import * as orderItemController from "../controllers/orderItemController";
import { Router } from "express";
const router = Router();

router.post("/", orderItemController.createOrderItem);
router.get("/", orderItemController.getAllOrderItems);
router.get("/:orderId", orderItemController.getOrderItemsByOrderId);
router.put("/:id", orderItemController.updateOrderItem);
router.delete("/:id", orderItemController.deleteOrderItem);

export default router;