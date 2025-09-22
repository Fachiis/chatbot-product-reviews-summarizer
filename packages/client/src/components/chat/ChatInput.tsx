import React from 'react';
import { Button } from '@/components/ui/button.tsx';
import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

export type ChatFormData = {
   prompt: string;
};

interface IChatInputProps {
   onSubmit: (data: ChatFormData) => void;
}

function ChatInput({ onSubmit }: IChatInputProps) {
   const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

   const getOnSubmit = handleSubmit((data) => {
      reset({ prompt: '' }); // Clear the textarea after submission. This improves UX. If we do not specify the value, it will be set to undefined which will cause pasting copied content issues formatting.
      onSubmit(data);
   });

   const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault(); // Prevents newline insertion in textarea
         getOnSubmit();
      }
   };

   return (
      <form
         onSubmit={getOnSubmit}
         onKeyDown={handleKeyDown}
         className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
      >
         <textarea
            {...register('prompt', {
               required: true,
               validate: (value) => value.trim().length > 0,
            })}
            autoFocus
            className="w-full border-0 focus:outline-0 resize-none"
            placeholder="Ask anything..."
            maxLength={1000}
         />
         <Button disabled={!formState.isValid} className="rounded-full w-9 h-9">
            <FaArrowUp />
         </Button>
      </form>
   );
}

export default ChatInput;
