import { Request, Response } from 'express';
import pool from '../db/db';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

async function handleStripeWebhook(req: Request, res: Response): Promise<void> {
  const sig = req.headers['stripe-signature'];
  
    if (!sig) {
      res.status(400).send('Faltando o cabeçalho stripe-signature.');
      return;
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err: any) {
      console.error(`Erro na assinatura do webhook: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    switch (event.type) {        
case 'checkout.session.completed':
    const session = event.data.object as Stripe.Checkout.Session;
    try {
        await pool.query(
            "UPDATE orders SET status = 'paid' WHERE stripe_session_id = $1",
            [session.id]
        );
        console.log(`Sessão de checkout concluída: ${session.id}`);
    } catch (dbError) {
        console.error('Erro ao atualizar pedido no banco:', dbError);
    }
    break;

      default:
        console.log(`Evento não tratado: ${event.type}`);
    }
    res.status(200).json({ received: true });
  } 

export { handleStripeWebhook };