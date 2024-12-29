import logo from './logo.svg';
import './App.css';
import Item from './pages/Item';

import { NextUIProvider } from "@nextui-org/react";


function App() {
  return (
    <NextUIProvider>
      <div className="App-header">
        <Item />
      </div>
    </NextUIProvider>
  );
}

export default App;
