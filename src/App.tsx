import React from 'react';
import { useLocations } from './API/api';
import './App.css';
import { Info } from './components/Info';
import { GoogleMap } from './components/Map';
import './index.css';

const App = () => {
  const { locations } = useLocations();

  return (
    <div className="flex flex-row justify-between space-x-6">
      {/* {locations && <Info locations={locations} />} */}
      {locations && <GoogleMap locations={locations} />}
    </div>
  );
};

export default App;
