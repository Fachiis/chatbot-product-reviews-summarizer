import * as React from 'react';
import { Button } from '@/components/ui/button.tsx';

function App() {
   const [message, setMessage] = React.useState('');

   React.useEffect(() => {
      fetch('/api/hello')
         .then((response) => response.json())
         .then((data) => setMessage(data.message))
         .catch((error) => console.error('Error fetching message:', error));
   }, []);

   return (
      <div className="bg-gray-100 p-4 space-y-4">
         <h1 className="text-blue-500 font-bold">{message}</h1>
         <Button>Click me</Button>
      </div>
   );
}

export default App;
