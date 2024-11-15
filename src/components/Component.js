import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming the session ID is stored in local storage
        const sessionId = localStorage.getItem('sessionId');
        console.log('Session ID:', sessionId);

        const response = await fetch(process.env.NEXT_PUBLIC_VITE_API_URL + "/data", {
          method: 'GET', // or 'POST', depending on your needs
          headers: {
            'Content-Type': 'application/json',
            'Session-ID': sessionId, // Include the session ID in the headers
          },
          // If you're sending data in a POST request, you can include a body
          // body: JSON.stringify({ key: 'value' }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default MyComponent;