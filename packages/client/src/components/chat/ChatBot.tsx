import axios from 'axios';
import * as React from 'react';
import TypingIndicator from '@/components/chat/TypingIndicator.tsx';
import ChatMessages, { type Message } from '@/components/chat/ChatMessages.tsx';
import ChatInput, { type ChatFormData } from '@/components/chat/ChatInput.tsx';
import popSound from '@/assets/sounds/pop.mp3';
import notificationSound from '@/assets/sounds/notification.mp3';

const popAudio = new Audio(popSound);
popAudio.volume = 0.2; // Set volume to 20%

const notificationAudio = new Audio(notificationSound);
notificationAudio.volume = 0.2; // Set volume to 20%

type ChatResponse = {
   message: string;
};

function ChatBot() {
   const conversationId = React.useRef(crypto.randomUUID()); // We are using a ref to persist the conversation ID across renders. useRef is perfect for this use case and doesn't trigger re-renders. Other use cases for useRef include accessing DOM elements or storing mutable values that don't affect rendering. Using the crypto API ensures a unique ID for each conversation.

   const [messages, setMessages] = React.useState<Message[]>([]);
   const [error, setError] = React.useState('');
   const [isBotTyping, setIsBotTyping] = React.useState(false);

   // We will not be moving the onSubmit function as it is the responsibility of this component to handle user interactions and manage state. The onSubmit function directly interacts with the form submission process, updates the local state with new messages, and handles API calls to fetch responses.
   const onSubmit = async ({ prompt }: ChatFormData) => {
      try {
         setMessages((prevState) => [
            ...prevState,
            { content: prompt, role: 'user' },
         ]); // Show user message immediately for better UX
         setIsBotTyping(true);
         setError('');
         popAudio.play().catch((e) => console.error('Audio play error:', e)); // Play sound on user message sent

         const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
         });
         setMessages((prevState) => [
            ...prevState,
            { content: data.message, role: 'bot' },
         ]);
         notificationAudio
            .play()
            .catch((e) => console.error('Audio play error:', e)); // Play sound on bot response received
      } catch (e) {
         console.error(e);
         setError('Failed to fetch response. Please try again.');
      } finally {
         // This block always executes regardless of success or failure
         setIsBotTyping(false);
      }
   };

   return (
      <div className="flex flex-col h-full">
         <div className="flex flex-col flex-1 gap-3 mb-10 overflow-y-auto">
            <ChatMessages messages={messages} isBotTyping={isBotTyping} />
            {isBotTyping && <TypingIndicator />}
            {error && <p className="text-red-500 text-sm">{error}</p>}
         </div>
         <ChatInput onSubmit={onSubmit} />
      </div>
   );
}

export default ChatBot;
