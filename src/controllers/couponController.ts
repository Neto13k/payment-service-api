import { Request, Response } from 'express';
import * as couponService from '../services/couponService';

const createCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
        const coupon = req.body;
        const newCoupon = await couponService.createCoupon(coupon);
        res.status(201).json({ message: 'Cupom criado com sucesso', coupon: newCoupon });
    } catch (error) {
        console.error('Erro ao criar cupom:', error);
        res.status(500).json({ error: 'Erro ao criar cupom' });
    }
};

const getAllCoupons = async (req: Request, res: Response): Promise<void> => {
    try {
        const coupons = await couponService.getAllCoupons();
        res.status(200).json({ message: 'Cupons encontrados com sucesso', coupons });
    } catch (error) {
        console.error('Erro ao buscar cupons:', error);
        res.status(500).json({ error: 'Erro ao buscar cupons' });
    }
};

const getCouponById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const coupon = await couponService.getCouponById(id);
        if (coupon) {
            res.status(200).json({ message: 'Cupom encontrado com sucesso', coupon });
        } else {
            res.status(404).json({ error: 'Cupom não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar cupom por ID:', error);
        res.status(500).json({ error: 'Erro ao buscar cupom por ID' });
    }
};

const updateCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const coupon = req.body;
        const updatedCoupon = await couponService.updateCoupon(id, coupon);
        if (updatedCoupon) {
            res.status(200).json({ message: 'Cupom atualizado com sucesso', coupon: updatedCoupon });
        } else {
            res.status(404).json({ error: 'Cupom não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar cupom:', error);
        res.status(500).json({ error: 'Erro ao atualizar cupom' });
    }
};

const deleteCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const deleted = await couponService.deleteCoupon(id);
        if (deleted) {
            res.status(200).json({ message: 'Cupom deletado com sucesso' });
        } else {
            res.status(404).json({ error: 'Cupom não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao deletar cupom:', error);
        res.status(500).json({ error: 'Erro ao deletar cupom' });
    }
};

export { createCoupon, getAllCoupons, getCouponById, updateCoupon, deleteCoupon };