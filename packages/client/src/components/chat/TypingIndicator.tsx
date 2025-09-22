function TypingIndicator() {
   return (
      <div className="flex self-start gap-1 p-3 bg-gray-200 rounded-xl">
         <Dot />
         <Dot className="[animation-delay:0.2s]" />
         <Dot className="[animation-delay:0.4s]" />
      </div>
   );
}

interface IDotProps {
   className?: string;
}

const Dot = ({ className }: IDotProps) => (
   <div
      className={`w-2 h-2 bg-gray-800 rounded-full animate-pulse ${className}`}
   ></div>
);

export default TypingIndicator;
