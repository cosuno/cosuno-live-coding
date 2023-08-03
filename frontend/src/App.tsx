import React, { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [subcontractors, setSubcontractors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:9001');
      setSubcontractors(await data.json());
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <div className="App">
      {subcontractors.map(({ id, name }) => (
        <div key={id} className="Subcontractor">
          {name}
        </div>
      ))}
    </div>
  );
}

export default App;
