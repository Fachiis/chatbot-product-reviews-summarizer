import React from 'react';
import ReactMarkdown from 'react-markdown';

export type Message = {
   content: string;
   role: 'user' | 'bot';
};

interface IChatMessagesProps {
   messages: Message[];
   isBotTyping?: boolean;
}

function ChatMessages({ messages, isBotTyping }: Readonly<IChatMessagesProps>) {
   const lastMessageRef = React.useRef<HTMLDivElement | null>(null);

   React.useEffect(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' }); // Scroll to the form when messages change or bot starts typing
   }, [messages, isBotTyping]);

   const onCopyMessage = (e: React.ClipboardEvent) => {
      const selection = window.getSelection()?.toString().trim();
      if (selection) {
         e.preventDefault();
         e.clipboardData.setData('text/plain', selection);
      }
   };

   return (
      <div className="flex flex-col gap-3">
         {messages.map((msg, index) => (
            <div
               key={index}
               onCopy={onCopyMessage}
               ref={index === messages.length - 1 ? lastMessageRef : null} // Only attach ref to the last message for scrolling
               className={`px-2 py-1 max-w-md rounded-xl prose ${
                  msg.role === 'user'
                     ? 'bg-blue-500 text-white self-end'
                     : 'bg-gray-200 text-black self-start'
               }`}
            >
               <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
         ))}
      </div>
   );
}

export default ChatMessages;
