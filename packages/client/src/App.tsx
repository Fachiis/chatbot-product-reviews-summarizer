import * as React from "react";

function App() {
    const [message, setMessage] = React.useState("")

    React.useEffect(() => {
        fetch('/api/hello')
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(error => console.error('Error fetching message:', error));
    }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  )
}

export default App
