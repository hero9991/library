import React, {useEffect, useState} from 'react';
import './App.css'
import Navbar from './components/navbar/Navbar';

function App() {
  useEffect(() => {
    fetch('', )
  });
  let [val, setVal] = useState(12345);
  return (
    <div className="App" onClick={() => setVal(++val)} >
      <Navbar />

    </div>
  );
}

export default App;
