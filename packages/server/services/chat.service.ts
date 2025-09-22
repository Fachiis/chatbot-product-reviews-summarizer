import { ConversationRepository } from '../repositories/conversation.repository.ts';
import OpenAI from 'openai';
import * as fs from 'node:fs';
import * as path from 'node:path';
import template from '../prompts/chatbox.txt';

// A service is a layer in the repository pattern that contains business logic
// and interacts with external systems or APIs.
// Services are responsible for processing data, applying business rules,
// and coordinating interactions between different parts of the application.

// Implementation details
const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
   'utf-8'
); // Read the park information from a markdown file on the filesystem
const instructions = template.replace('{{PARK_INFO}}', parkInfo); // Inject the park information into the prompt template and it is loaded only once when the service is initialized

// With this interface, we can easily extend the response structure in the future
// without changing the function signature.
interface ChatResponse {
   id: string;
   message: string;
}

// Exporting the public API/Interface
export const chatService = {
   async getChatResponse(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         input: prompt,
         instructions,
         temperature: 0.2,
         max_output_tokens: 300,
         previous_response_id:
            ConversationRepository.getLastResponseId(conversationId),
      });

      ConversationRepository.setLastResponseId(conversationId, response.id);

      return {
         id: response.id,
         message: response.output_text,
      };
   },
};
