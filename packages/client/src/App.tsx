import ReviewList from '@/components/reviews/ReviewList.tsx';

function App() {
   return (
      <div className="p-4 h-screen">
         {/*<ChatBot />*/}
         <ReviewList productId={2} />
      </div>
   );
}

export default App;
