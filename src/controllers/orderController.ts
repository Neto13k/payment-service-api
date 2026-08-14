import { Request, Response } from "express";
import * as orderService from "../services/orderService";

const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = req.body;
        const createdOrder = await orderService.createOrder(order);
        res.status(201).json({ message: "Ordem criada com sucesso", data: createdOrder, checkoutUrl: createdOrder.checkoutUrl });
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar ordem" });
    }
};

const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json({ message: "Ordens encontradas com sucesso", data: orders });
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar ordens" });
    }
};

const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const order = await orderService.getOrderById(id);
        if (!order) {
            res.status(404).json({ error: "Ordem não encontrada" });
            return;
        }
        res.status(200).json({ message: "Ordem encontrada com sucesso", data: order });
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar ordem" });
    }
};

const updateOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const order = req.body;
        const updatedOrder = await orderService.updateOrder(id, order);
        if (!updatedOrder) {
            res.status(404).json({ error: "Ordem não encontrada" });
            return;
        }
        res.status(200).json({ message: "Ordem atualizada com sucesso", data: updatedOrder });
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar ordem" });
    }
};

const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const deletedOrder = await orderService.deleteOrder(id);
        if (!deletedOrder) {
            res.status(404).json({ error: "Ordem não encontrada" });
            return;
        }
        res.status(200).json({ message: "Ordem excluída com sucesso", data: deletedOrder });
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir ordem" });
    }
};

export { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder };