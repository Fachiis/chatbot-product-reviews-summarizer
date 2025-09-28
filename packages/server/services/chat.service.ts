import { ConversationRepository } from '../repositories/conversation.repository.ts';
import * as fs from 'node:fs';
import * as path from 'node:path';
import template from '../llm/prompts/chatbox.txt';
import { llmClient } from '../llm/setup.ts';

// A service is a layer in the repository pattern that contains business logic
// and interacts with external systems or APIs.
// Services are responsible for processing data, applying business rules,
// and coordinating interactions between different parts of the application.

// Implementation details
const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'llm', 'prompts', 'WonderWorld.md'),
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
      const response = await llmClient.generateText({
         model: 'gpt-4o-mini',
         prompt,
         instructions,
         temperature: 0.2,
         maxOutputTokens: 300,
         previousResponseId:
            ConversationRepository.getLastResponseId(conversationId),
      });

      ConversationRepository.setLastResponseId(conversationId, response.id);

      return {
         id: response.id,
         message: response.text,
      };
   },
};
