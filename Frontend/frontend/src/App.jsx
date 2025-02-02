
import React, { useEffect, useState } from 'react';
import './App.css';

import CreateRute from "./CreateRute";
import RuteList from "./RuteList";


function App() {
    return (
    <div className="App">
      <header className="App-header">
        <h3>Hera solutions order system</h3>
          <CreateRute/>
          <RuteList/>
              <div className="flex items-center space-x-2 p-4">
              </div>
      </header>
    </div>
);
}
export default App;
