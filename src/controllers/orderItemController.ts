import { Request, Response } from "express";
import * as orderItemService from "../services/orderItemService";

const createOrderItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderItem = req.body;
        const createdOrderItem = await orderItemService.createOrderItem(orderItem);
        res.status(201).json({ message: "Item de pedido criado com sucesso", data: createdOrderItem });
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar item de pedido" });
    }
};

const getAllOrderItems = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderItems = await orderItemService.getAllOrderItems();
        res.status(200).json({ message: "Itens de pedido encontrados com sucesso", data: orderItems });
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar itens de pedido" });
    }
};

const getOrderItemsByOrderId = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderId = parseInt(req.params.orderId as string, 10);
        const orderItems = await orderItemService.getOrderItemsByOrderId(orderId);
        res.status(200).json({ message: "Itens de pedido encontrados com sucesso", data: orderItems });
    }   catch (error) {
        res.status(500).json({ error: "Erro ao buscar itens de pedido" });
    }
};

const updateOrderItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const orderItem = req.body;
        const updatedOrderItem = await orderItemService.updateOrderItem(id, orderItem);
        if (!updatedOrderItem) {
            res.status(404).json({ error: "Item de pedido não encontrado" });
            return;
        }
        res.status(200).json({ message: "Item de pedido atualizado com sucesso", data: updatedOrderItem });
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar item de pedido" });
    }
};

const deleteOrderItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const deleted = await orderItemService.deleteOrderItem(id);
        if (!deleted) {
            res.status(404).json({ error: "Item de pedido não encontrado" });
            return;
        }
        res.status(200).json({ message: "Item de pedido deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar item de pedido" });
    }
};

export { createOrderItem, getAllOrderItems, getOrderItemsByOrderId, updateOrderItem, deleteOrderItem };