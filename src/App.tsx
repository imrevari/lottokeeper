import './App.css';
import MainComponent from "./components/main/MainComponent";
import StateContextProvider from './stateContext/StateContextProvider';


function App() {
  return (
    <div >
     <StateContextProvider>
        <MainComponent />
     </StateContextProvider>
    </div>
  );
}

export default App;
