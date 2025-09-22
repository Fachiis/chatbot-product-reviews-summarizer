import type { Request, Response } from 'express';
import { z } from 'zod';
import { chatService } from '../services/chat.service.ts';

// A controller is a layer in the repository pattern that handles incoming requests,
// processes them (often with the help of services), and returns responses.
// Controllers are responsible for handling HTTP requests and responses,
// validating input, and orchestrating the flow of data between the client and the service layer.

// Implementation details
const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required')
      .max(1000, 'Prompt is too long (max 1000 characters)'),
   conversationId: z.uuid(),
});

// Exporting the public API/Interface
export const chatController = {
   async sendMessage(req: Request, res: Response) {
      const parseResult = chatSchema.safeParse(req.body);
      if (!parseResult.success) {
         return res.status(400).json(z.treeifyError(parseResult.error));
      }

      try {
         const { prompt, conversationId } = req.body;

         const response = await chatService.getChatResponse(
            prompt,
            conversationId
         );

         res.json({ message: response.message });
      } catch (e) {
         res.status(500).json({ error: 'Failed to generate a response.' });
      }
   },
};
