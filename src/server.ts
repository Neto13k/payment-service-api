import dotenv from 'dotenv'
import express, { Request, Response } from 'express';
import categoryRoutes from './routes/categoryRoutes';
dotenv.config();

const app = express();
app.use(express.json());

app.use('/categories', categoryRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Olá do servidor TypeScript!');
});

app.listen({ port: parseInt(process.env.PORT || "3000") }, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});