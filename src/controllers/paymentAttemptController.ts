import { Request, Response } from 'express';
import * as paymentAttemptService from '../services/paymentAttemptService';

const createPaymentAttempt = async (req: Request, res: Response): Promise<void> => {
    try {
        const paymentAttempt = req.body;
        const newPaymentAttempt = await paymentAttemptService.createPaymentAttempt(paymentAttempt);
        res.status(201).json({ message: 'Tentativa de pagamento criada com sucesso', paymentAttempt: newPaymentAttempt });
    } catch (error) {
        console.error('Erro ao criar tentativa de pagamento:', error);
        res.status(500).json({ error: 'Erro ao criar tentativa de pagamento' });
    }
};

const getAllPaymentAttempts = async (req: Request, res: Response): Promise<void> => {
    try {
        const paymentAttempts = await paymentAttemptService.getAllPaymentAttempts();
        res.status(200).json({ message: 'Tentativas de pagamento encontradas com sucesso', paymentAttempts });
    } catch (error) {
        console.error('Erro ao buscar tentativas de pagamento:', error);
        res.status(500).json({ error: 'Erro ao buscar tentativas de pagamento' });
    }
};

const getPaymentAttemptById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const paymentAttempt = await paymentAttemptService.getPaymentAttemptById(id);
        if (paymentAttempt) {
            res.status(200).json({ message: 'Tentativa de pagamento encontrada com sucesso', paymentAttempt });
        }
        else {
            res.status(404).json({ error: 'Tentativa de pagamento não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao buscar tentativa de pagamento por ID:', error);
        res.status(500).json({ error: 'Erro ao buscar tentativa de pagamento por ID' });
    }
};

const updatePaymentAttempt = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const paymentAttempt = req.body;
        const updatedPaymentAttempt = await paymentAttemptService.updatePaymentAttempt(id, paymentAttempt);
        if (updatedPaymentAttempt) {
            res.status(200).json({ message: 'Tentativa de pagamento atualizada com sucesso', paymentAttempt: updatedPaymentAttempt });
        }
        else {
            res.status(404).json({ error: 'Tentativa de pagamento não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao atualizar tentativa de pagamento:', error);
        res.status(500).json({ error: 'Erro ao atualizar tentativa de pagamento' });
    }
};

const deletePaymentAttempt = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const deleted = await paymentAttemptService.deletePaymentAttempt(id);
        if (deleted) {
            res.status(200).json({ message: 'Tentativa de pagamento deletada com sucesso' });
        }
        else {
            res.status(404).json({ error: 'Tentativa de pagamento não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao deletar tentativa de pagamento:', error);
        res.status(500).json({ error: 'Erro ao deletar tentativa de pagamento' });
    }
};

export { createPaymentAttempt, getAllPaymentAttempts, getPaymentAttemptById, updatePaymentAttempt, deletePaymentAttempt };