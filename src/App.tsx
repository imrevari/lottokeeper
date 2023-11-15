import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import AdminsPage from './components/admin/AdminsPage';
import PlayersPage from './components/player/PlayersPage';
import StateContextProvider from './stateContext/StateContextProvider';
import MainComponent from "./components/main/MainComponent";


function App() {
  return (
    <div className="App">
     <StateContextProvider>
        {/* <BrowserRouter>
          <Routes>
            <Route path="/admin" element={<AdminsPage />} />
            <Route path="/player" element={<PlayersPage />} />

          </Routes>
        </BrowserRouter> */}

        <MainComponent />


     </StateContextProvider>
    </div>
  );
}

export default App;
