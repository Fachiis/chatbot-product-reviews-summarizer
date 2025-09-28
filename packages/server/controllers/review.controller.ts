import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service.ts';
import { productRepository } from '../repositories/product.repository.ts';
import { reviewRepository } from '../repositories/review.repository.ts';

export const reviewController = {
   async getReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);

      if (isNaN(productId)) {
         return res.status(400).json({ error: 'Invalid product ID' });
      }

      const product = await productRepository.getProductById(productId);
      if (!product) {
         return res.status(404).json({ error: 'Product does not exist' });
      }

      const reviews = await reviewRepository.getReviews(productId);
      const summary = await reviewRepository.getReviewSummary(productId);

      res.json({
         summary,
         reviews,
      });
   },

   async summarizeReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);

      if (isNaN(productId)) {
         return res.status(400).json({ error: 'Invalid product ID' });
      }

      const product = await productRepository.getProductById(productId);
      if (!product) {
         return res.status(404).json({ error: 'Product does not exist' });
      }

      const reviews = await reviewRepository.getReviews(productId, 1);
      if (reviews.length === 0) {
         return res
            .status(400)
            .json({ error: 'No reviews found to summarize' });
      }

      const summary = await reviewService.summarizeReviews(productId);

      res.json({ summary });
   },
};
