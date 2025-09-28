import OpenAI from 'openai';
import { InferenceClient } from '@huggingface/inference';
import summaryPrompt from './prompts/reviews.txt';
import { Ollama } from 'ollama';

const openAIClient = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

const inferenceClient = new InferenceClient(process.env.HF_TOKEN);

const ollamaClient = new Ollama(); // With this library, no need to set API key or URL, it uses the local Ollama installation and runs the model locally without the need of an API key or internet connection

type GenerateTextParams = {
   model?: string;
   prompt: string;
   temperature?: number;
   maxOutputTokens?: number;
   instructions?: string;
   previousResponseId?: string;
};

type GenerateTextResponse = {
   id: string;
   text: string;
};

export const llmClient = {
   async generateText({
      prompt,
      instructions,
      previousResponseId,
      model = 'gpt-4.1',
      temperature = 0.2,
      maxOutputTokens = 300,
   }: GenerateTextParams): Promise<GenerateTextResponse> {
      const response = await openAIClient.responses.create({
         model,
         temperature,
         instructions,
         input: prompt,
         max_output_tokens: maxOutputTokens,
         previous_response_id: previousResponseId,
      });

      return {
         id: response.id,
         text: response.output_text,
      };
   },

   // async summarizeReviews(reviews: string): Promise<string> {
   //    const chatCompletion = await inferenceClient.chatCompletion({
   //       provider: 'nebius',
   //       model: 'meta-llama/Llama-3.1-8B-Instruct',
   //       messages: [
   //          {
   //             role: 'system',
   //             content: summaryPrompt,
   //          },
   //          {
   //             role: 'user',
   //             content: reviews,
   //          },
   //       ],
   //    });
   //
   //    return chatCompletion?.choices[0]?.message?.content ?? '';
   // },

   async summarizeReviews(reviews: string): Promise<string> {
      const response = await ollamaClient.chat({
         model: 'tinyllama',
         messages: [
            {
               role: 'system',
               content: summaryPrompt,
            },
            {
               role: 'user',
               content: reviews,
            },
         ],
      });

      return response?.message?.content ?? '';
   },
};
