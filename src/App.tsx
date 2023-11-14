import React from 'react';
import logo from './logo.svg';
import './App.css';
import StateContextProvider from './stateContext/StateContextProvider';
import AdminsPage from './components/admin/AdminsPage';
import PlayersPage from './components/player/PlayersPage';

function App() {
  return (
    <div className="App">
     <StateContextProvider>
        <AdminsPage />

        <PlayersPage />
     </StateContextProvider>
    </div>
  );
}

export default App;
