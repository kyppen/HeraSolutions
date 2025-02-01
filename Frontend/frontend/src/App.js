import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import SubmitComponent  from "./InputSubmitComponent";
import InputSubmitComponent from "./InputSubmitComponent";
import RuteList from "./RuteList";



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
          <InputSubmitComponent/>
          <RuteList/>
              <div className="flex items-center space-x-2 p-4">
                  <p>Route</p>
              </div>
      </header>
    </div>
);
}
//<DragDropList />
export default App;
