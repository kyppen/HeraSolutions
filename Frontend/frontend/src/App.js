import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



function App() {
    const [ruteName, setRuteName] = useState('');
    const [error, setError] = useState(null);

    const createRute = async (RuteName) => {

        console.log("Creating Rute...");
        try {
            const response = await fetch(`http://localhost:8080/api/rute/${RuteName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },}
            );
            if(!response.ok) {
                throw new Error("IDK");
            }

        }catch (err){
            setError(err instanceof Error ? err.message: 'An unknown error occured');
            console.error("Error deleting character", err);
        }

        window.location.reload();

    };


    return (
    <div className="App">
      <header className="App-header">
        <h3>Hera solutions order system</h3>
              <button onClick={createRute}>Create Rute</button>
              <div className="flex items-center space-x-2 p-4">
                  <Input
                      type="text"
                      value={ruteName}
                      onChange={(e) => setRuteName(e.target.value)}
                      placeholder="Enter something..."
                      className="p-2 border rounded-md"
                  />
                  <Button onClick={createRute} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                      Submit
                  </Button>

              </div>
      </header>
    </div>
);
}

export default App;
