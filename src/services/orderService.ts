import pool from "../db/db";
import { Order, CreateOrderInput } from "../types/index";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

async function getAllOrders(): Promise<Order[]> {
  try {
    const result = await pool.query("SELECT * FROM orders");
    return result.rows;
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    throw error;
  }
}

async function getOrderById(id: number): Promise<Order | null> {
  try {
    const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Erro ao buscar pedido por ID:", error);
    throw error;
  }
}

async function createOrder(
  input: CreateOrderInput,
): Promise<{ order: Order; checkoutUrl: string | null }> {
  try {
    const orderItems = [];
    let subtotal = 0;

    for (const item of input.items) {
      const productResult = await pool.query(
        "SELECT * FROM products WHERE id = $1",
        [item.product_id],
      );
      const product = productResult.rows[0];

      const unit_price = product.price;
      const total_price = unit_price * item.quantity;
      subtotal += total_price;

      orderItems.push({
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price,
        total_price,
      });
    }
    let discount = 0;

    const total = subtotal - discount;
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
      line_items: [
        {
          price_data: {
            currency: "brl",
            unit_amount: Math.round(total * 100),
            product_data: {
              name: "Order Payment",
            },
          },
          quantity: 1,
        },
      ],
    });
    const stripe_session_id = stripeSession.id;
    const result = await pool.query(
      "INSERT INTO orders (customer_id, coupon_id, status, subtotal, discount, total, stripe_session_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        input.customer_id,
        input.coupon_id,
        "pending",
        subtotal,
        discount,
        total,
        stripe_session_id,
      ],
    );

    for (const item of orderItems) {
      await pool.query(
        "INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) VALUES ($1, $2, $3, $4, $5)",
        [
          result.rows[0].id,
          item.product_id,
          item.quantity,
          item.unit_price,
          item.total_price,
        ],
      );
    }
    return { order: result.rows[0], checkoutUrl: stripeSession.url };
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    throw error;
  }
}

async function updateOrder(id: number, order: Order): Promise<Order | null> {
  try {
    const result = await pool.query(
      "UPDATE orders SET customer_id = $1, coupon_id = $2, status = $3, subtotal = $4, discount = $5, total = $6, stripe_session_id = $7 WHERE id = $8 RETURNING *",
      [
        order.customer_id,
        order.coupon_id,
        order.status,
        order.subtotal,
        order.discount,
        order.total,
        order.stripe_session_id,
        id,
      ],
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    throw error;
  }
}

async function deleteOrder(id: number): Promise<boolean> {
  try {
    const result = await pool.query("DELETE FROM orders WHERE id = $1", [id]);
    return (result.rowCount ?? 0) > 0;
  } catch (error) {
    console.error("Erro ao deletar pedido:", error);
    throw error;
  }
}

export { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder };
