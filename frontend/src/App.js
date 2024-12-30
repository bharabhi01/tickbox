import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from "@nextui-org/react";
import Routes from './Routes';
import { AuthProvider } from './context/AuthProvider';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NextUIProvider>
          <div className="App-header">
            <Routes />
          </div>
        </NextUIProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;