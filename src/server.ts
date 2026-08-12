import dotenv from 'dotenv'
import express, { Request, Response } from 'express';
import categoryRoutes from './routes/categoryRoutes';
import customerRoutes from './routes/customerRoutes';
import productRoutes from './routes/productRoutes';
import couponRoutes from './routes/couponRoutes';
dotenv.config();

const app = express();
app.use(express.json());

app.use('/categories', categoryRoutes); // Adicionando as rotas de categorias
app.use('/customers', customerRoutes); // Adicionando as rotas de clientes
app.use('/products', productRoutes); // Adicionando as rotas de produtos
app.use('/coupons', couponRoutes); // Adicionando as rotas de cupons

app.get('/', (req: Request, res: Response) => {
  res.send('Olá do servidor TypeScript!');
});

app.listen({ port: parseInt(process.env.PORT || "3000") }, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});