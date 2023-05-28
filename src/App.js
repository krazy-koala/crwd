import DevicesTable from './common/DevicesTable.react';

import './App.css';

import data from './data/devices.json';

function App() {
  return <DevicesTable data={data} />
}

export default App;
