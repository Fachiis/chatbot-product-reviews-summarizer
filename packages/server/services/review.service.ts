import { reviewRepository } from '../repositories/review.repository.ts';
import { llmClient } from '../llm/setup.ts';

export const reviewService = {
   summarizeReviews: async (productId: number): Promise<string> => {
      const existingSummary =
         await reviewRepository.getReviewSummary(productId);
      if (existingSummary) {
         return existingSummary;
      }

      const reviews = await reviewRepository.getReviews(productId, 10);
      const joinedReviews = reviews.map((r) => r.content).join('\n\n');

      const summary = await llmClient.summarizeReviews(joinedReviews);

      await reviewRepository.storeReviewSummary(productId, summary);

      return summary;
   },
};
