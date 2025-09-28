import { PrismaClient, type Review } from '../generated/prisma';
import dayjs from 'dayjs';

const prisma = new PrismaClient();
export const reviewRepository = {
   getReviews: async (productId: number, limit?: number): Promise<Review[]> => {
      return prisma.review.findMany({
         where: { productId },
         orderBy: { createdAt: 'desc' },
         take: limit,
      });
   },

   getReviewSummary: async (productId: number): Promise<string | null> => {
      const summary = await prisma.summary.findFirst({
         where: {
            AND: {
               productId,
               expiresAt: {
                  gt: new Date(),
               },
            }, // Find non-expired summary for the product. Chained with AND clause
         },
      });

      return summary ? summary.content : null;
   },

   storeReviewSummary: async (
      productId: number,
      summary: string
   ): Promise<void> => {
      const now = new Date();
      const expiresAt = dayjs().add(7, 'days').toDate();

      const data = {
         productId,
         content: summary,
         expiresAt: expiresAt,
         generatedAt: now,
      };

      await prisma.summary.upsert({
         where: { productId },
         create: data,
         update: data,
      });
   },
};
