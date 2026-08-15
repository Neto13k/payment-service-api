import * as paymentAttemptController from '../controllers/paymentAttemptController';
import { Router } from 'express';
const router = Router();

router.post('/', paymentAttemptController.createPaymentAttempt);
router.get('/', paymentAttemptController.getAllPaymentAttempts);
router.get('/:id', paymentAttemptController.getPaymentAttemptById);
router.put('/:id', paymentAttemptController.updatePaymentAttempt);
router.delete('/:id', paymentAttemptController.deletePaymentAttempt);

export default router;