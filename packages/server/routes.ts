import express, { type Request, type Response } from 'express';
import { chatController } from './controllers/chat.controller.ts';
import { reviewController } from './controllers/review.controller.ts';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   res.send('Hello World from the server!!');
});

router.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the API!' });
});

router.post('/api/chat', chatController.sendMessage);

router.get('/api/products/:id/reviews', reviewController.getReviews);
router.post(
   '/api/products/:id/reviews/summarize',
   reviewController.summarizeReviews
);

export default router;
