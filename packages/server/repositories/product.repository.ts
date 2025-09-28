import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();
export const productRepository = {
   async getProductById(productId: number) {
      return prisma.product.findUnique({
         where: { id: productId },
      });
   },
};
