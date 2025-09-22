import express from 'express';
import dotenv from 'dotenv';
import router from './routes.ts';

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(router); // Use the imported routes

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Server is running at http://localhost:${PORT}`);
});
