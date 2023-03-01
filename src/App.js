import React from 'react';
import './App.css';
import Home from './components/Home';
import MyProvider from './context/MyProvider';

function App() {
  return (
    <MyProvider>
      <Home />
    </MyProvider>
  );
}

export default App;
