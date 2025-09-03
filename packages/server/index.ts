import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World from the server!!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});