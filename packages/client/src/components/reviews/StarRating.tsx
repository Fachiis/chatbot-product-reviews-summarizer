import { FaRegStar, FaStar } from 'react-icons/fa';

interface IProp {
   value: number;
}

function StarRating({ value }: Readonly<IProp>) {
   const placeholders = [1, 2, 3, 4, 5];

   return (
      <div className="flex gap-1 text-yellow-500">
         {placeholders.map((num) =>
            num <= value ? <FaStar key={num} /> : <FaRegStar key={num} />
         )}
      </div>
   );
}

export default StarRating;
