import dotenv from 'dotenv'
import express, { Request, Response } from 'express';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Olá do servidor TypeScript!');
});

app.listen({ port: parseInt(process.env.PORT || "3000") }, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});